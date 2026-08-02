"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { feature as topoFeature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";

const SIGNAL_HEX = 0x0f5c4c;
const LAND_FILL = "#2a323c";
const LAND_STROKE = "#3a4450";
const OCEAN_FILL = "#171c22";
const GRID_STROKE = "rgba(15,92,76,0.12)";
const RADIUS = 5.4;

type City = {
  name: string;
  code: string;
  sub: string;
  lat: number;
  lon: number;
  isHub?: boolean;
};

const HUB: City = {
  name: "München",
  code: "MUC",
  sub: "AVS Hub · Modul H",
  lat: 48.1351,
  lon: 11.582,
  isHub: true,
};

const CITIES: City[] = [
  { name: "Frankfurt", code: "FRA", sub: "Deutschland", lat: 50.1109, lon: 8.6821 },
  { name: "Amsterdam", code: "AMS", sub: "Niederlande", lat: 52.3676, lon: 4.9041 },
  { name: "London", code: "LHR", sub: "Vereinigtes Königreich", lat: 51.5074, lon: -0.1278 },
  { name: "Paris", code: "CDG", sub: "Frankreich", lat: 48.8566, lon: 2.3522 },
  { name: "Dubai", code: "DXB", sub: "VAE", lat: 25.2048, lon: 55.2708 },
  { name: "Singapur", code: "SIN", sub: "Singapur", lat: 1.3521, lon: 103.8198 },
  { name: "Hongkong", code: "HKG", sub: "China", lat: 22.3193, lon: 114.1694 },
  { name: "Tokio", code: "NRT", sub: "Japan", lat: 35.6762, lon: 139.6503 },
  { name: "New York", code: "JFK", sub: "USA", lat: 40.7128, lon: -74.006 },
  { name: "Los Angeles", code: "LAX", sub: "USA", lat: 34.0522, lon: -118.2437 },
  { name: "São Paulo", code: "GRU", sub: "Brasilien", lat: -23.5505, lon: -46.6333 },
  { name: "Sydney", code: "SYD", sub: "Australien", lat: -33.8688, lon: 151.2093 },
];

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

