# 02-information-architecture.md

# TanHaoMao Information Architecture

Version 1.0.0

---

# Language

Specification Language

English

Product Language

Simplified Chinese

All interface copy must be written in Chinese.

---

# Purpose

This document defines the product structure, navigation, information hierarchy and user flows.

It does not define visual design or interaction details.

Every screen must exist for a clear purpose.

Every navigation path must support the Product Specification.

---

# Information Architecture Principles

## One Primary Goal

Users come to the app for one reason:

帮助第一次来到猫咖的人，与一只猫真正建立一次持续的人猫互动体验。

Every screen should support this goal.

---

## Reduce Decision Fatigue

Never present too many choices.

Important information should always appear first.

---

## Progressive Disclosure

Reveal information gradually.

Users should never be overwhelmed by a large amount of content.

---

## One Screen, One Primary Action

Every screen should have only one primary CTA.

Avoid competing actions.

---

# Navigation Structure

Bottom Navigation

```
首页
猫咪
预约
我的
```

Maximum tabs: **4**

Never add additional tabs.

Never use hidden navigation.

---

# Global Navigation Rules

Home is always the default entry.

Every page must be reachable within three taps.

Every detail page must provide an obvious way back.

Users should never become lost.

---

# Product Structure

```
首页
├── 今日推荐陪伴猫
├── 快速预约
├── 推荐猫咪
└── 查看全部猫咪

猫咪
├── 猫咪列表
├── 搜索
├── 标签筛选
└── 猫咪详情

预约
├── 我的预约
├── 待到店
├── 已完成
└── 预约详情

我的
├── 个人信息
├── 我的收藏
├── 我的预约
└── 设置（仅基础设置）
```

---

# Screen Priority

Priority Level 1

首页

猫咪详情

预约流程

Priority Level 2

猫咪列表

我的预约

收藏

Priority Level 3

设置

个人资料

---

# User Journey

## Journey 1

第一次来到 App

```
启动

↓

首页

↓

今日推荐陪伴猫

↓

猫咪详情

↓

预约陪伴

↓

预约成功
```

This is the highest priority journey.

---

## Journey 2

浏览猫咪

```
首页

↓

猫咪

↓

筛选

↓

猫咪详情

↓

预约
```

---

## Journey 3

查看预约

```
首页

↓

预约

↓

预约详情
```

---

## Journey 4

查看收藏

```
我的

↓

我的收藏

↓

猫咪详情
```

---

# Screen Specification

---

## Home

Purpose

帮助用户快速开始今天的陪伴体验。

Primary Action

查看推荐陪伴猫

Content Priority

```
Greeting

↓

今日推荐陪伴猫

↓

快速预约

↓

推荐猫咪

↓

查看更多
```

Never show:

长列表

复杂统计

营销 Banner

---

## Cat List

Purpose

帮助用户浏览全部可陪伴猫咪。

Primary Action

进入猫咪详情

Content

搜索

↓

标签筛选

↓

猫咪列表

Rules

Default sorting should be simple.

Avoid overwhelming filtering options.

Maximum three filter categories.

---

## Cat Detail

Purpose

帮助用户了解猫咪是否适合自己。

Primary Action

预约陪伴

Content Priority

```
照片

↓

名称

↓

性格标签

↓

互动特点

↓

适合人群

↓

陪伴预约按钮
```

Never include

长篇介绍

复杂数据

无关信息

---

## Reservation

Purpose

完成一次简单明确的预约。

Flow

```
选择日期

↓

选择时间

↓

确认预约

↓

预约成功
```

Never interrupt users.

Never require unnecessary information.

---

## Profile

Purpose

集中管理个人内容。

Content

头像

↓

昵称

↓

我的预约

↓

我的收藏

↓

设置

Never become a social profile.

---

# Search

Search only supports:

猫咪名称

猫咪性格标签

Never search unrelated content.

---

# Filter

Maximum three dimensions.

Recommended

性格

活跃程度

互动程度

Never create complex filter systems.

---

# Information Hierarchy

Every page should follow:

```
Page Title

↓

Primary Content

↓

Primary Action

↓

Secondary Information
```

Never reverse this order.

---

# Empty State

Every empty state must include

Illustration

↓

一句中文提示

↓

一个操作按钮

Example

还没有收藏的小猫

去看看今天有哪些陪伴猫吧

---

# Error State

Friendly language only.

Good

网络有点慢，

稍后再试试看～

Bad

Network Error

500 Error

Exception

---

# Loading State

Always use Skeleton Loading.

Avoid loading spinners whenever possible.

---

# Navigation Rules

Back navigation should always return users to their previous page.

Never reset scroll position unnecessarily.

Never open unnecessary modal windows.

Prefer full-page navigation.

---

# Global Components

Available globally

Bottom Navigation

Toast

Bottom Sheet

Dialog

Loading

Skeleton

Avatar

Tag

Card

Search Bar

No additional global components.

---

# Future Expansion

Reserved only.

Do not implement.

Nearby Stores

Multi-store

Membership

AI Recommendation

Community

Payment

---

# Out of Scope

Desktop Navigation

Sidebar

Multi-level Menu

Floating Action Button

Complex Dashboard

Gamification

Social Feed

Chat

Backend Management

---

# Checklist

Before implementing any page, confirm:

✓ This page supports the Product Goal.

✓ This page has only one primary action.

✓ Navigation is clear.

✓ Information hierarchy is simple.

✓ Users can complete tasks within three taps.

✓ No unnecessary features are introduced.

✓ The page matches the MVP scope.

If any item is not satisfied,

redesign the page before implementation.