/** Openers for the two overlays that live in the root layout.
 *
 *  They are addressed by event rather than by context so a server
 *  component can hand the trigger to any button on the page without the
 *  whole tree turning into a client component. */

export const CONTACT_EVENT = "avs:contact";
export const ENQUIRY_EVENT = "avs:enquiry";

export type EnquiryDetail = { message?: string; subject?: string };

/** Opens the "how would you like to start?" chooser. */
export function openContact() {
  window.dispatchEvent(new CustomEvent(CONTACT_EVENT));
}

/** Opens the step-by-step enquiry, optionally carrying what the visitor
 *  already typed into the hero field. */
export function openEnquiry(detail: EnquiryDetail = {}) {
  window.dispatchEvent(new CustomEvent<EnquiryDetail>(ENQUIRY_EVENT, { detail }));
}
