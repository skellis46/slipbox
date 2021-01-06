'use strict';

var obsidian = require('obsidian');
var originalFs = require('original-fs');
var path = require('path');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var SearchModal = /** @class */ (function (_super) {
    __extends(SearchModal, _super);
    function SearchModal(app, plugin) {
        var _this = _super.call(this, app) || this;
        _this.limit = 50;
        _this.plugin = plugin;
        return _this;
        // this.inputEl.addEventListener("keyup", (ev) => this.onInputKeyup(ev))
    }
    SearchModal.prototype.getItems = function () {
        return Object.values(this.plugin.library);
    };
    SearchModal.prototype.getItemText = function (item) {
        return item.title + " " + item.authorString + " " + item.year;
    };
    SearchModal.prototype.onChooseItem = function (item, evt) {
        this.plugin.openLiteratureNote(item.id, false);
    };
    SearchModal.prototype.renderSuggestion = function (match, el) {
        el.empty();
        var entry = match.item;
        var container = el.createEl("div", { cls: "zoteroResult" });
        container.createEl("span", { cls: "zoteroTitle", text: entry.title });
        container.createEl("span", { cls: "zoteroCitekey", text: entry.id });
        var authorsCls = entry.authors ? "zoteroAuthors" : "zoteroAuthors zoteroAuthorsEmpty";
        container.createEl("span", { cls: authorsCls, text: entry.authorString });
    };
    return SearchModal;
}(obsidian.FuzzySuggestModal));
var OpenNoteModal = /** @class */ (function (_super) {
    __extends(OpenNoteModal, _super);
    function OpenNoteModal(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.setInstructions([
            { command: "↑↓", purpose: "to navigate" },
            { command: "↵", purpose: "to open literature note" },
            // {command: "ctrl ↵", purpose: "to open literature note in a new pane"},
            { command: "esc", purpose: "to dismiss" },
        ]);
        return _this;
    }
    OpenNoteModal.prototype.onChooseItem = function (item, evt) {
        var newPane = evt instanceof KeyboardEvent && evt.ctrlKey;
        this.plugin.openLiteratureNote(item.id, newPane);
    };
    return OpenNoteModal;
}(SearchModal));
var InsertCitationModal = /** @class */ (function (_super) {
    __extends(InsertCitationModal, _super);
    function InsertCitationModal(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.setInstructions([
            { command: "↑↓", purpose: "to navigate" },
            { command: "↵", purpose: "to insert literature note reference" },
            { command: "esc", purpose: "to dismiss" },
        ]);
        return _this;
    }
    InsertCitationModal.prototype.onChooseItem = function (item, evt) {
        this.plugin.insertLiteratureNoteLink(item.id);
    };
    return InsertCitationModal;
}(SearchModal));

var CitationsPluginSettings = /** @class */ (function () {
    function CitationsPluginSettings() {
        this.literatureNoteTitleTemplate = "@{{citekey}}";
        this.literatureNoteFolder = "Reading notes";
        this.literatureNoteContentTemplate = "---\n" +
            "title: {{title}}\n" +
            "authors: {{authorString}}\n" +
            "year: {{year}}\n" +
            "---\n\n";
    }
    return CitationsPluginSettings;
}());
var CitationSettingTab = /** @class */ (function (_super) {
    __extends(CitationSettingTab, _super);
    function CitationSettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    CitationSettingTab.prototype.addTextChangeCallback = function (component, settingsKey, cb) {
        var _this = this;
        component.onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.plugin.settings[settingsKey] = value;
                this.plugin.saveSettings().then(function () {
                    if (cb) {
                        cb(value);
                    }
                });
                return [2 /*return*/];
            });
        }); });
    };
    CitationSettingTab.prototype.buildTextInput = function (component, settingsKey, cb) {
        component.setValue(this.plugin.settings[settingsKey]);
        this.addTextChangeCallback(component, settingsKey, cb);
    };
    CitationSettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Citation plugin settings' });
        // NB: we force reload of the library on path change.
        new obsidian.Setting(containerEl)
            .setName("Citation export path")
            .addText(function (input) { return _this.buildTextInput(input.setPlaceholder("/path/to/export.json"), "citationExportPath", function (_) { return _this.plugin.loadLibrary(); }); });
        containerEl.createEl("h3", { text: "Literature note settings" });
        new obsidian.Setting(containerEl)
            .setName("Literature note title template")
            .addText(function (input) { return _this.buildTextInput(input, "literatureNoteTitleTemplate"); })
            .setDesc("Available placeholders: {{citekey}}, {{title}}, {{authorString}}, {{year}}");
        new obsidian.Setting(containerEl)
            .setName("Literature note folder")
            .addText(function (input) { return _this.buildTextInput(input, "literatureNoteFolder"); })
            .setDesc("Save literature note files in this folder within your vault. If empty, notes will be stored in the root directory of the vault.");
        new obsidian.Setting(containerEl)
            .setName("Literature note content template")
            .addTextArea(function (input) { return _this.buildTextInput(input, "literatureNoteContentTemplate"); })
            .setDesc("Available placeholders: {{citekey}}, {{title}}, {{authorString}}, {{year}}");
    };
    return CitationSettingTab;
}(obsidian.PluginSettingTab));

