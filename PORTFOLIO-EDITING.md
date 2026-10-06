# Cream portfolio

This redesign belongs to `TIHSAN27/Portfolio-Bookeeping`.

The Next.js application is in `zelio_NextJS_v2.0.0_Unzip-First/1.zelio_nextjs_template`.

## Editing

- `components/portfolio/content.ts`: services, experience, qualifications, project details, portrait paths, and contact links.
- The `upwork` object stores the visible profile snapshot. Its title, rate, earnings, completed jobs, feedback count, and skills were checked through the Upwork connector on 6 October 2026. The retained 100% Job Success, Rising Talent, and 5.0 rating are from the previously approved portfolio; the connector did not expose those fields in this refresh. The section links to the live profile for current badges and feedback.
- `components/portfolio/BookkeepingPortfolio.tsx`: sections, mobile navigation, project dialog, and portrait movement.
- `app/portfolio.css`: scoped homepage styles, responsive layouts, and animation.
- `public/assets/imgs/profile/taimoor-character.png`: generated full-body portrait.

Run `npm run dev` from the application folder for a preview, or `npm run build` to validate the production site. Fonts are bundled locally with their OFL licenses in `app/fonts`; a build does not need Google Fonts network access.

## Character

The current character is an AI-generated image with local, cursor-responsive head tilt, a slight body lean, and gentle breathing motion. It is not a 3D model or a talking video. The pause button stops portrait motion; the operating system's reduced-motion preference also disables it. Touch devices do not require a cursor.

The built-in image generation tool created the character using the user's supplied photograph as the likeness and outfit reference. Prompt: “Create a single high-quality full-body 3D editorial character for this man's professional bookkeeping portfolio. Preserve his recognizable facial features, dark side-swept hair, short beard and moustache, charcoal suit, white shirt, burgundy tie and matching pocket square. Friendly subtle smile, relaxed upright stance, one hand in trouser pocket, complete body including dark dress shoes, soft warm studio light, transparent background, no text or watermark.”

The user approved uploading this generated portrait to DevMotion. The upload succeeded, but video generation returned `AI video generation is not included in your current plan`. No generated motion clip is included. If a loop is created later, save it inside `public/assets/` and set `profile.motionVideo` in the content file. Use a white-background silent MP4 for the existing blend treatment. The still portrait is retained as a fallback.

## Content and privacy

Experience, degree, credentials, Upwork claims, and the $5M+ figure are carried over from the existing portfolio, not newly verified. No new employers, testimonials, or qualifications were invented. Project graphics are explicitly illustrative. Projects open in accessible dialogs rather than linking to old template pages. The homepage has email and Upwork contact, a LinkedIn profile link, and no phone number or message form.

The previous template's secondary routes remain available at their existing URLs; the redesigned homepage does not link to them.

The ID card has two faces and flips on mouse hover, tap, or keyboard activation. Pointer exit resets the temporary hover state; clicking can keep a face selected. The hidden face is excluded from the accessibility tree. Reduced motion switches faces without the rotation transition.
