import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
}

function getLocale(locale) {
  const source = read(`src/i18n/locales/${locale}.json`);
  return JSON.parse(source);
}

test('navbar menu overlay switched to hierarchical list layout without cards', () => {
  const navbarSource = read('src/components/Navbar.tsx');

  assert.match(navbarSource, /premium-menu-row/);
  assert.match(navbarSource, /premium-menu-subheader/);
  assert.doesNotMatch(navbarSource, /premium-private-card/);
  assert.match(navbarSource, /setActiveMenuGroup/);
});

test('menu overlay config defines the three premium menu groups', () => {
  const configSource = read('src/components/menuOverlayConfig.ts');

  assert.match(configSource, /id: 'discover'/);
  assert.match(configSource, /id: 'invest'/);
  assert.match(configSource, /id: 'private'/);
});

test('all supported locales contain required menu overlay keys', () => {
  for (const locale of ['es', 'en', 'de', 'fr']) {
    const data = getLocale(locale);
    const menu = data.menuOverlay ?? {};

    assert.ok(menu.back, `${locale}: menuOverlay.back missing`);
    assert.ok(menu.label, `${locale}: menuOverlay.label missing`);
    assert.ok(menu.brand, `${locale}: menuOverlay.brand missing`);
    assert.ok(menu.groups?.discover, `${locale}: menuOverlay.groups.discover missing`);
    assert.ok(menu.groups?.invest, `${locale}: menuOverlay.groups.invest missing`);
    assert.ok(menu.utility?.valuation, `${locale}: menuOverlay.utility.valuation missing`);
    assert.ok(menu.utility?.contact, `${locale}: menuOverlay.utility.contact missing`);
  }
});