var Entry = /** @class */ (function () {
    function Entry(data) {
        this.data = data;
    }
    Object.defineProperty(Entry.prototype, "id", {
        get: function () { return this.data.id; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entry.prototype, "title", {
        get: function () { return this.data.title; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entry.prototype, "authors", {
        get: function () { return this.data.author; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entry.prototype, "authorString", {
        get: function () {
            return this.data.author
                ? this.data.author.map(function (a) { return a.given + " " + a.family; }).join(", ")
                : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entry.prototype, "year", {
        get: function () {
            if (this.data.issued && this.data.issued["date-parts"]
                && this.data.issued["date-parts"][0].length > 0)
                return this.data.issued["date-parts"][0][0];
            return null;
        },
        enumerable: false,
        configurable: true
    });
    return Entry;
}());

function formatTemplate(template, environment) {
    return template.replace(/{{([\w_]+)}}/g, function (match, key) {
        if (key in environment) {
            return environment[key];
        }
        return "(Unknown template variable " + key + ")";
    });
}

var CitationPlugin = /** @class */ (function (_super) {
    __extends(CitationPlugin, _super);
    function CitationPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.library = {};
        return _this;
    }
    Object.defineProperty(CitationPlugin.prototype, "editor", {
        get: function () {
            var view = this.app.workspace.activeLeaf.view;
            if (!(view instanceof obsidian.MarkdownView))
                return null;
            var sourceView = view.sourceMode;
            return sourceView.cmEditor;
        },
        enumerable: false,
        configurable: true
    });
    CitationPlugin.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadedSettings, toLoad;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.settings = new CitationsPluginSettings();
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        loadedSettings = _a.sent();
                        if (!loadedSettings)
                            return [2 /*return*/];
                        toLoad = ["citationExportPath", "literatureNoteTitleTemplate",
                            "literatureNoteFolder", "literatureNoteContentTemplate"];
                        toLoad.forEach(function (setting) {
                            if (setting in loadedSettings) {
                                _this.settings[setting] = loadedSettings[setting];
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CitationPlugin.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CitationPlugin.prototype.onload = function () {
        var _this = this;
        this.loadSettings().then(function () { return _this.init(); });
    };
    CitationPlugin.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.settings.citationExportPath) {
                    // Load library for the first time
                    this.loadLibrary();
                    // Set up a watcher to refresh whenever the export is updated
                    //
                    // TODO this gets triggered a lot when the library is re-exported, with
                    // "evt" always "change". Fine to just wastefully respond every time,
                    // from what I can see
                    originalFs.watch(this.settings.citationExportPath, function (evt) {
                        _this.loadLibrary();
                    });
                }
                this.addCommand({
                    id: "open-literature-note",
                    name: "Open literature note",
                    hotkeys: [
                        { modifiers: ["Ctrl", "Shift"], key: "o" },
                    ],
                    callback: function () {
                        var modal = new OpenNoteModal(_this.app, _this);
                        modal.open();
                    }
                });
                this.addCommand({
                    id: "insert-citation",
                    name: "Insert citation",
                    hotkeys: [
                        { modifiers: ["Ctrl", "Shift"], key: "e" },
                    ],
                    callback: function () {
                        var modal = new InsertCitationModal(_this.app, _this);
                        modal.open();
                    }
                });
                this.addSettingTab(new CitationSettingTab(this.app, this));
                return [2 /*return*/];
            });
        });
    };
    CitationPlugin.prototype.loadLibrary = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.debug("Citation plugin: Reloading library");
                if (this.settings.citationExportPath) {
                    obsidian.FileSystemAdapter.readLocalFile(this.settings.citationExportPath).then(function (buffer) { return _this.onLibraryUpdate(buffer); });
                }
                else {
                    console.warn("Citations plugin: citation export path is not set. Please update plugin settings.");
                }
                return [2 /*return*/];
            });
        });
    };
    CitationPlugin.prototype.onLibraryUpdate = function (libraryBuffer) {
        // Decode file as UTF-8
        var dataView = new DataView(libraryBuffer);
        var decoder = new TextDecoder("utf8");
        var value = decoder.decode(dataView);
        var libraryArray = JSON.parse(value);
        // Index by citekey
        this.library = Object.fromEntries(libraryArray.map(function (entryData) { return [entryData.id, new Entry(entryData)]; }));
    };
    CitationPlugin.prototype.onunload = function () {
        console.log('unloading plugin');
    };
    CitationPlugin.prototype.getTitleForCitekey = function (citekey) {
        var entry = this.library[citekey];
        return formatTemplate(this.settings.literatureNoteTitleTemplate, {
            citekey: citekey,
            title: entry.title,
            authorString: entry.authorString,
            year: entry.year.toString()
        });
    };
    CitationPlugin.prototype.getPathForCitekey = function (citekey) {
        var title = this.getTitleForCitekey(citekey);
        // TODO escape note title
        return path.join(this.settings.literatureNoteFolder, title + ".md");
    };
    CitationPlugin.prototype.getInitialContentForCitekey = function (citekey) {
        var entry = this.library[citekey];
        return formatTemplate(this.settings.literatureNoteContentTemplate, {
            citekey: citekey,
            title: entry.title,
            authorString: entry.authorString,
            year: entry.year.toString()
        });
    };
    CitationPlugin.prototype.getOrCreateLiteratureNoteFile = function (citekey) {
        return __awaiter(this, void 0, void 0, function () {
            var path, file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.getPathForCitekey(citekey), file = this.app.vault.getAbstractFileByPath(obsidian.normalizePath(path));
                        if (!(file == null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.app.vault.create(path, this.getInitialContentForCitekey(citekey))];
                    case 1:
                        file = _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, file];
                }
            });
        });
    };
    CitationPlugin.prototype.openLiteratureNote = function (citekey, newPane) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.getOrCreateLiteratureNoteFile(citekey).then(function (file) {
                    _this.app.workspace.getLeaf(newPane).openFile(file);
                });
                return [2 /*return*/];
            });
        });
    };
    CitationPlugin.prototype.insertLiteratureNoteLink = function (citekey) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.getOrCreateLiteratureNoteFile(citekey).then(function (file) {
                    // TODO what is the API for this?
                    console.log(_this.app.workspace.activeLeaf);
                    var title = _this.getTitleForCitekey(citekey), linkText = "[[" + title + "]]";
                    // console.log(this.app.metadataCache.fileToLinktext(file, this.app.vault.getRoot().path, true))
                    _this.editor.replaceRange(linkText, _this.editor.getCursor());
                });
                return [2 /*return*/];
            });
        });
    };
    return CitationPlugin;
}(obsidian.Plugin));

