﻿/*
 Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.dialog.add("image2", function(e) {
	function D() {
		var a = this.getValue().match(E);
		(a = !(!a || 0 === parseInt(a[1], 10))) || alert(c.invalidLength.replace("%1", c[this.id]).replace("%2", "px"));
		return a
	}

	function O() {
		function a(a, b) {
			f.push(l.once(a, function(a) {
				for (var l; l = f.pop();) l.removeListener();
				b(a)
			}))
		}
		var l = t.createElement("img"),
			f = [];
		return function(f, b, c) {
			a("load", function() {
				var a = F(l);
				b.call(c, l, a.width, a.height)
			});
			a("error", function() {
				b(null)
			});
			a("abort", function() {
				b(null)
			});
			var e = -1 !== f.indexOf("?") ?
				"\x26" : "?";
			l.setAttribute("src", (x.baseHref || "") + f + e + Math.random().toString(16).substring(2))
		}
	}

	function G() {
		var a = this.getValue(),
			b = e.config.image2_defaultLockRatio,
			f = void 0 !== b;
            var c = 100;
            var d = 100;
		u(!1);
		a !== y.data.src ? (H(a, function(a, c, d) {
			u(!0);
			if (!a) return p(f ? b : !1);
			h.setValue(!1 === e.config.image2_prefillDimensions ? 0 : 500);
			k.setValue(!1 === e.config.image2_prefillDimensions ? 0 : 500);
			v = m = c;
			w = n = d;
			p(f ? b : I.checkHasNaturalRatio(a))
		}), q = !0) : q ? (u(!0), h.setValue(100), k.setValue(100), q = !1) : u(!0)
	}

	function J() {
		if (d) {
			var a = this.getValue();
			if (a && (a.match(E) || p(!1), "0" !== a)) {
				var b = "width" == this.id,
					f = m || v,
					c = n || w,
					a = b ? Math.round(a / f * c) : Math.round(a / c * f);
				isNaN(a) || (b ? k : h).setValue(a)
			}
		}
	}

	function p(a) {
		if (g) {
			if ("boolean" == typeof a) {
				if (z) return;
				d = a
			} else a = h.getValue(), z = !0, (d = !d) && a && (a *= n / m, isNaN(a) || k.setValue(Math.round(a)));
			g[d ? "removeClass" : "addClass"]("cke_btn_unlocked");
			g.setAttribute("aria-checked", d);
			CKEDITOR.env.hc && g.getChild(0).setHtml(d ? CKEDITOR.env.ie ? "■" : "▣" : CKEDITOR.env.ie ? "□" : "▢")
		}
	}

	function u(a) {
		a = a ? "enable" : "disable";
		h[a]();
		k[a]()
	}
	var E = /(^\s*(\d+)(px)?\s*$)|^$/i,
		K = CKEDITOR.tools.getNextId(),
		L = CKEDITOR.tools.getNextId(),
		b = e.lang.image2,
		c = e.lang.common,
		P = (new CKEDITOR.template('\x3cdiv\x3e\x3ca href\x3d"javascript:void(0)" tabindex\x3d"-1" title\x3d"' + b.lockRatio + '" class\x3d"cke_btn_locked" id\x3d"{lockButtonId}" role\x3d"checkbox"\x3e\x3cspan class\x3d"cke_icon"\x3e\x3c/span\x3e\x3cspan class\x3d"cke_label"\x3e' + b.lockRatio + '\x3c/span\x3e\x3c/a\x3e\x3ca href\x3d"javascript:void(0)" tabindex\x3d"-1" title\x3d"' + b.resetSize +
			'" class\x3d"cke_btn_reset" id\x3d"{resetButtonId}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3e' + b.resetSize + "\x3c/span\x3e\x3c/a\x3e\x3c/div\x3e")).output({
			lockButtonId: K,
			resetButtonId: L
		}),
		I = CKEDITOR.plugins.image2,
		x = e.config,
		A = !(!x.filebrowserImageBrowseUrl && !x.filebrowserBrowseUrl),
		B = e.widgets.registered.image.features,
		F = I.getNatural,
		t, y, M, H, m, n, v, w, q, d, z, g, r, h, k, C, N = [{
			id: "src",
			type: "text",
			label: c.url,
			onKeyup: G,
			onChange: G,
			setup: function(a) {
				this.setValue(a.data.src)
			},
			commit: function(a) {
				a.setData("src",
					this.getValue())
			},
			validate: CKEDITOR.dialog.validate.notEmpty(b.urlMissing)
		}];
	A && N.push({
		type: "button",
		id: "browse",
		style: "display:inline-block;margin-top:14px;",
		align: "center",
		label: e.lang.common.browseServer,
		hidden: !0,
		filebrowser: "info:src"
	});
	return {
		title: b.title,
		minWidth: 250,
		minHeight: 100,
		onLoad: function() {
			t = this._.element.getDocument();
			H = O()
		},
		onShow: function() {
			y = this.getModel();
			M = y.parts.image;
			q = z = d = !1;
			C = F(M);
			v = m = C.width;
			w = n = C.height
		},
		contents: [{
			id: "info",
			label: b.infoTab,
			elements: [{
				type: "vbox",
				padding: 0,
				children: [{
					type: "hbox",
					widths: ["100%"],
					className: "cke_dialog_image_url",
					children: N
				}]
			}, {
				id: "alt",
				type: "text",
				label: b.alt,
				setup: function(a) {
					this.setValue(a.data.alt)
				},
				commit: function(a) {
					a.setData("alt", this.getValue())
				},
				validate: !0 === e.config.image2_altRequired ? CKEDITOR.dialog.validate.notEmpty(b.altMissing) : null
			}, {
				type: "hbox",
				widths: ["25%", "25%", "50%"],
				requiredContent: B.dimension.requiredContent,
				children: [{
					type: "text",
					width: "45px",
					id: "width",
					label: c.width,
					validate: D,
					onKeyUp: J,
					onLoad: function() {
						h =
							this
					},
					setup: function(a) {
						this.setValue(a.data.width)
					},
					commit: function(a) {
						a.setData("width", this.getValue())
					}
				}, {
					type: "text",
					id: "height",
					width: "45px",
					label: c.height,
					validate: D,
					onKeyUp: J,
					onLoad: function() {
						k = this
					},
					setup: function(a) {
						this.setValue(a.data.height)
					},
					commit: function(a) {
						a.setData("height", this.getValue())
					}
				}, {
					id: "lock",
					type: "html",
					style: "margin-top:18px;width:40px;height:20px;",
					onLoad: function() {
						function a(a) {
							a.on("mouseover", function() {
								this.addClass("cke_btn_over")
							}, a);
							a.on("mouseout", function() {
									this.removeClass("cke_btn_over")
								},
								a)
						}
						var b = this.getDialog();
						g = t.getById(K);
						r = t.getById(L);
						g && (b.addFocusable(g, 4 + A), g.on("click", function(a) {
							p();
							a.data && a.data.preventDefault()
						}, this.getDialog()), a(g));
						r && (b.addFocusable(r, 5 + A), r.on("click", function(a) {
							q ? (h.setValue(v), k.setValue(w)) : (h.setValue(m), k.setValue(n));
							a.data && a.data.preventDefault()
						}, this), a(r))
					},
					setup: function(a) {
						p(a.data.lock)
					},
					commit: function(a) {
						a.setData("lock", d)
					},
					html: P
				}]
			}, {
				type: "hbox",
				id: "alignment",
				requiredContent: B.align.requiredContent,
				children: [{
					id: "align",
					type: "radio",
					items: [
						[c.alignNone, "none"],
						[c.left, "left"],
						[c.center, "center"],
						[c.right, "right"]
					],
					label: c.align,
					setup: function(a) {
						this.setValue(a.data.align)
					},
					commit: function(a) {
						a.setData("align", this.getValue())
					}
				}]
			}, {
				id: "hasCaption",
				type: "checkbox",
				label: b.captioned,
				requiredContent: B.caption.requiredContent,
				setup: function(a) {
					this.setValue(a.data.hasCaption)
				},
				commit: function(a) {
					a.setData("hasCaption", this.getValue())
				}
			}]
		}, {
			id: "Upload",
			hidden: !0,
			filebrowser: "uploadButton",
			label: b.uploadTab,
			elements: [{
				type: "file",
				id: "upload",
				label: b.btnUpload,
				style: "height:40px"
			}, {
				type: "fileButton",
				id: "uploadButton",
				filebrowser: "info:src",
				label: b.btnUpload,
				"for": ["Upload", "upload"]
			}]
		}]
	}
});