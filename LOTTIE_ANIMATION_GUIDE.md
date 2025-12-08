# Lottie Animation with Scroll Trigger & Clip Path

This guide explains how to use the `LottieScrollSection` component to integrate Lottie animations with GSAP scroll trigger and clip path effects.

## Installation

The required package `@lottiefiles/dotlottie-react` has been installed with:
```bash
npm install @lottiefiles/dotlottie-react --legacy-peer-deps
```

## Component Location

- **Component**: `src/components/animations/LottieScrollSection.tsx`
- **Examples**: `src/components/animations/LottieExamples.tsx`
- **Implementation**: `src/pages/About.tsx` (line ~267)

## Features

✨ **Scroll-Triggered Animations**: Animations activate and progress based on scroll position
🎭 **Clip Path Effects**: Multiple clip path animations (hexagon, circle, polygon, etc.)
📐 **Smooth Transitions**: GSAP-powered smooth scaling and rotation effects
🎨 **Customizable**: Fully configurable animation parameters
📱 **Responsive**: Works seamlessly across all device sizes

## Basic Usage

```tsx
import { LottieScrollSection } from '@/components/animations/LottieScrollSection';

function MyPage() {
    return (
        <LottieScrollSection
            animationPath="/assets/Office Team Work.json"
            clipPathAnimation="hexagon"
            scrollDistance={2000}
            title="Our Team in Motion"
            subtitle="Experience the energy and collaboration..."
            autoplay={true}
            loop={true}
        />
    );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animationPath` | `string` | **required** | Path to your Lottie JSON file |
| `clipPathAnimation` | `'polygon' \| 'circle' \| 'hexagon' \| 'inset' \| 'ellipse' \| 'diagonal'` | `'hexagon'` | Type of clip path animation |
| `scrollDistance` | `number` | `2000` | Scroll distance in pixels for animation duration |
| `className` | `string` | `''` | Additional CSS classes |
| `title` | `string` | `undefined` | Optional title text |
| `subtitle` | `string` | `undefined` | Optional subtitle text |
| `autoplay` | `boolean` | `true` | Auto-start the Lottie animation |
| `loop` | `boolean` | `true` | Loop the Lottie animation |

## Clip Path Animation Types

### 1. Hexagon (`'hexagon'`)
Expands from a center point to a hexagon shape. Great for modern, geometric reveals.

```tsx
<LottieScrollSection
    animationPath="/assets/your-animation.json"
    clipPathAnimation="hexagon"
/>
```

### 2. Circle (`'circle'`)
Expands from center as a circle. Perfect for focus-driven reveals.

```tsx
<LottieScrollSection
    animationPath="/assets/your-animation.json"
    clipPathAnimation="circle"
/>
```

### 3. Polygon (`'polygon'`)
Slides up from the bottom. Classic and elegant.

```tsx
<LottieScrollSection
    animationPath="/assets/your-animation.json"
    clipPathAnimation="polygon"
/>
```

### 4. Inset (`'inset'`)
Reveals from top to bottom like a curtain.

```tsx
<LottieScrollSection
    animationPath="/assets/your-animation.json"
    clipPathAnimation="inset"
/>
```

### 5. Ellipse (`'ellipse'`)
Organic elliptical expansion from center.

```tsx
<LottieScrollSection
    animationPath="/assets/your-animation.json"
    clipPathAnimation="ellipse"
/>
```

### 6. Diagonal (`'diagonal'`)
Dynamic diagonal sweep effect.

```tsx
<LottieScrollSection
    animationPath="/assets/your-animation.json"
    clipPathAnimation="diagonal"
/>
```

## Animation Timeline

The component creates a sophisticated animation sequence:

1. **Initial State**: Animation starts scaled down (0.8) and invisible
2. **Clip Path Reveal**: The chosen clip path animation reveals the content
3. **Scale & Opacity**: Simultaneously scales to 1 and fades in
4. **Bounce Effect**: Slight scale-up to 1.1 with 5° rotation
5. **Settle**: Returns to scale 1 and 0° rotation

All animations are synchronized with scroll position using GSAP ScrollTrigger.

## Customization Examples

### Minimal Setup (No Text)
```tsx
<LottieScrollSection
    animationPath="/assets/animation.json"
    clipPathAnimation="circle"
/>
```

### Full Featured
```tsx
<LottieScrollSection
    animationPath="/assets/Office Team Work.json"
    clipPathAnimation="hexagon"
    scrollDistance={2500}
    title="Our Creative Process"
    subtitle="Watch how we transform ideas into reality through collaboration and innovation."
    autoplay={true}
    loop={true}
    className="my-24 bg-gradient-to-b from-black to-gray-900"
/>
```

### Quick Reveal
```tsx
<LottieScrollSection
    animationPath="/assets/animation.json"
    clipPathAnimation="inset"
    scrollDistance={1000}  // Faster reveal
/>
```

## File Structure

```
src/
├── components/
│   └── animations/
│       ├── LottieScrollSection.tsx    # Main component
│       └── LottieExamples.tsx         # Usage examples
├── pages/
│   └── About.tsx                      # Implementation example
└── public/
    └── assets/
        └── Office Team Work.json      # Your Lottie animation
```

## Adding Your Own Lottie Files

1. Place your `.json` Lottie file in `public/assets/`
2. Reference it with the path: `/assets/your-animation.json`
3. Use it in the component:

```tsx
<LottieScrollSection
    animationPath="/assets/your-animation.json"
    clipPathAnimation="hexagon"
/>
```

## Performance Tips

- **Scroll Distance**: Shorter distances (1000-1500px) create snappier animations
- **File Size**: Optimize your Lottie JSON files for web (use LottieFiles optimizer)
- **Loop**: Set `loop={false}` if the animation should only play once
- **Autoplay**: Set `autoplay={false}` if you want manual control

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Troubleshooting

### Animation not showing?
- Check that the file path is correct
- Ensure the JSON file is in `public/assets/`
- Verify the file is valid Lottie JSON

### Scroll trigger not working?
- Make sure GSAP and ScrollTrigger are properly registered
- Check that the container has enough scroll distance
- Verify no CSS conflicts with `position: fixed` or `overflow: hidden`

### Performance issues?
- Reduce `scrollDistance` for faster animations
- Optimize your Lottie file size
- Consider using `loop={false}` for complex animations

## Example Implementation

See the live example on the About page (`/about`) where the Office Team Work animation is integrated with a hexagon clip path reveal.

## Credits

- **GSAP**: Animation library
- **@lottiefiles/dotlottie-react**: Lottie player for React
- **Framer Motion**: Additional UI animations