module.exports = CitationPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9tb2RhbHMudHMiLCJzcmMvc2V0dGluZ3MudHMiLCJzcmMvdHlwZXMudHMiLCJzcmMvdXRpbC50cyIsInNyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHByaXZhdGVNYXApIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlTWFwLnNldChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiIsImltcG9ydCB7IEFwcCwgRnV6enlNYXRjaCwgRnV6enlTdWdnZXN0TW9kYWwgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCBDaXRhdGlvblBsdWdpbiBmcm9tIFwiLi9tYWluXCI7XG5pbXBvcnQgeyBFbnRyeSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNsYXNzIFNlYXJjaE1vZGFsIGV4dGVuZHMgRnV6enlTdWdnZXN0TW9kYWw8RW50cnk+IHtcblx0cGx1Z2luOiBDaXRhdGlvblBsdWdpbjtcblx0bGltaXQgPSA1MDtcblxuXHRnZXRJdGVtcygpOiBFbnRyeVtdIHtcblx0XHRyZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLnBsdWdpbi5saWJyYXJ5KTtcblx0fVxuXG5cdGdldEl0ZW1UZXh0KGl0ZW06IEVudHJ5KTogc3RyaW5nIHtcblx0XHRyZXR1cm4gYCR7aXRlbS50aXRsZX0gJHtpdGVtLmF1dGhvclN0cmluZ30gJHtpdGVtLnllYXJ9YFxuXHR9XG5cblx0b25DaG9vc2VJdGVtKGl0ZW06IEVudHJ5LCBldnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG5cdFx0dGhpcy5wbHVnaW4ub3BlbkxpdGVyYXR1cmVOb3RlKGl0ZW0uaWQsIGZhbHNlKTtcblx0fVxuXG4gIHJlbmRlclN1Z2dlc3Rpb24obWF0Y2g6IEZ1enp5TWF0Y2g8RW50cnk+LCBlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcblx0XHRlbC5lbXB0eSgpO1xuXHRcdGxldCBlbnRyeSA9IG1hdGNoLml0ZW07XG5cblx0XHRsZXQgY29udGFpbmVyID0gZWwuY3JlYXRlRWwoXCJkaXZcIiwge2NsczogXCJ6b3Rlcm9SZXN1bHRcIn0pO1xuXHRcdGNvbnRhaW5lci5jcmVhdGVFbChcInNwYW5cIiwge2NsczogXCJ6b3Rlcm9UaXRsZVwiLCB0ZXh0OiBlbnRyeS50aXRsZX0pO1xuXHRcdGNvbnRhaW5lci5jcmVhdGVFbChcInNwYW5cIiwge2NsczogXCJ6b3Rlcm9DaXRla2V5XCIsIHRleHQ6IGVudHJ5LmlkfSk7XG5cbiAgICBsZXQgYXV0aG9yc0NscyA9IGVudHJ5LmF1dGhvcnMgPyBcInpvdGVyb0F1dGhvcnNcIiA6IFwiem90ZXJvQXV0aG9ycyB6b3Rlcm9BdXRob3JzRW1wdHlcIjtcblx0XHRjb250YWluZXIuY3JlYXRlRWwoXCJzcGFuXCIsIHtjbHM6IGF1dGhvcnNDbHMsIHRleHQ6IGVudHJ5LmF1dGhvclN0cmluZ30pO1xuICB9XG5cblx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogQ2l0YXRpb25QbHVnaW4pIHtcblx0XHRzdXBlcihhcHApO1xuXHRcdHRoaXMucGx1Z2luID0gcGx1Z2luO1xuXG5cdFx0Ly8gdGhpcy5pbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZXYpID0+IHRoaXMub25JbnB1dEtleXVwKGV2KSlcblx0fVxuXG5cdC8vIFRPRE8gbmVlZCB0byBnZXQgY3VycmVudGx5IHNlbGVjdGVkIG5vdGVcblx0Ly8gb25JbnB1dEtleXVwKGV2OiBLZXlib2FyZEV2ZW50KSB7XG5cdC8vIFx0aWYgKGV2LmtleSA9PSBcIkVudGVyXCIpIHtcblx0Ly8gXHRcdGxldCBuZXdQYW5lID0gZXYuY3RybEtleTtcblx0Ly8gXHRcdC8vIFRPRE8gZ2V0IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgbm90ZVxuXHQvLyBcdFx0dGhpcy5wbHVnaW4ub3BlbkxpdGVyYXR1cmVOb3RlKFwiYWJcIiwgbmV3UGFuZSlcblx0Ly8gXHR9XG5cdC8vIH1cbn1cblxuZXhwb3J0IGNsYXNzIE9wZW5Ob3RlTW9kYWwgZXh0ZW5kcyBTZWFyY2hNb2RhbCB7XG4gIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IENpdGF0aW9uUGx1Z2luKSB7XG4gICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xuXG4gICAgdGhpcy5zZXRJbnN0cnVjdGlvbnMoW1xuXHRcdFx0e2NvbW1hbmQ6IFwi4oaR4oaTXCIsIHB1cnBvc2U6IFwidG8gbmF2aWdhdGVcIn0sXG5cdFx0XHR7Y29tbWFuZDogXCLihrVcIiwgcHVycG9zZTogXCJ0byBvcGVuIGxpdGVyYXR1cmUgbm90ZVwifSxcblx0XHRcdC8vIHtjb21tYW5kOiBcImN0cmwg4oa1XCIsIHB1cnBvc2U6IFwidG8gb3BlbiBsaXRlcmF0dXJlIG5vdGUgaW4gYSBuZXcgcGFuZVwifSxcblx0XHRcdHtjb21tYW5kOiBcImVzY1wiLCBwdXJwb3NlOiBcInRvIGRpc21pc3NcIn0sXG5cdFx0XSlcbiAgfVxuXG5cdG9uQ2hvb3NlSXRlbShpdGVtOiBFbnRyeSwgZXZ0OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuXHRcdGxldCBuZXdQYW5lID0gZXZ0IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCAmJiAoZXZ0IGFzIEtleWJvYXJkRXZlbnQpLmN0cmxLZXk7XG5cdFx0dGhpcy5wbHVnaW4ub3BlbkxpdGVyYXR1cmVOb3RlKGl0ZW0uaWQsIG5ld1BhbmUpXG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIEluc2VydENpdGF0aW9uTW9kYWwgZXh0ZW5kcyBTZWFyY2hNb2RhbCB7XG4gIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IENpdGF0aW9uUGx1Z2luKSB7XG4gICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xuXG4gICAgdGhpcy5zZXRJbnN0cnVjdGlvbnMoW1xuXHRcdFx0e2NvbW1hbmQ6IFwi4oaR4oaTXCIsIHB1cnBvc2U6IFwidG8gbmF2aWdhdGVcIn0sXG5cdFx0XHR7Y29tbWFuZDogXCLihrVcIiwgcHVycG9zZTogXCJ0byBpbnNlcnQgbGl0ZXJhdHVyZSBub3RlIHJlZmVyZW5jZVwifSxcblx0XHRcdHtjb21tYW5kOiBcImVzY1wiLCBwdXJwb3NlOiBcInRvIGRpc21pc3NcIn0sXG5cdFx0XSlcbiAgfVxuXG5cdG9uQ2hvb3NlSXRlbShpdGVtOiBFbnRyeSwgZXZ0OiBhbnkpOiB2b2lkIHtcblx0XHR0aGlzLnBsdWdpbi5pbnNlcnRMaXRlcmF0dXJlTm90ZUxpbmsoaXRlbS5pZCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IEFic3RyYWN0VGV4dENvbXBvbmVudCwgQXBwLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgQ2l0YXRpb25QbHVnaW4gZnJvbSBcIi4vbWFpblwiO1xuXG4vLyBUcmljazogYWxsb3cgc3RyaW5nIGluZGV4aW5nIG9udG8gb2JqZWN0IHByb3BlcnRpZXNcbmV4cG9ydCBpbnRlcmZhY2UgSUluZGV4YWJsZSB7XG5cdFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIENpdGF0aW9uc1BsdWdpblNldHRpbmdzIHtcblx0cHVibGljIGNpdGF0aW9uRXhwb3J0UGF0aDogc3RyaW5nO1xuXG5cdGxpdGVyYXR1cmVOb3RlVGl0bGVUZW1wbGF0ZTogc3RyaW5nID0gXCJAe3tjaXRla2V5fX1cIjtcblx0bGl0ZXJhdHVyZU5vdGVGb2xkZXI6IHN0cmluZyA9IFwiUmVhZGluZyBub3Rlc1wiO1xuXHRsaXRlcmF0dXJlTm90ZUNvbnRlbnRUZW1wbGF0ZTogc3RyaW5nID0gXCItLS1cXG5cIiArXG5cdFx0XCJ0aXRsZToge3t0aXRsZX19XFxuXCIgK1xuXHRcdFwiYXV0aG9yczoge3thdXRob3JTdHJpbmd9fVxcblwiICtcblx0XHRcInllYXI6IHt7eWVhcn19XFxuXCIgK1xuXHRcdFwiLS0tXFxuXFxuXCI7XG5cdFx0XG59XG5cblxuZXhwb3J0IGNsYXNzIENpdGF0aW9uU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuXG5cdHByaXZhdGUgcGx1Z2luOiBDaXRhdGlvblBsdWdpbjtcblxuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBDaXRhdGlvblBsdWdpbikge1xuXHRcdHN1cGVyKGFwcCwgcGx1Z2luKTtcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcblx0fVxuXG5cdGFkZFRleHRDaGFuZ2VDYWxsYmFjayhjb21wb25lbnQ6IEFic3RyYWN0VGV4dENvbXBvbmVudDxhbnk+LCBzZXR0aW5nc0tleTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2I/OiAoKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQpKTogdm9pZCB7XG5cdFx0Y29tcG9uZW50Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0KHRoaXMucGx1Z2luLnNldHRpbmdzIGFzIElJbmRleGFibGUpW3NldHRpbmdzS2V5XSA9IHZhbHVlO1xuICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCkudGhlbigoKSA9PiB7XG4gICAgICAgIGlmIChjYikge1xuICAgICAgICAgIGNiKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSlcblx0XHR9KVxuXHR9XG5cblx0YnVpbGRUZXh0SW5wdXQoY29tcG9uZW50OiBBYnN0cmFjdFRleHRDb21wb25lbnQ8YW55Piwgc2V0dGluZ3NLZXk6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgY2I/OiAoKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQpKTogdm9pZCB7XG5cdFx0Y29tcG9uZW50LnNldFZhbHVlKCh0aGlzLnBsdWdpbi5zZXR0aW5ncyBhcyBJSW5kZXhhYmxlKVtzZXR0aW5nc0tleV0pO1xuXHRcdHRoaXMuYWRkVGV4dENoYW5nZUNhbGxiYWNrKGNvbXBvbmVudCwgc2V0dGluZ3NLZXksIGNiKTtcblx0fVxuXG5cdGRpc3BsYXkoKTogdm9pZCB7XG5cdFx0bGV0IHtjb250YWluZXJFbH0gPSB0aGlzO1xuXG5cdFx0Y29udGFpbmVyRWwuZW1wdHkoKTtcblxuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdoMicsIHt0ZXh0OiAnQ2l0YXRpb24gcGx1Z2luIHNldHRpbmdzJ30pO1xuXG4gICAgLy8gTkI6IHdlIGZvcmNlIHJlbG9hZCBvZiB0aGUgbGlicmFyeSBvbiBwYXRoIGNoYW5nZS5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdFx0LnNldE5hbWUoXCJDaXRhdGlvbiBleHBvcnQgcGF0aFwiKVxuXHRcdFx0XHQuYWRkVGV4dChpbnB1dCA9PiB0aGlzLmJ1aWxkVGV4dElucHV0KFxuICAgICAgICAgIGlucHV0LnNldFBsYWNlaG9sZGVyKFwiL3BhdGgvdG8vZXhwb3J0Lmpzb25cIiksXG4gICAgICAgICAgXCJjaXRhdGlvbkV4cG9ydFBhdGhcIixcbiAgICAgICAgICAoXykgPT4gdGhpcy5wbHVnaW4ubG9hZExpYnJhcnkoKSkpO1xuXG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoXCJoM1wiLCB7dGV4dDogXCJMaXRlcmF0dXJlIG5vdGUgc2V0dGluZ3NcIn0pO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZShcIkxpdGVyYXR1cmUgbm90ZSB0aXRsZSB0ZW1wbGF0ZVwiKVxuXHRcdFx0LmFkZFRleHQoaW5wdXQgPT4gdGhpcy5idWlsZFRleHRJbnB1dChpbnB1dCwgXCJsaXRlcmF0dXJlTm90ZVRpdGxlVGVtcGxhdGVcIikpXG5cdFx0XHQuc2V0RGVzYyhcIkF2YWlsYWJsZSBwbGFjZWhvbGRlcnM6IHt7Y2l0ZWtleX19LCB7e3RpdGxlfX0sIHt7YXV0aG9yU3RyaW5nfX0sIHt7eWVhcn19XCIpXG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKFwiTGl0ZXJhdHVyZSBub3RlIGZvbGRlclwiKVxuXHRcdFx0LmFkZFRleHQoaW5wdXQgPT4gdGhpcy5idWlsZFRleHRJbnB1dChpbnB1dCwgXCJsaXRlcmF0dXJlTm90ZUZvbGRlclwiKSlcblx0XHRcdC5zZXREZXNjKFwiU2F2ZSBsaXRlcmF0dXJlIG5vdGUgZmlsZXMgaW4gdGhpcyBmb2xkZXIgd2l0aGluIHlvdXIgdmF1bHQuIElmIGVtcHR5LCBub3RlcyB3aWxsIGJlIHN0b3JlZCBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhlIHZhdWx0LlwiKTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoXCJMaXRlcmF0dXJlIG5vdGUgY29udGVudCB0ZW1wbGF0ZVwiKVxuXHRcdFx0LmFkZFRleHRBcmVhKGlucHV0ID0+IHRoaXMuYnVpbGRUZXh0SW5wdXQoaW5wdXQsIFwibGl0ZXJhdHVyZU5vdGVDb250ZW50VGVtcGxhdGVcIikpXG5cdFx0XHQuc2V0RGVzYyhcIkF2YWlsYWJsZSBwbGFjZWhvbGRlcnM6IHt7Y2l0ZWtleX19LCB7e3RpdGxlfX0sIHt7YXV0aG9yU3RyaW5nfX0sIHt7eWVhcn19XCIpXG5cdH1cbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgQXV0aG9yIHtcblx0Z2l2ZW4/OiBzdHJpbmcsXG5cdGZhbWlseT86IHN0cmluZ1xufVxuXG4vLyBFbnRyeSBkYXRhIGF2YWlsYWJsZSBpbiBKU09OIGV4cG9ydFxuZXhwb3J0IGludGVyZmFjZSBFbnRyeURhdGEge1xuXHRpZDogc3RyaW5nLFxuXHR0aXRsZT86IHN0cmluZyxcblx0YXV0aG9yPzogQXV0aG9yW10sXG5cdGlzc3VlZD86IHtcImRhdGUtcGFydHNcIjogW2FueVtdXX1cbn1cblxuZXhwb3J0IGNsYXNzIEVudHJ5IHtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGE6IEVudHJ5RGF0YSkgeyB9XG5cblx0Z2V0IGlkKCkgeyByZXR1cm4gdGhpcy5kYXRhLmlkOyB9XG5cdGdldCB0aXRsZSgpIHsgcmV0dXJuIHRoaXMuZGF0YS50aXRsZTsgfVxuXHRnZXQgYXV0aG9ycygpOiBBdXRob3JbXSB7IHJldHVybiB0aGlzLmRhdGEuYXV0aG9yOyB9XG5cblx0Z2V0IGF1dGhvclN0cmluZygpOiBzdHJpbmcgfCBudWxsIHtcblx0XHRyZXR1cm4gdGhpcy5kYXRhLmF1dGhvclxuXHRcdFx0PyB0aGlzLmRhdGEuYXV0aG9yLm1hcChhID0+IGAke2EuZ2l2ZW59ICR7YS5mYW1pbHl9YCkuam9pbihcIiwgXCIpXG5cdFx0XHQ6IG51bGw7XG5cdH1cblxuXHRnZXQgeWVhcigpOiBudW1iZXIgfCBudWxsIHtcblx0XHRpZiAodGhpcy5kYXRhLmlzc3VlZCAmJiB0aGlzLmRhdGEuaXNzdWVkW1wiZGF0ZS1wYXJ0c1wiXVxuXHRcdFx0ICAmJiB0aGlzLmRhdGEuaXNzdWVkW1wiZGF0ZS1wYXJ0c1wiXVswXS5sZW5ndGggPiAwKVxuXHRcdFx0cmV0dXJuIHRoaXMuZGF0YS5pc3N1ZWRbXCJkYXRlLXBhcnRzXCJdWzBdWzBdO1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBmb3JtYXRUZW1wbGF0ZSh0ZW1wbGF0ZTogc3RyaW5nLCBlbnZpcm9ubWVudDoge1trZXk6IHN0cmluZ106IHN0cmluZ30pOiBzdHJpbmcge1xuICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZSgve3soW1xcd19dKyl9fS9nLCBmdW5jdGlvbihtYXRjaCwga2V5KSB7XG4gICAgaWYgKGtleSBpbiBlbnZpcm9ubWVudCkge1xuICAgICAgcmV0dXJuIGVudmlyb25tZW50W2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGAoVW5rbm93biB0ZW1wbGF0ZSB2YXJpYWJsZSAke2tleX0pYDtcbiAgfSlcbn1cbiIsImltcG9ydCB7IEFwcCwgRmlsZVN5c3RlbUFkYXB0ZXIsIE1hcmtkb3duU291cmNlVmlldywgTWFya2Rvd25WaWV3LCBub3JtYWxpemVQYXRoLCBQbHVnaW4sIFRGaWxlIH0gZnJvbSAnb2JzaWRpYW4nO1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHsgd2F0Y2ggfSBmcm9tICdvcmlnaW5hbC1mcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgSW5zZXJ0Q2l0YXRpb25Nb2RhbCwgT3Blbk5vdGVNb2RhbCB9IGZyb20gJy4vbW9kYWxzJztcblxuaW1wb3J0IHsgQ2l0YXRpb25zUGx1Z2luU2V0dGluZ3MsIENpdGF0aW9uU2V0dGluZ1RhYiwgSUluZGV4YWJsZSB9IGZyb20gJy4vc2V0dGluZ3MnO1xuaW1wb3J0IHsgRW50cnksIEVudHJ5RGF0YSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgZm9ybWF0VGVtcGxhdGUgfSBmcm9tICcuL3V0aWwnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpdGF0aW9uUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcblx0c2V0dGluZ3M6IENpdGF0aW9uc1BsdWdpblNldHRpbmdzO1xuXHRsaWJyYXJ5OiB7W2lkOiBzdHJpbmddOiBFbnRyeX0gPSB7fTtcblxuXHRnZXQgZWRpdG9yKCk6IENvZGVNaXJyb3IuRWRpdG9yIHtcblx0XHRsZXQgdmlldyA9IHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmLnZpZXc7XG5cdFx0aWYgKCEodmlldyBpbnN0YW5jZW9mIE1hcmtkb3duVmlldykpXG5cdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdGxldCBzb3VyY2VWaWV3ID0gdmlldy5zb3VyY2VNb2RlO1xuXHRcdHJldHVybiAoc291cmNlVmlldyBhcyBNYXJrZG93blNvdXJjZVZpZXcpLmNtRWRpdG9yO1xuXHR9XG5cblx0YXN5bmMgbG9hZFNldHRpbmdzKCkge1xuXHRcdHRoaXMuc2V0dGluZ3MgPSBuZXcgQ2l0YXRpb25zUGx1Z2luU2V0dGluZ3MoKTtcblxuXHRcdGNvbnN0IGxvYWRlZFNldHRpbmdzID0gYXdhaXQgdGhpcy5sb2FkRGF0YSgpO1xuXHRcdGlmICghbG9hZGVkU2V0dGluZ3MpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRjb25zdCB0b0xvYWQgPSBbXCJjaXRhdGlvbkV4cG9ydFBhdGhcIiwgXCJsaXRlcmF0dXJlTm90ZVRpdGxlVGVtcGxhdGVcIixcblx0XHRcdFx0XHRcdFx0XHRcdCAgXCJsaXRlcmF0dXJlTm90ZUZvbGRlclwiLCBcImxpdGVyYXR1cmVOb3RlQ29udGVudFRlbXBsYXRlXCJdXG5cdFx0dG9Mb2FkLmZvckVhY2goc2V0dGluZyA9PiB7XG5cdFx0XHRpZiAoc2V0dGluZyBpbiBsb2FkZWRTZXR0aW5ncykge1xuXHRcdFx0XHQodGhpcy5zZXR0aW5ncyBhcyBJSW5kZXhhYmxlKVtzZXR0aW5nXSA9IGxvYWRlZFNldHRpbmdzW3NldHRpbmddO1xuXHRcdFx0fVxuXHRcdH0pXG5cdH1cblxuXHRhc3luYyBzYXZlU2V0dGluZ3MoKSB7XG5cdFx0YXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcblx0fVxuXG5cdG9ubG9hZCgpIHtcblx0XHR0aGlzLmxvYWRTZXR0aW5ncygpLnRoZW4oKCkgPT4gdGhpcy5pbml0KCkpO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5jaXRhdGlvbkV4cG9ydFBhdGgpIHtcblx0XHRcdC8vIExvYWQgbGlicmFyeSBmb3IgdGhlIGZpcnN0IHRpbWVcblx0XHRcdHRoaXMubG9hZExpYnJhcnkoKTtcblxuXHRcdFx0Ly8gU2V0IHVwIGEgd2F0Y2hlciB0byByZWZyZXNoIHdoZW5ldmVyIHRoZSBleHBvcnQgaXMgdXBkYXRlZFxuXHRcdFx0Ly9cblx0XHRcdC8vIFRPRE8gdGhpcyBnZXRzIHRyaWdnZXJlZCBhIGxvdCB3aGVuIHRoZSBsaWJyYXJ5IGlzIHJlLWV4cG9ydGVkLCB3aXRoXG5cdFx0XHQvLyBcImV2dFwiIGFsd2F5cyBcImNoYW5nZVwiLiBGaW5lIHRvIGp1c3Qgd2FzdGVmdWxseSByZXNwb25kIGV2ZXJ5IHRpbWUsXG5cdFx0XHQvLyBmcm9tIHdoYXQgSSBjYW4gc2VlXG5cdFx0XHR3YXRjaCh0aGlzLnNldHRpbmdzLmNpdGF0aW9uRXhwb3J0UGF0aCwgKGV2dDogc3RyaW5nKSA9PiB7XG5cdFx0XHRcdHRoaXMubG9hZExpYnJhcnkoKTtcblx0XHRcdH0pXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIFRPRE8gc2hvdyB3YXJuaW5nP1xuXHRcdH1cblxuXG5cblx0XHR0aGlzLmFkZENvbW1hbmQoe1xuXHRcdFx0aWQ6IFwib3Blbi1saXRlcmF0dXJlLW5vdGVcIixcblx0XHRcdG5hbWU6IFwiT3BlbiBsaXRlcmF0dXJlIG5vdGVcIixcblx0XHRcdGhvdGtleXM6IFtcblx0XHRcdFx0e21vZGlmaWVyczogW1wiQ3RybFwiLCBcIlNoaWZ0XCJdLCBrZXk6IFwib1wifSxcblx0XHRcdF0sXG5cdFx0XHRjYWxsYmFjazogKCkgPT4ge1xuXHRcdFx0XHRsZXQgbW9kYWwgPSBuZXcgT3Blbk5vdGVNb2RhbCh0aGlzLmFwcCwgdGhpcyk7XG5cdFx0XHRcdG1vZGFsLm9wZW4oKTtcblx0XHRcdH1cblx0XHR9KVxuXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcblx0XHRcdGlkOiBcImluc2VydC1jaXRhdGlvblwiLFxuXHRcdFx0bmFtZTogXCJJbnNlcnQgY2l0YXRpb25cIixcblx0XHRcdGhvdGtleXM6IFtcblx0XHRcdFx0e21vZGlmaWVyczogW1wiQ3RybFwiLCBcIlNoaWZ0XCJdLCBrZXk6IFwiZVwifSxcblx0XHRcdF0sXG5cdFx0XHRjYWxsYmFjazogKCkgPT4ge1xuXHRcdFx0XHRsZXQgbW9kYWwgPSBuZXcgSW5zZXJ0Q2l0YXRpb25Nb2RhbCh0aGlzLmFwcCwgdGhpcyk7XG5cdFx0XHRcdG1vZGFsLm9wZW4oKTtcblx0XHRcdH1cblx0XHR9KVxuXG5cdFx0dGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBDaXRhdGlvblNldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcblx0fVxuXG5cdGFzeW5jIGxvYWRMaWJyYXJ5KCkge1xuXHRcdGNvbnNvbGUuZGVidWcoXCJDaXRhdGlvbiBwbHVnaW46IFJlbG9hZGluZyBsaWJyYXJ5XCIpO1xuXHRcdGlmICh0aGlzLnNldHRpbmdzLmNpdGF0aW9uRXhwb3J0UGF0aCkge1xuXHRcdFx0RmlsZVN5c3RlbUFkYXB0ZXIucmVhZExvY2FsRmlsZSh0aGlzLnNldHRpbmdzLmNpdGF0aW9uRXhwb3J0UGF0aCkudGhlbihidWZmZXIgPT4gdGhpcy5vbkxpYnJhcnlVcGRhdGUoYnVmZmVyKSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS53YXJuKFwiQ2l0YXRpb25zIHBsdWdpbjogY2l0YXRpb24gZXhwb3J0IHBhdGggaXMgbm90IHNldC4gUGxlYXNlIHVwZGF0ZSBwbHVnaW4gc2V0dGluZ3MuXCIpO1xuXHRcdH1cblx0fVxuXG5cdG9uTGlicmFyeVVwZGF0ZShsaWJyYXJ5QnVmZmVyOiBBcnJheUJ1ZmZlcikge1xuXHRcdC8vIERlY29kZSBmaWxlIGFzIFVURi04XG5cdFx0dmFyIGRhdGFWaWV3ID0gbmV3IERhdGFWaWV3KGxpYnJhcnlCdWZmZXIpO1xuXHRcdHZhciBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKFwidXRmOFwiKTtcblx0XHRjb25zdCB2YWx1ZSA9IGRlY29kZXIuZGVjb2RlKGRhdGFWaWV3KTtcblxuXHRcdGxldCBsaWJyYXJ5QXJyYXkgPSBKU09OLnBhcnNlKHZhbHVlKTtcblx0XHQvLyBJbmRleCBieSBjaXRla2V5XG5cdFx0dGhpcy5saWJyYXJ5ID0gT2JqZWN0LmZyb21FbnRyaWVzKGxpYnJhcnlBcnJheS5tYXAoKGVudHJ5RGF0YTogRW50cnlEYXRhKSA9PiBbZW50cnlEYXRhLmlkLCBuZXcgRW50cnkoZW50cnlEYXRhKV0pKTtcblx0fVxuXG5cdG9udW5sb2FkKCkge1xuXHRcdGNvbnNvbGUubG9nKCd1bmxvYWRpbmcgcGx1Z2luJyk7XG5cdH1cblxuXHRnZXRUaXRsZUZvckNpdGVrZXkoY2l0ZWtleTogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRsZXQgZW50cnkgPSB0aGlzLmxpYnJhcnlbY2l0ZWtleV07XG5cdFx0cmV0dXJuIGZvcm1hdFRlbXBsYXRlKHRoaXMuc2V0dGluZ3MubGl0ZXJhdHVyZU5vdGVUaXRsZVRlbXBsYXRlLCB7XG5cdFx0XHRjaXRla2V5OiBjaXRla2V5LFxuXHRcdFx0dGl0bGU6IGVudHJ5LnRpdGxlLFxuXHRcdFx0YXV0aG9yU3RyaW5nOiBlbnRyeS5hdXRob3JTdHJpbmcsXG5cdFx0XHR5ZWFyOiBlbnRyeS55ZWFyLnRvU3RyaW5nKClcblx0XHR9KTtcblx0fVxuXG5cdGdldFBhdGhGb3JDaXRla2V5KGNpdGVrZXk6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0bGV0IHRpdGxlID0gdGhpcy5nZXRUaXRsZUZvckNpdGVrZXkoY2l0ZWtleSk7XG5cdFx0Ly8gVE9ETyBlc2NhcGUgbm90ZSB0aXRsZVxuXHRcdHJldHVybiBwYXRoLmpvaW4odGhpcy5zZXR0aW5ncy5saXRlcmF0dXJlTm90ZUZvbGRlciwgYCR7dGl0bGV9Lm1kYCk7XG5cdH1cblxuXHRnZXRJbml0aWFsQ29udGVudEZvckNpdGVrZXkoY2l0ZWtleTogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRsZXQgZW50cnkgPSB0aGlzLmxpYnJhcnlbY2l0ZWtleV07XG5cdFx0cmV0dXJuIGZvcm1hdFRlbXBsYXRlKHRoaXMuc2V0dGluZ3MubGl0ZXJhdHVyZU5vdGVDb250ZW50VGVtcGxhdGUsIHtcblx0XHRcdGNpdGVrZXk6IGNpdGVrZXksXG5cdFx0XHR0aXRsZTogZW50cnkudGl0bGUsXG5cdFx0XHRhdXRob3JTdHJpbmc6IGVudHJ5LmF1dGhvclN0cmluZyxcblx0XHRcdHllYXI6IGVudHJ5LnllYXIudG9TdHJpbmcoKVxuXHRcdH0pO1xuXHR9XG5cblx0YXN5bmMgZ2V0T3JDcmVhdGVMaXRlcmF0dXJlTm90ZUZpbGUoY2l0ZWtleTogc3RyaW5nKTogUHJvbWlzZTxURmlsZT4ge1xuXHRcdGxldCBwYXRoID0gdGhpcy5nZXRQYXRoRm9yQ2l0ZWtleShjaXRla2V5KSxcblx0XHRcdFx0ZmlsZSA9IHRoaXMuYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChub3JtYWxpemVQYXRoKHBhdGgpKTtcblxuXHRcdGlmIChmaWxlID09IG51bGwpIHtcblx0XHRcdGZpbGUgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5jcmVhdGUocGF0aCwgdGhpcy5nZXRJbml0aWFsQ29udGVudEZvckNpdGVrZXkoY2l0ZWtleSkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmaWxlIGFzIFRGaWxlO1xuXHR9XG5cblx0YXN5bmMgb3BlbkxpdGVyYXR1cmVOb3RlKGNpdGVrZXk6IHN0cmluZywgbmV3UGFuZTogYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuZ2V0T3JDcmVhdGVMaXRlcmF0dXJlTm90ZUZpbGUoY2l0ZWtleSkudGhlbigoZmlsZTogVEZpbGUpID0+IHtcblx0XHRcdHRoaXMuYXBwLndvcmtzcGFjZS5nZXRMZWFmKG5ld1BhbmUpLm9wZW5GaWxlKGZpbGUpO1xuXHRcdH0pO1xuXHR9XG5cblx0YXN5bmMgaW5zZXJ0TGl0ZXJhdHVyZU5vdGVMaW5rKGNpdGVrZXk6IHN0cmluZykge1xuXHRcdHRoaXMuZ2V0T3JDcmVhdGVMaXRlcmF0dXJlTm90ZUZpbGUoY2l0ZWtleSkudGhlbihmaWxlID0+IHtcblx0XHRcdC8vIFRPRE8gd2hhdCBpcyB0aGUgQVBJIGZvciB0aGlzP1xuXHRcdFx0Y29uc29sZS5sb2codGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYpO1xuXG5cdFx0XHRsZXQgdGl0bGUgPSB0aGlzLmdldFRpdGxlRm9yQ2l0ZWtleShjaXRla2V5KSxcblx0XHRcdFx0ICBsaW5rVGV4dCA9IGBbWyR7dGl0bGV9XV1gO1xuXHRcdFx0Ly8gY29uc29sZS5sb2codGhpcy5hcHAubWV0YWRhdGFDYWNoZS5maWxlVG9MaW5rdGV4dChmaWxlLCB0aGlzLmFwcC52YXVsdC5nZXRSb290KCkucGF0aCwgdHJ1ZSkpXG5cdFx0XHR0aGlzLmVkaXRvci5yZXBsYWNlUmFuZ2UobGlua1RleHQsIHRoaXMuZWRpdG9yLmdldEN1cnNvcigpKTtcblx0XHR9KVxuXHR9XG59XG4iXSwibmFtZXMiOlsiRnV6enlTdWdnZXN0TW9kYWwiLCJTZXR0aW5nIiwiUGx1Z2luU2V0dGluZ1RhYiIsIk1hcmtkb3duVmlldyIsIndhdGNoIiwiRmlsZVN5c3RlbUFkYXB0ZXIiLCJwYXRoLmpvaW4iLCJub3JtYWxpemVQYXRoIiwiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztBQUN6QyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDcEYsUUFBUSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDMUcsSUFBSSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBQ0Y7QUFDTyxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2hDLElBQUksYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QixJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUMzQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDekYsQ0FBQztBQXVDRDtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Q7QUFDTyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQzNDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNySCxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMs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
