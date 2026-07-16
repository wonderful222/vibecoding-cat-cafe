# 04-interaction-system.md

# YueHaoMao Interaction System

Version 1.0.0

---

# Language

Specification Language

English

Product Language

Simplified Chinese

All UI copy must be written in Chinese.

Never generate English interface content.

---

# Purpose

Interaction should improve understanding,

not attract attention.

Every animation exists to:

• Explain hierarchy

• Confirm user actions

• Reduce abrupt visual changes

• Build a calm experience

If users notice the animation,

it is probably too much.

---

# Experience Keywords

Calm

Natural

Responsive

Gentle

Predictable

Comfortable

Lightweight

Human

---

# Interaction Principles

## Immediate Feedback

Every interactive element should respond immediately after user input.

Never leave users wondering whether an action has been triggered.

---

## Motion Has Purpose

Never animate purely for decoration.

Every movement must communicate:

State

Hierarchy

Relationship

Feedback

---

## Reduce Cognitive Load

Motion should simplify understanding.

Never increase visual complexity.

---

## Consistency First

The same interaction should always produce the same response.

Users should never need to learn different behaviors.

---

# Motion Timing

Press Feedback

120ms

Hover

180ms

State Change

200ms

Page Transition

240ms

Bottom Sheet

280ms

Success Feedback

400ms

Never exceed

500ms

---

# Motion Curve

Preferred

ease-out

ease-in-out

Avoid

linear

bounce

elastic

overshoot

Motion should stop naturally.

---

# Touch Feedback

Every clickable element must respond visually.

Button

Press

Scale

1 → 0.98

Release

0.98 → 1

Duration

120ms

No bounce.

No shadow jump.

---

# Button Interaction

Primary Button

Hover

Opacity 95%

Press

Scale 0.98

Loading

Keep width unchanged.

Replace text with loading indicator.

Never resize buttons during loading.

Disabled

Reduce opacity only.

---

# Card Interaction

Hover

TranslateY

-2px

Shadow

Increase slightly

Press

Scale

0.99

Cards should feel touchable,

not floating.

---

# Bottom Navigation

Selected

Icon Scale

1.08

Label

Opacity

100%

Unselected

Opacity

60%

No movement.

No bounce.

Navigation should remain visually stable.

---

# List Appearance

Lists should appear progressively.

Animation

Fade + Move Up

Distance

8px

Delay

40ms

Maximum animation duration

200ms

Never animate large lists one item at a time.

---

# Page Transition

Forward

Fade + Slide Left

Back

Fade + Slide Right

Distance

16px

Duration

240ms

No zoom.

No rotation.

No parallax.

---

# Image Loading

Display order

Placeholder

↓

Blur Preview

↓

High Resolution

↓

Fade In

Duration

250ms

Images should never pop into view.

---

# Skeleton Loading

Always prefer Skeleton.

Avoid loading spinners whenever possible.

Skeleton Animation

Subtle shimmer

Duration

1.6s

Low contrast only.

---

# Empty State

Structure

Illustration

↓

One sentence

↓

Primary Action

Example

还没有预约

去认识一只小猫吧

Purpose

Reduce uncertainty.

Encourage next action.

---

# Search

Tap Input

↓

Border Highlight

↓

Keyboard

↓

Cursor

No exaggerated animation.

Searching should feel immediate.

---

# Filter Chips

Selected

Background fills smoothly.

Text changes color.

Duration

180ms

Never resize chips.

---

# Bottom Sheet

Open

Slide Up

Fade Background

Close

Swipe Down

or

Tap Outside

Never bounce.

---

# Dialog

Background

Opacity 40%

Dialog

Fade + Scale

0.98 → 1

Duration

220ms

Keep transitions subtle.

---

# Reservation Flow

Step transition should feel continuous.

Never flash between screens.

Maintain visual continuity.

Flow

预约时间

↓

确认预约

↓

预约成功

---

# Success Feedback

Display order

Illustration

↓

Title

↓

Description

↓

Primary Button

Delay

60ms

Success should feel warm,

not exciting.

Avoid celebration effects.

---

# Scroll Behavior

Header

Height

72 → 60

Content scrolls naturally.

Header never disappears completely.

---

# Error Feedback

Never blame users.

Preferred

网络有点慢，

稍后再试试看～

Avoid

请求失败

Error Code 500

---

# Success Copy

Preferred

预约成功，

糯米已经在等你啦。

Avoid

Success

Operation Completed

---

# Loading Copy

Preferred

正在寻找今天适合陪伴你的小猫……

Avoid

Loading...

---

# Accessibility

Respect reduced motion preference.

If reduced motion is enabled:

Disable

Scale

Slide

List animation

Keep only opacity transitions.

---

# Interaction Rhythm

Fast

Button Feedback

Selection

Navigation

Medium

Page Transition

Bottom Sheet

Slow

Illustration

Success

Loading

The interface should breathe.

Never rush users.

---

# Haptic Simulation

Web does not support native haptic feedback.

Simulate touch response through:

Small Scale Change

+

Opacity Change

Only.

---

# Things Agent Must Never Do

Never use bounce animation.

Never use elastic animation.

Never rotate interface elements.

Never animate large distances.

Never animate every component simultaneously.

Never delay interaction because of animation.

Never use flashy transition effects.

---

# Out of Scope

Lottie

Confetti

3D Animation

Physics Animation

Particle Effects

Complex Gesture System

Parallax

Animated Background

---

# Checklist

Every interaction should be:

✓ Immediate

✓ Predictable

✓ Consistent

✓ Calm

✓ Lightweight

✓ Accessible

✓ Purposeful
