---
title: About UI-Router
sidebar_label: About
slug: /about
description: UI-Router is a client-side router for single page web applications.
---

# About UI-Router

UI-Router is a client-side router for
[single page web applications](https://en.wikipedia.org/wiki/Single-page_application).

## Frameworks

UI-Router core is framework agnostic. We provide implementations for
AngularJS (1.x), Angular (2.0+), and React.

- [AngularJS](https://ui-router.github.io/ng1)
- [Angular (2+)](/frameworks/angular)
- [React](/frameworks/react)

## Client-side routing

A client-side router updates the browser URL as the user navigates through the
single page app.

Conversely, changes to the browser's URL can drive navigation of the app,
enabling a user to create deep-links (i.e., bookmarks) to areas deep within the
application.

The simplest form of client-side routing maps a feature in the app to a URL. For
instance, the Contacts feature might map to the URL `/contacts`, while the
Preferences feature might map to the URL `/prefs`.

![The Contacts tab is active when the browser URL ends in /contacts](/img/about/contacts-url.png)

Read about [UI-Router features](features.md).
