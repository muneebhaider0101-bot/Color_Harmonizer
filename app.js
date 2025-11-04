"use strict";

const hexToHsl = (hex) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
    } else if (hex.length === 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
    if (delta === 0) {
        h = 0;
    } else if (cmax === r) {
        h = ((g - b) / delta) % 6;
    } else if (cmax === g) {
        h = (b - r) / delta + 2;
    } else {
        h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    return [h, s, l];
};

const calculateHarmonies = (hsl) => {
    const [h, s, l] = hsl;
    const complementary = [(h + 180) % 360, s, l];
    const triadic1 = [(h + 120) % 360, s, l];
    const triadic2 = [(h + 240) % 360, s, l];
    return {
        complementary,
        triadic1,
        triadic2
    };
};

const hslToCss = (hsl) => {
    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
};

const updateColors = () => {
    const hexInput = document.getElementById("colorPicker").value;
    const baseHsl = hexToHsl(hexInput);
    const harmonies = calculateHarmonies(baseHsl);
    const baseCss = hslToCss(baseHsl);
    const complementaryCss = hslToCss(harmonies.complementary);
    const triadic1Css = hslToCss(harmonies.triadic1);
    const triadic2Css = hslToCss(harmonies.triadic2);
    document.getElementById("baseDisplay").style.backgroundColor = baseCss;
    document.getElementById("baseLabel").textContent = `Base: ${baseCss}`;
    document.getElementById("complementaryDisplay").style.backgroundColor = complementaryCss;
    document.getElementById("complementaryLabel").textContent = `Compl: ${complementaryCss}`;
    document.getElementById("triadic1Display").style.backgroundColor = triadic1Css;
    document.getElementById("triadic1Label").textContent = `Triad 1: ${triadic1Css}`;
    document.getElementById("triadic2Display").style.backgroundColor = triadic2Css;
    document.getElementById("triadic2Label").textContent = `Triad 2: ${triadic2Css}`;
};

document.addEventListener("DOMContentLoaded", updateColors);
document.getElementById("colorPicker").addEventListener("input", updateColors);