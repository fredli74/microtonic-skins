if (!this.skinChooser) {
	skinChooser = {
		width: 178,
		height: 192,
		contents: "",
		windowPosition: "",
		windowZOrder: "",
		folder: DIRS.SKINS,
		rescan: function rescan() {
			function encode(s) { return "@<" + composeNumbstrict(s).slice(1, -1) + "@>"; }
			var skins = [];
			function traverseDir(path) {
				var c = path[path.length - 1];
				if (c !== '/' && c !== '\\') {
					path += '/';
				}
				var files = dir(path);
				for (var i = 0; i < files.length; ++i) {
					var file = files[i];
					if (file.isDirectory) {
						traverseDir(path + file.name);
					} else if (file.name.slice(-7) === ".scskin") {
						var info = parseNumbstrict(load(path + file.name)).MicrotonicSkin;
						if (typeof info === "object") {
							info.dir = path;
							skins.push(info);
						}
					}
				}
			}
			traverseDir(DIRS.SKINS);
			skins.sort(function (a, b) {
				var aIsFactory = (a.name === "Factory");
				var bIsFactory = (b.name === "Factory");
				if (aIsFactory && bIsFactory) return 0;
				if (aIsFactory && !bIsFactory) return -1;
				if (bIsFactory && !aIsFactory) return 1;
				return a.name.localeCompare(b.name);
			});
			if (skins.length > 12) {
				skins.length = 12;
			}
			skinChooser.width = 178;
			skinChooser.contents = "";
			var cols = (skins.length > 4 && skins.length < 7 ? 3 : 4);
			var x = 10;
			var y = 12;
			var c = 0;
			for (var i = 0; i < skins.length; ++i) {
				var info = skins[i];
				if (c >= cols) {
					c = 0;
					x = 10;
					y += 168;
				}
				skinChooser.contents += "@skinChooser("
					+ x + ", "
					+ y + ", "
					+ encode(info.name) + ", "
					+ encode(info.version) + ", "
					+ encode(info.by) + ", "
					+ encode(info.url ? info.url : "") + ", "
					+ encode(info.dir + info.thumbnail) + ", "
					+ encode(info.name === "Factory" ? "" : info.dir) + ", "
					+ (info.format != 1 ? "yes" : "no") + ")\n";
				x += 168;
				skinChooser.width = Math.max(skinChooser.width, x + 2);
				++c;
			}
			skinChooser.height = y + 192;
		}
	}
};

skinChooser.rescan();