export function Globe({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hubLabelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const tooltip = tooltipRef.current;
    const hubLabel = hubLabelRef.current;
    if (!canvas || !wrap || !tooltip || !hubLabel) {
      console.warn("[AVS Globe] missing DOM refs");
      return;
    }

    const tooltipCity = tooltip.querySelector<HTMLElement>("[data-city]");
    const tooltipSub = tooltip.querySelector<HTMLElement>("[data-sub]");
    if (!tooltipCity || !tooltipSub) {
      console.warn("[AVS Globe] missing tooltip nodes");
      return;
    }

    let disposed = false;
    let frame = 0;
    let size = 420;
    let built = false;
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    } catch (error) {
      console.error("[AVS Globe] WebGL init failed", error);
      canvas.style.background =
        "radial-gradient(circle at 35% 30%, #cfeeda 0%, #a9dfc3 45%, #7fcaa4 100%)";
      canvas.style.borderRadius = "50%";
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 1000);
    // Pull back so sphere, arcs and atmosphere sit fully inside the frame
    camera.position.set(0, 0, 19.5);

    scene.add(new THREE.AmbientLight(0xffffff, 0.72));
    const key = new THREE.DirectionalLight(0xffffff, 0.85);
    key.position.set(-6, 5, 8);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xdff5e9, 0.25);
    fill.position.set(6, -3, -4);
    scene.add(fill);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    const markerMeshes: THREE.Mesh[] = [];
    const flowArrows: {
      curve: THREE.QuadraticBezierCurve3;
      mesh: THREE.Mesh;
      speed: number;
      offset: number;
    }[] = [];
    let hubPivot: THREE.Object3D | null = null;

    function stageSize() {
      const rect = wrap!.getBoundingClientRect();
      const w = rect.width || wrap!.clientWidth || 420;
      const h = rect.height || wrap!.clientHeight || 420;
      // Slightly inset so the sphere never kisses the clip edge
      return Math.max(240, Math.min(Math.min(w, h) * 0.86, 520));
    }

    function resize() {
      size = stageSize();
      canvas!.width = size;
      canvas!.height = size;
      canvas!.style.width = `${size}px`;
      canvas!.style.height = `${size}px`;
      renderer.setSize(size, size, false);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    }

    function buildMapTexture(landFeature: GeoJSON.FeatureCollection) {
      const W = 4096;
      const H = 2048;
      const c = document.createElement("canvas");
      c.width = W;
      c.height = H;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = OCEAN_FILL;
      ctx.fillRect(0, 0, W, H);

      function project(lon: number, lat: number) {
        return [((lon + 180) / 360) * W, ((90 - lat) / 180) * H] as const;
      }
      function ringPath(ring: number[][]) {
        ctx.beginPath();
        ring.forEach((pt, i) => {
          const [x, y] = project(pt[0], pt[1]);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.closePath();
      }
      function forEachRing(fn: (ring: number[][]) => void) {
        landFeature.features.forEach((f) => {
          const geom = f.geometry;
          if (!geom) return;
          if (geom.type === "Polygon") geom.coordinates.forEach(fn);
          else if (geom.type === "MultiPolygon")
            geom.coordinates.forEach((poly) => poly.forEach(fn));
        });
      }

      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.35)";
      ctx.shadowBlur = 22;
      ctx.shadowOffsetY = 10;
      ctx.fillStyle = LAND_FILL;
      forEachRing((ring) => {
        ringPath(ring);
        ctx.fill();
      });
      ctx.restore();

      ctx.fillStyle = LAND_FILL;
      forEachRing((ring) => {
        ringPath(ring);
        ctx.fill();
      });

      ctx.strokeStyle = LAND_STROKE;
      ctx.lineWidth = 2;
      forEachRing((ring) => {
        ringPath(ring);
        ctx.stroke();
      });

      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      ctx.lineWidth = 1.1;
      ctx.translate(-1.4, -1.4);
      forEachRing((ring) => {
        ringPath(ring);
        ctx.stroke();
      });
      ctx.restore();

      ctx.strokeStyle = GRID_STROKE;
      ctx.lineWidth = 1;
      for (let lon = -180; lon <= 180; lon += 20) {
        const [x] = project(lon, 0);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let lat = -80; lat <= 80; lat += 20) {
        const [, y] = project(0, lat);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      const tex = new THREE.CanvasTexture(c);
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      tex.needsUpdate = true;
      return tex;
    }

    function makeGlowTexture(hex: string) {
      const s = 128;
      const c = document.createElement("canvas");
      c.width = c.height = s;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      g.addColorStop(0, `${hex}e6`);
      g.addColorStop(0.4, `${hex}55`);
      g.addColorStop(1, `${hex}00`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, s, s);
      return new THREE.CanvasTexture(c);
    }

    function addCityMarker(city: City) {
      const dir = latLonToVector3(city.lat, city.lon, 1).normalize();
      const pos = dir.clone().multiplyScalar(RADIUS + 0.01);
      const pivot = new THREE.Object3D();
      pivot.position.copy(pos);
      pivot.lookAt(0, 0, 0);
      globeGroup.add(pivot);

      const isHub = !!city.isHub;
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(isHub ? 0.1 : 0.04, 12, 12),
        new THREE.MeshBasicMaterial({ color: isHub ? SIGNAL_HEX : 0x0a0a0a }),
      );
      pivot.add(core);

      if (isHub) {
        const glow = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: makeGlowTexture("#2ea672"),
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          }),
        );
        glow.scale.set(1.2, 1.2, 1.2);
        pivot.add(glow);
        for (let i = 0; i < 3; i++) {
          const ring = new THREE.Mesh(
            new THREE.RingGeometry(0.11, 0.14, 48),
            new THREE.MeshBasicMaterial({
              color: SIGNAL_HEX,
              transparent: true,
              opacity: 0,
              side: THREE.DoubleSide,
              depthWrite: false,
            }),
          );
          ring.userData.phase = (i / 3) * 2.4;
          ring.userData.isPulse = true;
          pivot.add(ring);
        }
      }

      const hit = new THREE.Mesh(
        new THREE.SphereGeometry(isHub ? 0.3 : 0.2, 8, 8),
        new THREE.MeshBasicMaterial({ visible: false }),
      );
      pivot.add(hit);
      hit.userData.city = city;
      markerMeshes.push(hit);
      if (isHub) hubPivot = pivot;
      return dir;
    }

    function buildArc(hubDir: THREE.Vector3, cityDir: THREE.Vector3) {
      const start = hubDir.clone().multiplyScalar(RADIUS);
      const end = cityDir.clone().multiplyScalar(RADIUS);
      const angle = hubDir.angleTo(cityDir);
      const arcHeight = RADIUS * (0.16 + angle * 0.16);
      const mid = hubDir.clone().add(cityDir).normalize().multiplyScalar(RADIUS + arcHeight);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(48);
      const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: SIGNAL_HEX,
        transparent: true,
        opacity: 0.28,
      });
      globeGroup.add(new THREE.Line(lineGeom, lineMat));

      const arrow = new THREE.Mesh(
        new THREE.ConeGeometry(0.032, 0.1, 8),
        new THREE.MeshBasicMaterial({ color: SIGNAL_HEX, transparent: true, opacity: 0.9 }),
      );
      globeGroup.add(arrow);
      flowArrows.push({
        curve,
        mesh: arrow,
        speed: 0.16 + Math.random() * 0.07,
        offset: Math.random(),
      });
    }

    function initialOrientation() {
      const mucDir = latLonToVector3(HUB.lat, HUB.lon, 1).normalize();
      const q = new THREE.Quaternion().setFromUnitVectors(
        mucDir,
        new THREE.Vector3(0.15, 0.1, 1).normalize(),
      );
      globeGroup.quaternion.copy(q);
    }

    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let spinVelY = 0;
    let spinVelX = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      spinVelY = 0;
      spinVelX = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas!.setPointerCapture(e.pointerId);
    };
    const onPointerUp = () => {
      isDragging = false;
    };
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function handleHover(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(markerMeshes);
      if (hits.length) {
        const city = hits[0].object.userData.city as City;
        tooltipCity!.textContent = `${city.name} (${city.code})`;
        tooltipSub!.textContent = city.sub;
        tooltip!.style.transform = `translate(${e.clientX + 16}px, ${e.clientY - 12}px)`;
        tooltip!.style.opacity = "1";
      } else {
        tooltip!.style.opacity = "0";
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        spinVelY = dx * 0.0032;
        spinVelX = dy * 0.0026;
        globeGroup.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), spinVelY);
        globeGroup.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), spinVelX);
        lastX = e.clientX;
        lastY = e.clientY;
      }
      handleHover(e);
    };
    const onPointerLeave = () => {
      isDragging = false;
      tooltip!.style.opacity = "0";
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointermove", onPointerMove);

    const clock = new THREE.Clock();
    const worldUp = new THREE.Vector3(0, 1, 0);
    const worldRight = new THREE.Vector3(1, 0, 0);
    const tmpVec = new THREE.Vector3();

    function startRenderLoop() {
      const animate = () => {
        if (disposed) return;
        frame = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        if (!isDragging) {
          if (Math.abs(spinVelY) > 0.00003 || Math.abs(spinVelX) > 0.00003) {
            globeGroup.rotateOnWorldAxis(worldUp, spinVelY);
            globeGroup.rotateOnWorldAxis(worldRight, spinVelX);
            spinVelY *= 0.955;
            spinVelX *= 0.955;
          } else {
            globeGroup.rotateOnWorldAxis(worldUp, 0.0013);
          }
        }

        globeGroup.children.forEach((child) => {
          child.children?.forEach((c) => {
            if (c.userData?.isPulse) {
              const local = ((t + c.userData.phase) % 2.4) / 2.4;
              const scale = 0.4 + local * 3.2;
              c.scale.set(scale, scale, scale);
              const material = (c as THREE.Mesh).material as THREE.MeshBasicMaterial | undefined;
              if (material) {
                material.opacity = (1 - local) * 0.5;
              }
            }
          });
        });

        flowArrows.forEach((a) => {
          const local = (t * a.speed + a.offset) % 1;
          const pos = a.curve.getPoint(local);
          const tangent = a.curve.getTangent(local).normalize();
          a.mesh.position.copy(pos);
          a.mesh.quaternion.setFromUnitVectors(worldUp, tangent);
          const fade = Math.min(local * 6, (1 - local) * 6, 1);
          (a.mesh.material as THREE.MeshBasicMaterial).opacity = 0.85 * fade;
        });

        if (hubPivot) {
          hubPivot.getWorldPosition(tmpVec);
          const facing = tmpVec.clone().normalize().dot(camera.position.clone().normalize());
          if (facing > 0.12) {
            const screenPos = tmpVec.clone().project(camera);
            const rect = canvas!.getBoundingClientRect();
            const x = rect.left + (screenPos.x * 0.5 + 0.5) * rect.width;
            const y = rect.top + (-screenPos.y * 0.5 + 0.5) * rect.height;
            hubLabel!.style.transform = `translate(${x}px, ${y - 46}px) translateX(-50%)`;
            hubLabel!.style.opacity = "1";
          } else {
            hubLabel!.style.opacity = "0";
          }
        }

        renderer.render(scene, camera);
      };
      animate();
    }

    function buildGlobe(texture?: THREE.Texture) {
      if (built || disposed) return;
      built = true;
      const geometry = new THREE.SphereGeometry(RADIUS, 128, 128);
      const material = texture
        ? new THREE.MeshPhongMaterial({ map: texture, shininess: 10, specular: 0x2a2a28 })
        : new THREE.MeshPhongMaterial({ color: 0xa9dfc3 });
      globeGroup.add(new THREE.Mesh(geometry, material));

      if (texture) {
        globeGroup.add(
          new THREE.Mesh(
            new THREE.SphereGeometry(RADIUS * 1.006, 96, 96),
            new THREE.MeshBasicMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0.5,
              side: THREE.BackSide,
            }),
          ),
        );
        globeGroup.add(
          new THREE.Mesh(
            new THREE.SphereGeometry(RADIUS * 1.035, 64, 64),
            new THREE.MeshBasicMaterial({
              color: SIGNAL_HEX,
              transparent: true,
              opacity: 0.07,
              side: THREE.BackSide,
            }),
          ),
        );
      }

      const hubDir = addCityMarker(HUB);
      CITIES.forEach((city) => {
        const cityDir = addCityMarker(city);
        buildArc(hubDir, cityDir);
      });
      initialOrientation();
      startRenderLoop();
    }

    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(() => resize());
    ro.observe(wrap);

    const mapTimeout = window.setTimeout(() => {
      if (!built && !disposed) buildGlobe();
    }, 2200);

    fetch("/data/land-50m.json")
      .then((r) => {
        if (!r.ok) throw new Error(`Map HTTP ${r.status}`);
        return r.json();
      })
      .then((topology: Topology) => {
        if (disposed || built) return;
        window.clearTimeout(mapTimeout);
        const land = topoFeature(
          topology,
          topology.objects.land as GeometryCollection,
        ) as unknown as GeoJSON.FeatureCollection;
        buildGlobe(buildMapTexture(land));
      })
      .catch((err) => {
        console.warn("Weltkarte konnte nicht geladen werden.", err);
        window.clearTimeout(mapTimeout);
        if (!built && !disposed) buildGlobe();
      });

    return () => {
      disposed = true;
      window.clearTimeout(mapTimeout);
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointermove", onPointerMove);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div ref={wrapRef} className={`globe-stage ${className}`}>
      <div
        className="pointer-events-none absolute inset-[22%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(31,122,84,0.12) 0%, rgba(31,122,84,0) 70%)",
          filter: "blur(10px)",
        }}
        aria-hidden
      />
      <canvas
        ref={canvasRef}
        className="relative z-[1] cursor-grab active:cursor-grabbing"
        aria-label="Interaktiver Globus mit AVS Hub München"
      />
      <div
        ref={tooltipRef}
        className="pointer-events-none fixed z-20 bg-[#111] px-3.5 py-2 text-[12.5px] text-white opacity-0 transition-opacity"
        style={{ transform: "translate(-9999px,-9999px)" }}
      >
        <strong data-city className="block text-[13px]" />
        <span data-sub className="text-[11.5px] text-[#a6a6a3]" />
      </div>
      <div
        ref={hubLabelRef}
        className="pointer-events-none fixed z-[15] text-center opacity-0 transition-opacity"
        style={{ transform: "translate(-9999px,-9999px)" }}
      >
        <span className="inline-block whitespace-nowrap border border-[#2a2b29] bg-[#0c0d0c] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#f1f0eb]">
          München · MUC
        </span>
        <div className="mx-auto mt-1.5 h-3 w-px bg-[#1f7a54]/55" />
      </div>
    </div>
  );
}
