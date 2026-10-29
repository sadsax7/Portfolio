export const marqueeSourceImages = [
  'hero-space-voyage-preview-eECLH3Yc',
  'hero-codenest-preview-Cgppc2qV',
  'hero-vex-ventures-preview-BczMFIiw',
  'hero-stellar-ai-v2-preview-DjvxjG3C',
  'hero-asme-preview-B_nGDnTP',
  'hero-transform-data-preview-Cx5OU29N',
  'hero-vitara-preview-Cjz2QYyU',
  'hero-terra-preview-BFjrCr7T',
  'hero-skyelite-preview-DHaZIgUv',
  'hero-aethera-preview-DknSlcTa',
  'hero-designpro-preview-D8c5_een',
  'hero-stellar-ai-preview-D3HL6bw1',
  'hero-xportfolio-preview-D4A8maiC',
  'hero-orbit-web3-preview-BXt4OttD',
  'hero-nexora-preview-cx5HmUgo',
  'hero-evr-ventures-preview-DZxeVFEX',
  'hero-planet-orbit-preview-DWAP8Z1P',
  'hero-new-era-preview-CocuDUm9',
  'hero-wealth-preview-B70idl_u',
  'hero-luminex-preview-CxOP7ce6',
  'hero-celestia-preview-0yO3jXO8',
].map((name) => `https://motionsites.ai/assets/${name}.gif`)

export const marqueeImages = marqueeSourceImages.map((source, index) => ({
  // The supplied Celestia URL returns 404. Keep its slot with supplied artwork.
  src: index === 20 ? '/images/project-3-3.webp' : `/images/marquee/${source.split('/').at(-1)}`,
  alt: `${source.split('hero-')[1].split('-preview')[0].replaceAll('-', ' ')} design exploration`,
}))

export const services = [
  { name: '3D Modeling', description: 'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.' },
  { name: 'Rendering', description: 'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.' },
  { name: 'Motion Design', description: 'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.' },
  { name: 'Branding', description: 'Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence.' },
  { name: 'Web Design', description: 'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.' },
]

const cloudImage = (file: string) => `https://images.higgs.ai/?default=1&output=webp&url=${encodeURIComponent(`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/${file}.png`)}&w=1280&q=85`

const projectData = [
  {
    name: 'Nextlevel Studio', category: 'Client', disciplines: 'Art direction / 3D design',
    description: 'A new perspective on a creative studio. Sculptural forms, expressive materials, and a visual world made to stand out.',
    images: [
      cloudImage('hf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db'),
      cloudImage('hf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8'),
      cloudImage('hf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327'),
    ],
  },
  {
    name: 'Aura Brand Identity', category: 'Personal', disciplines: 'Brand identity / 3D exploration',
    description: 'An exploration of identity through form, light, and feeling. A cohesive visual language brought to life in three dimensions.',
    images: [
      cloudImage('hf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f'),
      cloudImage('hf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1'),
      cloudImage('hf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea'),
    ],
  },
  {
    name: 'Solaris Digital', category: 'Client', disciplines: 'Digital design / Art direction',
    description: 'A bold digital world with an otherworldly point of view. Immersive imagery meets a considered, contemporary design direction.',
    images: [
      cloudImage('hf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f'),
      cloudImage('hf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b'),
      cloudImage('hf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee'),
    ],
  },
]

export const projects = projectData.map((project, index) => ({
  ...project,
  sourceImages: project.images,
  images: project.images.map((_, imageIndex) => `/images/project-${index + 1}-${imageIndex + 1}.webp`),
}))

export type Project = (typeof projects)[number]

const decorationBase = 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/'
export const decorations = [
  { src: `${decorationBase}moon_icon.11395d36.png`, position: 'decoration-moon', x: -80, delay: 0.1 },
  { src: `${decorationBase}p59_1.4659672e.png`, position: 'decoration-object', x: -80, delay: 0.25 },
  { src: `${decorationBase}lego_icon-1.703bb594.png`, position: 'decoration-lego', x: 80, delay: 0.15 },
  { src: `${decorationBase}Group_134-1.2e04f3ce.png`, position: 'decoration-group', x: 80, delay: 0.3 },
].map((decoration, index) => ({ ...decoration, source: decoration.src, src: `/images/decoration-${index + 1}.png` }))
