if (BUILD.NUMBER < 874) {
    if (display("Skins are not supported by this Microtonic version. Do you want to go to https://soniccharge.com and download a newer version?", "question", "yes no") === "yes") {
        performCushyAction("launch", "https://soniccharge.com");
    }
} else if (!(function() { try { dir(DIRS.SKINS) } catch (x) { return false; }; return true; })()) {
    display('"Microtonic Skins" folder is missing.\n\nThe path to this folder is: ' + DIRS.SKINS);
} else {
    toggleCushy('SkinChooser.mtscript/SkinChooser_main');
}
