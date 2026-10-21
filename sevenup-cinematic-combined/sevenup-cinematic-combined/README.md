# 7UP Cinematic — React frontend portfolio concept

A fan-made learning project built with React, Vite, React Router and GSAP.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

## Add your video

Put your licensed or self-created MP4 at `public/media/hero.mp4`. The homepage will use it as a muted looping background video. The page design still works if the video is missing.

## Add your images

Put images in `public/images/`. Once you upload them or tell me the filenames and intended sections, we can replace the CSS product illustrations and add the images to the matching page sections.

## What this project demonstrates

- Shared responsive navbar and footer
- React Router pages: Home, Products, Support, Careers and Events
- Navbar changes from transparent to solid after scrolling
- GSAP entrance animations and ScrollTrigger effects
- Responsive mobile navigation
- Demo FAQ and form interactions

Company details, product names, career roles and event descriptions are sample portfolio copy. Verify official facts before publishing. The site is not affiliated with or endorsed by 7UP or its owners.


## Combined video + cartoon animation

- Add a licensed/owned MP4 at `public/media/hero.mp4` for the cinematic moving background.
- The animated cartoon GIF is already included at `public/images/7up-cartoon.gif` and appears in front of the video on the homepage.
- The video is muted, looping, and inline. If no MP4 is added yet, the green CSS background still appears behind the GIF.
- The GIF currently uses storyboard panels, so its movement is more frame-by-frame than a continuous character animation.
