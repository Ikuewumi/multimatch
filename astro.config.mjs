import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';

import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
    integrations: [solid({ devtools: true }), partytown()],
});