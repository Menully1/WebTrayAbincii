var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/ua-parser-js/src/ua-parser.js
var require_ua_parser = __commonJS({
  "../../node_modules/ua-parser-js/src/ua-parser.js"(exports, module) {
    (function(window2, undefined2) {
      "use strict";
      var LIBVERSION = "1.0.33", EMPTY = "", UNKNOWN = "?", FUNC_TYPE = "function", UNDEF_TYPE = "undefined", OBJ_TYPE = "object", STR_TYPE = "string", MAJOR = "major", MODEL = "model", NAME = "name", TYPE = "type", VENDOR = "vendor", VERSION = "version", ARCHITECTURE = "architecture", CONSOLE = "console", MOBILE = "mobile", TABLET = "tablet", SMARTTV = "smarttv", WEARABLE = "wearable", EMBEDDED = "embedded", UA_MAX_LENGTH = 350;
      var AMAZON = "Amazon", APPLE = "Apple", ASUS = "ASUS", BLACKBERRY = "BlackBerry", BROWSER = "Browser", CHROME = "Chrome", EDGE = "Edge", FIREFOX = "Firefox", GOOGLE = "Google", HUAWEI = "Huawei", LG = "LG", MICROSOFT = "Microsoft", MOTOROLA = "Motorola", OPERA = "Opera", SAMSUNG = "Samsung", SHARP = "Sharp", SONY = "Sony", XIAOMI = "Xiaomi", ZEBRA = "Zebra", FACEBOOK = "Facebook";
      var extend = function(regexes2, extensions) {
        var mergedRegexes = {};
        for (var i in regexes2) {
          if (extensions[i] && extensions[i].length % 2 === 0) {
            mergedRegexes[i] = extensions[i].concat(regexes2[i]);
          } else {
            mergedRegexes[i] = regexes2[i];
          }
        }
        return mergedRegexes;
      }, enumerize = function(arr) {
        var enums = {};
        for (var i = 0; i < arr.length; i++) {
          enums[arr[i].toUpperCase()] = arr[i];
        }
        return enums;
      }, has = function(str1, str2) {
        return typeof str1 === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
      }, lowerize = function(str2) {
        return str2.toLowerCase();
      }, majorize = function(version) {
        return typeof version === STR_TYPE ? version.replace(/[^\d\.]/g, EMPTY).split(".")[0] : undefined2;
      }, trim = function(str2, len) {
        if (typeof str2 === STR_TYPE) {
          str2 = str2.replace(/^\s\s*/, EMPTY);
          return typeof len === UNDEF_TYPE ? str2 : str2.substring(0, UA_MAX_LENGTH);
        }
      };
      var rgxMapper = function(ua, arrays) {
        var i = 0, j, k, p, q, matches, match;
        while (i < arrays.length && !matches) {
          var regex = arrays[i], props = arrays[i + 1];
          j = k = 0;
          while (j < regex.length && !matches) {
            matches = regex[j++].exec(ua);
            if (!!matches) {
              for (p = 0; p < props.length; p++) {
                match = matches[++k];
                q = props[p];
                if (typeof q === OBJ_TYPE && q.length > 0) {
                  if (q.length === 2) {
                    if (typeof q[1] == FUNC_TYPE) {
                      this[q[0]] = q[1].call(this, match);
                    } else {
                      this[q[0]] = q[1];
                    }
                  } else if (q.length === 3) {
                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                      this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined2;
                    } else {
                      this[q[0]] = match ? match.replace(q[1], q[2]) : undefined2;
                    }
                  } else if (q.length === 4) {
                    this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined2;
                  }
                } else {
                  this[q] = match ? match : undefined2;
                }
              }
            }
          }
          i += 2;
        }
      }, strMapper = function(str2, map) {
        for (var i in map) {
          if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
            for (var j = 0; j < map[i].length; j++) {
              if (has(map[i][j], str2)) {
                return i === UNKNOWN ? undefined2 : i;
              }
            }
          } else if (has(map[i], str2)) {
            return i === UNKNOWN ? undefined2 : i;
          }
        }
        return str2;
      };
      var oldSafariMap = {
        "1.0": "/8",
        "1.2": "/1",
        "1.3": "/3",
        "2.0": "/412",
        "2.0.2": "/416",
        "2.0.3": "/417",
        "2.0.4": "/419",
        "?": "/"
      }, windowsVersionMap = {
        "ME": "4.90",
        "NT 3.11": "NT3.51",
        "NT 4.0": "NT4.0",
        "2000": "NT 5.0",
        "XP": ["NT 5.1", "NT 5.2"],
        "Vista": "NT 6.0",
        "7": "NT 6.1",
        "8": "NT 6.2",
        "8.1": "NT 6.3",
        "10": ["NT 6.4", "NT 10.0"],
        "RT": "ARM"
      };
      var regexes = {
        browser: [
          [
            /\b(?:crmo|crios)\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "Chrome"]],
          [
            /edg(?:e|ios|a)?\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "Edge"]],
          [
            /(opera mini)\/([-\w\.]+)/i,
            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
          ],
          [NAME, VERSION],
          [
            /opios[\/ ]+([\w\.]+)/i
          ],
          [VERSION, [NAME, OPERA + " Mini"]],
          [
            /\bopr\/([\w\.]+)/i
          ],
          [VERSION, [NAME, OPERA]],
          [
            /(kindle)\/([\w\.]+)/i,
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
            /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
            /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
            /(?:ms|\()(ie) ([\w\.]+)/i,
            /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
            /(weibo)__([\d\.]+)/i
          ],
          [NAME, VERSION],
          [
            /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i
          ],
          [VERSION, [NAME, "UC" + BROWSER]],
          [
            /microm.+\bqbcore\/([\w\.]+)/i,
            /\bqbcore\/([\w\.]+).+microm/i
          ],
          [VERSION, [NAME, "WeChat(Win) Desktop"]],
          [
            /micromessenger\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "WeChat"]],
          [
            /konqueror\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "Konqueror"]],
          [
            /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i
          ],
          [VERSION, [NAME, "IE"]],
          [
            /yabrowser\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "Yandex"]],
          [
            /(avast|avg)\/([\w\.]+)/i
          ],
          [[NAME, /(.+)/, "$1 Secure " + BROWSER], VERSION],
          [
            /\bfocus\/([\w\.]+)/i
          ],
          [VERSION, [NAME, FIREFOX + " Focus"]],
          [
            /\bopt\/([\w\.]+)/i
          ],
          [VERSION, [NAME, OPERA + " Touch"]],
          [
            /coc_coc\w+\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "Coc Coc"]],
          [
            /dolfin\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "Dolphin"]],
          [
            /coast\/([\w\.]+)/i
          ],
          [VERSION, [NAME, OPERA + " Coast"]],
          [
            /miuibrowser\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "MIUI " + BROWSER]],
          [
            /fxios\/([-\w\.]+)/i
          ],
          [VERSION, [NAME, FIREFOX]],
          [
            /\bqihu|(qi?ho?o?|360)browser/i
          ],
          [[NAME, "360 " + BROWSER]],
          [
            /(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i
          ],
          [[NAME, /(.+)/, "$1 " + BROWSER], VERSION],
          [
            /(comodo_dragon)\/([\w\.]+)/i
          ],
          [[NAME, /_/g, " "], VERSION],
          [
            /(electron)\/([\w\.]+) safari/i,
            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
            /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i
          ],
          [NAME, VERSION],
          [
            /(metasr)[\/ ]?([\w\.]+)/i,
            /(lbbrowser)/i,
            /\[(linkedin)app\]/i
          ],
          [NAME],
          [
            /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i
          ],
          [[NAME, FACEBOOK], VERSION],
          [
            /safari (line)\/([\w\.]+)/i,
            /\b(line)\/([\w\.]+)\/iab/i,
            /(chromium|instagram)[\/ ]([-\w\.]+)/i
          ],
          [NAME, VERSION],
          [
            /\bgsa\/([\w\.]+) .*safari\//i
          ],
          [VERSION, [NAME, "GSA"]],
          [
            /headlesschrome(?:\/([\w\.]+)| )/i
          ],
          [VERSION, [NAME, CHROME + " Headless"]],
          [
            / wv\).+(chrome)\/([\w\.]+)/i
          ],
          [[NAME, CHROME + " WebView"], VERSION],
          [
            /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i
          ],
          [VERSION, [NAME, "Android " + BROWSER]],
          [
            /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i
          ],
          [NAME, VERSION],
          [
            /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i
          ],
          [VERSION, [NAME, "Mobile Safari"]],
          [
            /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i
          ],
          [VERSION, NAME],
          [
            /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i
          ],
          [NAME, [VERSION, strMapper, oldSafariMap]],
          [
            /(webkit|khtml)\/([\w\.]+)/i
          ],
          [NAME, VERSION],
          [
            /(navigator|netscape\d?)\/([-\w\.]+)/i
          ],
          [[NAME, "Netscape"], VERSION],
          [
            /mobile vr; rv:([\w\.]+)\).+firefox/i
          ],
          [VERSION, [NAME, FIREFOX + " Reality"]],
          [
            /ekiohf.+(flow)\/([\w\.]+)/i,
            /(swiftfox)/i,
            /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
            /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
            /(firefox)\/([\w\.]+)/i,
            /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
            /(links) \(([\w\.]+)/i
          ],
          [NAME, VERSION],
          [
            /(cobalt)\/([\w\.]+)/i
          ],
          [NAME, [VERSION, /master.|lts./, ""]]
        ],
        cpu: [
          [
            /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i
          ],
          [[ARCHITECTURE, "amd64"]],
          [
            /(ia32(?=;))/i
          ],
          [[ARCHITECTURE, lowerize]],
          [
            /((?:i[346]|x)86)[;\)]/i
          ],
          [[ARCHITECTURE, "ia32"]],
          [
            /\b(aarch64|arm(v?8e?l?|_?64))\b/i
          ],
          [[ARCHITECTURE, "arm64"]],
          [
            /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i
          ],
          [[ARCHITECTURE, "armhf"]],
          [
            /windows (ce|mobile); ppc;/i
          ],
          [[ARCHITECTURE, "arm"]],
          [
            /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i
          ],
          [[ARCHITECTURE, /ower/, EMPTY, lowerize]],
          [
            /(sun4\w)[;\)]/i
          ],
          [[ARCHITECTURE, "sparc"]],
          [
            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
          ],
          [[ARCHITECTURE, lowerize]]
        ],
        device: [
          [
            /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
          ],
          [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]],
          [
            /\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i,
            /samsung[- ]([-\w]+)/i,
            /sec-(sgh\w+)/i
          ],
          [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]],
          [
            /\((ip(?:hone|od)[\w ]*);/i
          ],
          [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]],
          [
            /\((ipad);[-\w\),; ]+apple/i,
            /applecoremedia\/[\w\.]+ \((ipad)/i,
            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
          ],
          [MODEL, [VENDOR, APPLE], [TYPE, TABLET]],
          [
            /(macintosh);/i
          ],
          [MODEL, [VENDOR, APPLE]],
          [
            /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
          ],
          [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]],
          [
            /(?:huawei|honor)([-\w ]+)[;\)]/i,
            /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
          ],
          [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]],
          [
            /\b(poco[\w ]+)(?: bui|\))/i,
            /\b; (\w+) build\/hm\1/i,
            /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
            /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
            /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i
          ],
          [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, MOBILE]],
          [
            /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i
          ],
          [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, TABLET]],
          [
            /; (\w+) bui.+ oppo/i,
            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
          ],
          [MODEL, [VENDOR, "OPPO"], [TYPE, MOBILE]],
          [
            /vivo (\w+)(?: bui|\))/i,
            /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
          ],
          [MODEL, [VENDOR, "Vivo"], [TYPE, MOBILE]],
          [
            /\b(rmx[12]\d{3})(?: bui|;|\))/i
          ],
          [MODEL, [VENDOR, "Realme"], [TYPE, MOBILE]],
          [
            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
            /\bmot(?:orola)?[- ](\w*)/i,
            /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
          ],
          [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]],
          [
            /\b(mz60\d|xoom[2 ]{0,2}) build\//i
          ],
          [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]],
          [
            /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
          ],
          [MODEL, [VENDOR, LG], [TYPE, TABLET]],
          [
            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
            /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
            /\blg-?([\d\w]+) bui/i
          ],
          [MODEL, [VENDOR, LG], [TYPE, MOBILE]],
          [
            /(ideatab[-\w ]+)/i,
            /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
          ],
          [MODEL, [VENDOR, "Lenovo"], [TYPE, TABLET]],
          [
            /(?:maemo|nokia).*(n900|lumia \d+)/i,
            /nokia[-_ ]?([-\w\.]*)/i
          ],
          [[MODEL, /_/g, " "], [VENDOR, "Nokia"], [TYPE, MOBILE]],
          [
            /(pixel c)\b/i
          ],
          [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]],
          [
            /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i
          ],
          [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]],
          [
            /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
          ],
          [MODEL, [VENDOR, SONY], [TYPE, MOBILE]],
          [
            /sony tablet [ps]/i,
            /\b(?:sony)?sgp\w+(?: bui|\))/i
          ],
          [[MODEL, "Xperia Tablet"], [VENDOR, SONY], [TYPE, TABLET]],
          [
            / (kb2005|in20[12]5|be20[12][59])\b/i,
            /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
          ],
          [MODEL, [VENDOR, "OnePlus"], [TYPE, MOBILE]],
          [
            /(alexa)webm/i,
            /(kf[a-z]{2}wi)( bui|\))/i,
            /(kf[a-z]+)( bui|\)).+silk\//i
          ],
          [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]],
          [
            /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i
          ],
          [[MODEL, /(.+)/g, "Fire Phone $1"], [VENDOR, AMAZON], [TYPE, MOBILE]],
          [
            /(playbook);[-\w\),; ]+(rim)/i
          ],
          [MODEL, VENDOR, [TYPE, TABLET]],
          [
            /\b((?:bb[a-f]|st[hv])100-\d)/i,
            /\(bb10; (\w+)/i
          ],
          [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]],
          [
            /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
          ],
          [MODEL, [VENDOR, ASUS], [TYPE, TABLET]],
          [
            / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
          ],
          [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]],
          [
            /(nexus 9)/i
          ],
          [MODEL, [VENDOR, "HTC"], [TYPE, TABLET]],
          [
            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
            /(alcatel|geeksphone|nexian|panasonic|sony(?!-bra))[-_ ]?([-\w]*)/i
          ],
          [VENDOR, [MODEL, /_/g, " "], [TYPE, MOBILE]],
          [
            /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
          ],
          [MODEL, [VENDOR, "Acer"], [TYPE, TABLET]],
          [
            /droid.+; (m[1-5] note) bui/i,
            /\bmz-([-\w]{2,})/i
          ],
          [MODEL, [VENDOR, "Meizu"], [TYPE, MOBILE]],
          [
            /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
          ],
          [MODEL, [VENDOR, SHARP], [TYPE, MOBILE]],
          [
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
            /(hp) ([\w ]+\w)/i,
            /(asus)-?(\w+)/i,
            /(microsoft); (lumia[\w ]+)/i,
            /(lenovo)[-_ ]?([-\w]+)/i,
            /(jolla)/i,
            /(oppo) ?([\w ]+) bui/i
          ],
          [VENDOR, MODEL, [TYPE, MOBILE]],
          [
            /(archos) (gamepad2?)/i,
            /(hp).+(touchpad(?!.+tablet)|tablet)/i,
            /(kindle)\/([\w\.]+)/i,
            /(nook)[\w ]+build\/(\w+)/i,
            /(dell) (strea[kpr\d ]*[\dko])/i,
            /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
            /(trinity)[- ]*(t\d{3}) bui/i,
            /(gigaset)[- ]+(q\w{1,9}) bui/i,
            /(vodafone) ([\w ]+)(?:\)| bui)/i
          ],
          [VENDOR, MODEL, [TYPE, TABLET]],
          [
            /(surface duo)/i
          ],
          [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]],
          [
            /droid [\d\.]+; (fp\du?)(?: b|\))/i
          ],
          [MODEL, [VENDOR, "Fairphone"], [TYPE, MOBILE]],
          [
            /(u304aa)/i
          ],
          [MODEL, [VENDOR, "AT&T"], [TYPE, MOBILE]],
          [
            /\bsie-(\w*)/i
          ],
          [MODEL, [VENDOR, "Siemens"], [TYPE, MOBILE]],
          [
            /\b(rct\w+) b/i
          ],
          [MODEL, [VENDOR, "RCA"], [TYPE, TABLET]],
          [
            /\b(venue[\d ]{2,7}) b/i
          ],
          [MODEL, [VENDOR, "Dell"], [TYPE, TABLET]],
          [
            /\b(q(?:mv|ta)\w+) b/i
          ],
          [MODEL, [VENDOR, "Verizon"], [TYPE, TABLET]],
          [
            /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i
          ],
          [MODEL, [VENDOR, "Barnes & Noble"], [TYPE, TABLET]],
          [
            /\b(tm\d{3}\w+) b/i
          ],
          [MODEL, [VENDOR, "NuVision"], [TYPE, TABLET]],
          [
            /\b(k88) b/i
          ],
          [MODEL, [VENDOR, "ZTE"], [TYPE, TABLET]],
          [
            /\b(nx\d{3}j) b/i
          ],
          [MODEL, [VENDOR, "ZTE"], [TYPE, MOBILE]],
          [
            /\b(gen\d{3}) b.+49h/i
          ],
          [MODEL, [VENDOR, "Swiss"], [TYPE, MOBILE]],
          [
            /\b(zur\d{3}) b/i
          ],
          [MODEL, [VENDOR, "Swiss"], [TYPE, TABLET]],
          [
            /\b((zeki)?tb.*\b) b/i
          ],
          [MODEL, [VENDOR, "Zeki"], [TYPE, TABLET]],
          [
            /\b([yr]\d{2}) b/i,
            /\b(dragon[- ]+touch |dt)(\w{5}) b/i
          ],
          [[VENDOR, "Dragon Touch"], MODEL, [TYPE, TABLET]],
          [
            /\b(ns-?\w{0,9}) b/i
          ],
          [MODEL, [VENDOR, "Insignia"], [TYPE, TABLET]],
          [
            /\b((nxa|next)-?\w{0,9}) b/i
          ],
          [MODEL, [VENDOR, "NextBook"], [TYPE, TABLET]],
          [
            /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i
          ],
          [[VENDOR, "Voice"], MODEL, [TYPE, MOBILE]],
          [
            /\b(lvtel\-)?(v1[12]) b/i
          ],
          [[VENDOR, "LvTel"], MODEL, [TYPE, MOBILE]],
          [
            /\b(ph-1) /i
          ],
          [MODEL, [VENDOR, "Essential"], [TYPE, MOBILE]],
          [
            /\b(v(100md|700na|7011|917g).*\b) b/i
          ],
          [MODEL, [VENDOR, "Envizen"], [TYPE, TABLET]],
          [
            /\b(trio[-\w\. ]+) b/i
          ],
          [MODEL, [VENDOR, "MachSpeed"], [TYPE, TABLET]],
          [
            /\btu_(1491) b/i
          ],
          [MODEL, [VENDOR, "Rotor"], [TYPE, TABLET]],
          [
            /(shield[\w ]+) b/i
          ],
          [MODEL, [VENDOR, "Nvidia"], [TYPE, TABLET]],
          [
            /(sprint) (\w+)/i
          ],
          [VENDOR, MODEL, [TYPE, MOBILE]],
          [
            /(kin\.[onetw]{3})/i
          ],
          [[MODEL, /\./g, " "], [VENDOR, MICROSOFT], [TYPE, MOBILE]],
          [
            /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
          ],
          [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]],
          [
            /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
          ],
          [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]],
          [
            /(ouya)/i,
            /(nintendo) ([wids3utch]+)/i
          ],
          [VENDOR, MODEL, [TYPE, CONSOLE]],
          [
            /droid.+; (shield) bui/i
          ],
          [MODEL, [VENDOR, "Nvidia"], [TYPE, CONSOLE]],
          [
            /(playstation [345portablevi]+)/i
          ],
          [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]],
          [
            /\b(xbox(?: one)?(?!; xbox))[\); ]/i
          ],
          [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]],
          [
            /smart-tv.+(samsung)/i
          ],
          [VENDOR, [TYPE, SMARTTV]],
          [
            /hbbtv.+maple;(\d+)/i
          ],
          [[MODEL, /^/, "SmartTV"], [VENDOR, SAMSUNG], [TYPE, SMARTTV]],
          [
            /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i
          ],
          [[VENDOR, LG], [TYPE, SMARTTV]],
          [
            /(apple) ?tv/i
          ],
          [VENDOR, [MODEL, APPLE + " TV"], [TYPE, SMARTTV]],
          [
            /crkey/i
          ],
          [[MODEL, CHROME + "cast"], [VENDOR, GOOGLE], [TYPE, SMARTTV]],
          [
            /droid.+aft(\w)( bui|\))/i
          ],
          [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]],
          [
            /\(dtv[\);].+(aquos)/i,
            /(aquos-tv[\w ]+)\)/i
          ],
          [MODEL, [VENDOR, SHARP], [TYPE, SMARTTV]],
          [
            /(bravia[\w ]+)( bui|\))/i
          ],
          [MODEL, [VENDOR, SONY], [TYPE, SMARTTV]],
          [
            /(mitv-\w{5}) bui/i
          ],
          [MODEL, [VENDOR, XIAOMI], [TYPE, SMARTTV]],
          [
            /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
            /hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i
          ],
          [[VENDOR, trim], [MODEL, trim], [TYPE, SMARTTV]],
          [
            /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i
          ],
          [[TYPE, SMARTTV]],
          [
            /((pebble))app/i
          ],
          [VENDOR, MODEL, [TYPE, WEARABLE]],
          [
            /droid.+; (glass) \d/i
          ],
          [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]],
          [
            /droid.+; (wt63?0{2,3})\)/i
          ],
          [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]],
          [
            /(quest( 2)?)/i
          ],
          [MODEL, [VENDOR, FACEBOOK], [TYPE, WEARABLE]],
          [
            /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i
          ],
          [VENDOR, [TYPE, EMBEDDED]],
          [
            /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i
          ],
          [MODEL, [TYPE, MOBILE]],
          [
            /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i
          ],
          [MODEL, [TYPE, TABLET]],
          [
            /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i
          ],
          [[TYPE, TABLET]],
          [
            /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i
          ],
          [[TYPE, MOBILE]],
          [
            /(android[-\w\. ]{0,9});.+buil/i
          ],
          [MODEL, [VENDOR, "Generic"]]
        ],
        engine: [
          [
            /windows.+ edge\/([\w\.]+)/i
          ],
          [VERSION, [NAME, EDGE + "HTML"]],
          [
            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
          ],
          [VERSION, [NAME, "Blink"]],
          [
            /(presto)\/([\w\.]+)/i,
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
            /ekioh(flow)\/([\w\.]+)/i,
            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
            /(icab)[\/ ]([23]\.[\d\.]+)/i
          ],
          [NAME, VERSION],
          [
            /rv\:([\w\.]{1,9})\b.+(gecko)/i
          ],
          [VERSION, NAME]
        ],
        os: [
          [
            /microsoft (windows) (vista|xp)/i
          ],
          [NAME, VERSION],
          [
            /(windows) nt 6\.2; (arm)/i,
            /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
            /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i
          ],
          [NAME, [VERSION, strMapper, windowsVersionMap]],
          [
            /(win(?=3|9|n)|win 9x )([nt\d\.]+)/i
          ],
          [[NAME, "Windows"], [VERSION, strMapper, windowsVersionMap]],
          [
            /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
            /cfnetwork\/.+darwin/i
          ],
          [[VERSION, /_/g, "."], [NAME, "iOS"]],
          [
            /(mac os x) ?([\w\. ]*)/i,
            /(macintosh|mac_powerpc\b)(?!.+haiku)/i
          ],
          [[NAME, "Mac OS"], [VERSION, /_/g, "."]],
          [
            /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i
          ],
          [VERSION, NAME],
          [
            /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
            /(blackberry)\w*\/([\w\.]*)/i,
            /(tizen|kaios)[\/ ]([\w\.]+)/i,
            /\((series40);/i
          ],
          [NAME, VERSION],
          [
            /\(bb(10);/i
          ],
          [VERSION, [NAME, BLACKBERRY]],
          [
            /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i
          ],
          [VERSION, [NAME, "Symbian"]],
          [
            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i
          ],
          [VERSION, [NAME, FIREFOX + " OS"]],
          [
            /web0s;.+rt(tv)/i,
            /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "webOS"]],
          [
            /crkey\/([\d\.]+)/i
          ],
          [VERSION, [NAME, CHROME + "cast"]],
          [
            /(cros) [\w]+ ([\w\.]+\w)/i
          ],
          [[NAME, "Chromium OS"], VERSION],
          [
            /(nintendo|playstation) ([wids345portablevuch]+)/i,
            /(xbox); +xbox ([^\);]+)/i,
            /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
            /(mint)[\/\(\) ]?(\w*)/i,
            /(mageia|vectorlinux)[; ]/i,
            /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
            /(hurd|linux) ?([\w\.]*)/i,
            /(gnu) ?([\w\.]*)/i,
            /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
            /(haiku) (\w+)/i
          ],
          [NAME, VERSION],
          [
            /(sunos) ?([\w\.\d]*)/i
          ],
          [[NAME, "Solaris"], VERSION],
          [
            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i,
            /(unix) ?([\w\.]*)/i
          ],
          [NAME, VERSION]
        ]
      };
      var UAParser3 = function(ua, extensions) {
        if (typeof ua === OBJ_TYPE) {
          extensions = ua;
          ua = undefined2;
        }
        if (!(this instanceof UAParser3)) {
          return new UAParser3(ua, extensions).getResult();
        }
        var _ua = ua || (typeof window2 !== UNDEF_TYPE && window2.navigator && window2.navigator.userAgent ? window2.navigator.userAgent : EMPTY);
        var _rgxmap = extensions ? extend(regexes, extensions) : regexes;
        this.getBrowser = function() {
          var _browser = {};
          _browser[NAME] = undefined2;
          _browser[VERSION] = undefined2;
          rgxMapper.call(_browser, _ua, _rgxmap.browser);
          _browser.major = majorize(_browser.version);
          return _browser;
        };
        this.getCPU = function() {
          var _cpu = {};
          _cpu[ARCHITECTURE] = undefined2;
          rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
          return _cpu;
        };
        this.getDevice = function() {
          var _device = {};
          _device[VENDOR] = undefined2;
          _device[MODEL] = undefined2;
          _device[TYPE] = undefined2;
          rgxMapper.call(_device, _ua, _rgxmap.device);
          return _device;
        };
        this.getEngine = function() {
          var _engine = {};
          _engine[NAME] = undefined2;
          _engine[VERSION] = undefined2;
          rgxMapper.call(_engine, _ua, _rgxmap.engine);
          return _engine;
        };
        this.getOS = function() {
          var _os = {};
          _os[NAME] = undefined2;
          _os[VERSION] = undefined2;
          rgxMapper.call(_os, _ua, _rgxmap.os);
          return _os;
        };
        this.getResult = function() {
          return {
            ua: this.getUA(),
            browser: this.getBrowser(),
            engine: this.getEngine(),
            os: this.getOS(),
            device: this.getDevice(),
            cpu: this.getCPU()
          };
        };
        this.getUA = function() {
          return _ua;
        };
        this.setUA = function(ua2) {
          _ua = typeof ua2 === STR_TYPE && ua2.length > UA_MAX_LENGTH ? trim(ua2, UA_MAX_LENGTH) : ua2;
          return this;
        };
        this.setUA(_ua);
        return this;
      };
      UAParser3.VERSION = LIBVERSION;
      UAParser3.BROWSER = enumerize([NAME, VERSION, MAJOR]);
      UAParser3.CPU = enumerize([ARCHITECTURE]);
      UAParser3.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
      UAParser3.ENGINE = UAParser3.OS = enumerize([NAME, VERSION]);
      if (typeof exports !== UNDEF_TYPE) {
        if (typeof module !== UNDEF_TYPE && module.exports) {
          exports = module.exports = UAParser3;
        }
        exports.UAParser = UAParser3;
      } else {
        if (typeof define === FUNC_TYPE && define.amd) {
          define(function() {
            return UAParser3;
          });
        } else if (typeof window2 !== UNDEF_TYPE) {
          window2.UAParser = UAParser3;
        }
      }
      var $ = typeof window2 !== UNDEF_TYPE && (window2.jQuery || window2.Zepto);
      if ($ && !$.ua) {
        var parser = new UAParser3();
        $.ua = parser.getResult();
        $.ua.get = function() {
          return parser.getUA();
        };
        $.ua.set = function(ua) {
          parser.setUA(ua);
          var result = parser.getResult();
          for (var prop in result) {
            $.ua[prop] = result[prop];
          }
        };
      }
    })(typeof window === "object" ? window : exports);
  }
});

// ../../node_modules/@zappar/zappar-cv/lib/zappar-cv.js
var ZCV = (() => {
  var _scriptDir = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : void 0;
  return function(moduleArg = {}) {
    var Module = moduleArg;
    var readyPromiseResolve, readyPromiseReject;
    Module["ready"] = new Promise((resolve, reject) => {
      readyPromiseResolve = resolve;
      readyPromiseReject = reject;
    });
    var moduleOverrides = Object.assign({}, Module);
    var arguments_ = [];
    var thisProgram = "./this.program";
    var quit_ = (status, toThrow) => {
      throw toThrow;
    };
    var ENVIRONMENT_IS_WEB = false;
    var ENVIRONMENT_IS_WORKER = true;
    var scriptDirectory = "";
    function locateFile(path) {
      if (Module["locateFile"]) {
        return Module["locateFile"](path, scriptDirectory);
      }
      return scriptDirectory + path;
    }
    var read_, readAsync, readBinary;
    if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
      if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = self.location.href;
      } else if (typeof document != "undefined" && document.currentScript) {
        scriptDirectory = document.currentScript.src;
      }
      if (_scriptDir) {
        scriptDirectory = _scriptDir;
      }
      if (scriptDirectory.startsWith("blob:")) {
        scriptDirectory = "";
      } else {
        scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
      }
      {
        read_ = (url) => {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, false);
          xhr.send(null);
          return xhr.responseText;
        };
        if (ENVIRONMENT_IS_WORKER) {
          readBinary = (url) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.responseType = "arraybuffer";
            xhr.send(null);
            return new Uint8Array(xhr.response);
          };
        }
        readAsync = (url, onload, onerror) => {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.responseType = "arraybuffer";
          xhr.onload = () => {
            if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
              onload(xhr.response);
              return;
            }
            onerror();
          };
          xhr.onerror = onerror;
          xhr.send(null);
        };
      }
    } else {
    }
    var out = Module["print"] || console.log.bind(console);
    var err = Module["printErr"] || console.error.bind(console);
    Object.assign(Module, moduleOverrides);
    moduleOverrides = null;
    if (Module["arguments"])
      arguments_ = Module["arguments"];
    if (Module["thisProgram"])
      thisProgram = Module["thisProgram"];
    if (Module["quit"])
      quit_ = Module["quit"];
    var wasmBinary;
    if (Module["wasmBinary"])
      wasmBinary = Module["wasmBinary"];
    if (typeof WebAssembly != "object") {
      abort("no native wasm support detected");
    }
    var wasmMemory;
    var ABORT = false;
    var EXITSTATUS;
    function assert(condition, text) {
      if (!condition) {
        abort(text);
      }
    }
    var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
    function updateMemoryViews() {
      var b = wasmMemory.buffer;
      Module["HEAP8"] = HEAP8 = new Int8Array(b);
      Module["HEAP16"] = HEAP16 = new Int16Array(b);
      Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
      Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
      Module["HEAP32"] = HEAP32 = new Int32Array(b);
      Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
      Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
      Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
    }
    var __ATPRERUN__ = [];
    var __ATINIT__ = [];
    var __ATPOSTRUN__ = [];
    var runtimeInitialized = false;
    function preRun() {
      if (Module["preRun"]) {
        if (typeof Module["preRun"] == "function")
          Module["preRun"] = [Module["preRun"]];
        while (Module["preRun"].length) {
          addOnPreRun(Module["preRun"].shift());
        }
      }
      callRuntimeCallbacks(__ATPRERUN__);
    }
    function initRuntime() {
      runtimeInitialized = true;
      if (!Module["noFSInit"] && !FS.init.initialized)
        FS.init();
      FS.ignorePermissions = false;
      TTY.init();
      callRuntimeCallbacks(__ATINIT__);
    }
    function postRun() {
      if (Module["postRun"]) {
        if (typeof Module["postRun"] == "function")
          Module["postRun"] = [Module["postRun"]];
        while (Module["postRun"].length) {
          addOnPostRun(Module["postRun"].shift());
        }
      }
      callRuntimeCallbacks(__ATPOSTRUN__);
    }
    function addOnPreRun(cb) {
      __ATPRERUN__.unshift(cb);
    }
    function addOnInit(cb) {
      __ATINIT__.unshift(cb);
    }
    function addOnPostRun(cb) {
      __ATPOSTRUN__.unshift(cb);
    }
    var runDependencies = 0;
    var runDependencyWatcher = null;
    var dependenciesFulfilled = null;
    function getUniqueRunDependency(id) {
      return id;
    }
    function addRunDependency(id) {
      runDependencies++;
      Module["monitorRunDependencies"]?.(runDependencies);
    }
    function removeRunDependency(id) {
      runDependencies--;
      Module["monitorRunDependencies"]?.(runDependencies);
      if (runDependencies == 0) {
        if (runDependencyWatcher !== null) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
        }
        if (dependenciesFulfilled) {
          var callback = dependenciesFulfilled;
          dependenciesFulfilled = null;
          callback();
        }
      }
    }
    function abort(what) {
      Module["onAbort"]?.(what);
      what = "Aborted(" + what + ")";
      err(what);
      ABORT = true;
      EXITSTATUS = 1;
      what += ". Build with -sASSERTIONS for more info.";
      if (runtimeInitialized) {
        ___trap();
      }
      var e = new WebAssembly.RuntimeError(what);
      readyPromiseReject(e);
      throw e;
    }
    var dataURIPrefix = "data:application/octet-stream;base64,";
    var isDataURI = (filename) => filename.startsWith(dataURIPrefix);
    var wasmBinaryFile;
    wasmBinaryFile = "zappar-cv.wasm";
    if (!isDataURI(wasmBinaryFile)) {
      wasmBinaryFile = locateFile(wasmBinaryFile);
    }
    function getBinarySync(file) {
      if (file == wasmBinaryFile && wasmBinary) {
        return new Uint8Array(wasmBinary);
      }
      if (readBinary) {
        return readBinary(file);
      }
      throw 'sync fetching of the wasm failed: you can preload it to Module["wasmBinary"] manually, or emcc.py will do that for you when generating HTML (but not JS)';
    }
    function instantiateSync(file, info) {
      var module;
      var binary = getBinarySync(file);
      module = new WebAssembly.Module(binary);
      var instance = new WebAssembly.Instance(module, info);
      return [instance, module];
    }
    function createWasm() {
      var info = { "a": wasmImports };
      function receiveInstance(instance, module) {
        wasmExports = instance.exports;
        wasmMemory = wasmExports["L"];
        updateMemoryViews();
        wasmTable = wasmExports["Q"];
        addOnInit(wasmExports["M"]);
        removeRunDependency("wasm-instantiate");
        return wasmExports;
      }
      addRunDependency("wasm-instantiate");
      if (Module["instantiateWasm"]) {
        try {
          return Module["instantiateWasm"](info, receiveInstance);
        } catch (e) {
          err(`Module.instantiateWasm callback failed with error: ${e}`);
          readyPromiseReject(e);
        }
      }
      var result = instantiateSync(wasmBinaryFile, info);
      return receiveInstance(result[0]);
    }
    var tempDouble;
    var tempI64;
    function emidentity() {
      var res = new URL(location.origin).hostname;
      if (res.length === 0) {
        res = new URL(location.href.replace("blob:", "")).hostname;
      }
      if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(res)) {
        if (res.indexOf("10.") === 0)
          res = "10.*";
        if (res.indexOf("192.168.") === 0)
          res = "192.168.*";
        if (res.indexOf("172.") === 0)
          res = "172.*";
        if (res.indexOf("127.") === 0)
          res = "127.*";
      } else {
        var reg = new RegExp("(" + String.fromCharCode(92) + ".ngrok" + String.fromCharCode(92) + ".io)$", "i");
        if (reg.test(res))
          res = "*.ngrok.io";
        reg = new RegExp("(" + String.fromCharCode(92) + ".ngrok-free" + String.fromCharCode(92) + ".app)$", "i");
        if (reg.test(res))
          res = "*.ngrok.io";
        reg = new RegExp("(" + String.fromCharCode(92) + ".arweb" + String.fromCharCode(92) + ".app)$", "i");
        if (reg.test(res))
          res = "*.arweb.app";
      }
      var length = lengthBytesUTF8(res) + 1;
      var buffer = _malloc(length);
      stringToUTF8(res, buffer, length + 1);
      return buffer;
    }
    function emlicerr() {
      self.postMessage({ t: "licerr" });
    }
    function emgfx() {
      self.postMessage({ t: "gfx" });
    }
    function ExitStatus(status) {
      this.name = "ExitStatus";
      this.message = `Program terminated with exit(${status})`;
      this.status = status;
    }
    var callRuntimeCallbacks = (callbacks) => {
      while (callbacks.length > 0) {
        callbacks.shift()(Module);
      }
    };
    function getValue(ptr, type = "i8") {
      if (type.endsWith("*"))
        type = "*";
      switch (type) {
        case "i1":
          return HEAP8[ptr >> 0];
        case "i8":
          return HEAP8[ptr >> 0];
        case "i16":
          return HEAP16[ptr >> 1];
        case "i32":
          return HEAP32[ptr >> 2];
        case "i64":
          abort("to do getValue(i64) use WASM_BIGINT");
        case "float":
          return HEAPF32[ptr >> 2];
        case "double":
          return HEAPF64[ptr >> 3];
        case "*":
          return HEAPU32[ptr >> 2];
        default:
          abort(`invalid type for getValue: ${type}`);
      }
    }
    var noExitRuntime = Module["noExitRuntime"] || true;
    function setValue(ptr, value, type = "i8") {
      if (type.endsWith("*"))
        type = "*";
      switch (type) {
        case "i1":
          HEAP8[ptr >> 0] = value;
          break;
        case "i8":
          HEAP8[ptr >> 0] = value;
          break;
        case "i16":
          HEAP16[ptr >> 1] = value;
          break;
        case "i32":
          HEAP32[ptr >> 2] = value;
          break;
        case "i64":
          abort("to do setValue(i64) use WASM_BIGINT");
        case "float":
          HEAPF32[ptr >> 2] = value;
          break;
        case "double":
          HEAPF64[ptr >> 3] = value;
          break;
        case "*":
          HEAPU32[ptr >> 2] = value;
          break;
        default:
          abort(`invalid type for setValue: ${type}`);
      }
    }
    var PATH = { isAbs: (path) => path.charAt(0) === "/", splitPath: (filename) => {
      var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
      return splitPathRe.exec(filename).slice(1);
    }, normalizeArray: (parts, allowAboveRoot) => {
      var up = 0;
      for (var i = parts.length - 1; i >= 0; i--) {
        var last = parts[i];
        if (last === ".") {
          parts.splice(i, 1);
        } else if (last === "..") {
          parts.splice(i, 1);
          up++;
        } else if (up) {
          parts.splice(i, 1);
          up--;
        }
      }
      if (allowAboveRoot) {
        for (; up; up--) {
          parts.unshift("..");
        }
      }
      return parts;
    }, normalize: (path) => {
      var isAbsolute = PATH.isAbs(path), trailingSlash = path.substr(-1) === "/";
      path = PATH.normalizeArray(path.split("/").filter((p) => !!p), !isAbsolute).join("/");
      if (!path && !isAbsolute) {
        path = ".";
      }
      if (path && trailingSlash) {
        path += "/";
      }
      return (isAbsolute ? "/" : "") + path;
    }, dirname: (path) => {
      var result = PATH.splitPath(path), root = result[0], dir = result[1];
      if (!root && !dir) {
        return ".";
      }
      if (dir) {
        dir = dir.substr(0, dir.length - 1);
      }
      return root + dir;
    }, basename: (path) => {
      if (path === "/")
        return "/";
      path = PATH.normalize(path);
      path = path.replace(/\/$/, "");
      var lastSlash = path.lastIndexOf("/");
      if (lastSlash === -1)
        return path;
      return path.substr(lastSlash + 1);
    }, join: function() {
      var paths = Array.prototype.slice.call(arguments);
      return PATH.normalize(paths.join("/"));
    }, join2: (l, r) => PATH.normalize(l + "/" + r) };
    var initRandomFill = () => {
      if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
        return (view) => crypto.getRandomValues(view);
      } else
        abort("initRandomDevice");
    };
    var randomFill = (view) => (randomFill = initRandomFill())(view);
    var PATH_FS = { resolve: function() {
      var resolvedPath = "", resolvedAbsolute = false;
      for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path = i >= 0 ? arguments[i] : FS.cwd();
        if (typeof path != "string") {
          throw new TypeError("Arguments to path.resolve must be strings");
        } else if (!path) {
          return "";
        }
        resolvedPath = path + "/" + resolvedPath;
        resolvedAbsolute = PATH.isAbs(path);
      }
      resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter((p) => !!p), !resolvedAbsolute).join("/");
      return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
    }, relative: (from, to) => {
      from = PATH_FS.resolve(from).substr(1);
      to = PATH_FS.resolve(to).substr(1);
      function trim(arr) {
        var start = 0;
        for (; start < arr.length; start++) {
          if (arr[start] !== "")
            break;
        }
        var end = arr.length - 1;
        for (; end >= 0; end--) {
          if (arr[end] !== "")
            break;
        }
        if (start > end)
          return [];
        return arr.slice(start, end - start + 1);
      }
      var fromParts = trim(from.split("/"));
      var toParts = trim(to.split("/"));
      var length = Math.min(fromParts.length, toParts.length);
      var samePartsLength = length;
      for (var i = 0; i < length; i++) {
        if (fromParts[i] !== toParts[i]) {
          samePartsLength = i;
          break;
        }
      }
      var outputParts = [];
      for (var i = samePartsLength; i < fromParts.length; i++) {
        outputParts.push("..");
      }
      outputParts = outputParts.concat(toParts.slice(samePartsLength));
      return outputParts.join("/");
    } };
    var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : void 0;
    var UTF8ArrayToString = (heapOrArray, idx, maxBytesToRead) => {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      while (heapOrArray[endPtr] && !(endPtr >= endIdx))
        ++endPtr;
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str2 = "";
      while (idx < endPtr) {
        var u0 = heapOrArray[idx++];
        if (!(u0 & 128)) {
          str2 += String.fromCharCode(u0);
          continue;
        }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 224) == 192) {
          str2 += String.fromCharCode((u0 & 31) << 6 | u1);
          continue;
        }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 240) == 224) {
          u0 = (u0 & 15) << 12 | u1 << 6 | u2;
        } else {
          u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
        }
        if (u0 < 65536) {
          str2 += String.fromCharCode(u0);
        } else {
          var ch = u0 - 65536;
          str2 += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
        }
      }
      return str2;
    };
    var FS_stdin_getChar_buffer = [];
    var lengthBytesUTF8 = (str2) => {
      var len = 0;
      for (var i = 0; i < str2.length; ++i) {
        var c = str2.charCodeAt(i);
        if (c <= 127) {
          len++;
        } else if (c <= 2047) {
          len += 2;
        } else if (c >= 55296 && c <= 57343) {
          len += 4;
          ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
    var stringToUTF8Array = (str2, heap, outIdx, maxBytesToWrite) => {
      if (!(maxBytesToWrite > 0))
        return 0;
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1;
      for (var i = 0; i < str2.length; ++i) {
        var u = str2.charCodeAt(i);
        if (u >= 55296 && u <= 57343) {
          var u1 = str2.charCodeAt(++i);
          u = 65536 + ((u & 1023) << 10) | u1 & 1023;
        }
        if (u <= 127) {
          if (outIdx >= endIdx)
            break;
          heap[outIdx++] = u;
        } else if (u <= 2047) {
          if (outIdx + 1 >= endIdx)
            break;
          heap[outIdx++] = 192 | u >> 6;
          heap[outIdx++] = 128 | u & 63;
        } else if (u <= 65535) {
          if (outIdx + 2 >= endIdx)
            break;
          heap[outIdx++] = 224 | u >> 12;
          heap[outIdx++] = 128 | u >> 6 & 63;
          heap[outIdx++] = 128 | u & 63;
        } else {
          if (outIdx + 3 >= endIdx)
            break;
          heap[outIdx++] = 240 | u >> 18;
          heap[outIdx++] = 128 | u >> 12 & 63;
          heap[outIdx++] = 128 | u >> 6 & 63;
          heap[outIdx++] = 128 | u & 63;
        }
      }
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
    function intArrayFromString(stringy, dontAddNull, length) {
      var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
      var u8array = new Array(len);
      var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
      if (dontAddNull)
        u8array.length = numBytesWritten;
      return u8array;
    }
    var FS_stdin_getChar = () => {
      if (!FS_stdin_getChar_buffer.length) {
        var result = null;
        if (typeof window != "undefined" && typeof window.prompt == "function") {
          result = window.prompt("Input: ");
          if (result !== null) {
            result += "\n";
          }
        } else if (typeof readline == "function") {
          result = readline();
          if (result !== null) {
            result += "\n";
          }
        }
        if (!result) {
          return null;
        }
        FS_stdin_getChar_buffer = intArrayFromString(result, true);
      }
      return FS_stdin_getChar_buffer.shift();
    };
    var TTY = { ttys: [], init() {
    }, shutdown() {
    }, register(dev, ops) {
      TTY.ttys[dev] = { input: [], output: [], ops };
      FS.registerDevice(dev, TTY.stream_ops);
    }, stream_ops: { open(stream) {
      var tty = TTY.ttys[stream.node.rdev];
      if (!tty) {
        throw new FS.ErrnoError(43);
      }
      stream.tty = tty;
      stream.seekable = false;
    }, close(stream) {
      stream.tty.ops.fsync(stream.tty);
    }, fsync(stream) {
      stream.tty.ops.fsync(stream.tty);
    }, read(stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.get_char) {
        throw new FS.ErrnoError(60);
      }
      var bytesRead = 0;
      for (var i = 0; i < length; i++) {
        var result;
        try {
          result = stream.tty.ops.get_char(stream.tty);
        } catch (e) {
          throw new FS.ErrnoError(29);
        }
        if (result === void 0 && bytesRead === 0) {
          throw new FS.ErrnoError(6);
        }
        if (result === null || result === void 0)
          break;
        bytesRead++;
        buffer[offset + i] = result;
      }
      if (bytesRead) {
        stream.node.timestamp = Date.now();
      }
      return bytesRead;
    }, write(stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.put_char) {
        throw new FS.ErrnoError(60);
      }
      try {
        for (var i = 0; i < length; i++) {
          stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
        }
      } catch (e) {
        throw new FS.ErrnoError(29);
      }
      if (length) {
        stream.node.timestamp = Date.now();
      }
      return i;
    } }, default_tty_ops: { get_char(tty) {
      return FS_stdin_getChar();
    }, put_char(tty, val) {
      if (val === null || val === 10) {
        out(UTF8ArrayToString(tty.output, 0));
        tty.output = [];
      } else {
        if (val != 0)
          tty.output.push(val);
      }
    }, fsync(tty) {
      if (tty.output && tty.output.length > 0) {
        out(UTF8ArrayToString(tty.output, 0));
        tty.output = [];
      }
    }, ioctl_tcgets(tty) {
      return { c_iflag: 25856, c_oflag: 5, c_cflag: 191, c_lflag: 35387, c_cc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
    }, ioctl_tcsets(tty, optional_actions, data) {
      return 0;
    }, ioctl_tiocgwinsz(tty) {
      return [24, 80];
    } }, default_tty1_ops: { put_char(tty, val) {
      if (val === null || val === 10) {
        err(UTF8ArrayToString(tty.output, 0));
        tty.output = [];
      } else {
        if (val != 0)
          tty.output.push(val);
      }
    }, fsync(tty) {
      if (tty.output && tty.output.length > 0) {
        err(UTF8ArrayToString(tty.output, 0));
        tty.output = [];
      }
    } } };
    var mmapAlloc = (size) => {
      abort();
    };
    var MEMFS = { ops_table: null, mount(mount) {
      return MEMFS.createNode(null, "/", 16384 | 511, 0);
    }, createNode(parent, name, mode, dev) {
      if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
        throw new FS.ErrnoError(63);
      }
      MEMFS.ops_table ||= { dir: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, lookup: MEMFS.node_ops.lookup, mknod: MEMFS.node_ops.mknod, rename: MEMFS.node_ops.rename, unlink: MEMFS.node_ops.unlink, rmdir: MEMFS.node_ops.rmdir, readdir: MEMFS.node_ops.readdir, symlink: MEMFS.node_ops.symlink }, stream: { llseek: MEMFS.stream_ops.llseek } }, file: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: { llseek: MEMFS.stream_ops.llseek, read: MEMFS.stream_ops.read, write: MEMFS.stream_ops.write, allocate: MEMFS.stream_ops.allocate, mmap: MEMFS.stream_ops.mmap, msync: MEMFS.stream_ops.msync } }, link: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, readlink: MEMFS.node_ops.readlink }, stream: {} }, chrdev: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: FS.chrdev_stream_ops } };
      var node = FS.createNode(parent, name, mode, dev);
      if (FS.isDir(node.mode)) {
        node.node_ops = MEMFS.ops_table.dir.node;
        node.stream_ops = MEMFS.ops_table.dir.stream;
        node.contents = {};
      } else if (FS.isFile(node.mode)) {
        node.node_ops = MEMFS.ops_table.file.node;
        node.stream_ops = MEMFS.ops_table.file.stream;
        node.usedBytes = 0;
        node.contents = null;
      } else if (FS.isLink(node.mode)) {
        node.node_ops = MEMFS.ops_table.link.node;
        node.stream_ops = MEMFS.ops_table.link.stream;
      } else if (FS.isChrdev(node.mode)) {
        node.node_ops = MEMFS.ops_table.chrdev.node;
        node.stream_ops = MEMFS.ops_table.chrdev.stream;
      }
      node.timestamp = Date.now();
      if (parent) {
        parent.contents[name] = node;
        parent.timestamp = node.timestamp;
      }
      return node;
    }, getFileDataAsTypedArray(node) {
      if (!node.contents)
        return new Uint8Array(0);
      if (node.contents.subarray)
        return node.contents.subarray(0, node.usedBytes);
      return new Uint8Array(node.contents);
    }, expandFileStorage(node, newCapacity) {
      var prevCapacity = node.contents ? node.contents.length : 0;
      if (prevCapacity >= newCapacity)
        return;
      var CAPACITY_DOUBLING_MAX = 1024 * 1024;
      newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
      if (prevCapacity != 0)
        newCapacity = Math.max(newCapacity, 256);
      var oldContents = node.contents;
      node.contents = new Uint8Array(newCapacity);
      if (node.usedBytes > 0)
        node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
    }, resizeFileStorage(node, newSize) {
      if (node.usedBytes == newSize)
        return;
      if (newSize == 0) {
        node.contents = null;
        node.usedBytes = 0;
      } else {
        var oldContents = node.contents;
        node.contents = new Uint8Array(newSize);
        if (oldContents) {
          node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
        }
        node.usedBytes = newSize;
      }
    }, node_ops: { getattr(node) {
      var attr = {};
      attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
      attr.ino = node.id;
      attr.mode = node.mode;
      attr.nlink = 1;
      attr.uid = 0;
      attr.gid = 0;
      attr.rdev = node.rdev;
      if (FS.isDir(node.mode)) {
        attr.size = 4096;
      } else if (FS.isFile(node.mode)) {
        attr.size = node.usedBytes;
      } else if (FS.isLink(node.mode)) {
        attr.size = node.link.length;
      } else {
        attr.size = 0;
      }
      attr.atime = new Date(node.timestamp);
      attr.mtime = new Date(node.timestamp);
      attr.ctime = new Date(node.timestamp);
      attr.blksize = 4096;
      attr.blocks = Math.ceil(attr.size / attr.blksize);
      return attr;
    }, setattr(node, attr) {
      if (attr.mode !== void 0) {
        node.mode = attr.mode;
      }
      if (attr.timestamp !== void 0) {
        node.timestamp = attr.timestamp;
      }
      if (attr.size !== void 0) {
        MEMFS.resizeFileStorage(node, attr.size);
      }
    }, lookup(parent, name) {
      throw FS.genericErrors[44];
    }, mknod(parent, name, mode, dev) {
      return MEMFS.createNode(parent, name, mode, dev);
    }, rename(old_node, new_dir, new_name) {
      if (FS.isDir(old_node.mode)) {
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
        }
        if (new_node) {
          for (var i in new_node.contents) {
            throw new FS.ErrnoError(55);
          }
        }
      }
      delete old_node.parent.contents[old_node.name];
      old_node.parent.timestamp = Date.now();
      old_node.name = new_name;
      new_dir.contents[new_name] = old_node;
      new_dir.timestamp = old_node.parent.timestamp;
      old_node.parent = new_dir;
    }, unlink(parent, name) {
      delete parent.contents[name];
      parent.timestamp = Date.now();
    }, rmdir(parent, name) {
      var node = FS.lookupNode(parent, name);
      for (var i in node.contents) {
        throw new FS.ErrnoError(55);
      }
      delete parent.contents[name];
      parent.timestamp = Date.now();
    }, readdir(node) {
      var entries = [".", ".."];
      for (var key of Object.keys(node.contents)) {
        entries.push(key);
      }
      return entries;
    }, symlink(parent, newname, oldpath) {
      var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
      node.link = oldpath;
      return node;
    }, readlink(node) {
      if (!FS.isLink(node.mode)) {
        throw new FS.ErrnoError(28);
      }
      return node.link;
    } }, stream_ops: { read(stream, buffer, offset, length, position) {
      var contents = stream.node.contents;
      if (position >= stream.node.usedBytes)
        return 0;
      var size = Math.min(stream.node.usedBytes - position, length);
      if (size > 8 && contents.subarray) {
        buffer.set(contents.subarray(position, position + size), offset);
      } else {
        for (var i = 0; i < size; i++)
          buffer[offset + i] = contents[position + i];
      }
      return size;
    }, write(stream, buffer, offset, length, position, canOwn) {
      if (buffer.buffer === HEAP8.buffer) {
        canOwn = false;
      }
      if (!length)
        return 0;
      var node = stream.node;
      node.timestamp = Date.now();
      if (buffer.subarray && (!node.contents || node.contents.subarray)) {
        if (canOwn) {
          node.contents = buffer.subarray(offset, offset + length);
          node.usedBytes = length;
          return length;
        } else if (node.usedBytes === 0 && position === 0) {
          node.contents = buffer.slice(offset, offset + length);
          node.usedBytes = length;
          return length;
        } else if (position + length <= node.usedBytes) {
          node.contents.set(buffer.subarray(offset, offset + length), position);
          return length;
        }
      }
      MEMFS.expandFileStorage(node, position + length);
      if (node.contents.subarray && buffer.subarray) {
        node.contents.set(buffer.subarray(offset, offset + length), position);
      } else {
        for (var i = 0; i < length; i++) {
          node.contents[position + i] = buffer[offset + i];
        }
      }
      node.usedBytes = Math.max(node.usedBytes, position + length);
      return length;
    }, llseek(stream, offset, whence) {
      var position = offset;
      if (whence === 1) {
        position += stream.position;
      } else if (whence === 2) {
        if (FS.isFile(stream.node.mode)) {
          position += stream.node.usedBytes;
        }
      }
      if (position < 0) {
        throw new FS.ErrnoError(28);
      }
      return position;
    }, allocate(stream, offset, length) {
      MEMFS.expandFileStorage(stream.node, offset + length);
      stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
    }, mmap(stream, length, position, prot, flags) {
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(43);
      }
      var ptr;
      var allocated;
      var contents = stream.node.contents;
      if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
        allocated = false;
        ptr = contents.byteOffset;
      } else {
        if (position > 0 || position + length < contents.length) {
          if (contents.subarray) {
            contents = contents.subarray(position, position + length);
          } else {
            contents = Array.prototype.slice.call(contents, position, position + length);
          }
        }
        allocated = true;
        ptr = mmapAlloc(length);
        if (!ptr) {
          throw new FS.ErrnoError(48);
        }
        HEAP8.set(contents, ptr);
      }
      return { ptr, allocated };
    }, msync(stream, buffer, offset, length, mmapFlags) {
      MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
      return 0;
    } } };
    var asyncLoad = (url, onload, onerror, noRunDep) => {
      var dep = !noRunDep ? getUniqueRunDependency(`al ${url}`) : "";
      readAsync(url, (arrayBuffer) => {
        onload(new Uint8Array(arrayBuffer));
        if (dep)
          removeRunDependency(dep);
      }, (event) => {
        if (onerror) {
          onerror();
        } else {
          throw `Loading data file "${url}" failed.`;
        }
      });
      if (dep)
        addRunDependency(dep);
    };
    var FS_createDataFile = (parent, name, fileData, canRead, canWrite, canOwn) => {
      FS.createDataFile(parent, name, fileData, canRead, canWrite, canOwn);
    };
    var preloadPlugins = Module["preloadPlugins"] || [];
    var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
      if (typeof Browser != "undefined")
        Browser.init();
      var handled = false;
      preloadPlugins.forEach((plugin) => {
        if (handled)
          return;
        if (plugin["canHandle"](fullname)) {
          plugin["handle"](byteArray, fullname, finish, onerror);
          handled = true;
        }
      });
      return handled;
    };
    var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
      var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
      var dep = getUniqueRunDependency(`cp ${fullname}`);
      function processData(byteArray) {
        function finish(byteArray2) {
          preFinish?.();
          if (!dontCreateFile) {
            FS_createDataFile(parent, name, byteArray2, canRead, canWrite, canOwn);
          }
          onload?.();
          removeRunDependency(dep);
        }
        if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
          onerror?.();
          removeRunDependency(dep);
        })) {
          return;
        }
        finish(byteArray);
      }
      addRunDependency(dep);
      if (typeof url == "string") {
        asyncLoad(url, processData, onerror);
      } else {
        processData(url);
      }
    };
    var FS_modeStringToFlags = (str2) => {
      var flagModes = { "r": 0, "r+": 2, "w": 512 | 64 | 1, "w+": 512 | 64 | 2, "a": 1024 | 64 | 1, "a+": 1024 | 64 | 2 };
      var flags = flagModes[str2];
      if (typeof flags == "undefined") {
        throw new Error(`Unknown file open mode: ${str2}`);
      }
      return flags;
    };
    var FS_getMode = (canRead, canWrite) => {
      var mode = 0;
      if (canRead)
        mode |= 292 | 73;
      if (canWrite)
        mode |= 146;
      return mode;
    };
    var FS = { root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: "/", initialized: false, ignorePermissions: true, ErrnoError: class {
      constructor(errno) {
        this.name = "ErrnoError";
        this.errno = errno;
      }
    }, genericErrors: {}, filesystems: null, syncFSRequests: 0, lookupPath(path, opts = {}) {
      path = PATH_FS.resolve(path);
      if (!path)
        return { path: "", node: null };
      var defaults = { follow_mount: true, recurse_count: 0 };
      opts = Object.assign(defaults, opts);
      if (opts.recurse_count > 8) {
        throw new FS.ErrnoError(32);
      }
      var parts = path.split("/").filter((p) => !!p);
      var current = FS.root;
      var current_path = "/";
      for (var i = 0; i < parts.length; i++) {
        var islast = i === parts.length - 1;
        if (islast && opts.parent) {
          break;
        }
        current = FS.lookupNode(current, parts[i]);
        current_path = PATH.join2(current_path, parts[i]);
        if (FS.isMountpoint(current)) {
          if (!islast || islast && opts.follow_mount) {
            current = current.mounted.root;
          }
        }
        if (!islast || opts.follow) {
          var count = 0;
          while (FS.isLink(current.mode)) {
            var link = FS.readlink(current_path);
            current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
            var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count + 1 });
            current = lookup.node;
            if (count++ > 40) {
              throw new FS.ErrnoError(32);
            }
          }
        }
      }
      return { path: current_path, node: current };
    }, getPath(node) {
      var path;
      while (true) {
        if (FS.isRoot(node)) {
          var mount = node.mount.mountpoint;
          if (!path)
            return mount;
          return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
        }
        path = path ? `${node.name}/${path}` : node.name;
        node = node.parent;
      }
    }, hashName(parentid, name) {
      var hash = 0;
      for (var i = 0; i < name.length; i++) {
        hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
      }
      return (parentid + hash >>> 0) % FS.nameTable.length;
    }, hashAddNode(node) {
      var hash = FS.hashName(node.parent.id, node.name);
      node.name_next = FS.nameTable[hash];
      FS.nameTable[hash] = node;
    }, hashRemoveNode(node) {
      var hash = FS.hashName(node.parent.id, node.name);
      if (FS.nameTable[hash] === node) {
        FS.nameTable[hash] = node.name_next;
      } else {
        var current = FS.nameTable[hash];
        while (current) {
          if (current.name_next === node) {
            current.name_next = node.name_next;
            break;
          }
          current = current.name_next;
        }
      }
    }, lookupNode(parent, name) {
      var errCode = FS.mayLookup(parent);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      var hash = FS.hashName(parent.id, name);
      for (var node = FS.nameTable[hash]; node; node = node.name_next) {
        var nodeName = node.name;
        if (node.parent.id === parent.id && nodeName === name) {
          return node;
        }
      }
      return FS.lookup(parent, name);
    }, createNode(parent, name, mode, rdev) {
      var node = new FS.FSNode(parent, name, mode, rdev);
      FS.hashAddNode(node);
      return node;
    }, destroyNode(node) {
      FS.hashRemoveNode(node);
    }, isRoot(node) {
      return node === node.parent;
    }, isMountpoint(node) {
      return !!node.mounted;
    }, isFile(mode) {
      return (mode & 61440) === 32768;
    }, isDir(mode) {
      return (mode & 61440) === 16384;
    }, isLink(mode) {
      return (mode & 61440) === 40960;
    }, isChrdev(mode) {
      return (mode & 61440) === 8192;
    }, isBlkdev(mode) {
      return (mode & 61440) === 24576;
    }, isFIFO(mode) {
      return (mode & 61440) === 4096;
    }, isSocket(mode) {
      return (mode & 49152) === 49152;
    }, flagsToPermissionString(flag) {
      var perms = ["r", "w", "rw"][flag & 3];
      if (flag & 512) {
        perms += "w";
      }
      return perms;
    }, nodePermissions(node, perms) {
      if (FS.ignorePermissions) {
        return 0;
      }
      if (perms.includes("r") && !(node.mode & 292)) {
        return 2;
      } else if (perms.includes("w") && !(node.mode & 146)) {
        return 2;
      } else if (perms.includes("x") && !(node.mode & 73)) {
        return 2;
      }
      return 0;
    }, mayLookup(dir) {
      if (!FS.isDir(dir.mode))
        return 54;
      var errCode = FS.nodePermissions(dir, "x");
      if (errCode)
        return errCode;
      if (!dir.node_ops.lookup)
        return 2;
      return 0;
    }, mayCreate(dir, name) {
      try {
        var node = FS.lookupNode(dir, name);
        return 20;
      } catch (e) {
      }
      return FS.nodePermissions(dir, "wx");
    }, mayDelete(dir, name, isdir) {
      var node;
      try {
        node = FS.lookupNode(dir, name);
      } catch (e) {
        return e.errno;
      }
      var errCode = FS.nodePermissions(dir, "wx");
      if (errCode) {
        return errCode;
      }
      if (isdir) {
        if (!FS.isDir(node.mode)) {
          return 54;
        }
        if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
          return 10;
        }
      } else {
        if (FS.isDir(node.mode)) {
          return 31;
        }
      }
      return 0;
    }, mayOpen(node, flags) {
      if (!node) {
        return 44;
      }
      if (FS.isLink(node.mode)) {
        return 32;
      } else if (FS.isDir(node.mode)) {
        if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
          return 31;
        }
      }
      return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
    }, MAX_OPEN_FDS: 4096, nextfd() {
      for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
        if (!FS.streams[fd]) {
          return fd;
        }
      }
      throw new FS.ErrnoError(33);
    }, getStreamChecked(fd) {
      var stream = FS.getStream(fd);
      if (!stream) {
        throw new FS.ErrnoError(8);
      }
      return stream;
    }, getStream: (fd) => FS.streams[fd], createStream(stream, fd = -1) {
      if (!FS.FSStream) {
        FS.FSStream = function() {
          this.shared = {};
        };
        FS.FSStream.prototype = {};
        Object.defineProperties(FS.FSStream.prototype, { object: { get() {
          return this.node;
        }, set(val) {
          this.node = val;
        } }, isRead: { get() {
          return (this.flags & 2097155) !== 1;
        } }, isWrite: { get() {
          return (this.flags & 2097155) !== 0;
        } }, isAppend: { get() {
          return this.flags & 1024;
        } }, flags: { get() {
          return this.shared.flags;
        }, set(val) {
          this.shared.flags = val;
        } }, position: { get() {
          return this.shared.position;
        }, set(val) {
          this.shared.position = val;
        } } });
      }
      stream = Object.assign(new FS.FSStream(), stream);
      if (fd == -1) {
        fd = FS.nextfd();
      }
      stream.fd = fd;
      FS.streams[fd] = stream;
      return stream;
    }, closeStream(fd) {
      FS.streams[fd] = null;
    }, chrdev_stream_ops: { open(stream) {
      var device = FS.getDevice(stream.node.rdev);
      stream.stream_ops = device.stream_ops;
      stream.stream_ops.open?.(stream);
    }, llseek() {
      throw new FS.ErrnoError(70);
    } }, major: (dev) => dev >> 8, minor: (dev) => dev & 255, makedev: (ma, mi) => ma << 8 | mi, registerDevice(dev, ops) {
      FS.devices[dev] = { stream_ops: ops };
    }, getDevice: (dev) => FS.devices[dev], getMounts(mount) {
      var mounts = [];
      var check = [mount];
      while (check.length) {
        var m = check.pop();
        mounts.push(m);
        check.push.apply(check, m.mounts);
      }
      return mounts;
    }, syncfs(populate, callback) {
      if (typeof populate == "function") {
        callback = populate;
        populate = false;
      }
      FS.syncFSRequests++;
      if (FS.syncFSRequests > 1) {
        err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
      }
      var mounts = FS.getMounts(FS.root.mount);
      var completed = 0;
      function doCallback(errCode) {
        FS.syncFSRequests--;
        return callback(errCode);
      }
      function done(errCode) {
        if (errCode) {
          if (!done.errored) {
            done.errored = true;
            return doCallback(errCode);
          }
          return;
        }
        if (++completed >= mounts.length) {
          doCallback(null);
        }
      }
      mounts.forEach((mount) => {
        if (!mount.type.syncfs) {
          return done(null);
        }
        mount.type.syncfs(mount, populate, done);
      });
    }, mount(type, opts, mountpoint) {
      var root = mountpoint === "/";
      var pseudo = !mountpoint;
      var node;
      if (root && FS.root) {
        throw new FS.ErrnoError(10);
      } else if (!root && !pseudo) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
        mountpoint = lookup.path;
        node = lookup.node;
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        if (!FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
      }
      var mount = { type, opts, mountpoint, mounts: [] };
      var mountRoot = type.mount(mount);
      mountRoot.mount = mount;
      mount.root = mountRoot;
      if (root) {
        FS.root = mountRoot;
      } else if (node) {
        node.mounted = mount;
        if (node.mount) {
          node.mount.mounts.push(mount);
        }
      }
      return mountRoot;
    }, unmount(mountpoint) {
      var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
      if (!FS.isMountpoint(lookup.node)) {
        throw new FS.ErrnoError(28);
      }
      var node = lookup.node;
      var mount = node.mounted;
      var mounts = FS.getMounts(mount);
      Object.keys(FS.nameTable).forEach((hash) => {
        var current = FS.nameTable[hash];
        while (current) {
          var next = current.name_next;
          if (mounts.includes(current.mount)) {
            FS.destroyNode(current);
          }
          current = next;
        }
      });
      node.mounted = null;
      var idx = node.mount.mounts.indexOf(mount);
      node.mount.mounts.splice(idx, 1);
    }, lookup(parent, name) {
      return parent.node_ops.lookup(parent, name);
    }, mknod(path, mode, dev) {
      var lookup = FS.lookupPath(path, { parent: true });
      var parent = lookup.node;
      var name = PATH.basename(path);
      if (!name || name === "." || name === "..") {
        throw new FS.ErrnoError(28);
      }
      var errCode = FS.mayCreate(parent, name);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!parent.node_ops.mknod) {
        throw new FS.ErrnoError(63);
      }
      return parent.node_ops.mknod(parent, name, mode, dev);
    }, create(path, mode) {
      mode = mode !== void 0 ? mode : 438;
      mode &= 4095;
      mode |= 32768;
      return FS.mknod(path, mode, 0);
    }, mkdir(path, mode) {
      mode = mode !== void 0 ? mode : 511;
      mode &= 511 | 512;
      mode |= 16384;
      return FS.mknod(path, mode, 0);
    }, mkdirTree(path, mode) {
      var dirs = path.split("/");
      var d = "";
      for (var i = 0; i < dirs.length; ++i) {
        if (!dirs[i])
          continue;
        d += "/" + dirs[i];
        try {
          FS.mkdir(d, mode);
        } catch (e) {
          if (e.errno != 20)
            throw e;
        }
      }
    }, mkdev(path, mode, dev) {
      if (typeof dev == "undefined") {
        dev = mode;
        mode = 438;
      }
      mode |= 8192;
      return FS.mknod(path, mode, dev);
    }, symlink(oldpath, newpath) {
      if (!PATH_FS.resolve(oldpath)) {
        throw new FS.ErrnoError(44);
      }
      var lookup = FS.lookupPath(newpath, { parent: true });
      var parent = lookup.node;
      if (!parent) {
        throw new FS.ErrnoError(44);
      }
      var newname = PATH.basename(newpath);
      var errCode = FS.mayCreate(parent, newname);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!parent.node_ops.symlink) {
        throw new FS.ErrnoError(63);
      }
      return parent.node_ops.symlink(parent, newname, oldpath);
    }, rename(old_path, new_path) {
      var old_dirname = PATH.dirname(old_path);
      var new_dirname = PATH.dirname(new_path);
      var old_name = PATH.basename(old_path);
      var new_name = PATH.basename(new_path);
      var lookup, old_dir, new_dir;
      lookup = FS.lookupPath(old_path, { parent: true });
      old_dir = lookup.node;
      lookup = FS.lookupPath(new_path, { parent: true });
      new_dir = lookup.node;
      if (!old_dir || !new_dir)
        throw new FS.ErrnoError(44);
      if (old_dir.mount !== new_dir.mount) {
        throw new FS.ErrnoError(75);
      }
      var old_node = FS.lookupNode(old_dir, old_name);
      var relative = PATH_FS.relative(old_path, new_dirname);
      if (relative.charAt(0) !== ".") {
        throw new FS.ErrnoError(28);
      }
      relative = PATH_FS.relative(new_path, old_dirname);
      if (relative.charAt(0) !== ".") {
        throw new FS.ErrnoError(55);
      }
      var new_node;
      try {
        new_node = FS.lookupNode(new_dir, new_name);
      } catch (e) {
      }
      if (old_node === new_node) {
        return;
      }
      var isdir = FS.isDir(old_node.mode);
      var errCode = FS.mayDelete(old_dir, old_name, isdir);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!old_dir.node_ops.rename) {
        throw new FS.ErrnoError(63);
      }
      if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
        throw new FS.ErrnoError(10);
      }
      if (new_dir !== old_dir) {
        errCode = FS.nodePermissions(old_dir, "w");
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
      }
      FS.hashRemoveNode(old_node);
      try {
        old_dir.node_ops.rename(old_node, new_dir, new_name);
      } catch (e) {
        throw e;
      } finally {
        FS.hashAddNode(old_node);
      }
    }, rmdir(path) {
      var lookup = FS.lookupPath(path, { parent: true });
      var parent = lookup.node;
      var name = PATH.basename(path);
      var node = FS.lookupNode(parent, name);
      var errCode = FS.mayDelete(parent, name, true);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!parent.node_ops.rmdir) {
        throw new FS.ErrnoError(63);
      }
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10);
      }
      parent.node_ops.rmdir(parent, name);
      FS.destroyNode(node);
    }, readdir(path) {
      var lookup = FS.lookupPath(path, { follow: true });
      var node = lookup.node;
      if (!node.node_ops.readdir) {
        throw new FS.ErrnoError(54);
      }
      return node.node_ops.readdir(node);
    }, unlink(path) {
      var lookup = FS.lookupPath(path, { parent: true });
      var parent = lookup.node;
      if (!parent) {
        throw new FS.ErrnoError(44);
      }
      var name = PATH.basename(path);
      var node = FS.lookupNode(parent, name);
      var errCode = FS.mayDelete(parent, name, false);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!parent.node_ops.unlink) {
        throw new FS.ErrnoError(63);
      }
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10);
      }
      parent.node_ops.unlink(parent, name);
      FS.destroyNode(node);
    }, readlink(path) {
      var lookup = FS.lookupPath(path);
      var link = lookup.node;
      if (!link) {
        throw new FS.ErrnoError(44);
      }
      if (!link.node_ops.readlink) {
        throw new FS.ErrnoError(28);
      }
      return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
    }, stat(path, dontFollow) {
      var lookup = FS.lookupPath(path, { follow: !dontFollow });
      var node = lookup.node;
      if (!node) {
        throw new FS.ErrnoError(44);
      }
      if (!node.node_ops.getattr) {
        throw new FS.ErrnoError(63);
      }
      return node.node_ops.getattr(node);
    }, lstat(path) {
      return FS.stat(path, true);
    }, chmod(path, mode, dontFollow) {
      var node;
      if (typeof path == "string") {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        node = lookup.node;
      } else {
        node = path;
      }
      if (!node.node_ops.setattr) {
        throw new FS.ErrnoError(63);
      }
      node.node_ops.setattr(node, { mode: mode & 4095 | node.mode & ~4095, timestamp: Date.now() });
    }, lchmod(path, mode) {
      FS.chmod(path, mode, true);
    }, fchmod(fd, mode) {
      var stream = FS.getStreamChecked(fd);
      FS.chmod(stream.node, mode);
    }, chown(path, uid, gid, dontFollow) {
      var node;
      if (typeof path == "string") {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        node = lookup.node;
      } else {
        node = path;
      }
      if (!node.node_ops.setattr) {
        throw new FS.ErrnoError(63);
      }
      node.node_ops.setattr(node, { timestamp: Date.now() });
    }, lchown(path, uid, gid) {
      FS.chown(path, uid, gid, true);
    }, fchown(fd, uid, gid) {
      var stream = FS.getStreamChecked(fd);
      FS.chown(stream.node, uid, gid);
    }, truncate(path, len) {
      if (len < 0) {
        throw new FS.ErrnoError(28);
      }
      var node;
      if (typeof path == "string") {
        var lookup = FS.lookupPath(path, { follow: true });
        node = lookup.node;
      } else {
        node = path;
      }
      if (!node.node_ops.setattr) {
        throw new FS.ErrnoError(63);
      }
      if (FS.isDir(node.mode)) {
        throw new FS.ErrnoError(31);
      }
      if (!FS.isFile(node.mode)) {
        throw new FS.ErrnoError(28);
      }
      var errCode = FS.nodePermissions(node, "w");
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      node.node_ops.setattr(node, { size: len, timestamp: Date.now() });
    }, ftruncate(fd, len) {
      var stream = FS.getStreamChecked(fd);
      if ((stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(28);
      }
      FS.truncate(stream.node, len);
    }, utime(path, atime, mtime) {
      var lookup = FS.lookupPath(path, { follow: true });
      var node = lookup.node;
      node.node_ops.setattr(node, { timestamp: Math.max(atime, mtime) });
    }, open(path, flags, mode) {
      if (path === "") {
        throw new FS.ErrnoError(44);
      }
      flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
      mode = typeof mode == "undefined" ? 438 : mode;
      if (flags & 64) {
        mode = mode & 4095 | 32768;
      } else {
        mode = 0;
      }
      var node;
      if (typeof path == "object") {
        node = path;
      } else {
        path = PATH.normalize(path);
        try {
          var lookup = FS.lookupPath(path, { follow: !(flags & 131072) });
          node = lookup.node;
        } catch (e) {
        }
      }
      var created = false;
      if (flags & 64) {
        if (node) {
          if (flags & 128) {
            throw new FS.ErrnoError(20);
          }
        } else {
          node = FS.mknod(path, mode, 0);
          created = true;
        }
      }
      if (!node) {
        throw new FS.ErrnoError(44);
      }
      if (FS.isChrdev(node.mode)) {
        flags &= ~512;
      }
      if (flags & 65536 && !FS.isDir(node.mode)) {
        throw new FS.ErrnoError(54);
      }
      if (!created) {
        var errCode = FS.mayOpen(node, flags);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
      }
      if (flags & 512 && !created) {
        FS.truncate(node, 0);
      }
      flags &= ~(128 | 512 | 131072);
      var stream = FS.createStream({ node, path: FS.getPath(node), flags, seekable: true, position: 0, stream_ops: node.stream_ops, ungotten: [], error: false });
      if (stream.stream_ops.open) {
        stream.stream_ops.open(stream);
      }
      if (Module["logReadFiles"] && !(flags & 1)) {
        if (!FS.readFiles)
          FS.readFiles = {};
        if (!(path in FS.readFiles)) {
          FS.readFiles[path] = 1;
        }
      }
      return stream;
    }, close(stream) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if (stream.getdents)
        stream.getdents = null;
      try {
        if (stream.stream_ops.close) {
          stream.stream_ops.close(stream);
        }
      } catch (e) {
        throw e;
      } finally {
        FS.closeStream(stream.fd);
      }
      stream.fd = null;
    }, isClosed(stream) {
      return stream.fd === null;
    }, llseek(stream, offset, whence) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if (!stream.seekable || !stream.stream_ops.llseek) {
        throw new FS.ErrnoError(70);
      }
      if (whence != 0 && whence != 1 && whence != 2) {
        throw new FS.ErrnoError(28);
      }
      stream.position = stream.stream_ops.llseek(stream, offset, whence);
      stream.ungotten = [];
      return stream.position;
    }, read(stream, buffer, offset, length, position) {
      if (length < 0 || position < 0) {
        throw new FS.ErrnoError(28);
      }
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if ((stream.flags & 2097155) === 1) {
        throw new FS.ErrnoError(8);
      }
      if (FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(31);
      }
      if (!stream.stream_ops.read) {
        throw new FS.ErrnoError(28);
      }
      var seeking = typeof position != "undefined";
      if (!seeking) {
        position = stream.position;
      } else if (!stream.seekable) {
        throw new FS.ErrnoError(70);
      }
      var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
      if (!seeking)
        stream.position += bytesRead;
      return bytesRead;
    }, write(stream, buffer, offset, length, position, canOwn) {
      if (length < 0 || position < 0) {
        throw new FS.ErrnoError(28);
      }
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if ((stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(8);
      }
      if (FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(31);
      }
      if (!stream.stream_ops.write) {
        throw new FS.ErrnoError(28);
      }
      if (stream.seekable && stream.flags & 1024) {
        FS.llseek(stream, 0, 2);
      }
      var seeking = typeof position != "undefined";
      if (!seeking) {
        position = stream.position;
      } else if (!stream.seekable) {
        throw new FS.ErrnoError(70);
      }
      var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
      if (!seeking)
        stream.position += bytesWritten;
      return bytesWritten;
    }, allocate(stream, offset, length) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if (offset < 0 || length <= 0) {
        throw new FS.ErrnoError(28);
      }
      if ((stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(8);
      }
      if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(43);
      }
      if (!stream.stream_ops.allocate) {
        throw new FS.ErrnoError(138);
      }
      stream.stream_ops.allocate(stream, offset, length);
    }, mmap(stream, length, position, prot, flags) {
      if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
        throw new FS.ErrnoError(2);
      }
      if ((stream.flags & 2097155) === 1) {
        throw new FS.ErrnoError(2);
      }
      if (!stream.stream_ops.mmap) {
        throw new FS.ErrnoError(43);
      }
      return stream.stream_ops.mmap(stream, length, position, prot, flags);
    }, msync(stream, buffer, offset, length, mmapFlags) {
      if (!stream.stream_ops.msync) {
        return 0;
      }
      return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
    }, munmap: (stream) => 0, ioctl(stream, cmd, arg) {
      if (!stream.stream_ops.ioctl) {
        throw new FS.ErrnoError(59);
      }
      return stream.stream_ops.ioctl(stream, cmd, arg);
    }, readFile(path, opts = {}) {
      opts.flags = opts.flags || 0;
      opts.encoding = opts.encoding || "binary";
      if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
        throw new Error(`Invalid encoding type "${opts.encoding}"`);
      }
      var ret;
      var stream = FS.open(path, opts.flags);
      var stat = FS.stat(path);
      var length = stat.size;
      var buf = new Uint8Array(length);
      FS.read(stream, buf, 0, length, 0);
      if (opts.encoding === "utf8") {
        ret = UTF8ArrayToString(buf, 0);
      } else if (opts.encoding === "binary") {
        ret = buf;
      }
      FS.close(stream);
      return ret;
    }, writeFile(path, data, opts = {}) {
      opts.flags = opts.flags || 577;
      var stream = FS.open(path, opts.flags, opts.mode);
      if (typeof data == "string") {
        var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
        var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
        FS.write(stream, buf, 0, actualNumBytes, void 0, opts.canOwn);
      } else if (ArrayBuffer.isView(data)) {
        FS.write(stream, data, 0, data.byteLength, void 0, opts.canOwn);
      } else {
        throw new Error("Unsupported data type");
      }
      FS.close(stream);
    }, cwd: () => FS.currentPath, chdir(path) {
      var lookup = FS.lookupPath(path, { follow: true });
      if (lookup.node === null) {
        throw new FS.ErrnoError(44);
      }
      if (!FS.isDir(lookup.node.mode)) {
        throw new FS.ErrnoError(54);
      }
      var errCode = FS.nodePermissions(lookup.node, "x");
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      FS.currentPath = lookup.path;
    }, createDefaultDirectories() {
      FS.mkdir("/tmp");
      FS.mkdir("/home");
      FS.mkdir("/home/web_user");
    }, createDefaultDevices() {
      FS.mkdir("/dev");
      FS.registerDevice(FS.makedev(1, 3), { read: () => 0, write: (stream, buffer, offset, length, pos) => length });
      FS.mkdev("/dev/null", FS.makedev(1, 3));
      TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
      TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
      FS.mkdev("/dev/tty", FS.makedev(5, 0));
      FS.mkdev("/dev/tty1", FS.makedev(6, 0));
      var randomBuffer = new Uint8Array(1024), randomLeft = 0;
      var randomByte = () => {
        if (randomLeft === 0) {
          randomLeft = randomFill(randomBuffer).byteLength;
        }
        return randomBuffer[--randomLeft];
      };
      FS.createDevice("/dev", "random", randomByte);
      FS.createDevice("/dev", "urandom", randomByte);
      FS.mkdir("/dev/shm");
      FS.mkdir("/dev/shm/tmp");
    }, createSpecialDirectories() {
      FS.mkdir("/proc");
      var proc_self = FS.mkdir("/proc/self");
      FS.mkdir("/proc/self/fd");
      FS.mount({ mount() {
        var node = FS.createNode(proc_self, "fd", 16384 | 511, 73);
        node.node_ops = { lookup(parent, name) {
          var fd = +name;
          var stream = FS.getStreamChecked(fd);
          var ret = { parent: null, mount: { mountpoint: "fake" }, node_ops: { readlink: () => stream.path } };
          ret.parent = ret;
          return ret;
        } };
        return node;
      } }, {}, "/proc/self/fd");
    }, createStandardStreams() {
      if (Module["stdin"]) {
        FS.createDevice("/dev", "stdin", Module["stdin"]);
      } else {
        FS.symlink("/dev/tty", "/dev/stdin");
      }
      if (Module["stdout"]) {
        FS.createDevice("/dev", "stdout", null, Module["stdout"]);
      } else {
        FS.symlink("/dev/tty", "/dev/stdout");
      }
      if (Module["stderr"]) {
        FS.createDevice("/dev", "stderr", null, Module["stderr"]);
      } else {
        FS.symlink("/dev/tty1", "/dev/stderr");
      }
      var stdin = FS.open("/dev/stdin", 0);
      var stdout = FS.open("/dev/stdout", 1);
      var stderr = FS.open("/dev/stderr", 1);
    }, staticInit() {
      [44].forEach((code) => {
        FS.genericErrors[code] = new FS.ErrnoError(code);
        FS.genericErrors[code].stack = "<generic error, no stack>";
      });
      FS.nameTable = new Array(4096);
      FS.mount(MEMFS, {}, "/");
      FS.createDefaultDirectories();
      FS.createDefaultDevices();
      FS.createSpecialDirectories();
      FS.filesystems = { "MEMFS": MEMFS };
    }, init(input, output, error) {
      FS.init.initialized = true;
      Module["stdin"] = input || Module["stdin"];
      Module["stdout"] = output || Module["stdout"];
      Module["stderr"] = error || Module["stderr"];
      FS.createStandardStreams();
    }, quit() {
      FS.init.initialized = false;
      for (var i = 0; i < FS.streams.length; i++) {
        var stream = FS.streams[i];
        if (!stream) {
          continue;
        }
        FS.close(stream);
      }
    }, findObject(path, dontResolveLastLink) {
      var ret = FS.analyzePath(path, dontResolveLastLink);
      if (!ret.exists) {
        return null;
      }
      return ret.object;
    }, analyzePath(path, dontResolveLastLink) {
      try {
        var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
        path = lookup.path;
      } catch (e) {
      }
      var ret = { isRoot: false, exists: false, error: 0, name: null, path: null, object: null, parentExists: false, parentPath: null, parentObject: null };
      try {
        var lookup = FS.lookupPath(path, { parent: true });
        ret.parentExists = true;
        ret.parentPath = lookup.path;
        ret.parentObject = lookup.node;
        ret.name = PATH.basename(path);
        lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
        ret.exists = true;
        ret.path = lookup.path;
        ret.object = lookup.node;
        ret.name = lookup.node.name;
        ret.isRoot = lookup.path === "/";
      } catch (e) {
        ret.error = e.errno;
      }
      return ret;
    }, createPath(parent, path, canRead, canWrite) {
      parent = typeof parent == "string" ? parent : FS.getPath(parent);
      var parts = path.split("/").reverse();
      while (parts.length) {
        var part = parts.pop();
        if (!part)
          continue;
        var current = PATH.join2(parent, part);
        try {
          FS.mkdir(current);
        } catch (e) {
        }
        parent = current;
      }
      return current;
    }, createFile(parent, name, properties, canRead, canWrite) {
      var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
      var mode = FS_getMode(canRead, canWrite);
      return FS.create(path, mode);
    }, createDataFile(parent, name, data, canRead, canWrite, canOwn) {
      var path = name;
      if (parent) {
        parent = typeof parent == "string" ? parent : FS.getPath(parent);
        path = name ? PATH.join2(parent, name) : parent;
      }
      var mode = FS_getMode(canRead, canWrite);
      var node = FS.create(path, mode);
      if (data) {
        if (typeof data == "string") {
          var arr = new Array(data.length);
          for (var i = 0, len = data.length; i < len; ++i)
            arr[i] = data.charCodeAt(i);
          data = arr;
        }
        FS.chmod(node, mode | 146);
        var stream = FS.open(node, 577);
        FS.write(stream, data, 0, data.length, 0, canOwn);
        FS.close(stream);
        FS.chmod(node, mode);
      }
    }, createDevice(parent, name, input, output) {
      var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
      var mode = FS_getMode(!!input, !!output);
      if (!FS.createDevice.major)
        FS.createDevice.major = 64;
      var dev = FS.makedev(FS.createDevice.major++, 0);
      FS.registerDevice(dev, { open(stream) {
        stream.seekable = false;
      }, close(stream) {
        if (output?.buffer?.length) {
          output(10);
        }
      }, read(stream, buffer, offset, length, pos) {
        var bytesRead = 0;
        for (var i = 0; i < length; i++) {
          var result;
          try {
            result = input();
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (result === void 0 && bytesRead === 0) {
            throw new FS.ErrnoError(6);
          }
          if (result === null || result === void 0)
            break;
          bytesRead++;
          buffer[offset + i] = result;
        }
        if (bytesRead) {
          stream.node.timestamp = Date.now();
        }
        return bytesRead;
      }, write(stream, buffer, offset, length, pos) {
        for (var i = 0; i < length; i++) {
          try {
            output(buffer[offset + i]);
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        }
        if (length) {
          stream.node.timestamp = Date.now();
        }
        return i;
      } });
      return FS.mkdev(path, mode, dev);
    }, forceLoadFile(obj) {
      if (obj.isDevice || obj.isFolder || obj.link || obj.contents)
        return true;
      if (typeof XMLHttpRequest != "undefined") {
        throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
      } else if (read_) {
        try {
          obj.contents = intArrayFromString(read_(obj.url), true);
          obj.usedBytes = obj.contents.length;
        } catch (e) {
          throw new FS.ErrnoError(29);
        }
      } else {
        throw new Error("Cannot load without read() or XMLHttpRequest.");
      }
    }, createLazyFile(parent, name, url, canRead, canWrite) {
      function LazyUint8Array() {
        this.lengthKnown = false;
        this.chunks = [];
      }
      LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
        if (idx > this.length - 1 || idx < 0) {
          return void 0;
        }
        var chunkOffset = idx % this.chunkSize;
        var chunkNum = idx / this.chunkSize | 0;
        return this.getter(chunkNum)[chunkOffset];
      };
      LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
        this.getter = getter;
      };
      LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
        var xhr = new XMLHttpRequest();
        xhr.open("HEAD", url, false);
        xhr.send(null);
        if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304))
          throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
        var datalength = Number(xhr.getResponseHeader("Content-length"));
        var header;
        var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
        var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
        var chunkSize = 1024 * 1024;
        if (!hasByteServing)
          chunkSize = datalength;
        var doXHR = (from, to) => {
          if (from > to)
            throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
          if (to > datalength - 1)
            throw new Error("only " + datalength + " bytes available! programmer error!");
          var xhr2 = new XMLHttpRequest();
          xhr2.open("GET", url, false);
          if (datalength !== chunkSize)
            xhr2.setRequestHeader("Range", "bytes=" + from + "-" + to);
          xhr2.responseType = "arraybuffer";
          if (xhr2.overrideMimeType) {
            xhr2.overrideMimeType("text/plain; charset=x-user-defined");
          }
          xhr2.send(null);
          if (!(xhr2.status >= 200 && xhr2.status < 300 || xhr2.status === 304))
            throw new Error("Couldn't load " + url + ". Status: " + xhr2.status);
          if (xhr2.response !== void 0) {
            return new Uint8Array(xhr2.response || []);
          }
          return intArrayFromString(xhr2.responseText || "", true);
        };
        var lazyArray2 = this;
        lazyArray2.setDataGetter((chunkNum) => {
          var start = chunkNum * chunkSize;
          var end = (chunkNum + 1) * chunkSize - 1;
          end = Math.min(end, datalength - 1);
          if (typeof lazyArray2.chunks[chunkNum] == "undefined") {
            lazyArray2.chunks[chunkNum] = doXHR(start, end);
          }
          if (typeof lazyArray2.chunks[chunkNum] == "undefined")
            throw new Error("doXHR failed!");
          return lazyArray2.chunks[chunkNum];
        });
        if (usesGzip || !datalength) {
          chunkSize = datalength = 1;
          datalength = this.getter(0).length;
          chunkSize = datalength;
          out("LazyFiles on gzip forces download of the whole file when length is accessed");
        }
        this._length = datalength;
        this._chunkSize = chunkSize;
        this.lengthKnown = true;
      };
      if (typeof XMLHttpRequest != "undefined") {
        if (!ENVIRONMENT_IS_WORKER)
          throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
        var lazyArray = new LazyUint8Array();
        Object.defineProperties(lazyArray, { length: { get: function() {
          if (!this.lengthKnown) {
            this.cacheLength();
          }
          return this._length;
        } }, chunkSize: { get: function() {
          if (!this.lengthKnown) {
            this.cacheLength();
          }
          return this._chunkSize;
        } } });
        var properties = { isDevice: false, contents: lazyArray };
      } else {
        var properties = { isDevice: false, url };
      }
      var node = FS.createFile(parent, name, properties, canRead, canWrite);
      if (properties.contents) {
        node.contents = properties.contents;
      } else if (properties.url) {
        node.contents = null;
        node.url = properties.url;
      }
      Object.defineProperties(node, { usedBytes: { get: function() {
        return this.contents.length;
      } } });
      var stream_ops = {};
      var keys = Object.keys(node.stream_ops);
      keys.forEach((key) => {
        var fn = node.stream_ops[key];
        stream_ops[key] = function forceLoadLazyFile() {
          FS.forceLoadFile(node);
          return fn.apply(null, arguments);
        };
      });
      function writeChunks(stream, buffer, offset, length, position) {
        var contents = stream.node.contents;
        if (position >= contents.length)
          return 0;
        var size = Math.min(contents.length - position, length);
        if (contents.slice) {
          for (var i = 0; i < size; i++) {
            buffer[offset + i] = contents[position + i];
          }
        } else {
          for (var i = 0; i < size; i++) {
            buffer[offset + i] = contents.get(position + i);
          }
        }
        return size;
      }
      stream_ops.read = (stream, buffer, offset, length, position) => {
        FS.forceLoadFile(node);
        return writeChunks(stream, buffer, offset, length, position);
      };
      stream_ops.mmap = (stream, length, position, prot, flags) => {
        FS.forceLoadFile(node);
        var ptr = mmapAlloc(length);
        if (!ptr) {
          throw new FS.ErrnoError(48);
        }
        writeChunks(stream, HEAP8, ptr, length, position);
        return { ptr, allocated: true };
      };
      node.stream_ops = stream_ops;
      return node;
    } };
    var UTF8ToString = (ptr, maxBytesToRead) => ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
    var SYSCALLS = { DEFAULT_POLLMASK: 5, calculateAt(dirfd, path, allowEmpty) {
      if (PATH.isAbs(path)) {
        return path;
      }
      var dir;
      if (dirfd === -100) {
        dir = FS.cwd();
      } else {
        var dirstream = SYSCALLS.getStreamFromFD(dirfd);
        dir = dirstream.path;
      }
      if (path.length == 0) {
        if (!allowEmpty) {
          throw new FS.ErrnoError(44);
        }
        return dir;
      }
      return PATH.join2(dir, path);
    }, doStat(func, path, buf) {
      var stat = func(path);
      HEAP32[buf >> 2] = stat.dev;
      HEAP32[buf + 4 >> 2] = stat.mode;
      HEAPU32[buf + 8 >> 2] = stat.nlink;
      HEAP32[buf + 12 >> 2] = stat.uid;
      HEAP32[buf + 16 >> 2] = stat.gid;
      HEAP32[buf + 20 >> 2] = stat.rdev;
      tempI64 = [stat.size >>> 0, (tempDouble = stat.size, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 24 >> 2] = tempI64[0], HEAP32[buf + 28 >> 2] = tempI64[1];
      HEAP32[buf + 32 >> 2] = 4096;
      HEAP32[buf + 36 >> 2] = stat.blocks;
      var atime = stat.atime.getTime();
      var mtime = stat.mtime.getTime();
      var ctime = stat.ctime.getTime();
      tempI64 = [Math.floor(atime / 1e3) >>> 0, (tempDouble = Math.floor(atime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 40 >> 2] = tempI64[0], HEAP32[buf + 44 >> 2] = tempI64[1];
      HEAPU32[buf + 48 >> 2] = atime % 1e3 * 1e3;
      tempI64 = [Math.floor(mtime / 1e3) >>> 0, (tempDouble = Math.floor(mtime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 56 >> 2] = tempI64[0], HEAP32[buf + 60 >> 2] = tempI64[1];
      HEAPU32[buf + 64 >> 2] = mtime % 1e3 * 1e3;
      tempI64 = [Math.floor(ctime / 1e3) >>> 0, (tempDouble = Math.floor(ctime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 72 >> 2] = tempI64[0], HEAP32[buf + 76 >> 2] = tempI64[1];
      HEAPU32[buf + 80 >> 2] = ctime % 1e3 * 1e3;
      tempI64 = [stat.ino >>> 0, (tempDouble = stat.ino, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 88 >> 2] = tempI64[0], HEAP32[buf + 92 >> 2] = tempI64[1];
      return 0;
    }, doMsync(addr, stream, len, flags, offset) {
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(43);
      }
      if (flags & 2) {
        return 0;
      }
      var buffer = HEAPU8.slice(addr, addr + len);
      FS.msync(stream, buffer, offset, len, flags);
    }, varargs: void 0, get() {
      var ret = HEAP32[+SYSCALLS.varargs >> 2];
      SYSCALLS.varargs += 4;
      return ret;
    }, getp() {
      return SYSCALLS.get();
    }, getStr(ptr) {
      var ret = UTF8ToString(ptr);
      return ret;
    }, getStreamFromFD(fd) {
      var stream = FS.getStreamChecked(fd);
      return stream;
    } };
    function ___syscall_fcntl64(fd, cmd, varargs) {
      SYSCALLS.varargs = varargs;
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        switch (cmd) {
          case 0: {
            var arg = SYSCALLS.get();
            if (arg < 0) {
              return -28;
            }
            while (FS.streams[arg]) {
              arg++;
            }
            var newStream;
            newStream = FS.createStream(stream, arg);
            return newStream.fd;
          }
          case 1:
          case 2:
            return 0;
          case 3:
            return stream.flags;
          case 4: {
            var arg = SYSCALLS.get();
            stream.flags |= arg;
            return 0;
          }
          case 12: {
            var arg = SYSCALLS.getp();
            var offset = 0;
            HEAP16[arg + offset >> 1] = 2;
            return 0;
          }
          case 13:
          case 14:
            return 0;
        }
        return -28;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return -e.errno;
      }
    }
    var stringToUTF8 = (str2, outPtr, maxBytesToWrite) => stringToUTF8Array(str2, HEAPU8, outPtr, maxBytesToWrite);
    function ___syscall_getdents64(fd, dirp, count) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        stream.getdents ||= FS.readdir(stream.path);
        var struct_size = 280;
        var pos = 0;
        var off = FS.llseek(stream, 0, 1);
        var idx = Math.floor(off / struct_size);
        while (idx < stream.getdents.length && pos + struct_size <= count) {
          var id;
          var type;
          var name = stream.getdents[idx];
          if (name === ".") {
            id = stream.node.id;
            type = 4;
          } else if (name === "..") {
            var lookup = FS.lookupPath(stream.path, { parent: true });
            id = lookup.node.id;
            type = 4;
          } else {
            var child = FS.lookupNode(stream.node, name);
            id = child.id;
            type = FS.isChrdev(child.mode) ? 2 : FS.isDir(child.mode) ? 4 : FS.isLink(child.mode) ? 10 : 8;
          }
          tempI64 = [id >>> 0, (tempDouble = id, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[dirp + pos >> 2] = tempI64[0], HEAP32[dirp + pos + 4 >> 2] = tempI64[1];
          tempI64 = [(idx + 1) * struct_size >>> 0, (tempDouble = (idx + 1) * struct_size, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[dirp + pos + 8 >> 2] = tempI64[0], HEAP32[dirp + pos + 12 >> 2] = tempI64[1];
          HEAP16[dirp + pos + 16 >> 1] = 280;
          HEAP8[dirp + pos + 18 >> 0] = type;
          stringToUTF8(name, dirp + pos + 19, 256);
          pos += struct_size;
          idx += 1;
        }
        FS.llseek(stream, idx * struct_size, 0);
        return pos;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return -e.errno;
      }
    }
    function ___syscall_ioctl(fd, op, varargs) {
      SYSCALLS.varargs = varargs;
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        switch (op) {
          case 21509: {
            if (!stream.tty)
              return -59;
            return 0;
          }
          case 21505: {
            if (!stream.tty)
              return -59;
            if (stream.tty.ops.ioctl_tcgets) {
              var termios = stream.tty.ops.ioctl_tcgets(stream);
              var argp = SYSCALLS.getp();
              HEAP32[argp >> 2] = termios.c_iflag || 0;
              HEAP32[argp + 4 >> 2] = termios.c_oflag || 0;
              HEAP32[argp + 8 >> 2] = termios.c_cflag || 0;
              HEAP32[argp + 12 >> 2] = termios.c_lflag || 0;
              for (var i = 0; i < 32; i++) {
                HEAP8[argp + i + 17 >> 0] = termios.c_cc[i] || 0;
              }
              return 0;
            }
            return 0;
          }
          case 21510:
          case 21511:
          case 21512: {
            if (!stream.tty)
              return -59;
            return 0;
          }
          case 21506:
          case 21507:
          case 21508: {
            if (!stream.tty)
              return -59;
            if (stream.tty.ops.ioctl_tcsets) {
              var argp = SYSCALLS.getp();
              var c_iflag = HEAP32[argp >> 2];
              var c_oflag = HEAP32[argp + 4 >> 2];
              var c_cflag = HEAP32[argp + 8 >> 2];
              var c_lflag = HEAP32[argp + 12 >> 2];
              var c_cc = [];
              for (var i = 0; i < 32; i++) {
                c_cc.push(HEAP8[argp + i + 17 >> 0]);
              }
              return stream.tty.ops.ioctl_tcsets(stream.tty, op, { c_iflag, c_oflag, c_cflag, c_lflag, c_cc });
            }
            return 0;
          }
          case 21519: {
            if (!stream.tty)
              return -59;
            var argp = SYSCALLS.getp();
            HEAP32[argp >> 2] = 0;
            return 0;
          }
          case 21520: {
            if (!stream.tty)
              return -59;
            return -28;
          }
          case 21531: {
            var argp = SYSCALLS.getp();
            return FS.ioctl(stream, op, argp);
          }
          case 21523: {
            if (!stream.tty)
              return -59;
            if (stream.tty.ops.ioctl_tiocgwinsz) {
              var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
              var argp = SYSCALLS.getp();
              HEAP16[argp >> 1] = winsize[0];
              HEAP16[argp + 2 >> 1] = winsize[1];
            }
            return 0;
          }
          case 21524: {
            if (!stream.tty)
              return -59;
            return 0;
          }
          case 21515: {
            if (!stream.tty)
              return -59;
            return 0;
          }
          default:
            return -28;
        }
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return -e.errno;
      }
    }
    function ___syscall_openat(dirfd, path, flags, varargs) {
      SYSCALLS.varargs = varargs;
      try {
        path = SYSCALLS.getStr(path);
        path = SYSCALLS.calculateAt(dirfd, path);
        var mode = varargs ? SYSCALLS.get() : 0;
        return FS.open(path, flags, mode).fd;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return -e.errno;
      }
    }
    function ___syscall_readlinkat(dirfd, path, buf, bufsize) {
      try {
        path = SYSCALLS.getStr(path);
        path = SYSCALLS.calculateAt(dirfd, path);
        if (bufsize <= 0)
          return -28;
        var ret = FS.readlink(path);
        var len = Math.min(bufsize, lengthBytesUTF8(ret));
        var endChar = HEAP8[buf + len];
        stringToUTF8(ret, buf, bufsize + 1);
        HEAP8[buf + len] = endChar;
        return len;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return -e.errno;
      }
    }
    function ___syscall_stat64(path, buf) {
      try {
        path = SYSCALLS.getStr(path);
        return SYSCALLS.doStat(FS.stat, path, buf);
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return -e.errno;
      }
    }
    function ___syscall_symlink(target, linkpath) {
      try {
        target = SYSCALLS.getStr(target);
        linkpath = SYSCALLS.getStr(linkpath);
        FS.symlink(target, linkpath);
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return -e.errno;
      }
    }
    function ___syscall_unlinkat(dirfd, path, flags) {
      try {
        path = SYSCALLS.getStr(path);
        path = SYSCALLS.calculateAt(dirfd, path);
        if (flags === 0) {
          FS.unlink(path);
        } else if (flags === 512) {
          FS.rmdir(path);
        } else {
          abort("Invalid flags passed to unlinkat");
        }
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return -e.errno;
      }
    }
    function __emscripten_fetch_free(id) {
      if (Fetch.xhrs.has(id)) {
        var xhr = Fetch.xhrs.get(id);
        Fetch.xhrs.free(id);
        if (xhr.readyState > 0 && xhr.readyState < 4) {
          xhr.abort();
        }
      }
    }
    var nowIsMonotonic = 1;
    var __emscripten_get_now_is_monotonic = () => nowIsMonotonic;
    var convertI32PairToI53Checked = (lo, hi) => hi + 2097152 >>> 0 < 4194305 - !!lo ? (lo >>> 0) + hi * 4294967296 : NaN;
    function __gmtime_js(time_low, time_high, tmPtr) {
      var time = convertI32PairToI53Checked(time_low, time_high);
      var date = new Date(time * 1e3);
      HEAP32[tmPtr >> 2] = date.getUTCSeconds();
      HEAP32[tmPtr + 4 >> 2] = date.getUTCMinutes();
      HEAP32[tmPtr + 8 >> 2] = date.getUTCHours();
      HEAP32[tmPtr + 12 >> 2] = date.getUTCDate();
      HEAP32[tmPtr + 16 >> 2] = date.getUTCMonth();
      HEAP32[tmPtr + 20 >> 2] = date.getUTCFullYear() - 1900;
      HEAP32[tmPtr + 24 >> 2] = date.getUTCDay();
      var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
      var yday = (date.getTime() - start) / (1e3 * 60 * 60 * 24) | 0;
      HEAP32[tmPtr + 28 >> 2] = yday;
    }
    var isLeapYear = (year) => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    var MONTH_DAYS_LEAP_CUMULATIVE = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
    var MONTH_DAYS_REGULAR_CUMULATIVE = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var ydayFromDate = (date) => {
      var leap = isLeapYear(date.getFullYear());
      var monthDaysCumulative = leap ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE;
      var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1;
      return yday;
    };
    function __localtime_js(time_low, time_high, tmPtr) {
      var time = convertI32PairToI53Checked(time_low, time_high);
      var date = new Date(time * 1e3);
      HEAP32[tmPtr >> 2] = date.getSeconds();
      HEAP32[tmPtr + 4 >> 2] = date.getMinutes();
      HEAP32[tmPtr + 8 >> 2] = date.getHours();
      HEAP32[tmPtr + 12 >> 2] = date.getDate();
      HEAP32[tmPtr + 16 >> 2] = date.getMonth();
      HEAP32[tmPtr + 20 >> 2] = date.getFullYear() - 1900;
      HEAP32[tmPtr + 24 >> 2] = date.getDay();
      var yday = ydayFromDate(date) | 0;
      HEAP32[tmPtr + 28 >> 2] = yday;
      HEAP32[tmPtr + 36 >> 2] = -(date.getTimezoneOffset() * 60);
      var start = new Date(date.getFullYear(), 0, 1);
      var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
      var winterOffset = start.getTimezoneOffset();
      var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
      HEAP32[tmPtr + 32 >> 2] = dst;
    }
    var stringToNewUTF8 = (str2) => {
      var size = lengthBytesUTF8(str2) + 1;
      var ret = _malloc(size);
      if (ret)
        stringToUTF8(str2, ret, size);
      return ret;
    };
    var __tzset_js = (timezone, daylight, tzname) => {
      var currentYear = new Date().getFullYear();
      var winter = new Date(currentYear, 0, 1);
      var summer = new Date(currentYear, 6, 1);
      var winterOffset = winter.getTimezoneOffset();
      var summerOffset = summer.getTimezoneOffset();
      var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
      HEAPU32[timezone >> 2] = stdTimezoneOffset * 60;
      HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
      function extractZone(date) {
        var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
        return match ? match[1] : "GMT";
      }
      var winterName = extractZone(winter);
      var summerName = extractZone(summer);
      var winterNamePtr = stringToNewUTF8(winterName);
      var summerNamePtr = stringToNewUTF8(summerName);
      if (summerOffset < winterOffset) {
        HEAPU32[tzname >> 2] = winterNamePtr;
        HEAPU32[tzname + 4 >> 2] = summerNamePtr;
      } else {
        HEAPU32[tzname >> 2] = summerNamePtr;
        HEAPU32[tzname + 4 >> 2] = winterNamePtr;
      }
    };
    var _abort = () => {
      abort("");
    };
    var handleException = (e) => {
      if (e instanceof ExitStatus || e == "unwind") {
        return EXITSTATUS;
      }
      quit_(1, e);
    };
    var runtimeKeepaliveCounter = 0;
    var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
    var _proc_exit = (code) => {
      EXITSTATUS = code;
      if (!keepRuntimeAlive()) {
        Module["onExit"]?.(code);
        ABORT = true;
      }
      quit_(code, new ExitStatus(code));
    };
    var exitJS = (status, implicit) => {
      EXITSTATUS = status;
      _proc_exit(status);
    };
    var _exit = exitJS;
    var maybeExit = () => {
      if (!keepRuntimeAlive()) {
        try {
          _exit(EXITSTATUS);
        } catch (e) {
          handleException(e);
        }
      }
    };
    var callUserCallback = (func) => {
      if (ABORT) {
        return;
      }
      try {
        func();
        maybeExit();
      } catch (e) {
        handleException(e);
      }
    };
    var safeSetTimeout = (func, timeout) => setTimeout(() => {
      callUserCallback(func);
    }, timeout);
    var _emscripten_set_main_loop_timing = (mode, value) => {
      Browser.mainLoop.timingMode = mode;
      Browser.mainLoop.timingValue = value;
      if (!Browser.mainLoop.func) {
        return 1;
      }
      if (!Browser.mainLoop.running) {
        Browser.mainLoop.running = true;
      }
      if (mode == 0) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
          var timeUntilNextTick = Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now()) | 0;
          setTimeout(Browser.mainLoop.runner, timeUntilNextTick);
        };
        Browser.mainLoop.method = "timeout";
      } else if (mode == 1) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
          Browser.requestAnimationFrame(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = "rAF";
      } else if (mode == 2) {
        if (typeof Browser.setImmediate == "undefined") {
          if (typeof setImmediate == "undefined") {
            var setImmediates = [];
            var emscriptenMainLoopMessageId = "setimmediate";
            var Browser_setImmediate_messageHandler = (event) => {
              if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
                event.stopPropagation();
                setImmediates.shift()();
              }
            };
            addEventListener("message", Browser_setImmediate_messageHandler, true);
            Browser.setImmediate = function Browser_emulated_setImmediate(func) {
              setImmediates.push(func);
              if (ENVIRONMENT_IS_WORKER) {
                if (Module["setImmediates"] === void 0)
                  Module["setImmediates"] = [];
                Module["setImmediates"].push(func);
                postMessage({ target: emscriptenMainLoopMessageId });
              } else
                postMessage(emscriptenMainLoopMessageId, "*");
            };
          } else {
            Browser.setImmediate = setImmediate;
          }
        }
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
          Browser.setImmediate(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = "immediate";
      }
      return 0;
    };
    var _emscripten_get_now;
    _emscripten_get_now = () => performance.now();
    var setMainLoop = (browserIterationFunc, fps, simulateInfiniteLoop, arg, noSetTiming) => {
      assert(!Browser.mainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
      Browser.mainLoop.func = browserIterationFunc;
      Browser.mainLoop.arg = arg;
      var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop;
      function checkIsRunning() {
        if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) {
          return false;
        }
        return true;
      }
      Browser.mainLoop.running = false;
      Browser.mainLoop.runner = function Browser_mainLoop_runner() {
        if (ABORT)
          return;
        if (Browser.mainLoop.queue.length > 0) {
          var start = Date.now();
          var blocker = Browser.mainLoop.queue.shift();
          blocker.func(blocker.arg);
          if (Browser.mainLoop.remainingBlockers) {
            var remaining = Browser.mainLoop.remainingBlockers;
            var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
            if (blocker.counted) {
              Browser.mainLoop.remainingBlockers = next;
            } else {
              next = next + 0.5;
              Browser.mainLoop.remainingBlockers = (8 * remaining + next) / 9;
            }
          }
          Browser.mainLoop.updateStatus();
          if (!checkIsRunning())
            return;
          setTimeout(Browser.mainLoop.runner, 0);
          return;
        }
        if (!checkIsRunning())
          return;
        Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;
        if (Browser.mainLoop.timingMode == 1 && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
          Browser.mainLoop.scheduler();
          return;
        } else if (Browser.mainLoop.timingMode == 0) {
          Browser.mainLoop.tickStartTime = _emscripten_get_now();
        }
        Browser.mainLoop.runIter(browserIterationFunc);
        if (!checkIsRunning())
          return;
        if (typeof SDL == "object")
          SDL.audio?.queueNewAudioData?.();
        Browser.mainLoop.scheduler();
      };
      if (!noSetTiming) {
        if (fps && fps > 0) {
          _emscripten_set_main_loop_timing(0, 1e3 / fps);
        } else {
          _emscripten_set_main_loop_timing(1, 1);
        }
        Browser.mainLoop.scheduler();
      }
      if (simulateInfiniteLoop) {
        throw "unwind";
      }
    };
    var warnOnce = (text) => {
      warnOnce.shown ||= {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        err(text);
      }
    };
    var Browser = { mainLoop: { running: false, scheduler: null, method: "", currentlyRunningMainloop: 0, func: null, arg: 0, timingMode: 0, timingValue: 0, currentFrameNumber: 0, queue: [], pause() {
      Browser.mainLoop.scheduler = null;
      Browser.mainLoop.currentlyRunningMainloop++;
    }, resume() {
      Browser.mainLoop.currentlyRunningMainloop++;
      var timingMode = Browser.mainLoop.timingMode;
      var timingValue = Browser.mainLoop.timingValue;
      var func = Browser.mainLoop.func;
      Browser.mainLoop.func = null;
      setMainLoop(func, 0, false, Browser.mainLoop.arg, true);
      _emscripten_set_main_loop_timing(timingMode, timingValue);
      Browser.mainLoop.scheduler();
    }, updateStatus() {
      if (Module["setStatus"]) {
        var message = Module["statusMessage"] || "Please wait...";
        var remaining = Browser.mainLoop.remainingBlockers;
        var expected = Browser.mainLoop.expectedBlockers;
        if (remaining) {
          if (remaining < expected) {
            Module["setStatus"](message + " (" + (expected - remaining) + "/" + expected + ")");
          } else {
            Module["setStatus"](message);
          }
        } else {
          Module["setStatus"]("");
        }
      }
    }, runIter(func) {
      if (ABORT)
        return;
      if (Module["preMainLoop"]) {
        var preRet = Module["preMainLoop"]();
        if (preRet === false) {
          return;
        }
      }
      callUserCallback(func);
      Module["postMainLoop"]?.();
    } }, isFullscreen: false, pointerLock: false, moduleContextCreatedCallbacks: [], workers: [], init() {
      if (Browser.initted)
        return;
      Browser.initted = true;
      var imagePlugin = {};
      imagePlugin["canHandle"] = function imagePlugin_canHandle(name) {
        return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
      };
      imagePlugin["handle"] = function imagePlugin_handle(byteArray, name, onload, onerror) {
        var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
        if (b.size !== byteArray.length) {
          b = new Blob([new Uint8Array(byteArray).buffer], { type: Browser.getMimetype(name) });
        }
        var url = URL.createObjectURL(b);
        var img = new Image();
        img.onload = () => {
          assert(img.complete, `Image ${name} could not be decoded`);
          var canvas2 = document.createElement("canvas");
          canvas2.width = img.width;
          canvas2.height = img.height;
          var ctx2 = canvas2.getContext("2d");
          ctx2.drawImage(img, 0, 0);
          preloadedImages[name] = canvas2;
          URL.revokeObjectURL(url);
          onload?.(byteArray);
        };
        img.onerror = (event) => {
          err(`Image ${url} could not be decoded`);
          onerror?.();
        };
        img.src = url;
      };
      preloadPlugins.push(imagePlugin);
      var audioPlugin = {};
      audioPlugin["canHandle"] = function audioPlugin_canHandle(name) {
        return !Module.noAudioDecoding && name.substr(-4) in { ".ogg": 1, ".wav": 1, ".mp3": 1 };
      };
      audioPlugin["handle"] = function audioPlugin_handle(byteArray, name, onload, onerror) {
        var done = false;
        function finish(audio2) {
          if (done)
            return;
          done = true;
          preloadedAudios[name] = audio2;
          onload?.(byteArray);
        }
        var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
        var url = URL.createObjectURL(b);
        var audio = new Audio();
        audio.addEventListener("canplaythrough", () => finish(audio), false);
        audio.onerror = function audio_onerror(event) {
          if (done)
            return;
          err(`warning: browser could not fully decode audio ${name}, trying slower base64 approach`);
          function encode64(data) {
            var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var PAD = "=";
            var ret = "";
            var leftchar = 0;
            var leftbits = 0;
            for (var i = 0; i < data.length; i++) {
              leftchar = leftchar << 8 | data[i];
              leftbits += 8;
              while (leftbits >= 6) {
                var curr = leftchar >> leftbits - 6 & 63;
                leftbits -= 6;
                ret += BASE[curr];
              }
            }
            if (leftbits == 2) {
              ret += BASE[(leftchar & 3) << 4];
              ret += PAD + PAD;
            } else if (leftbits == 4) {
              ret += BASE[(leftchar & 15) << 2];
              ret += PAD;
            }
            return ret;
          }
          audio.src = "data:audio/x-" + name.substr(-3) + ";base64," + encode64(byteArray);
          finish(audio);
        };
        audio.src = url;
        safeSetTimeout(() => {
          finish(audio);
        }, 1e4);
      };
      preloadPlugins.push(audioPlugin);
      function pointerLockChange() {
        Browser.pointerLock = document["pointerLockElement"] === Module["canvas"] || document["mozPointerLockElement"] === Module["canvas"] || document["webkitPointerLockElement"] === Module["canvas"] || document["msPointerLockElement"] === Module["canvas"];
      }
      var canvas = Module["canvas"];
      if (canvas) {
        canvas.requestPointerLock = canvas["requestPointerLock"] || canvas["mozRequestPointerLock"] || canvas["webkitRequestPointerLock"] || canvas["msRequestPointerLock"] || (() => {
        });
        canvas.exitPointerLock = document["exitPointerLock"] || document["mozExitPointerLock"] || document["webkitExitPointerLock"] || document["msExitPointerLock"] || (() => {
        });
        canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
        document.addEventListener("pointerlockchange", pointerLockChange, false);
        document.addEventListener("mozpointerlockchange", pointerLockChange, false);
        document.addEventListener("webkitpointerlockchange", pointerLockChange, false);
        document.addEventListener("mspointerlockchange", pointerLockChange, false);
        if (Module["elementPointerLock"]) {
          canvas.addEventListener("click", (ev) => {
            if (!Browser.pointerLock && Module["canvas"].requestPointerLock) {
              Module["canvas"].requestPointerLock();
              ev.preventDefault();
            }
          }, false);
        }
      }
    }, createContext(canvas, useWebGL, setInModule, webGLContextAttributes) {
      if (useWebGL && Module.ctx && canvas == Module.canvas)
        return Module.ctx;
      var ctx2;
      var contextHandle;
      if (useWebGL) {
        var contextAttributes = { antialias: false, alpha: false, majorVersion: 1 };
        if (webGLContextAttributes) {
          for (var attribute in webGLContextAttributes) {
            contextAttributes[attribute] = webGLContextAttributes[attribute];
          }
        }
        if (typeof GL != "undefined") {
          contextHandle = GL.createContext(canvas, contextAttributes);
          if (contextHandle) {
            ctx2 = GL.getContext(contextHandle).GLctx;
          }
        }
      } else {
        ctx2 = canvas.getContext("2d");
      }
      if (!ctx2)
        return null;
      if (setInModule) {
        if (!useWebGL)
          assert(typeof GLctx == "undefined", "cannot set in module if GLctx is used, but we are a non-GL context that would replace it");
        Module.ctx = ctx2;
        if (useWebGL)
          GL.makeContextCurrent(contextHandle);
        Module.useWebGL = useWebGL;
        Browser.moduleContextCreatedCallbacks.forEach((callback) => callback());
        Browser.init();
      }
      return ctx2;
    }, destroyContext(canvas, useWebGL, setInModule) {
    }, fullscreenHandlersInstalled: false, lockPointer: void 0, resizeCanvas: void 0, requestFullscreen(lockPointer, resizeCanvas) {
      Browser.lockPointer = lockPointer;
      Browser.resizeCanvas = resizeCanvas;
      if (typeof Browser.lockPointer == "undefined")
        Browser.lockPointer = true;
      if (typeof Browser.resizeCanvas == "undefined")
        Browser.resizeCanvas = false;
      var canvas = Module["canvas"];
      function fullscreenChange() {
        Browser.isFullscreen = false;
        var canvasContainer2 = canvas.parentNode;
        if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvasContainer2) {
          canvas.exitFullscreen = Browser.exitFullscreen;
          if (Browser.lockPointer)
            canvas.requestPointerLock();
          Browser.isFullscreen = true;
          if (Browser.resizeCanvas) {
            Browser.setFullscreenCanvasSize();
          } else {
            Browser.updateCanvasDimensions(canvas);
          }
        } else {
          canvasContainer2.parentNode.insertBefore(canvas, canvasContainer2);
          canvasContainer2.parentNode.removeChild(canvasContainer2);
          if (Browser.resizeCanvas) {
            Browser.setWindowedCanvasSize();
          } else {
            Browser.updateCanvasDimensions(canvas);
          }
        }
        Module["onFullScreen"]?.(Browser.isFullscreen);
        Module["onFullscreen"]?.(Browser.isFullscreen);
      }
      if (!Browser.fullscreenHandlersInstalled) {
        Browser.fullscreenHandlersInstalled = true;
        document.addEventListener("fullscreenchange", fullscreenChange, false);
        document.addEventListener("mozfullscreenchange", fullscreenChange, false);
        document.addEventListener("webkitfullscreenchange", fullscreenChange, false);
        document.addEventListener("MSFullscreenChange", fullscreenChange, false);
      }
      var canvasContainer = document.createElement("div");
      canvas.parentNode.insertBefore(canvasContainer, canvas);
      canvasContainer.appendChild(canvas);
      canvasContainer.requestFullscreen = canvasContainer["requestFullscreen"] || canvasContainer["mozRequestFullScreen"] || canvasContainer["msRequestFullscreen"] || (canvasContainer["webkitRequestFullscreen"] ? () => canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null) || (canvasContainer["webkitRequestFullScreen"] ? () => canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null);
      canvasContainer.requestFullscreen();
    }, exitFullscreen() {
      if (!Browser.isFullscreen) {
        return false;
      }
      var CFS = document["exitFullscreen"] || document["cancelFullScreen"] || document["mozCancelFullScreen"] || document["msExitFullscreen"] || document["webkitCancelFullScreen"] || (() => {
      });
      CFS.apply(document, []);
      return true;
    }, nextRAF: 0, fakeRequestAnimationFrame(func) {
      var now = Date.now();
      if (Browser.nextRAF === 0) {
        Browser.nextRAF = now + 1e3 / 60;
      } else {
        while (now + 2 >= Browser.nextRAF) {
          Browser.nextRAF += 1e3 / 60;
        }
      }
      var delay2 = Math.max(Browser.nextRAF - now, 0);
      setTimeout(func, delay2);
    }, requestAnimationFrame(func) {
      if (typeof requestAnimationFrame == "function") {
        requestAnimationFrame(func);
        return;
      }
      var RAF = Browser.fakeRequestAnimationFrame;
      RAF(func);
    }, safeSetTimeout(func, timeout) {
      return safeSetTimeout(func, timeout);
    }, safeRequestAnimationFrame(func) {
      return Browser.requestAnimationFrame(() => {
        callUserCallback(func);
      });
    }, getMimetype(name) {
      return { "jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png", "bmp": "image/bmp", "ogg": "audio/ogg", "wav": "audio/wav", "mp3": "audio/mpeg" }[name.substr(name.lastIndexOf(".") + 1)];
    }, getUserMedia(func) {
      window.getUserMedia ||= navigator["getUserMedia"] || navigator["mozGetUserMedia"];
      window.getUserMedia(func);
    }, getMovementX(event) {
      return event["movementX"] || event["mozMovementX"] || event["webkitMovementX"] || 0;
    }, getMovementY(event) {
      return event["movementY"] || event["mozMovementY"] || event["webkitMovementY"] || 0;
    }, getMouseWheelDelta(event) {
      var delta = 0;
      switch (event.type) {
        case "DOMMouseScroll":
          delta = event.detail / 3;
          break;
        case "mousewheel":
          delta = event.wheelDelta / 120;
          break;
        case "wheel":
          delta = event.deltaY;
          switch (event.deltaMode) {
            case 0:
              delta /= 100;
              break;
            case 1:
              delta /= 3;
              break;
            case 2:
              delta *= 80;
              break;
            default:
              throw "unrecognized mouse wheel delta mode: " + event.deltaMode;
          }
          break;
        default:
          throw "unrecognized mouse wheel event: " + event.type;
      }
      return delta;
    }, mouseX: 0, mouseY: 0, mouseMovementX: 0, mouseMovementY: 0, touches: {}, lastTouches: {}, calculateMouseCoords(pageX, pageY) {
      var rect = Module["canvas"].getBoundingClientRect();
      var cw = Module["canvas"].width;
      var ch = Module["canvas"].height;
      var scrollX = typeof window.scrollX != "undefined" ? window.scrollX : window.pageXOffset;
      var scrollY = typeof window.scrollY != "undefined" ? window.scrollY : window.pageYOffset;
      var adjustedX = pageX - (scrollX + rect.left);
      var adjustedY = pageY - (scrollY + rect.top);
      adjustedX = adjustedX * (cw / rect.width);
      adjustedY = adjustedY * (ch / rect.height);
      return { x: adjustedX, y: adjustedY };
    }, setMouseCoords(pageX, pageY) {
      const { x, y } = Browser.calculateMouseCoords(pageX, pageY);
      Browser.mouseMovementX = x - Browser.mouseX;
      Browser.mouseMovementY = y - Browser.mouseY;
      Browser.mouseX = x;
      Browser.mouseY = y;
    }, calculateMouseEvent(event) {
      if (Browser.pointerLock) {
        if (event.type != "mousemove" && "mozMovementX" in event) {
          Browser.mouseMovementX = Browser.mouseMovementY = 0;
        } else {
          Browser.mouseMovementX = Browser.getMovementX(event);
          Browser.mouseMovementY = Browser.getMovementY(event);
        }
        if (typeof SDL != "undefined") {
          Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
          Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
        } else {
          Browser.mouseX += Browser.mouseMovementX;
          Browser.mouseY += Browser.mouseMovementY;
        }
      } else {
        if (event.type === "touchstart" || event.type === "touchend" || event.type === "touchmove") {
          var touch = event.touch;
          if (touch === void 0) {
            return;
          }
          var coords = Browser.calculateMouseCoords(touch.pageX, touch.pageY);
          if (event.type === "touchstart") {
            Browser.lastTouches[touch.identifier] = coords;
            Browser.touches[touch.identifier] = coords;
          } else if (event.type === "touchend" || event.type === "touchmove") {
            var last = Browser.touches[touch.identifier];
            last ||= coords;
            Browser.lastTouches[touch.identifier] = last;
            Browser.touches[touch.identifier] = coords;
          }
          return;
        }
        Browser.setMouseCoords(event.pageX, event.pageY);
      }
    }, resizeListeners: [], updateResizeListeners() {
      var canvas = Module["canvas"];
      Browser.resizeListeners.forEach((listener) => listener(canvas.width, canvas.height));
    }, setCanvasSize(width, height, noUpdates) {
      var canvas = Module["canvas"];
      Browser.updateCanvasDimensions(canvas, width, height);
      if (!noUpdates)
        Browser.updateResizeListeners();
    }, windowedWidth: 0, windowedHeight: 0, setFullscreenCanvasSize() {
      if (typeof SDL != "undefined") {
        var flags = HEAPU32[SDL.screen >> 2];
        flags = flags | 8388608;
        HEAP32[SDL.screen >> 2] = flags;
      }
      Browser.updateCanvasDimensions(Module["canvas"]);
      Browser.updateResizeListeners();
    }, setWindowedCanvasSize() {
      if (typeof SDL != "undefined") {
        var flags = HEAPU32[SDL.screen >> 2];
        flags = flags & ~8388608;
        HEAP32[SDL.screen >> 2] = flags;
      }
      Browser.updateCanvasDimensions(Module["canvas"]);
      Browser.updateResizeListeners();
    }, updateCanvasDimensions(canvas, wNative, hNative) {
      if (wNative && hNative) {
        canvas.widthNative = wNative;
        canvas.heightNative = hNative;
      } else {
        wNative = canvas.widthNative;
        hNative = canvas.heightNative;
      }
      var w = wNative;
      var h = hNative;
      if (Module["forcedAspectRatio"] && Module["forcedAspectRatio"] > 0) {
        if (w / h < Module["forcedAspectRatio"]) {
          w = Math.round(h * Module["forcedAspectRatio"]);
        } else {
          h = Math.round(w / Module["forcedAspectRatio"]);
        }
      }
      if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvas.parentNode && typeof screen != "undefined") {
        var factor = Math.min(screen.width / w, screen.height / h);
        w = Math.round(w * factor);
        h = Math.round(h * factor);
      }
      if (Browser.resizeCanvas) {
        if (canvas.width != w)
          canvas.width = w;
        if (canvas.height != h)
          canvas.height = h;
        if (typeof canvas.style != "undefined") {
          canvas.style.removeProperty("width");
          canvas.style.removeProperty("height");
        }
      } else {
        if (canvas.width != wNative)
          canvas.width = wNative;
        if (canvas.height != hNative)
          canvas.height = hNative;
        if (typeof canvas.style != "undefined") {
          if (w != wNative || h != hNative) {
            canvas.style.setProperty("width", w + "px", "important");
            canvas.style.setProperty("height", h + "px", "important");
          } else {
            canvas.style.removeProperty("width");
            canvas.style.removeProperty("height");
          }
        }
      }
    } };
    var wasmTableMirror = [];
    var wasmTable;
    var getWasmTableEntry = (funcPtr) => {
      var func = wasmTableMirror[funcPtr];
      if (!func) {
        if (funcPtr >= wasmTableMirror.length)
          wasmTableMirror.length = funcPtr + 1;
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
      }
      return func;
    };
    var _emscripten_async_call = (func, arg, millis) => {
      function wrapper() {
        getWasmTableEntry(func)(arg);
      }
      if (millis >= 0) {
        safeSetTimeout(wrapper, millis);
      } else {
        Browser.safeRequestAnimationFrame(wrapper);
      }
    };
    var _emscripten_date_now = () => Date.now();
    var getHeapMax = () => 2147483648;
    var _emscripten_get_heap_max = () => getHeapMax();
    var _emscripten_is_main_browser_thread = () => !ENVIRONMENT_IS_WORKER;
    var _emscripten_memcpy_js = (dest, src, num) => HEAPU8.copyWithin(dest, src, src + num);
    var growMemory = (size) => {
      var b = wasmMemory.buffer;
      var pages = (size - b.byteLength + 65535) / 65536;
      try {
        wasmMemory.grow(pages);
        updateMemoryViews();
        return 1;
      } catch (e) {
      }
    };
    var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      requestedSize >>>= 0;
      var maxHeapSize = getHeapMax();
      if (requestedSize > maxHeapSize) {
        return false;
      }
      var alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
        var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
        var replacement = growMemory(newSize);
        if (replacement) {
          return true;
        }
      }
      return false;
    };
    class HandleAllocator {
      constructor() {
        this.allocated = [void 0];
        this.freelist = [];
      }
      get(id) {
        return this.allocated[id];
      }
      has(id) {
        return this.allocated[id] !== void 0;
      }
      allocate(handle) {
        var id = this.freelist.pop() || this.allocated.length;
        this.allocated[id] = handle;
        return id;
      }
      free(id) {
        this.allocated[id] = void 0;
        this.freelist.push(id);
      }
    }
    var Fetch = { openDatabase(dbname, dbversion, onsuccess, onerror) {
      try {
        var openRequest = indexedDB.open(dbname, dbversion);
      } catch (e) {
        return onerror(e);
      }
      openRequest.onupgradeneeded = (event) => {
        var db = event.target.result;
        if (db.objectStoreNames.contains("FILES")) {
          db.deleteObjectStore("FILES");
        }
        db.createObjectStore("FILES");
      };
      openRequest.onsuccess = (event) => onsuccess(event.target.result);
      openRequest.onerror = onerror;
    }, init() {
      Fetch.xhrs = new HandleAllocator();
      var onsuccess = (db) => {
        Fetch.dbInstance = db;
        removeRunDependency("library_fetch_init");
      };
      var onerror = () => {
        Fetch.dbInstance = false;
        removeRunDependency("library_fetch_init");
      };
      addRunDependency("library_fetch_init");
      Fetch.openDatabase("emscripten_filesystem", 1, onsuccess, onerror);
    } };
    function fetchXHR(fetch, onsuccess, onerror, onprogress, onreadystatechange) {
      var url = HEAPU32[fetch + 8 >> 2];
      if (!url) {
        onerror(fetch, 0, "no url specified!");
        return;
      }
      var url_ = UTF8ToString(url);
      var fetch_attr = fetch + 112;
      var requestMethod = UTF8ToString(fetch_attr + 0);
      requestMethod ||= "GET";
      var timeoutMsecs = HEAPU32[fetch_attr + 56 >> 2];
      var userName = HEAPU32[fetch_attr + 68 >> 2];
      var password = HEAPU32[fetch_attr + 72 >> 2];
      var requestHeaders = HEAPU32[fetch_attr + 76 >> 2];
      var overriddenMimeType = HEAPU32[fetch_attr + 80 >> 2];
      var dataPtr = HEAPU32[fetch_attr + 84 >> 2];
      var dataLength = HEAPU32[fetch_attr + 88 >> 2];
      var fetchAttributes = HEAPU32[fetch_attr + 52 >> 2];
      var fetchAttrLoadToMemory = !!(fetchAttributes & 1);
      var fetchAttrStreamData = !!(fetchAttributes & 2);
      var fetchAttrSynchronous = !!(fetchAttributes & 64);
      var userNameStr = userName ? UTF8ToString(userName) : void 0;
      var passwordStr = password ? UTF8ToString(password) : void 0;
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = !!HEAPU8[fetch_attr + 60 >> 0];
      xhr.open(requestMethod, url_, !fetchAttrSynchronous, userNameStr, passwordStr);
      if (!fetchAttrSynchronous)
        xhr.timeout = timeoutMsecs;
      xhr.url_ = url_;
      xhr.responseType = "arraybuffer";
      if (overriddenMimeType) {
        var overriddenMimeTypeStr = UTF8ToString(overriddenMimeType);
        xhr.overrideMimeType(overriddenMimeTypeStr);
      }
      if (requestHeaders) {
        for (; ; ) {
          var key = HEAPU32[requestHeaders >> 2];
          if (!key)
            break;
          var value = HEAPU32[requestHeaders + 4 >> 2];
          if (!value)
            break;
          requestHeaders += 8;
          var keyStr = UTF8ToString(key);
          var valueStr = UTF8ToString(value);
          xhr.setRequestHeader(keyStr, valueStr);
        }
      }
      var id = Fetch.xhrs.allocate(xhr);
      HEAPU32[fetch >> 2] = id;
      var data = dataPtr && dataLength ? HEAPU8.slice(dataPtr, dataPtr + dataLength) : null;
      function saveResponseAndStatus() {
        var ptr = 0;
        var ptrLen = 0;
        if (xhr.response && fetchAttrLoadToMemory && HEAPU32[fetch + 12 >> 2] === 0) {
          ptrLen = xhr.response.byteLength;
        }
        if (ptrLen > 0) {
          ptr = _malloc(ptrLen);
          HEAPU8.set(new Uint8Array(xhr.response), ptr);
        }
        HEAPU32[fetch + 12 >> 2] = ptr;
        writeI53ToI64(fetch + 16, ptrLen);
        writeI53ToI64(fetch + 24, 0);
        var len = xhr.response ? xhr.response.byteLength : 0;
        if (len) {
          writeI53ToI64(fetch + 32, len);
        }
        HEAPU16[fetch + 40 >> 1] = xhr.readyState;
        HEAPU16[fetch + 42 >> 1] = xhr.status;
        if (xhr.statusText)
          stringToUTF8(xhr.statusText, fetch + 44, 64);
      }
      xhr.onload = (e) => {
        if (!Fetch.xhrs.has(id)) {
          return;
        }
        saveResponseAndStatus();
        if (xhr.status >= 200 && xhr.status < 300) {
          onsuccess?.(fetch, xhr, e);
        } else {
          onerror?.(fetch, xhr, e);
        }
      };
      xhr.onerror = (e) => {
        if (!Fetch.xhrs.has(id)) {
          return;
        }
        saveResponseAndStatus();
        onerror?.(fetch, xhr, e);
      };
      xhr.ontimeout = (e) => {
        if (!Fetch.xhrs.has(id)) {
          return;
        }
        onerror?.(fetch, xhr, e);
      };
      xhr.onprogress = (e) => {
        if (!Fetch.xhrs.has(id)) {
          return;
        }
        var ptrLen = fetchAttrLoadToMemory && fetchAttrStreamData && xhr.response ? xhr.response.byteLength : 0;
        var ptr = 0;
        if (ptrLen > 0 && fetchAttrLoadToMemory && fetchAttrStreamData) {
          ptr = _malloc(ptrLen);
          HEAPU8.set(new Uint8Array(xhr.response), ptr);
        }
        HEAPU32[fetch + 12 >> 2] = ptr;
        writeI53ToI64(fetch + 16, ptrLen);
        writeI53ToI64(fetch + 24, e.loaded - ptrLen);
        writeI53ToI64(fetch + 32, e.total);
        HEAPU16[fetch + 40 >> 1] = xhr.readyState;
        if (xhr.readyState >= 3 && xhr.status === 0 && e.loaded > 0)
          xhr.status = 200;
        HEAPU16[fetch + 42 >> 1] = xhr.status;
        if (xhr.statusText)
          stringToUTF8(xhr.statusText, fetch + 44, 64);
        onprogress?.(fetch, xhr, e);
        if (ptr) {
          _free(ptr);
        }
      };
      xhr.onreadystatechange = (e) => {
        if (!Fetch.xhrs.has(id)) {
          return;
        }
        HEAPU16[fetch + 40 >> 1] = xhr.readyState;
        if (xhr.readyState >= 2) {
          HEAPU16[fetch + 42 >> 1] = xhr.status;
        }
        onreadystatechange?.(fetch, xhr, e);
      };
      try {
        xhr.send(data);
      } catch (e) {
        onerror?.(fetch, xhr, e);
      }
    }
    var writeI53ToI64 = (ptr, num) => {
      HEAPU32[ptr >> 2] = num;
      var lower = HEAPU32[ptr >> 2];
      HEAPU32[ptr + 4 >> 2] = (num - lower) / 4294967296;
    };
    function fetchCacheData(db, fetch, data, onsuccess, onerror) {
      if (!db) {
        onerror(fetch, 0, "IndexedDB not available!");
        return;
      }
      var fetch_attr = fetch + 112;
      var destinationPath = HEAPU32[fetch_attr + 64 >> 2];
      destinationPath ||= HEAPU32[fetch + 8 >> 2];
      var destinationPathStr = UTF8ToString(destinationPath);
      try {
        var transaction = db.transaction(["FILES"], "readwrite");
        var packages = transaction.objectStore("FILES");
        var putRequest = packages.put(data, destinationPathStr);
        putRequest.onsuccess = (event) => {
          HEAPU16[fetch + 40 >> 1] = 4;
          HEAPU16[fetch + 42 >> 1] = 200;
          stringToUTF8("OK", fetch + 44, 64);
          onsuccess(fetch, 0, destinationPathStr);
        };
        putRequest.onerror = (error) => {
          HEAPU16[fetch + 40 >> 1] = 4;
          HEAPU16[fetch + 42 >> 1] = 413;
          stringToUTF8("Payload Too Large", fetch + 44, 64);
          onerror(fetch, 0, error);
        };
      } catch (e) {
        onerror(fetch, 0, e);
      }
    }
    function fetchLoadCachedData(db, fetch, onsuccess, onerror) {
      if (!db) {
        onerror(fetch, 0, "IndexedDB not available!");
        return;
      }
      var fetch_attr = fetch + 112;
      var path = HEAPU32[fetch_attr + 64 >> 2];
      path ||= HEAPU32[fetch + 8 >> 2];
      var pathStr = UTF8ToString(path);
      try {
        var transaction = db.transaction(["FILES"], "readonly");
        var packages = transaction.objectStore("FILES");
        var getRequest = packages.get(pathStr);
        getRequest.onsuccess = (event) => {
          if (event.target.result) {
            var value = event.target.result;
            var len = value.byteLength || value.length;
            var ptr = _malloc(len);
            HEAPU8.set(new Uint8Array(value), ptr);
            HEAPU32[fetch + 12 >> 2] = ptr;
            writeI53ToI64(fetch + 16, len);
            writeI53ToI64(fetch + 24, 0);
            writeI53ToI64(fetch + 32, len);
            HEAPU16[fetch + 40 >> 1] = 4;
            HEAPU16[fetch + 42 >> 1] = 200;
            stringToUTF8("OK", fetch + 44, 64);
            onsuccess(fetch, 0, value);
          } else {
            HEAPU16[fetch + 40 >> 1] = 4;
            HEAPU16[fetch + 42 >> 1] = 404;
            stringToUTF8("Not Found", fetch + 44, 64);
            onerror(fetch, 0, "no data");
          }
        };
        getRequest.onerror = (error) => {
          HEAPU16[fetch + 40 >> 1] = 4;
          HEAPU16[fetch + 42 >> 1] = 404;
          stringToUTF8("Not Found", fetch + 44, 64);
          onerror(fetch, 0, error);
        };
      } catch (e) {
        onerror(fetch, 0, e);
      }
    }
    function fetchDeleteCachedData(db, fetch, onsuccess, onerror) {
      if (!db) {
        onerror(fetch, 0, "IndexedDB not available!");
        return;
      }
      var fetch_attr = fetch + 112;
      var path = HEAPU32[fetch_attr + 64 >> 2];
      path ||= HEAPU32[fetch + 8 >> 2];
      var pathStr = UTF8ToString(path);
      try {
        var transaction = db.transaction(["FILES"], "readwrite");
        var packages = transaction.objectStore("FILES");
        var request = packages.delete(pathStr);
        request.onsuccess = (event) => {
          var value = event.target.result;
          HEAPU32[fetch + 12 >> 2] = 0;
          writeI53ToI64(fetch + 16, 0);
          writeI53ToI64(fetch + 24, 0);
          writeI53ToI64(fetch + 32, 0);
          HEAPU16[fetch + 40 >> 1] = 4;
          HEAPU16[fetch + 42 >> 1] = 200;
          stringToUTF8("OK", fetch + 44, 64);
          onsuccess(fetch, 0, value);
        };
        request.onerror = (error) => {
          HEAPU16[fetch + 40 >> 1] = 4;
          HEAPU16[fetch + 42 >> 1] = 404;
          stringToUTF8("Not Found", fetch + 44, 64);
          onerror(fetch, 0, error);
        };
      } catch (e) {
        onerror(fetch, 0, e);
      }
    }
    function _emscripten_start_fetch(fetch, successcb, errorcb, progresscb, readystatechangecb) {
      var fetch_attr = fetch + 112;
      var onsuccess = HEAPU32[fetch_attr + 36 >> 2];
      var onerror = HEAPU32[fetch_attr + 40 >> 2];
      var onprogress = HEAPU32[fetch_attr + 44 >> 2];
      var onreadystatechange = HEAPU32[fetch_attr + 48 >> 2];
      var fetchAttributes = HEAPU32[fetch_attr + 52 >> 2];
      var fetchAttrSynchronous = !!(fetchAttributes & 64);
      function doCallback(f) {
        if (fetchAttrSynchronous) {
          f();
        } else {
          callUserCallback(f);
        }
      }
      var reportSuccess = (fetch2, xhr, e) => {
        doCallback(() => {
          if (onsuccess)
            getWasmTableEntry(onsuccess)(fetch2);
          else
            successcb?.(fetch2);
        });
      };
      var reportProgress = (fetch2, xhr, e) => {
        doCallback(() => {
          if (onprogress)
            getWasmTableEntry(onprogress)(fetch2);
          else
            progresscb?.(fetch2);
        });
      };
      var reportError = (fetch2, xhr, e) => {
        doCallback(() => {
          if (onerror)
            getWasmTableEntry(onerror)(fetch2);
          else
            errorcb?.(fetch2);
        });
      };
      var reportReadyStateChange = (fetch2, xhr, e) => {
        doCallback(() => {
          if (onreadystatechange)
            getWasmTableEntry(onreadystatechange)(fetch2);
          else
            readystatechangecb?.(fetch2);
        });
      };
      var performUncachedXhr = (fetch2, xhr, e) => {
        fetchXHR(fetch2, reportSuccess, reportError, reportProgress, reportReadyStateChange);
      };
      var cacheResultAndReportSuccess = (fetch2, xhr, e) => {
        var storeSuccess = (fetch3, xhr2, e2) => {
          doCallback(() => {
            if (onsuccess)
              getWasmTableEntry(onsuccess)(fetch3);
            else
              successcb?.(fetch3);
          });
        };
        var storeError = (fetch3, xhr2, e2) => {
          doCallback(() => {
            if (onsuccess)
              getWasmTableEntry(onsuccess)(fetch3);
            else
              successcb?.(fetch3);
          });
        };
        fetchCacheData(Fetch.dbInstance, fetch2, xhr.response, storeSuccess, storeError);
      };
      var performCachedXhr = (fetch2, xhr, e) => {
        fetchXHR(fetch2, cacheResultAndReportSuccess, reportError, reportProgress, reportReadyStateChange);
      };
      var requestMethod = UTF8ToString(fetch_attr + 0);
      var fetchAttrReplace = !!(fetchAttributes & 16);
      var fetchAttrPersistFile = !!(fetchAttributes & 4);
      var fetchAttrNoDownload = !!(fetchAttributes & 32);
      if (requestMethod === "EM_IDB_STORE") {
        var ptr = HEAPU32[fetch_attr + 84 >> 2];
        var size = HEAPU32[fetch_attr + 88 >> 2];
        fetchCacheData(Fetch.dbInstance, fetch, HEAPU8.slice(ptr, ptr + size), reportSuccess, reportError);
      } else if (requestMethod === "EM_IDB_DELETE") {
        fetchDeleteCachedData(Fetch.dbInstance, fetch, reportSuccess, reportError);
      } else if (!fetchAttrReplace) {
        fetchLoadCachedData(Fetch.dbInstance, fetch, reportSuccess, fetchAttrNoDownload ? reportError : fetchAttrPersistFile ? performCachedXhr : performUncachedXhr);
      } else if (!fetchAttrNoDownload) {
        fetchXHR(fetch, fetchAttrPersistFile ? cacheResultAndReportSuccess : reportSuccess, reportError, reportProgress, reportReadyStateChange);
      } else {
        return 0;
      }
      return fetch;
    }
    var ENV = {};
    var getExecutableName = () => thisProgram || "./this.program";
    var getEnvStrings = () => {
      if (!getEnvStrings.strings) {
        var lang = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
        var env = { "USER": "web_user", "LOGNAME": "web_user", "PATH": "/", "PWD": "/", "HOME": "/home/web_user", "LANG": lang, "_": getExecutableName() };
        for (var x in ENV) {
          if (ENV[x] === void 0)
            delete env[x];
          else
            env[x] = ENV[x];
        }
        var strings = [];
        for (var x in env) {
          strings.push(`${x}=${env[x]}`);
        }
        getEnvStrings.strings = strings;
      }
      return getEnvStrings.strings;
    };
    var stringToAscii = (str2, buffer) => {
      for (var i = 0; i < str2.length; ++i) {
        HEAP8[buffer++ >> 0] = str2.charCodeAt(i);
      }
      HEAP8[buffer >> 0] = 0;
    };
    var _environ_get = (__environ, environ_buf) => {
      var bufSize = 0;
      getEnvStrings().forEach((string, i) => {
        var ptr = environ_buf + bufSize;
        HEAPU32[__environ + i * 4 >> 2] = ptr;
        stringToAscii(string, ptr);
        bufSize += string.length + 1;
      });
      return 0;
    };
    var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
      var strings = getEnvStrings();
      HEAPU32[penviron_count >> 2] = strings.length;
      var bufSize = 0;
      strings.forEach((string) => bufSize += string.length + 1);
      HEAPU32[penviron_buf_size >> 2] = bufSize;
      return 0;
    };
    function _fd_close(fd) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        FS.close(stream);
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return e.errno;
      }
    }
    var doReadv = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[iov >> 2];
        var len = HEAPU32[iov + 4 >> 2];
        iov += 8;
        var curr = FS.read(stream, HEAP8, ptr, len, offset);
        if (curr < 0)
          return -1;
        ret += curr;
        if (curr < len)
          break;
        if (typeof offset !== "undefined") {
          offset += curr;
        }
      }
      return ret;
    };
    function _fd_read(fd, iov, iovcnt, pnum) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        var num = doReadv(stream, iov, iovcnt);
        HEAPU32[pnum >> 2] = num;
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return e.errno;
      }
    }
    function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
      var offset = convertI32PairToI53Checked(offset_low, offset_high);
      try {
        if (isNaN(offset))
          return 61;
        var stream = SYSCALLS.getStreamFromFD(fd);
        FS.llseek(stream, offset, whence);
        tempI64 = [stream.position >>> 0, (tempDouble = stream.position, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[newOffset >> 2] = tempI64[0], HEAP32[newOffset + 4 >> 2] = tempI64[1];
        if (stream.getdents && offset === 0 && whence === 0)
          stream.getdents = null;
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return e.errno;
      }
    }
    var doWritev = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[iov >> 2];
        var len = HEAPU32[iov + 4 >> 2];
        iov += 8;
        var curr = FS.write(stream, HEAP8, ptr, len, offset);
        if (curr < 0)
          return -1;
        ret += curr;
        if (typeof offset !== "undefined") {
          offset += curr;
        }
      }
      return ret;
    };
    function _fd_write(fd, iov, iovcnt, pnum) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        var num = doWritev(stream, iov, iovcnt);
        HEAPU32[pnum >> 2] = num;
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return e.errno;
      }
    }
    var webgl_enable_ANGLE_instanced_arrays = (ctx2) => {
      var ext = ctx2.getExtension("ANGLE_instanced_arrays");
      if (ext) {
        ctx2["vertexAttribDivisor"] = (index, divisor) => ext["vertexAttribDivisorANGLE"](index, divisor);
        ctx2["drawArraysInstanced"] = (mode, first, count, primcount) => ext["drawArraysInstancedANGLE"](mode, first, count, primcount);
        ctx2["drawElementsInstanced"] = (mode, count, type, indices, primcount) => ext["drawElementsInstancedANGLE"](mode, count, type, indices, primcount);
        return 1;
      }
    };
    var webgl_enable_OES_vertex_array_object = (ctx2) => {
      var ext = ctx2.getExtension("OES_vertex_array_object");
      if (ext) {
        ctx2["createVertexArray"] = () => ext["createVertexArrayOES"]();
        ctx2["deleteVertexArray"] = (vao) => ext["deleteVertexArrayOES"](vao);
        ctx2["bindVertexArray"] = (vao) => ext["bindVertexArrayOES"](vao);
        ctx2["isVertexArray"] = (vao) => ext["isVertexArrayOES"](vao);
        return 1;
      }
    };
    var webgl_enable_WEBGL_draw_buffers = (ctx2) => {
      var ext = ctx2.getExtension("WEBGL_draw_buffers");
      if (ext) {
        ctx2["drawBuffers"] = (n, bufs) => ext["drawBuffersWEBGL"](n, bufs);
        return 1;
      }
    };
    var webgl_enable_WEBGL_multi_draw = (ctx2) => !!(ctx2.multiDrawWebgl = ctx2.getExtension("WEBGL_multi_draw"));
    var getEmscriptenSupportedExtensions = function(ctx2) {
      var supportedExtensions = ["ANGLE_instanced_arrays", "EXT_blend_minmax", "EXT_disjoint_timer_query", "EXT_frag_depth", "EXT_shader_texture_lod", "EXT_sRGB", "OES_element_index_uint", "OES_fbo_render_mipmap", "OES_standard_derivatives", "OES_texture_float", "OES_texture_half_float", "OES_texture_half_float_linear", "OES_vertex_array_object", "WEBGL_color_buffer_float", "WEBGL_depth_texture", "WEBGL_draw_buffers", "EXT_color_buffer_half_float", "EXT_float_blend", "EXT_texture_compression_bptc", "EXT_texture_compression_rgtc", "EXT_texture_filter_anisotropic", "KHR_parallel_shader_compile", "OES_texture_float_linear", "WEBGL_compressed_texture_s3tc", "WEBGL_compressed_texture_s3tc_srgb", "WEBGL_debug_renderer_info", "WEBGL_debug_shaders", "WEBGL_lose_context", "WEBGL_multi_draw"];
      return (ctx2.getSupportedExtensions() || []).filter((ext) => supportedExtensions.includes(ext));
    };
    var GL = { counter: 1, buffers: [], programs: [], framebuffers: [], renderbuffers: [], textures: [], shaders: [], vaos: [], contexts: [], offscreenCanvases: {}, queries: [], stringCache: {}, unpackAlignment: 4, recordError: function recordError(errorCode) {
      if (!GL.lastError) {
        GL.lastError = errorCode;
      }
    }, getNewId: (table) => {
      var ret = GL.counter++;
      for (var i = table.length; i < ret; i++) {
        table[i] = null;
      }
      return ret;
    }, getSource: (shader, count, string, length) => {
      var source = "";
      for (var i = 0; i < count; ++i) {
        var len = length ? HEAPU32[length + i * 4 >> 2] : void 0;
        source += UTF8ToString(HEAPU32[string + i * 4 >> 2], len);
      }
      return source;
    }, createContext: (canvas, webGLContextAttributes) => {
      if (!canvas.getContextSafariWebGL2Fixed) {
        let fixedGetContext = function(ver, attrs) {
          var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
          return ver == "webgl" == gl instanceof WebGLRenderingContext ? gl : null;
        };
        canvas.getContextSafariWebGL2Fixed = canvas.getContext;
        canvas.getContext = fixedGetContext;
      }
      var ctx2 = canvas.getContext("webgl", webGLContextAttributes);
      if (!ctx2)
        return 0;
      var handle = GL.registerContext(ctx2, webGLContextAttributes);
      return handle;
    }, registerContext: (ctx2, webGLContextAttributes) => {
      var handle = GL.getNewId(GL.contexts);
      var context = { handle, attributes: webGLContextAttributes, version: webGLContextAttributes.majorVersion, GLctx: ctx2 };
      if (ctx2.canvas)
        ctx2.canvas.GLctxObject = context;
      GL.contexts[handle] = context;
      if (typeof webGLContextAttributes.enableExtensionsByDefault == "undefined" || webGLContextAttributes.enableExtensionsByDefault) {
        GL.initExtensions(context);
      }
      return handle;
    }, makeContextCurrent: (contextHandle) => {
      GL.currentContext = GL.contexts[contextHandle];
      Module.ctx = GLctx = GL.currentContext?.GLctx;
      return !(contextHandle && !GLctx);
    }, getContext: (contextHandle) => GL.contexts[contextHandle], deleteContext: (contextHandle) => {
      if (GL.currentContext === GL.contexts[contextHandle]) {
        GL.currentContext = null;
      }
      if (typeof JSEvents == "object") {
        JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
      }
      if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas) {
        GL.contexts[contextHandle].GLctx.canvas.GLctxObject = void 0;
      }
      GL.contexts[contextHandle] = null;
    }, initExtensions: (context) => {
      context ||= GL.currentContext;
      if (context.initExtensionsDone)
        return;
      context.initExtensionsDone = true;
      var GLctx2 = context.GLctx;
      webgl_enable_ANGLE_instanced_arrays(GLctx2);
      webgl_enable_OES_vertex_array_object(GLctx2);
      webgl_enable_WEBGL_draw_buffers(GLctx2);
      {
        GLctx2.disjointTimerQueryExt = GLctx2.getExtension("EXT_disjoint_timer_query");
      }
      webgl_enable_WEBGL_multi_draw(GLctx2);
      getEmscriptenSupportedExtensions(GLctx2).forEach((ext) => {
        if (!ext.includes("lose_context") && !ext.includes("debug")) {
          GLctx2.getExtension(ext);
        }
      });
    } };
    var _glBindTexture = (target, texture2) => {
      GLctx.bindTexture(target, GL.textures[texture2]);
    };
    var __glGenObject = (n, buffers, createFunction, objectTable) => {
      for (var i = 0; i < n; i++) {
        var buffer = GLctx[createFunction]();
        var id = buffer && GL.getNewId(objectTable);
        if (buffer) {
          buffer.name = id;
          objectTable[id] = buffer;
        } else {
          GL.recordError(1282);
        }
        HEAP32[buffers + i * 4 >> 2] = id;
      }
    };
    var _glGenTextures = (n, textures) => {
      __glGenObject(n, textures, "createTexture", GL.textures);
    };
    var computeUnpackAlignedImageSize = (width, height, sizePerPixel, alignment) => {
      function roundedToNextMultipleOf(x, y) {
        return x + y - 1 & -y;
      }
      var plainRowSize = width * sizePerPixel;
      var alignedRowSize = roundedToNextMultipleOf(plainRowSize, alignment);
      return height * alignedRowSize;
    };
    var colorChannelsInGlTextureFormat = (format) => {
      var colorChannels = { 5: 3, 6: 4, 8: 2, 29502: 3, 29504: 4 };
      return colorChannels[format - 6402] || 1;
    };
    var heapObjectForWebGLType = (type) => {
      type -= 5120;
      if (type == 1)
        return HEAPU8;
      if (type == 4)
        return HEAP32;
      if (type == 6)
        return HEAPF32;
      if (type == 5 || type == 28922)
        return HEAPU32;
      return HEAPU16;
    };
    var heapAccessShiftForWebGLHeap = (heap) => 31 - Math.clz32(heap.BYTES_PER_ELEMENT);
    var emscriptenWebGLGetTexPixelData = (type, format, width, height, pixels2, internalFormat) => {
      var heap = heapObjectForWebGLType(type);
      var shift = heapAccessShiftForWebGLHeap(heap);
      var byteSize = 1 << shift;
      var sizePerPixel = colorChannelsInGlTextureFormat(format) * byteSize;
      var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel, GL.unpackAlignment);
      return heap.subarray(pixels2 >> shift, pixels2 + bytes >> shift);
    };
    var _glTexImage2D = (target, level, internalFormat, width, height, border, format, type, pixels2) => {
      GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels2 ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels2, internalFormat) : null);
    };
    function _glTexParameteri(x0, x1, x2) {
      GLctx.texParameteri(x0, x1, x2);
    }
    var arraySum = (array, index) => {
      var sum = 0;
      for (var i = 0; i <= index; sum += array[i++]) {
      }
      return sum;
    };
    var MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var addDays = (date, days) => {
      var newDate = new Date(date.getTime());
      while (days > 0) {
        var leap = isLeapYear(newDate.getFullYear());
        var currentMonth = newDate.getMonth();
        var daysInCurrentMonth = (leap ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR)[currentMonth];
        if (days > daysInCurrentMonth - newDate.getDate()) {
          days -= daysInCurrentMonth - newDate.getDate() + 1;
          newDate.setDate(1);
          if (currentMonth < 11) {
            newDate.setMonth(currentMonth + 1);
          } else {
            newDate.setMonth(0);
            newDate.setFullYear(newDate.getFullYear() + 1);
          }
        } else {
          newDate.setDate(newDate.getDate() + days);
          return newDate;
        }
      }
      return newDate;
    };
    var writeArrayToMemory = (array, buffer) => {
      HEAP8.set(array, buffer);
    };
    var _strftime = (s, maxsize, format, tm) => {
      var tm_zone = HEAPU32[tm + 40 >> 2];
      var date = { tm_sec: HEAP32[tm >> 2], tm_min: HEAP32[tm + 4 >> 2], tm_hour: HEAP32[tm + 8 >> 2], tm_mday: HEAP32[tm + 12 >> 2], tm_mon: HEAP32[tm + 16 >> 2], tm_year: HEAP32[tm + 20 >> 2], tm_wday: HEAP32[tm + 24 >> 2], tm_yday: HEAP32[tm + 28 >> 2], tm_isdst: HEAP32[tm + 32 >> 2], tm_gmtoff: HEAP32[tm + 36 >> 2], tm_zone: tm_zone ? UTF8ToString(tm_zone) : "" };
      var pattern = UTF8ToString(format);
      var EXPANSION_RULES_1 = { "%c": "%a %b %d %H:%M:%S %Y", "%D": "%m/%d/%y", "%F": "%Y-%m-%d", "%h": "%b", "%r": "%I:%M:%S %p", "%R": "%H:%M", "%T": "%H:%M:%S", "%x": "%m/%d/%y", "%X": "%H:%M:%S", "%Ec": "%c", "%EC": "%C", "%Ex": "%m/%d/%y", "%EX": "%H:%M:%S", "%Ey": "%y", "%EY": "%Y", "%Od": "%d", "%Oe": "%e", "%OH": "%H", "%OI": "%I", "%Om": "%m", "%OM": "%M", "%OS": "%S", "%Ou": "%u", "%OU": "%U", "%OV": "%V", "%Ow": "%w", "%OW": "%W", "%Oy": "%y" };
      for (var rule in EXPANSION_RULES_1) {
        pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule]);
      }
      var WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      function leadingSomething(value, digits, character) {
        var str2 = typeof value == "number" ? value.toString() : value || "";
        while (str2.length < digits) {
          str2 = character[0] + str2;
        }
        return str2;
      }
      function leadingNulls(value, digits) {
        return leadingSomething(value, digits, "0");
      }
      function compareByDay(date1, date2) {
        function sgn(value) {
          return value < 0 ? -1 : value > 0 ? 1 : 0;
        }
        var compare;
        if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
          if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
            compare = sgn(date1.getDate() - date2.getDate());
          }
        }
        return compare;
      }
      function getFirstWeekStartDate(janFourth) {
        switch (janFourth.getDay()) {
          case 0:
            return new Date(janFourth.getFullYear() - 1, 11, 29);
          case 1:
            return janFourth;
          case 2:
            return new Date(janFourth.getFullYear(), 0, 3);
          case 3:
            return new Date(janFourth.getFullYear(), 0, 2);
          case 4:
            return new Date(janFourth.getFullYear(), 0, 1);
          case 5:
            return new Date(janFourth.getFullYear() - 1, 11, 31);
          case 6:
            return new Date(janFourth.getFullYear() - 1, 11, 30);
        }
      }
      function getWeekBasedYear(date2) {
        var thisDate = addDays(new Date(date2.tm_year + 1900, 0, 1), date2.tm_yday);
        var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
        var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
        var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
        var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
        if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
          if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
            return thisDate.getFullYear() + 1;
          }
          return thisDate.getFullYear();
        }
        return thisDate.getFullYear() - 1;
      }
      var EXPANSION_RULES_2 = { "%a": (date2) => WEEKDAYS[date2.tm_wday].substring(0, 3), "%A": (date2) => WEEKDAYS[date2.tm_wday], "%b": (date2) => MONTHS[date2.tm_mon].substring(0, 3), "%B": (date2) => MONTHS[date2.tm_mon], "%C": (date2) => {
        var year = date2.tm_year + 1900;
        return leadingNulls(year / 100 | 0, 2);
      }, "%d": (date2) => leadingNulls(date2.tm_mday, 2), "%e": (date2) => leadingSomething(date2.tm_mday, 2, " "), "%g": (date2) => getWeekBasedYear(date2).toString().substring(2), "%G": getWeekBasedYear, "%H": (date2) => leadingNulls(date2.tm_hour, 2), "%I": (date2) => {
        var twelveHour = date2.tm_hour;
        if (twelveHour == 0)
          twelveHour = 12;
        else if (twelveHour > 12)
          twelveHour -= 12;
        return leadingNulls(twelveHour, 2);
      }, "%j": (date2) => leadingNulls(date2.tm_mday + arraySum(isLeapYear(date2.tm_year + 1900) ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR, date2.tm_mon - 1), 3), "%m": (date2) => leadingNulls(date2.tm_mon + 1, 2), "%M": (date2) => leadingNulls(date2.tm_min, 2), "%n": () => "\n", "%p": (date2) => {
        if (date2.tm_hour >= 0 && date2.tm_hour < 12) {
          return "AM";
        }
        return "PM";
      }, "%S": (date2) => leadingNulls(date2.tm_sec, 2), "%t": () => "	", "%u": (date2) => date2.tm_wday || 7, "%U": (date2) => {
        var days = date2.tm_yday + 7 - date2.tm_wday;
        return leadingNulls(Math.floor(days / 7), 2);
      }, "%V": (date2) => {
        var val = Math.floor((date2.tm_yday + 7 - (date2.tm_wday + 6) % 7) / 7);
        if ((date2.tm_wday + 371 - date2.tm_yday - 2) % 7 <= 2) {
          val++;
        }
        if (!val) {
          val = 52;
          var dec31 = (date2.tm_wday + 7 - date2.tm_yday - 1) % 7;
          if (dec31 == 4 || dec31 == 5 && isLeapYear(date2.tm_year % 400 - 1)) {
            val++;
          }
        } else if (val == 53) {
          var jan1 = (date2.tm_wday + 371 - date2.tm_yday) % 7;
          if (jan1 != 4 && (jan1 != 3 || !isLeapYear(date2.tm_year)))
            val = 1;
        }
        return leadingNulls(val, 2);
      }, "%w": (date2) => date2.tm_wday, "%W": (date2) => {
        var days = date2.tm_yday + 7 - (date2.tm_wday + 6) % 7;
        return leadingNulls(Math.floor(days / 7), 2);
      }, "%y": (date2) => (date2.tm_year + 1900).toString().substring(2), "%Y": (date2) => date2.tm_year + 1900, "%z": (date2) => {
        var off = date2.tm_gmtoff;
        var ahead = off >= 0;
        off = Math.abs(off) / 60;
        off = off / 60 * 100 + off % 60;
        return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
      }, "%Z": (date2) => date2.tm_zone, "%%": () => "%" };
      pattern = pattern.replace(/%%/g, "\0\0");
      for (var rule in EXPANSION_RULES_2) {
        if (pattern.includes(rule)) {
          pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_2[rule](date));
        }
      }
      pattern = pattern.replace(/\0\0/g, "%");
      var bytes = intArrayFromString(pattern, false);
      if (bytes.length > maxsize) {
        return 0;
      }
      writeArrayToMemory(bytes, s);
      return bytes.length - 1;
    };
    var _strftime_l = (s, maxsize, format, tm, loc) => _strftime(s, maxsize, format, tm);
    var getCFunc = (ident) => {
      var func = Module["_" + ident];
      return func;
    };
    var stringToUTF8OnStack = (str2) => {
      var size = lengthBytesUTF8(str2) + 1;
      var ret = stackAlloc(size);
      stringToUTF8(str2, ret, size);
      return ret;
    };
    var ccall = (ident, returnType, argTypes, args, opts) => {
      var toC = { "string": (str2) => {
        var ret2 = 0;
        if (str2 !== null && str2 !== void 0 && str2 !== 0) {
          ret2 = stringToUTF8OnStack(str2);
        }
        return ret2;
      }, "array": (arr) => {
        var ret2 = stackAlloc(arr.length);
        writeArrayToMemory(arr, ret2);
        return ret2;
      } };
      function convertReturnValue(ret2) {
        if (returnType === "string") {
          return UTF8ToString(ret2);
        }
        if (returnType === "boolean")
          return Boolean(ret2);
        return ret2;
      }
      var func = getCFunc(ident);
      var cArgs = [];
      var stack = 0;
      if (args) {
        for (var i = 0; i < args.length; i++) {
          var converter = toC[argTypes[i]];
          if (converter) {
            if (stack === 0)
              stack = stackSave();
            cArgs[i] = converter(args[i]);
          } else {
            cArgs[i] = args[i];
          }
        }
      }
      var ret = func.apply(null, cArgs);
      function onDone(ret2) {
        if (stack !== 0)
          stackRestore(stack);
        return convertReturnValue(ret2);
      }
      ret = onDone(ret);
      return ret;
    };
    var cwrap = (ident, returnType, argTypes, opts) => {
      var numericArgs = !argTypes || argTypes.every((type) => type === "number" || type === "boolean");
      var numericRet = returnType !== "string";
      if (numericRet && numericArgs && !opts) {
        return getCFunc(ident);
      }
      return function() {
        return ccall(ident, returnType, argTypes, arguments, opts);
      };
    };
    var FSNode = function(parent, name, mode, rdev) {
      if (!parent) {
        parent = this;
      }
      this.parent = parent;
      this.mount = parent.mount;
      this.mounted = null;
      this.id = FS.nextInode++;
      this.name = name;
      this.mode = mode;
      this.node_ops = {};
      this.stream_ops = {};
      this.rdev = rdev;
    };
    var readMode = 292 | 73;
    var writeMode = 146;
    Object.defineProperties(FSNode.prototype, { read: { get: function() {
      return (this.mode & readMode) === readMode;
    }, set: function(val) {
      val ? this.mode |= readMode : this.mode &= ~readMode;
    } }, write: { get: function() {
      return (this.mode & writeMode) === writeMode;
    }, set: function(val) {
      val ? this.mode |= writeMode : this.mode &= ~writeMode;
    } }, isFolder: { get: function() {
      return FS.isDir(this.mode);
    } }, isDevice: { get: function() {
      return FS.isChrdev(this.mode);
    } } });
    FS.FSNode = FSNode;
    FS.createPreloadedFile = FS_createPreloadedFile;
    FS.staticInit();
    Module["requestFullscreen"] = Browser.requestFullscreen;
    Module["requestAnimationFrame"] = Browser.requestAnimationFrame;
    Module["setCanvasSize"] = Browser.setCanvasSize;
    Module["pauseMainLoop"] = Browser.mainLoop.pause;
    Module["resumeMainLoop"] = Browser.mainLoop.resume;
    Module["getUserMedia"] = Browser.getUserMedia;
    Module["createContext"] = Browser.createContext;
    var preloadedImages = {};
    var preloadedAudios = {};
    Fetch.init();
    var GLctx;
    var wasmImports = { a: ___syscall_fcntl64, A: ___syscall_getdents64, H: ___syscall_ioctl, i: ___syscall_openat, y: ___syscall_readlinkat, D: ___syscall_stat64, z: ___syscall_symlink, w: ___syscall_unlinkat, I: __emscripten_fetch_free, F: __emscripten_get_now_is_monotonic, q: __gmtime_js, r: __localtime_js, x: __tzset_js, b: _abort, n: emgfx, p: emidentity, o: emlicerr, h: _emscripten_async_call, f: _emscripten_date_now, t: _emscripten_get_heap_max, E: _emscripten_get_now, K: _emscripten_is_main_browser_thread, G: _emscripten_memcpy_js, v: _emscripten_resize_heap, J: _emscripten_start_fetch, B: _environ_get, C: _environ_sizes_get, m: _exit, c: _fd_close, j: _fd_read, s: _fd_seek, g: _fd_write, k: _glBindTexture, l: _glGenTextures, d: _glTexImage2D, e: _glTexParameteri, u: _strftime_l };
    var wasmExports = createWasm();
    var ___wasm_call_ctors = wasmExports["M"];
    var _zappar_has_initialized = Module["_zappar_has_initialized"] = wasmExports["N"];
    var _zappar_invert = Module["_zappar_invert"] = wasmExports["O"];
    var _zappar_loaded = Module["_zappar_loaded"] = wasmExports["P"];
    var _zappar_pipeline_create = Module["_zappar_pipeline_create"] = wasmExports["R"];
    var _zappar_pipeline_destroy = Module["_zappar_pipeline_destroy"] = wasmExports["S"];
    var _zappar_pipeline_camera_frame_submit = Module["_zappar_pipeline_camera_frame_submit"] = wasmExports["T"];
    var _zappar_pipeline_camera_frame_submit_raw_pointer = Module["_zappar_pipeline_camera_frame_submit_raw_pointer"] = wasmExports["U"];
    var _zappar_pipeline_frame_update = Module["_zappar_pipeline_frame_update"] = wasmExports["V"];
    var _zappar_pipeline_camera_frame_user_data = Module["_zappar_pipeline_camera_frame_user_data"] = wasmExports["W"];
    var _zappar_pipeline_camera_model = Module["_zappar_pipeline_camera_model"] = wasmExports["X"];
    var _zappar_pipeline_camera_data_width = Module["_zappar_pipeline_camera_data_width"] = wasmExports["Y"];
    var _zappar_pipeline_camera_data_height = Module["_zappar_pipeline_camera_data_height"] = wasmExports["Z"];
    var _zappar_pipeline_camera_frame_sharpness = Module["_zappar_pipeline_camera_frame_sharpness"] = wasmExports["_"];
    var _zappar_pipeline_camera_frame_sharpness_enabled_set = Module["_zappar_pipeline_camera_frame_sharpness_enabled_set"] = wasmExports["$"];
    var _zappar_pipeline_frame_number = Module["_zappar_pipeline_frame_number"] = wasmExports["aa"];
    var _zappar_pipeline_camera_frame_data_raw_size = Module["_zappar_pipeline_camera_frame_data_raw_size"] = wasmExports["ba"];
    var _zappar_pipeline_camera_frame_data_raw = Module["_zappar_pipeline_camera_frame_data_raw"] = wasmExports["ca"];
    var _zappar_pipeline_motion_accelerometer_submit = Module["_zappar_pipeline_motion_accelerometer_submit"] = wasmExports["da"];
    var _zappar_pipeline_motion_accelerometer_with_gravity_submit_int = Module["_zappar_pipeline_motion_accelerometer_with_gravity_submit_int"] = wasmExports["ea"];
    var _zappar_pipeline_motion_accelerometer_without_gravity_submit_int = Module["_zappar_pipeline_motion_accelerometer_without_gravity_submit_int"] = wasmExports["fa"];
    var _zappar_pipeline_motion_rotation_rate_submit_int = Module["_zappar_pipeline_motion_rotation_rate_submit_int"] = wasmExports["ga"];
    var _zappar_pipeline_motion_attitude_submit_int = Module["_zappar_pipeline_motion_attitude_submit_int"] = wasmExports["ha"];
    var _zappar_pipeline_motion_relative_orientation_submit_int = Module["_zappar_pipeline_motion_relative_orientation_submit_int"] = wasmExports["ia"];
    var _zappar_pipeline_motion_rotation_rate_submit = Module["_zappar_pipeline_motion_rotation_rate_submit"] = wasmExports["ja"];
    var _zappar_pipeline_motion_attitude_submit = Module["_zappar_pipeline_motion_attitude_submit"] = wasmExports["ka"];
    var _zappar_pipeline_motion_attitude_matrix_submit = Module["_zappar_pipeline_motion_attitude_matrix_submit"] = wasmExports["la"];
    var _zappar_pipeline_camera_frame_user_facing = Module["_zappar_pipeline_camera_frame_user_facing"] = wasmExports["ma"];
    var _zappar_pipeline_camera_frame_texture_matrix = Module["_zappar_pipeline_camera_frame_texture_matrix"] = wasmExports["na"];
    var _zappar_pipeline_camera_pose_with_attitude = Module["_zappar_pipeline_camera_pose_with_attitude"] = wasmExports["oa"];
    var _zappar_pipeline_camera_pose_with_origin = Module["_zappar_pipeline_camera_pose_with_origin"] = wasmExports["pa"];
    var _zappar_pipeline_camera_frame_camera_attitude = Module["_zappar_pipeline_camera_frame_camera_attitude"] = wasmExports["qa"];
    var _zappar_pipeline_camera_frame_device_attitude = Module["_zappar_pipeline_camera_frame_device_attitude"] = wasmExports["ra"];
    var _zappar_pipeline_camera_frame_texture_gl = Module["_zappar_pipeline_camera_frame_texture_gl"] = wasmExports["sa"];
    var _zappar_pipeline_camera_frame_upload_gl = Module["_zappar_pipeline_camera_frame_upload_gl"] = wasmExports["ta"];
    var _zappar_pipeline_sequence_record_start = Module["_zappar_pipeline_sequence_record_start"] = wasmExports["ua"];
    var _zappar_pipeline_sequence_record_stop = Module["_zappar_pipeline_sequence_record_stop"] = wasmExports["va"];
    var _zappar_pipeline_sequence_record_clear = Module["_zappar_pipeline_sequence_record_clear"] = wasmExports["wa"];
    var _zappar_pipeline_sequence_record_device_attitude_matrices_set = Module["_zappar_pipeline_sequence_record_device_attitude_matrices_set"] = wasmExports["xa"];
    var _zappar_pipeline_sequence_record_data_size = Module["_zappar_pipeline_sequence_record_data_size"] = wasmExports["ya"];
    var _zappar_pipeline_sequence_record_data = Module["_zappar_pipeline_sequence_record_data"] = wasmExports["za"];
    var _zappar_pipeline_process_gl = Module["_zappar_pipeline_process_gl"] = wasmExports["Aa"];
    var _zappar_pipeline_camera_pose_default = Module["_zappar_pipeline_camera_pose_default"] = wasmExports["Ba"];
    var _zappar_instant_world_tracker_create = Module["_zappar_instant_world_tracker_create"] = wasmExports["Ca"];
    var _zappar_instant_world_tracker_destroy = Module["_zappar_instant_world_tracker_destroy"] = wasmExports["Da"];
    var _zappar_instant_world_tracker_anchor_pose_set_from_camera_offset_raw = Module["_zappar_instant_world_tracker_anchor_pose_set_from_camera_offset_raw"] = wasmExports["Ea"];
    var _zappar_instant_world_tracker_anchor_pose_raw = Module["_zappar_instant_world_tracker_anchor_pose_raw"] = wasmExports["Fa"];
    var _zappar_instant_world_tracker_enabled_set = Module["_zappar_instant_world_tracker_enabled_set"] = wasmExports["Ga"];
    var _zappar_instant_world_tracker_enabled = Module["_zappar_instant_world_tracker_enabled"] = wasmExports["Ha"];
    var _zappar_custom_anchor_create = Module["_zappar_custom_anchor_create"] = wasmExports["Ia"];
    var _zappar_custom_anchor_destroy = Module["_zappar_custom_anchor_destroy"] = wasmExports["Ja"];
    var _zappar_custom_anchor_pose_set_from_camera_offset_raw = Module["_zappar_custom_anchor_pose_set_from_camera_offset_raw"] = wasmExports["Ka"];
    var _zappar_custom_anchor_pose_set_from_anchor_offset = Module["_zappar_custom_anchor_pose_set_from_anchor_offset"] = wasmExports["La"];
    var _zappar_custom_anchor_pose_set_with_parent = Module["_zappar_custom_anchor_pose_set_with_parent"] = wasmExports["Ma"];
    var _zappar_custom_anchor_pose_set = Module["_zappar_custom_anchor_pose_set"] = wasmExports["Na"];
    var _zappar_custom_anchor_pose_version = Module["_zappar_custom_anchor_pose_version"] = wasmExports["Oa"];
    var _zappar_custom_anchor_pose_raw = Module["_zappar_custom_anchor_pose_raw"] = wasmExports["Pa"];
    var _zappar_custom_anchor_id = Module["_zappar_custom_anchor_id"] = wasmExports["Qa"];
    var _zappar_custom_anchor_status = Module["_zappar_custom_anchor_status"] = wasmExports["Ra"];
    var _zappar_image_tracker_create = Module["_zappar_image_tracker_create"] = wasmExports["Sa"];
    var _zappar_image_tracker_destroy = Module["_zappar_image_tracker_destroy"] = wasmExports["Ta"];
    var _zappar_image_tracker_target_load_from_memory = Module["_zappar_image_tracker_target_load_from_memory"] = wasmExports["Ua"];
    var __Z42zappar_image_tracker_target_load_from_fileP23zappar_image_tracker_tiPKc = Module["__Z42zappar_image_tracker_target_load_from_fileP23zappar_image_tracker_tiPKc"] = wasmExports["Va"];
    var _free = Module["_free"] = wasmExports["Wa"];
    var _zappar_image_tracker_anchor_count = Module["_zappar_image_tracker_anchor_count"] = wasmExports["Xa"];
    var _zappar_image_tracker_anchor_id = Module["_zappar_image_tracker_anchor_id"] = wasmExports["Ya"];
    var _zappar_image_tracker_anchor_pose_raw = Module["_zappar_image_tracker_anchor_pose_raw"] = wasmExports["Za"];
    var _zappar_image_tracker_enabled_set = Module["_zappar_image_tracker_enabled_set"] = wasmExports["_a"];
    var _zappar_image_tracker_enabled = Module["_zappar_image_tracker_enabled"] = wasmExports["$a"];
    var _zappar_image_tracker_target_loaded_version = Module["_zappar_image_tracker_target_loaded_version"] = wasmExports["ab"];
    var __Z33zappar_image_tracker_target_countP23zappar_image_tracker_ti = Module["__Z33zappar_image_tracker_target_countP23zappar_image_tracker_ti"] = wasmExports["bb"];
    var __Z46zappar_image_tracker_target_preview_compressedP23zappar_image_tracker_tii = Module["__Z46zappar_image_tracker_target_preview_compressedP23zappar_image_tracker_tii"] = wasmExports["cb"];
    var __Z51zappar_image_tracker_target_preview_compressed_sizeP23zappar_image_tracker_tii = Module["__Z51zappar_image_tracker_target_preview_compressed_sizeP23zappar_image_tracker_tii"] = wasmExports["db"];
    var __Z55zappar_image_tracker_target_preview_compressed_mimetypeP23zappar_image_tracker_tii = Module["__Z55zappar_image_tracker_target_preview_compressed_mimetypeP23zappar_image_tracker_tii"] = wasmExports["eb"];
    var __Z40zappar_image_tracker_target_preview_rgbaP23zappar_image_tracker_tii = Module["__Z40zappar_image_tracker_target_preview_rgbaP23zappar_image_tracker_tii"] = wasmExports["fb"];
    var __Z45zappar_image_tracker_target_preview_rgba_sizeP23zappar_image_tracker_tii = Module["__Z45zappar_image_tracker_target_preview_rgba_sizeP23zappar_image_tracker_tii"] = wasmExports["gb"];
    var __Z46zappar_image_tracker_target_preview_rgba_widthP23zappar_image_tracker_tii = Module["__Z46zappar_image_tracker_target_preview_rgba_widthP23zappar_image_tracker_tii"] = wasmExports["hb"];
    var __Z47zappar_image_tracker_target_preview_rgba_heightP23zappar_image_tracker_tii = Module["__Z47zappar_image_tracker_target_preview_rgba_heightP23zappar_image_tracker_tii"] = wasmExports["ib"];
    var __Z38zappar_image_tracker_target_radius_topP23zappar_image_tracker_tii = Module["__Z38zappar_image_tracker_target_radius_topP23zappar_image_tracker_tii"] = wasmExports["jb"];
    var __Z41zappar_image_tracker_target_radius_bottomP23zappar_image_tracker_tii = Module["__Z41zappar_image_tracker_target_radius_bottomP23zappar_image_tracker_tii"] = wasmExports["kb"];
    var __Z39zappar_image_tracker_target_side_lengthP23zappar_image_tracker_tii = Module["__Z39zappar_image_tracker_target_side_lengthP23zappar_image_tracker_tii"] = wasmExports["lb"];
    var __Z49zappar_image_tracker_target_physical_scale_factorP23zappar_image_tracker_tii = Module["__Z49zappar_image_tracker_target_physical_scale_factorP23zappar_image_tracker_tii"] = wasmExports["mb"];
    var __Z49zappar_image_tracker_target_preview_mesh_verticesP23zappar_image_tracker_tii = Module["__Z49zappar_image_tracker_target_preview_mesh_verticesP23zappar_image_tracker_tii"] = wasmExports["nb"];
    var __Z48zappar_image_tracker_target_preview_mesh_normalsP23zappar_image_tracker_tii = Module["__Z48zappar_image_tracker_target_preview_mesh_normalsP23zappar_image_tracker_tii"] = wasmExports["ob"];
    var __Z44zappar_image_tracker_target_preview_mesh_uvsP23zappar_image_tracker_tii = Module["__Z44zappar_image_tracker_target_preview_mesh_uvsP23zappar_image_tracker_tii"] = wasmExports["pb"];
    var __Z48zappar_image_tracker_target_preview_mesh_indicesP23zappar_image_tracker_tii = Module["__Z48zappar_image_tracker_target_preview_mesh_indicesP23zappar_image_tracker_tii"] = wasmExports["qb"];
    var __Z54zappar_image_tracker_target_preview_mesh_vertices_sizeP23zappar_image_tracker_tii = Module["__Z54zappar_image_tracker_target_preview_mesh_vertices_sizeP23zappar_image_tracker_tii"] = wasmExports["rb"];
    var __Z53zappar_image_tracker_target_preview_mesh_normals_sizeP23zappar_image_tracker_tii = Module["__Z53zappar_image_tracker_target_preview_mesh_normals_sizeP23zappar_image_tracker_tii"] = wasmExports["sb"];
    var __Z49zappar_image_tracker_target_preview_mesh_uvs_sizeP23zappar_image_tracker_tii = Module["__Z49zappar_image_tracker_target_preview_mesh_uvs_sizeP23zappar_image_tracker_tii"] = wasmExports["tb"];
    var __Z53zappar_image_tracker_target_preview_mesh_indices_sizeP23zappar_image_tracker_tii = Module["__Z53zappar_image_tracker_target_preview_mesh_indices_sizeP23zappar_image_tracker_tii"] = wasmExports["ub"];
    var __Z32zappar_image_tracker_target_typeP23zappar_image_tracker_tii = Module["__Z32zappar_image_tracker_target_typeP23zappar_image_tracker_tii"] = wasmExports["vb"];
    var _zappar_face_tracker_create = Module["_zappar_face_tracker_create"] = wasmExports["wb"];
    var _zappar_face_tracker_destroy = Module["_zappar_face_tracker_destroy"] = wasmExports["xb"];
    var _zappar_face_tracker_model_load_from_memory = Module["_zappar_face_tracker_model_load_from_memory"] = wasmExports["yb"];
    var _zappar_face_tracker_anchor_count = Module["_zappar_face_tracker_anchor_count"] = wasmExports["zb"];
    var _zappar_face_tracker_anchor_id = Module["_zappar_face_tracker_anchor_id"] = wasmExports["Ab"];
    var _zappar_face_tracker_anchor_pose_raw = Module["_zappar_face_tracker_anchor_pose_raw"] = wasmExports["Bb"];
    var _zappar_face_tracker_anchor_identity_coefficients = Module["_zappar_face_tracker_anchor_identity_coefficients"] = wasmExports["Cb"];
    var _zappar_face_tracker_anchor_expression_coefficients = Module["_zappar_face_tracker_anchor_expression_coefficients"] = wasmExports["Db"];
    var _zappar_face_tracker_enabled_set = Module["_zappar_face_tracker_enabled_set"] = wasmExports["Eb"];
    var _zappar_face_tracker_enabled = Module["_zappar_face_tracker_enabled"] = wasmExports["Fb"];
    var _zappar_face_tracker_max_faces_set = Module["_zappar_face_tracker_max_faces_set"] = wasmExports["Gb"];
    var _zappar_face_tracker_max_faces = Module["_zappar_face_tracker_max_faces"] = wasmExports["Hb"];
    var _zappar_face_tracker_model_loaded_version = Module["_zappar_face_tracker_model_loaded_version"] = wasmExports["Ib"];
    var _zappar_face_landmark_create = Module["_zappar_face_landmark_create"] = wasmExports["Jb"];
    var _zappar_face_landmark_destroy = Module["_zappar_face_landmark_destroy"] = wasmExports["Kb"];
    var __Z27zappar_face_landmark_updateP23zappar_face_landmark_tiPKfS2_i = Module["__Z27zappar_face_landmark_updateP23zappar_face_landmark_tiPKfS2_i"] = wasmExports["Lb"];
    var _zappar_face_landmark_anchor_pose = Module["_zappar_face_landmark_anchor_pose"] = wasmExports["Mb"];
    var _zappar_barcode_finder_create = Module["_zappar_barcode_finder_create"] = wasmExports["Nb"];
    var _zappar_barcode_finder_destroy = Module["_zappar_barcode_finder_destroy"] = wasmExports["Ob"];
    var _zappar_barcode_finder_found_number = Module["_zappar_barcode_finder_found_number"] = wasmExports["Pb"];
    var _zappar_barcode_finder_found_text = Module["_zappar_barcode_finder_found_text"] = wasmExports["Qb"];
    var _zappar_barcode_finder_enabled_set = Module["_zappar_barcode_finder_enabled_set"] = wasmExports["Rb"];
    var _zappar_barcode_finder_enabled = Module["_zappar_barcode_finder_enabled"] = wasmExports["Sb"];
    var _zappar_barcode_finder_found_format = Module["_zappar_barcode_finder_found_format"] = wasmExports["Tb"];
    var _zappar_barcode_finder_formats = Module["_zappar_barcode_finder_formats"] = wasmExports["Ub"];
    var _zappar_barcode_finder_formats_set = Module["_zappar_barcode_finder_formats_set"] = wasmExports["Vb"];
    var _zappar_zapcode_tracker_create = Module["_zappar_zapcode_tracker_create"] = wasmExports["Wb"];
    var _zappar_zapcode_tracker_destroy = Module["_zappar_zapcode_tracker_destroy"] = wasmExports["Xb"];
    var _zappar_zapcode_tracker_target_load_from_memory = Module["_zappar_zapcode_tracker_target_load_from_memory"] = wasmExports["Yb"];
    var __Z44zappar_zapcode_tracker_target_load_from_fileP25zappar_zapcode_tracker_tiPKc = Module["__Z44zappar_zapcode_tracker_target_load_from_fileP25zappar_zapcode_tracker_tiPKc"] = wasmExports["Zb"];
    var _zappar_zapcode_tracker_anchor_count = Module["_zappar_zapcode_tracker_anchor_count"] = wasmExports["_b"];
    var _zappar_zapcode_tracker_anchor_id = Module["_zappar_zapcode_tracker_anchor_id"] = wasmExports["$b"];
    var _zappar_zapcode_tracker_anchor_pose_raw = Module["_zappar_zapcode_tracker_anchor_pose_raw"] = wasmExports["ac"];
    var _zappar_zapcode_tracker_enabled_set = Module["_zappar_zapcode_tracker_enabled_set"] = wasmExports["bc"];
    var _zappar_zapcode_tracker_enabled = Module["_zappar_zapcode_tracker_enabled"] = wasmExports["cc"];
    var _zappar_zapcode_tracker_target_loaded_version = Module["_zappar_zapcode_tracker_target_loaded_version"] = wasmExports["dc"];
    var _malloc = Module["_malloc"] = wasmExports["ec"];
    var _zappar_face_mesh_create = Module["_zappar_face_mesh_create"] = wasmExports["fc"];
    var _zappar_face_mesh_destroy = Module["_zappar_face_mesh_destroy"] = wasmExports["gc"];
    var __Z33zappar_face_mesh_load_from_memoryP19zappar_face_mesh_tiPKciiiii = Module["__Z33zappar_face_mesh_load_from_memoryP19zappar_face_mesh_tiPKciiiii"] = wasmExports["hc"];
    var __Z29zappar_face_mesh_indices_sizeP19zappar_face_mesh_ti = Module["__Z29zappar_face_mesh_indices_sizeP19zappar_face_mesh_ti"] = wasmExports["ic"];
    var __Z25zappar_face_mesh_uvs_sizeP19zappar_face_mesh_ti = Module["__Z25zappar_face_mesh_uvs_sizeP19zappar_face_mesh_ti"] = wasmExports["jc"];
    var __Z30zappar_face_mesh_vertices_sizeP19zappar_face_mesh_ti = Module["__Z30zappar_face_mesh_vertices_sizeP19zappar_face_mesh_ti"] = wasmExports["kc"];
    var __Z31zappar_face_mesh_loaded_versionP19zappar_face_mesh_ti = Module["__Z31zappar_face_mesh_loaded_versionP19zappar_face_mesh_ti"] = wasmExports["lc"];
    var __Z25zappar_face_mesh_verticesP19zappar_face_mesh_ti = Module["__Z25zappar_face_mesh_verticesP19zappar_face_mesh_ti"] = wasmExports["mc"];
    var __Z20zappar_face_mesh_uvsP19zappar_face_mesh_ti = Module["__Z20zappar_face_mesh_uvsP19zappar_face_mesh_ti"] = wasmExports["nc"];
    var __Z24zappar_face_mesh_indicesP19zappar_face_mesh_ti = Module["__Z24zappar_face_mesh_indicesP19zappar_face_mesh_ti"] = wasmExports["oc"];
    var __Z23zappar_face_mesh_updateP19zappar_face_mesh_tiPKfS2_i = Module["__Z23zappar_face_mesh_updateP19zappar_face_mesh_tiPKfS2_i"] = wasmExports["pc"];
    var __Z29zappar_face_mesh_normals_sizeP19zappar_face_mesh_ti = Module["__Z29zappar_face_mesh_normals_sizeP19zappar_face_mesh_ti"] = wasmExports["qc"];
    var __Z24zappar_face_mesh_normalsP19zappar_face_mesh_ti = Module["__Z24zappar_face_mesh_normalsP19zappar_face_mesh_ti"] = wasmExports["rc"];
    var _zappar_camera_source_create = Module["_zappar_camera_source_create"] = wasmExports["sc"];
    var _zappar_camera_source_destroy = Module["_zappar_camera_source_destroy"] = wasmExports["tc"];
    var _zappar_camera_source_start = Module["_zappar_camera_source_start"] = wasmExports["uc"];
    var _zappar_camera_source_pause = Module["_zappar_camera_source_pause"] = wasmExports["vc"];
    var _zappar_camera_default_device_id = Module["_zappar_camera_default_device_id"] = wasmExports["wc"];
    var _zappar_sequence_source_create = Module["_zappar_sequence_source_create"] = wasmExports["xc"];
    var __Z28zappar_sequence_source_startP25zappar_sequence_source_ti = Module["__Z28zappar_sequence_source_startP25zappar_sequence_source_ti"] = wasmExports["yc"];
    var __Z39zappar_sequence_source_load_from_memoryP25zappar_sequence_source_tiPKci = Module["__Z39zappar_sequence_source_load_from_memoryP25zappar_sequence_source_tiPKci"] = wasmExports["zc"];
    var __Z28zappar_sequence_source_pauseP25zappar_sequence_source_ti = Module["__Z28zappar_sequence_source_pauseP25zappar_sequence_source_ti"] = wasmExports["Ac"];
    var _zappar_sequence_source_destroy = Module["_zappar_sequence_source_destroy"] = wasmExports["Bc"];
    var _zappar_sequence_source_max_playback_fps_set = Module["_zappar_sequence_source_max_playback_fps_set"] = wasmExports["Cc"];
    var _zappar_log_level_set = Module["_zappar_log_level_set"] = wasmExports["Dc"];
    var _zappar_log_level = Module["_zappar_log_level"] = wasmExports["Ec"];
    var __Z23zappar_log_redirect_setPFv18zappar_log_level_tPKcE = Module["__Z23zappar_log_redirect_setPFv18zappar_log_level_tPKcE"] = wasmExports["Fc"];
    var _zappar_world_tracker_create = Module["_zappar_world_tracker_create"] = wasmExports["Gc"];
    var _zappar_world_tracker_destroy = Module["_zappar_world_tracker_destroy"] = wasmExports["Hc"];
    var _zappar_world_tracker_world_anchor_status = Module["_zappar_world_tracker_world_anchor_status"] = wasmExports["Ic"];
    var _zappar_world_tracker_world_anchor_id = Module["_zappar_world_tracker_world_anchor_id"] = wasmExports["Jc"];
    var _zappar_world_tracker_plane_anchor_count = Module["_zappar_world_tracker_plane_anchor_count"] = wasmExports["Kc"];
    var _zappar_world_tracker_plane_anchor_id = Module["_zappar_world_tracker_plane_anchor_id"] = wasmExports["Lc"];
    var _zappar_world_tracker_plane_anchor_pose_raw = Module["_zappar_world_tracker_plane_anchor_pose_raw"] = wasmExports["Mc"];
    var _zappar_world_tracker_world_anchor_pose_raw = Module["_zappar_world_tracker_world_anchor_pose_raw"] = wasmExports["Nc"];
    var _zappar_world_tracker_ground_anchor_status = Module["_zappar_world_tracker_ground_anchor_status"] = wasmExports["Oc"];
    var _zappar_world_tracker_ground_anchor_id = Module["_zappar_world_tracker_ground_anchor_id"] = wasmExports["Pc"];
    var _zappar_world_tracker_ground_anchor_pose_raw = Module["_zappar_world_tracker_ground_anchor_pose_raw"] = wasmExports["Qc"];
    var _zappar_world_tracker_reset = Module["_zappar_world_tracker_reset"] = wasmExports["Rc"];
    var _zappar_world_tracker_enabled_set = Module["_zappar_world_tracker_enabled_set"] = wasmExports["Sc"];
    var _zappar_world_tracker_enabled = Module["_zappar_world_tracker_enabled"] = wasmExports["Tc"];
    var _zappar_world_tracker_scale_mode_set = Module["_zappar_world_tracker_scale_mode_set"] = wasmExports["Uc"];
    var _zappar_world_tracker_scale_mode = Module["_zappar_world_tracker_scale_mode"] = wasmExports["Vc"];
    var _zappar_world_tracker_session_number = Module["_zappar_world_tracker_session_number"] = wasmExports["Wc"];
    var _zappar_world_tracker_quality = Module["_zappar_world_tracker_quality"] = wasmExports["Xc"];
    var _zappar_world_tracker_tracks_data_enabled = Module["_zappar_world_tracker_tracks_data_enabled"] = wasmExports["Yc"];
    var _zappar_world_tracker_projections_data_enabled = Module["_zappar_world_tracker_projections_data_enabled"] = wasmExports["Zc"];
    var _zappar_world_tracker_tracks_data_enabled_set = Module["_zappar_world_tracker_tracks_data_enabled_set"] = wasmExports["_c"];
    var _zappar_world_tracker_projections_data_enabled_set = Module["_zappar_world_tracker_projections_data_enabled_set"] = wasmExports["$c"];
    var _zappar_world_tracker_tracks_data = Module["_zappar_world_tracker_tracks_data"] = wasmExports["ad"];
    var _zappar_world_tracker_tracks_data_size = Module["_zappar_world_tracker_tracks_data_size"] = wasmExports["bd"];
    var _zappar_world_tracker_tracks_type_data = Module["_zappar_world_tracker_tracks_type_data"] = wasmExports["cd"];
    var _zappar_world_tracker_tracks_type_data_size = Module["_zappar_world_tracker_tracks_type_data_size"] = wasmExports["dd"];
    var _zappar_world_tracker_projections_data = Module["_zappar_world_tracker_projections_data"] = wasmExports["ed"];
    var _zappar_world_tracker_projections_data_size = Module["_zappar_world_tracker_projections_data_size"] = wasmExports["fd"];
    var _zappar_world_tracker_horizontal_plane_detection_enabled = Module["_zappar_world_tracker_horizontal_plane_detection_enabled"] = wasmExports["gd"];
    var _zappar_world_tracker_horizontal_plane_detection_enabled_set = Module["_zappar_world_tracker_horizontal_plane_detection_enabled_set"] = wasmExports["hd"];
    var _zappar_world_tracker_vertical_plane_detection_enabled = Module["_zappar_world_tracker_vertical_plane_detection_enabled"] = wasmExports["id"];
    var _zappar_world_tracker_vertical_plane_detection_enabled_set = Module["_zappar_world_tracker_vertical_plane_detection_enabled_set"] = wasmExports["jd"];
    var _zappar_world_tracker_vertical_plane_detection_supported = Module["_zappar_world_tracker_vertical_plane_detection_supported"] = wasmExports["kd"];
    var _zappar_world_tracker_plane_anchor_orientation = Module["_zappar_world_tracker_plane_anchor_orientation"] = wasmExports["ld"];
    var _zappar_world_tracker_plane_anchor_polygon_data = Module["_zappar_world_tracker_plane_anchor_polygon_data"] = wasmExports["md"];
    var _zappar_world_tracker_plane_anchor_polygon_data_size = Module["_zappar_world_tracker_plane_anchor_polygon_data_size"] = wasmExports["nd"];
    var _zappar_world_tracker_plane_anchor_polygon_version = Module["_zappar_world_tracker_plane_anchor_polygon_version"] = wasmExports["od"];
    var _zappar_world_tracker_plane_anchor_status = Module["_zappar_world_tracker_plane_anchor_status"] = wasmExports["pd"];
    var _worker_message_send_count = Module["_worker_message_send_count"] = wasmExports["qd"];
    var _worker_message_send_clear = Module["_worker_message_send_clear"] = wasmExports["rd"];
    var _worker_message_send_data_size = Module["_worker_message_send_data_size"] = wasmExports["sd"];
    var _worker_message_send_reference = Module["_worker_message_send_reference"] = wasmExports["td"];
    var _worker_message_send_instance = Module["_worker_message_send_instance"] = wasmExports["ud"];
    var _worker_message_send_data = Module["_worker_message_send_data"] = wasmExports["vd"];
    var _worker_message_receive = Module["_worker_message_receive"] = wasmExports["wd"];
    var _ceres_worker = Module["_ceres_worker"] = wasmExports["xd"];
    var _data_download_clear = Module["_data_download_clear"] = wasmExports["yd"];
    var _data_download_size = Module["_data_download_size"] = wasmExports["zd"];
    var _data_download = Module["_data_download"] = wasmExports["Ad"];
    var _data_should_record_set = Module["_data_should_record_set"] = wasmExports["Bd"];
    var _zappar_analytics_project_id_set = Module["_zappar_analytics_project_id_set"] = wasmExports["Cd"];
    var _htons = wasmExports["htons"];
    var _ntohs = wasmExports["ntohs"];
    var ___trap = wasmExports["Dd"];
    var stackSave = wasmExports["Ed"];
    var stackRestore = wasmExports["Fd"];
    var stackAlloc = wasmExports["Gd"];
    var ___start_em_js = Module["___start_em_js"] = 673284;
    var ___stop_em_js = Module["___stop_em_js"] = 674449;
    Module["cwrap"] = cwrap;
    Module["setValue"] = setValue;
    Module["getValue"] = getValue;
    Module["UTF8ToString"] = UTF8ToString;
    var calledRun;
    dependenciesFulfilled = function runCaller() {
      if (!calledRun)
        run();
      if (!calledRun)
        dependenciesFulfilled = runCaller;
    };
    function run() {
      if (runDependencies > 0) {
        return;
      }
      preRun();
      if (runDependencies > 0) {
        return;
      }
      function doRun() {
        if (calledRun)
          return;
        calledRun = true;
        Module["calledRun"] = true;
        if (ABORT)
          return;
        initRuntime();
        readyPromiseResolve(Module);
        if (Module["onRuntimeInitialized"])
          Module["onRuntimeInitialized"]();
        postRun();
      }
      if (Module["setStatus"]) {
        Module["setStatus"]("Running...");
        setTimeout(function() {
          setTimeout(function() {
            Module["setStatus"]("");
          }, 1);
          doRun();
        }, 1);
      } else {
        doRun();
      }
    }
    if (Module["preInit"]) {
      if (typeof Module["preInit"] == "function")
        Module["preInit"] = [Module["preInit"]];
      while (Module["preInit"].length > 0) {
        Module["preInit"].pop()();
      }
    }
    run();
    return moduleArg;
  };
})();
var zappar_cv_default = ZCV;

// ../../node_modules/@zappar/zappar-cv/lib/gen/zappar-cwrap.js
function getRuntimeObject(mod) {
  let log_level_wrapped = mod.cwrap("zappar_log_level", "number", []);
  let log_level_set_wrapped = mod.cwrap("zappar_log_level_set", null, [
    "number"
  ]);
  let analytics_project_id_set_wrapped = mod.cwrap("zappar_analytics_project_id_set", null, [
    "string",
    "string"
  ]);
  let pipeline_create_wrapped = mod.cwrap("zappar_pipeline_create", "number", []);
  let pipeline_destroy_wrapped = mod.cwrap("zappar_pipeline_destroy", null, ["number"]);
  let pipeline_camera_frame_data_raw_wrapped = mod.cwrap("zappar_pipeline_camera_frame_data_raw", "number", [
    "number"
  ]);
  let pipeline_camera_frame_data_raw_size_wrapped = mod.cwrap("zappar_pipeline_camera_frame_data_raw_size", "number", [
    "number"
  ]);
  let pipeline_frame_update_wrapped = mod.cwrap("zappar_pipeline_frame_update", null, [
    "number"
  ]);
  let pipeline_frame_number_wrapped = mod.cwrap("zappar_pipeline_frame_number", "number", [
    "number"
  ]);
  let pipeline_camera_model_wrapped = mod.cwrap("zappar_pipeline_camera_model", "number", [
    "number"
  ]);
  let pipeline_camera_data_width_wrapped = mod.cwrap("zappar_pipeline_camera_data_width", "number", [
    "number"
  ]);
  let pipeline_camera_data_height_wrapped = mod.cwrap("zappar_pipeline_camera_data_height", "number", [
    "number"
  ]);
  let pipeline_camera_frame_sharpness_enabled_wrapped = mod.cwrap("zappar_pipeline_camera_frame_sharpness_enabled", "number", [
    "number"
  ]);
  let pipeline_camera_frame_sharpness_enabled_set_wrapped = mod.cwrap("zappar_pipeline_camera_frame_sharpness_enabled_set", null, [
    "number",
    "number"
  ]);
  let pipeline_camera_frame_sharpness_wrapped = mod.cwrap("zappar_pipeline_camera_frame_sharpness", "number", [
    "number"
  ]);
  let pipeline_camera_frame_user_data_wrapped = mod.cwrap("zappar_pipeline_camera_frame_user_data", "number", [
    "number"
  ]);
  let pipeline_camera_frame_submit_wrapped = mod.cwrap("zappar_pipeline_camera_frame_submit", null, [
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number"
  ]);
  let pipeline_camera_frame_submit_raw_pointer_wrapped = mod.cwrap("zappar_pipeline_camera_frame_submit_raw_pointer", null, [
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number"
  ]);
  let pipeline_camera_frame_camera_attitude_wrapped = mod.cwrap("zappar_pipeline_camera_frame_camera_attitude", "number", [
    "number"
  ]);
  let pipeline_camera_frame_device_attitude_wrapped = mod.cwrap("zappar_pipeline_camera_frame_device_attitude", "number", [
    "number"
  ]);
  let pipeline_motion_accelerometer_submit_wrapped = mod.cwrap("zappar_pipeline_motion_accelerometer_submit", null, [
    "number",
    "number",
    "number",
    "number",
    "number"
  ]);
  let pipeline_motion_accelerometer_with_gravity_submit_int_wrapped = mod.cwrap("zappar_pipeline_motion_accelerometer_with_gravity_submit_int", null, [
    "number",
    "number",
    "number",
    "number",
    "number",
    "number"
  ]);
  let pipeline_motion_accelerometer_without_gravity_submit_int_wrapped = mod.cwrap("zappar_pipeline_motion_accelerometer_without_gravity_submit_int", null, [
    "number",
    "number",
    "number",
    "number",
    "number",
    "number"
  ]);
  let pipeline_motion_rotation_rate_submit_wrapped = mod.cwrap("zappar_pipeline_motion_rotation_rate_submit", null, [
    "number",
    "number",
    "number",
    "number",
    "number"
  ]);
  let pipeline_motion_rotation_rate_submit_int_wrapped = mod.cwrap("zappar_pipeline_motion_rotation_rate_submit_int", null, [
    "number",
    "number",
    "number",
    "number",
    "number",
    "number"
  ]);
  let pipeline_motion_attitude_submit_wrapped = mod.cwrap("zappar_pipeline_motion_attitude_submit", null, [
    "number",
    "number",
    "number",
    "number",
    "number"
  ]);
  let pipeline_motion_attitude_submit_int_wrapped = mod.cwrap("zappar_pipeline_motion_attitude_submit_int", null, [
    "number",
    "number",
    "number",
    "number",
    "number",
    "number"
  ]);
  let pipeline_motion_relative_orientation_submit_int_wrapped = mod.cwrap("zappar_pipeline_motion_relative_orientation_submit_int", null, [
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number"
  ]);
  let pipeline_motion_attitude_matrix_submit_wrapped = mod.cwrap("zappar_pipeline_motion_attitude_matrix_submit", null, [
    "number",
    "number"
  ]);
  let camera_source_create_wrapped = mod.cwrap("zappar_camera_source_create", "number", ["number", "string"]);
  let camera_source_destroy_wrapped = mod.cwrap("zappar_camera_source_destroy", null, ["number"]);
  let sequence_source_create_wrapped = mod.cwrap("zappar_sequence_source_create", "number", ["number"]);
  let sequence_source_destroy_wrapped = mod.cwrap("zappar_sequence_source_destroy", null, ["number"]);
  let image_tracker_create_wrapped = mod.cwrap("zappar_image_tracker_create", "number", ["number"]);
  let image_tracker_destroy_wrapped = mod.cwrap("zappar_image_tracker_destroy", null, ["number"]);
  let image_tracker_target_load_from_memory_wrapped = mod.cwrap("zappar_image_tracker_target_load_from_memory", null, [
    "number",
    "number",
    "number"
  ]);
  let image_tracker_target_loaded_version_wrapped = mod.cwrap("zappar_image_tracker_target_loaded_version", "number", [
    "number"
  ]);
  let image_tracker_enabled_wrapped = mod.cwrap("zappar_image_tracker_enabled", "number", [
    "number"
  ]);
  let image_tracker_enabled_set_wrapped = mod.cwrap("zappar_image_tracker_enabled_set", null, [
    "number",
    "number"
  ]);
  let image_tracker_anchor_count_wrapped = mod.cwrap("zappar_image_tracker_anchor_count", "number", [
    "number"
  ]);
  let image_tracker_anchor_id_wrapped = mod.cwrap("zappar_image_tracker_anchor_id", "string", [
    "number",
    "number"
  ]);
  let image_tracker_anchor_pose_raw_wrapped = mod.cwrap("zappar_image_tracker_anchor_pose_raw", "number", [
    "number",
    "number"
  ]);
  let face_tracker_create_wrapped = mod.cwrap("zappar_face_tracker_create", "number", ["number"]);
  let face_tracker_destroy_wrapped = mod.cwrap("zappar_face_tracker_destroy", null, ["number"]);
  let face_tracker_model_load_from_memory_wrapped = mod.cwrap("zappar_face_tracker_model_load_from_memory", null, [
    "number",
    "number",
    "number"
  ]);
  let face_tracker_model_loaded_version_wrapped = mod.cwrap("zappar_face_tracker_model_loaded_version", "number", [
    "number"
  ]);
  let face_tracker_enabled_set_wrapped = mod.cwrap("zappar_face_tracker_enabled_set", null, [
    "number",
    "number"
  ]);
  let face_tracker_enabled_wrapped = mod.cwrap("zappar_face_tracker_enabled", "number", [
    "number"
  ]);
  let face_tracker_max_faces_set_wrapped = mod.cwrap("zappar_face_tracker_max_faces_set", null, [
    "number",
    "number"
  ]);
  let face_tracker_max_faces_wrapped = mod.cwrap("zappar_face_tracker_max_faces", "number", [
    "number"
  ]);
  let face_tracker_anchor_count_wrapped = mod.cwrap("zappar_face_tracker_anchor_count", "number", [
    "number"
  ]);
  let face_tracker_anchor_id_wrapped = mod.cwrap("zappar_face_tracker_anchor_id", "string", [
    "number",
    "number"
  ]);
  let face_tracker_anchor_pose_raw_wrapped = mod.cwrap("zappar_face_tracker_anchor_pose_raw", "number", [
    "number",
    "number"
  ]);
  let face_tracker_anchor_identity_coefficients_wrapped = mod.cwrap("zappar_face_tracker_anchor_identity_coefficients", "number", [
    "number",
    "number"
  ]);
  let face_tracker_anchor_expression_coefficients_wrapped = mod.cwrap("zappar_face_tracker_anchor_expression_coefficients", "number", [
    "number",
    "number"
  ]);
  let face_mesh_create_wrapped = mod.cwrap("zappar_face_mesh_create", "number", []);
  let face_mesh_destroy_wrapped = mod.cwrap("zappar_face_mesh_destroy", null, ["number"]);
  let face_landmark_create_wrapped = mod.cwrap("zappar_face_landmark_create", "number", ["number"]);
  let face_landmark_destroy_wrapped = mod.cwrap("zappar_face_landmark_destroy", null, ["number"]);
  let barcode_finder_create_wrapped = mod.cwrap("zappar_barcode_finder_create", "number", ["number"]);
  let barcode_finder_destroy_wrapped = mod.cwrap("zappar_barcode_finder_destroy", null, ["number"]);
  let barcode_finder_enabled_set_wrapped = mod.cwrap("zappar_barcode_finder_enabled_set", null, [
    "number",
    "number"
  ]);
  let barcode_finder_enabled_wrapped = mod.cwrap("zappar_barcode_finder_enabled", "number", [
    "number"
  ]);
  let barcode_finder_found_number_wrapped = mod.cwrap("zappar_barcode_finder_found_number", "number", [
    "number"
  ]);
  let barcode_finder_found_text_wrapped = mod.cwrap("zappar_barcode_finder_found_text", "string", [
    "number",
    "number"
  ]);
  let barcode_finder_found_format_wrapped = mod.cwrap("zappar_barcode_finder_found_format", "number", [
    "number",
    "number"
  ]);
  let barcode_finder_formats_wrapped = mod.cwrap("zappar_barcode_finder_formats", "number", [
    "number"
  ]);
  let barcode_finder_formats_set_wrapped = mod.cwrap("zappar_barcode_finder_formats_set", null, [
    "number",
    "number"
  ]);
  let instant_world_tracker_create_wrapped = mod.cwrap("zappar_instant_world_tracker_create", "number", ["number"]);
  let instant_world_tracker_destroy_wrapped = mod.cwrap("zappar_instant_world_tracker_destroy", null, ["number"]);
  let instant_world_tracker_enabled_set_wrapped = mod.cwrap("zappar_instant_world_tracker_enabled_set", null, [
    "number",
    "number"
  ]);
  let instant_world_tracker_enabled_wrapped = mod.cwrap("zappar_instant_world_tracker_enabled", "number", [
    "number"
  ]);
  let instant_world_tracker_anchor_pose_raw_wrapped = mod.cwrap("zappar_instant_world_tracker_anchor_pose_raw", "number", [
    "number"
  ]);
  let instant_world_tracker_anchor_pose_set_from_camera_offset_raw_wrapped = mod.cwrap("zappar_instant_world_tracker_anchor_pose_set_from_camera_offset_raw", null, [
    "number",
    "number",
    "number",
    "number",
    "number"
  ]);
  let zapcode_tracker_create_wrapped = mod.cwrap("zappar_zapcode_tracker_create", "number", ["number"]);
  let zapcode_tracker_destroy_wrapped = mod.cwrap("zappar_zapcode_tracker_destroy", null, ["number"]);
  let zapcode_tracker_target_load_from_memory_wrapped = mod.cwrap("zappar_zapcode_tracker_target_load_from_memory", null, [
    "number",
    "number",
    "number"
  ]);
  let zapcode_tracker_target_loaded_version_wrapped = mod.cwrap("zappar_zapcode_tracker_target_loaded_version", "number", [
    "number"
  ]);
  let zapcode_tracker_enabled_wrapped = mod.cwrap("zappar_zapcode_tracker_enabled", "number", [
    "number"
  ]);
  let zapcode_tracker_enabled_set_wrapped = mod.cwrap("zappar_zapcode_tracker_enabled_set", null, [
    "number",
    "number"
  ]);
  let zapcode_tracker_anchor_count_wrapped = mod.cwrap("zappar_zapcode_tracker_anchor_count", "number", [
    "number"
  ]);
  let zapcode_tracker_anchor_id_wrapped = mod.cwrap("zappar_zapcode_tracker_anchor_id", "string", [
    "number",
    "number"
  ]);
  let zapcode_tracker_anchor_pose_raw_wrapped = mod.cwrap("zappar_zapcode_tracker_anchor_pose_raw", "number", [
    "number",
    "number"
  ]);
  let world_tracker_create_wrapped = mod.cwrap("zappar_world_tracker_create", "number", ["number"]);
  let world_tracker_destroy_wrapped = mod.cwrap("zappar_world_tracker_destroy", null, ["number"]);
  let world_tracker_enabled_wrapped = mod.cwrap("zappar_world_tracker_enabled", "number", [
    "number"
  ]);
  let world_tracker_enabled_set_wrapped = mod.cwrap("zappar_world_tracker_enabled_set", null, [
    "number",
    "number"
  ]);
  let world_tracker_scale_mode_wrapped = mod.cwrap("zappar_world_tracker_scale_mode", "number", [
    "number"
  ]);
  let world_tracker_scale_mode_set_wrapped = mod.cwrap("zappar_world_tracker_scale_mode_set", null, [
    "number",
    "number"
  ]);
  let world_tracker_session_number_wrapped = mod.cwrap("zappar_world_tracker_session_number", "number", [
    "number"
  ]);
  let world_tracker_quality_wrapped = mod.cwrap("zappar_world_tracker_quality", "number", [
    "number"
  ]);
  let world_tracker_horizontal_plane_detection_enabled_wrapped = mod.cwrap("zappar_world_tracker_horizontal_plane_detection_enabled", "number", [
    "number"
  ]);
  let world_tracker_horizontal_plane_detection_enabled_set_wrapped = mod.cwrap("zappar_world_tracker_horizontal_plane_detection_enabled_set", null, [
    "number",
    "number"
  ]);
  let world_tracker_vertical_plane_detection_enabled_wrapped = mod.cwrap("zappar_world_tracker_vertical_plane_detection_enabled", "number", [
    "number"
  ]);
  let world_tracker_vertical_plane_detection_enabled_set_wrapped = mod.cwrap("zappar_world_tracker_vertical_plane_detection_enabled_set", null, [
    "number",
    "number"
  ]);
  let world_tracker_plane_anchor_count_wrapped = mod.cwrap("zappar_world_tracker_plane_anchor_count", "number", [
    "number"
  ]);
  let world_tracker_plane_anchor_id_wrapped = mod.cwrap("zappar_world_tracker_plane_anchor_id", "string", [
    "number",
    "number"
  ]);
  let world_tracker_plane_anchor_pose_raw_wrapped = mod.cwrap("zappar_world_tracker_plane_anchor_pose_raw", "number", [
    "number",
    "number"
  ]);
  let world_tracker_plane_anchor_status_wrapped = mod.cwrap("zappar_world_tracker_plane_anchor_status", "number", [
    "number",
    "number"
  ]);
  let world_tracker_plane_anchor_polygon_data_size_wrapped = mod.cwrap("zappar_world_tracker_plane_anchor_polygon_data_size", "number", [
    "number",
    "number"
  ]);
  let world_tracker_plane_anchor_polygon_data_wrapped = mod.cwrap("zappar_world_tracker_plane_anchor_polygon_data", "number", [
    "number",
    "number"
  ]);
  let world_tracker_plane_anchor_polygon_version_wrapped = mod.cwrap("zappar_world_tracker_plane_anchor_polygon_version", "number", [
    "number",
    "number"
  ]);
  let world_tracker_plane_anchor_orientation_wrapped = mod.cwrap("zappar_world_tracker_plane_anchor_orientation", "number", [
    "number",
    "number"
  ]);
  let world_tracker_world_anchor_status_wrapped = mod.cwrap("zappar_world_tracker_world_anchor_status", "number", [
    "number"
  ]);
  let world_tracker_world_anchor_id_wrapped = mod.cwrap("zappar_world_tracker_world_anchor_id", "string", [
    "number"
  ]);
  let world_tracker_world_anchor_pose_raw_wrapped = mod.cwrap("zappar_world_tracker_world_anchor_pose_raw", "number", [
    "number"
  ]);
  let world_tracker_ground_anchor_id_wrapped = mod.cwrap("zappar_world_tracker_ground_anchor_id", "string", [
    "number"
  ]);
  let world_tracker_ground_anchor_status_wrapped = mod.cwrap("zappar_world_tracker_ground_anchor_status", "number", [
    "number"
  ]);
  let world_tracker_ground_anchor_pose_raw_wrapped = mod.cwrap("zappar_world_tracker_ground_anchor_pose_raw", "number", [
    "number"
  ]);
  let world_tracker_reset_wrapped = mod.cwrap("zappar_world_tracker_reset", null, [
    "number"
  ]);
  let world_tracker_tracks_data_enabled_wrapped = mod.cwrap("zappar_world_tracker_tracks_data_enabled", "number", [
    "number"
  ]);
  let world_tracker_tracks_data_enabled_set_wrapped = mod.cwrap("zappar_world_tracker_tracks_data_enabled_set", null, [
    "number",
    "number"
  ]);
  let world_tracker_tracks_data_size_wrapped = mod.cwrap("zappar_world_tracker_tracks_data_size", "number", [
    "number"
  ]);
  let world_tracker_tracks_data_wrapped = mod.cwrap("zappar_world_tracker_tracks_data", "number", [
    "number"
  ]);
  let world_tracker_tracks_type_data_size_wrapped = mod.cwrap("zappar_world_tracker_tracks_type_data_size", "number", [
    "number"
  ]);
  let world_tracker_tracks_type_data_wrapped = mod.cwrap("zappar_world_tracker_tracks_type_data", "number", [
    "number"
  ]);
  let world_tracker_projections_data_enabled_wrapped = mod.cwrap("zappar_world_tracker_projections_data_enabled", "number", [
    "number"
  ]);
  let world_tracker_projections_data_enabled_set_wrapped = mod.cwrap("zappar_world_tracker_projections_data_enabled_set", null, [
    "number",
    "number"
  ]);
  let world_tracker_projections_data_size_wrapped = mod.cwrap("zappar_world_tracker_projections_data_size", "number", [
    "number"
  ]);
  let world_tracker_projections_data_wrapped = mod.cwrap("zappar_world_tracker_projections_data", "number", [
    "number"
  ]);
  let custom_anchor_create_wrapped = mod.cwrap("zappar_custom_anchor_create", "number", ["number", "number", "string"]);
  let custom_anchor_destroy_wrapped = mod.cwrap("zappar_custom_anchor_destroy", null, ["number"]);
  let custom_anchor_status_wrapped = mod.cwrap("zappar_custom_anchor_status", "number", [
    "number"
  ]);
  let custom_anchor_pose_version_wrapped = mod.cwrap("zappar_custom_anchor_pose_version", "number", [
    "number"
  ]);
  let custom_anchor_pose_raw_wrapped = mod.cwrap("zappar_custom_anchor_pose_raw", "number", [
    "number"
  ]);
  let custom_anchor_pose_set_from_camera_offset_raw_wrapped = mod.cwrap("zappar_custom_anchor_pose_set_from_camera_offset_raw", null, [
    "number",
    "number",
    "number",
    "number",
    "number"
  ]);
  let custom_anchor_pose_set_from_anchor_offset_wrapped = mod.cwrap("zappar_custom_anchor_pose_set_from_anchor_offset", null, [
    "number",
    "string",
    "number",
    "number",
    "number",
    "number"
  ]);
  let custom_anchor_pose_set_wrapped = mod.cwrap("zappar_custom_anchor_pose_set", null, [
    "number",
    "number"
  ]);
  let custom_anchor_pose_set_with_parent_wrapped = mod.cwrap("zappar_custom_anchor_pose_set_with_parent", null, [
    "number",
    "number",
    "string"
  ]);
  let d3_tracker_create_wrapped = mod.cwrap("zappar_d3_tracker_create", "number", ["number"]);
  let d3_tracker_destroy_wrapped = mod.cwrap("zappar_d3_tracker_destroy", null, ["number"]);
  let dataArrayArgLength = 32;
  let dataArrayArg = mod._malloc(dataArrayArgLength);
  let floatDataArrayArgLength = 16 * 4;
  let floatDataArrayArg = mod._malloc(floatDataArrayArgLength);
  let floatDataArraysByArgIndex = /* @__PURE__ */ new Map();
  let getFloatDataArrayForArgIndex = (indx, len) => {
    let existing = floatDataArraysByArgIndex.get(indx);
    if (!existing || existing[0] < len) {
      if (existing)
        mod._free(existing[1]);
      existing = [len, mod._malloc(len)];
      floatDataArraysByArgIndex.set(indx, existing);
    }
    return existing[1];
  };
  return {
    log_level: () => {
      let ret = log_level_wrapped();
      return ret;
    },
    log_level_set: (level) => {
      let arg_level = level;
      let ret = log_level_set_wrapped(arg_level);
      return ret;
    },
    analytics_project_id_set: (id, uid) => {
      let arg_id = id;
      let arg_uid = uid;
      let ret = analytics_project_id_set_wrapped(arg_id, arg_uid);
      return ret;
    },
    pipeline_create: () => {
      return pipeline_create_wrapped();
    },
    pipeline_destroy: () => {
      pipeline_destroy_wrapped();
    },
    pipeline_camera_frame_data_raw: (o) => {
      let ret = pipeline_camera_frame_data_raw_wrapped(o);
      return ret;
    },
    pipeline_camera_frame_data_raw_size: (o) => {
      let ret = pipeline_camera_frame_data_raw_size_wrapped(o);
      return ret;
    },
    pipeline_frame_update: (o) => {
      let ret = pipeline_frame_update_wrapped(o);
      return ret;
    },
    pipeline_frame_number: (o) => {
      let ret = pipeline_frame_number_wrapped(o);
      return ret;
    },
    pipeline_camera_model: (o) => {
      let ret = pipeline_camera_model_wrapped(o);
      let ab = new Float32Array(6);
      ab.set(mod.HEAPF32.subarray(ret / 4, 6 + ret / 4));
      ret = ab;
      return ret;
    },
    pipeline_camera_data_width: (o) => {
      let ret = pipeline_camera_data_width_wrapped(o);
      return ret;
    },
    pipeline_camera_data_height: (o) => {
      let ret = pipeline_camera_data_height_wrapped(o);
      return ret;
    },
    pipeline_camera_frame_sharpness_enabled: (o) => {
      let ret = pipeline_camera_frame_sharpness_enabled_wrapped(o);
      ret = ret === 1;
      return ret;
    },
    pipeline_camera_frame_sharpness_enabled_set: (o, val) => {
      let arg_val = val ? 1 : 0;
      let ret = pipeline_camera_frame_sharpness_enabled_set_wrapped(o, arg_val);
      return ret;
    },
    pipeline_camera_frame_sharpness: (o) => {
      let ret = pipeline_camera_frame_sharpness_wrapped(o);
      return ret;
    },
    pipeline_camera_frame_user_data: (o) => {
      let ret = pipeline_camera_frame_user_data_wrapped(o);
      return ret;
    },
    pipeline_camera_frame_submit: (o, data, width, height, user_data, camera_to_device_transform, camera_model, user_facing, timestampMicroseconds) => {
      if (dataArrayArgLength < data.byteLength) {
        mod._free(dataArrayArg);
        dataArrayArgLength = data.byteLength;
        dataArrayArg = mod._malloc(dataArrayArgLength);
      }
      let arg_data = dataArrayArg;
      let arg_len_data = data.byteLength;
      mod.HEAPU8.set(new Uint8Array(data), dataArrayArg);
      let arg_width = width;
      let arg_height = height;
      let arg_user_data = user_data;
      let arg_camera_to_device_transform = getFloatDataArrayForArgIndex(4, camera_to_device_transform.byteLength);
      mod.HEAPF32.set(camera_to_device_transform, arg_camera_to_device_transform / 4);
      let arg_camera_model = getFloatDataArrayForArgIndex(5, camera_model.byteLength);
      mod.HEAPF32.set(camera_model, arg_camera_model / 4);
      let arg_user_facing = user_facing ? 1 : 0;
      let arg_timestampMicroseconds = timestampMicroseconds;
      let ret = pipeline_camera_frame_submit_wrapped(o, arg_data, arg_len_data, arg_width, arg_height, arg_user_data, arg_camera_to_device_transform, arg_camera_model, arg_user_facing, arg_timestampMicroseconds);
      return ret;
    },
    pipeline_camera_frame_submit_raw_pointer: (o, data, dataLength, format, width, height, user_data, camera_to_device_transform, rotation, camera_model, user_facing, timestampMicroseconds, halfSample) => {
      let arg_data = data;
      let arg_dataLength = dataLength;
      let arg_format = format;
      let arg_width = width;
      let arg_height = height;
      let arg_user_data = user_data;
      let arg_camera_to_device_transform = getFloatDataArrayForArgIndex(6, camera_to_device_transform.byteLength);
      mod.HEAPF32.set(camera_to_device_transform, arg_camera_to_device_transform / 4);
      let arg_rotation = rotation;
      let arg_camera_model = getFloatDataArrayForArgIndex(8, camera_model.byteLength);
      mod.HEAPF32.set(camera_model, arg_camera_model / 4);
      let arg_user_facing = user_facing ? 1 : 0;
      let arg_timestampMicroseconds = timestampMicroseconds;
      let arg_halfSample = halfSample ? 1 : 0;
      let ret = pipeline_camera_frame_submit_raw_pointer_wrapped(o, arg_data, arg_dataLength, arg_format, arg_width, arg_height, arg_user_data, arg_camera_to_device_transform, arg_rotation, arg_camera_model, arg_user_facing, arg_timestampMicroseconds, arg_halfSample);
      return ret;
    },
    pipeline_camera_frame_camera_attitude: (o) => {
      let ret = pipeline_camera_frame_camera_attitude_wrapped(o);
      let ab = new Float32Array(16);
      ab.set(mod.HEAPF32.subarray(ret / 4, 16 + ret / 4));
      ret = ab;
      return ret;
    },
    pipeline_camera_frame_device_attitude: (o) => {
      let ret = pipeline_camera_frame_device_attitude_wrapped(o);
      let ab = new Float32Array(16);
      ab.set(mod.HEAPF32.subarray(ret / 4, 16 + ret / 4));
      ret = ab;
      return ret;
    },
    pipeline_motion_accelerometer_submit: (o, time, x, y, z) => {
      let arg_time = time;
      let arg_x = x;
      let arg_y = y;
      let arg_z = z;
      let ret = pipeline_motion_accelerometer_submit_wrapped(o, arg_time, arg_x, arg_y, arg_z);
      return ret;
    },
    pipeline_motion_accelerometer_with_gravity_submit_int: (o, time, interval, x, y, z) => {
      let arg_time = time;
      let arg_interval = interval;
      let arg_x = x;
      let arg_y = y;
      let arg_z = z;
      let ret = pipeline_motion_accelerometer_with_gravity_submit_int_wrapped(o, arg_time, arg_interval, arg_x, arg_y, arg_z);
      return ret;
    },
    pipeline_motion_accelerometer_without_gravity_submit_int: (o, time, interval, x, y, z) => {
      let arg_time = time;
      let arg_interval = interval;
      let arg_x = x;
      let arg_y = y;
      let arg_z = z;
      let ret = pipeline_motion_accelerometer_without_gravity_submit_int_wrapped(o, arg_time, arg_interval, arg_x, arg_y, arg_z);
      return ret;
    },
    pipeline_motion_rotation_rate_submit: (o, time, x, y, z) => {
      let arg_time = time;
      let arg_x = x;
      let arg_y = y;
      let arg_z = z;
      let ret = pipeline_motion_rotation_rate_submit_wrapped(o, arg_time, arg_x, arg_y, arg_z);
      return ret;
    },
    pipeline_motion_rotation_rate_submit_int: (o, time, interval, x, y, z) => {
      let arg_time = time;
      let arg_interval = interval;
      let arg_x = x;
      let arg_y = y;
      let arg_z = z;
      let ret = pipeline_motion_rotation_rate_submit_int_wrapped(o, arg_time, arg_interval, arg_x, arg_y, arg_z);
      return ret;
    },
    pipeline_motion_attitude_submit: (o, time, x, y, z) => {
      let arg_time = time;
      let arg_x = x;
      let arg_y = y;
      let arg_z = z;
      let ret = pipeline_motion_attitude_submit_wrapped(o, arg_time, arg_x, arg_y, arg_z);
      return ret;
    },
    pipeline_motion_attitude_submit_int: (o, time, interval, x, y, z) => {
      let arg_time = time;
      let arg_interval = interval;
      let arg_x = x;
      let arg_y = y;
      let arg_z = z;
      let ret = pipeline_motion_attitude_submit_int_wrapped(o, arg_time, arg_interval, arg_x, arg_y, arg_z);
      return ret;
    },
    pipeline_motion_relative_orientation_submit_int: (o, time, interval, x, y, z, w) => {
      let arg_time = time;
      let arg_interval = interval;
      let arg_x = x;
      let arg_y = y;
      let arg_z = z;
      let arg_w = w;
      let ret = pipeline_motion_relative_orientation_submit_int_wrapped(o, arg_time, arg_interval, arg_x, arg_y, arg_z, arg_w);
      return ret;
    },
    pipeline_motion_attitude_matrix_submit: (o, mat) => {
      let arg_mat = getFloatDataArrayForArgIndex(0, mat.byteLength);
      mod.HEAPF32.set(mat, arg_mat / 4);
      let ret = pipeline_motion_attitude_matrix_submit_wrapped(o, arg_mat);
      return ret;
    },
    camera_source_create: (pipeline, device_id) => {
      let arg_pipeline = pipeline;
      let arg_device_id = device_id;
      return camera_source_create_wrapped(arg_pipeline, arg_device_id);
    },
    camera_source_destroy: () => {
      camera_source_destroy_wrapped();
    },
    sequence_source_create: (pipeline) => {
      let arg_pipeline = pipeline;
      return sequence_source_create_wrapped(arg_pipeline);
    },
    sequence_source_destroy: () => {
      sequence_source_destroy_wrapped();
    },
    image_tracker_create: (pipeline) => {
      let arg_pipeline = pipeline;
      return image_tracker_create_wrapped(arg_pipeline);
    },
    image_tracker_destroy: () => {
      image_tracker_destroy_wrapped();
    },
    image_tracker_target_load_from_memory: (o, data) => {
      if (dataArrayArgLength < data.byteLength) {
        mod._free(dataArrayArg);
        dataArrayArgLength = data.byteLength;
        dataArrayArg = mod._malloc(dataArrayArgLength);
      }
      let arg_data = dataArrayArg;
      let arg_len_data = data.byteLength;
      mod.HEAPU8.set(new Uint8Array(data), dataArrayArg);
      let ret = image_tracker_target_load_from_memory_wrapped(o, arg_data, arg_len_data);
      return ret;
    },
    image_tracker_target_loaded_version: (o) => {
      let ret = image_tracker_target_loaded_version_wrapped(o);
      return ret;
    },
    image_tracker_enabled: (o) => {
      let ret = image_tracker_enabled_wrapped(o);
      ret = ret === 1;
      return ret;
    },
    image_tracker_enabled_set: (o, enabled) => {
      let arg_enabled = enabled ? 1 : 0;
      let ret = image_tracker_enabled_set_wrapped(o, arg_enabled);
      return ret;
    },
    image_tracker_anchor_count: (o) => {
      let ret = image_tracker_anchor_count_wrapped(o);
      return ret;
    },
    image_tracker_anchor_id: (o, indx) => {
      let arg_indx = indx;
      let ret = image_tracker_anchor_id_wrapped(o, arg_indx);
      return ret;
    },
    image_tracker_anchor_pose_raw: (o, indx) => {
      let arg_indx = indx;
      let ret = image_tracker_anchor_pose_raw_wrapped(o, arg_indx);
      let ab = new Float32Array(16);
      ab.set(mod.HEAPF32.subarray(ret / 4, 16 + ret / 4));
      ret = ab;
      return ret;
    },
    face_tracker_create: (pipeline) => {
      let arg_pipeline = pipeline;
      return face_tracker_create_wrapped(arg_pipeline);
    },
    face_tracker_destroy: () => {
      face_tracker_destroy_wrapped();
    },
    face_tracker_model_load_from_memory: (o, data) => {
      if (dataArrayArgLength < data.byteLength) {
        mod._free(dataArrayArg);
        dataArrayArgLength = data.byteLength;
        dataArrayArg = mod._malloc(dataArrayArgLength);
      }
      let arg_data = dataArrayArg;
      let arg_len_data = data.byteLength;
      mod.HEAPU8.set(new Uint8Array(data), dataArrayArg);
      let ret = face_tracker_model_load_from_memory_wrapped(o, arg_data, arg_len_data);
      return ret;
    },
    face_tracker_model_loaded_version: (o) => {
      let ret = face_tracker_model_loaded_version_wrapped(o);
      return ret;
    },
    face_tracker_enabled_set: (o, enabled) => {
      let arg_enabled = enabled ? 1 : 0;
      let ret = face_tracker_enabled_set_wrapped(o, arg_enabled);
      return ret;
    },
    face_tracker_enabled: (o) => {
      let ret = face_tracker_enabled_wrapped(o);
      ret = ret === 1;
      return ret;
    },
    face_tracker_max_faces_set: (o, num) => {
      let arg_num = num;
      let ret = face_tracker_max_faces_set_wrapped(o, arg_num);
      return ret;
    },
    face_tracker_max_faces: (o) => {
      let ret = face_tracker_max_faces_wrapped(o);
      return ret;
    },
    face_tracker_anchor_count: (o) => {
      let ret = face_tracker_anchor_count_wrapped(o);
      return ret;
    },
    face_tracker_anchor_id: (o, indx) => {
      let arg_indx = indx;
      let ret = face_tracker_anchor_id_wrapped(o, arg_indx);
      return ret;
    },
    face_tracker_anchor_pose_raw: (o, indx) => {
      let arg_indx = indx;
      let ret = face_tracker_anchor_pose_raw_wrapped(o, arg_indx);
      let ab = new Float32Array(16);
      ab.set(mod.HEAPF32.subarray(ret / 4, 16 + ret / 4));
      ret = ab;
      return ret;
    },
    face_tracker_anchor_identity_coefficients: (o, indx) => {
      let arg_indx = indx;
      let ret = face_tracker_anchor_identity_coefficients_wrapped(o, arg_indx);
      let ab = new Float32Array(50);
      ab.set(mod.HEAPF32.subarray(ret / 4, 50 + ret / 4));
      ret = ab;
      return ret;
    },
    face_tracker_anchor_expression_coefficients: (o, indx) => {
      let arg_indx = indx;
      let ret = face_tracker_anchor_expression_coefficients_wrapped(o, arg_indx);
      let ab = new Float32Array(29);
      ab.set(mod.HEAPF32.subarray(ret / 4, 29 + ret / 4));
      ret = ab;
      return ret;
    },
    face_mesh_create: () => {
      return face_mesh_create_wrapped();
    },
    face_mesh_destroy: () => {
      face_mesh_destroy_wrapped();
    },
    face_landmark_create: (landmark) => {
      let arg_landmark = landmark;
      return face_landmark_create_wrapped(arg_landmark);
    },
    face_landmark_destroy: () => {
      face_landmark_destroy_wrapped();
    },
    barcode_finder_create: (pipeline) => {
      let arg_pipeline = pipeline;
      return barcode_finder_create_wrapped(arg_pipeline);
    },
    barcode_finder_destroy: () => {
      barcode_finder_destroy_wrapped();
    },
    barcode_finder_enabled_set: (o, enabled) => {
      let arg_enabled = enabled ? 1 : 0;
      let ret = barcode_finder_enabled_set_wrapped(o, arg_enabled);
      return ret;
    },
    barcode_finder_enabled: (o) => {
      let ret = barcode_finder_enabled_wrapped(o);
      ret = ret === 1;
      return ret;
    },
    barcode_finder_found_number: (o) => {
      let ret = barcode_finder_found_number_wrapped(o);
      return ret;
    },
    barcode_finder_found_text: (o, indx) => {
      let arg_indx = indx;
      let ret = barcode_finder_found_text_wrapped(o, arg_indx);
      return ret;
    },
    barcode_finder_found_format: (o, indx) => {
      let arg_indx = indx;
      let ret = barcode_finder_found_format_wrapped(o, arg_indx);
      return ret;
    },
    barcode_finder_formats: (o) => {
      let ret = barcode_finder_formats_wrapped(o);
      return ret;
    },
    barcode_finder_formats_set: (o, f) => {
      let arg_f = f;
      let ret = barcode_finder_formats_set_wrapped(o, arg_f);
      return ret;
    },
    instant_world_tracker_create: (pipeline) => {
      let arg_pipeline = pipeline;
      return instant_world_tracker_create_wrapped(arg_pipeline);
    },
    instant_world_tracker_destroy: () => {
      instant_world_tracker_destroy_wrapped();
    },
    instant_world_tracker_enabled_set: (o, enabled) => {
      let arg_enabled = enabled ? 1 : 0;
      let ret = instant_world_tracker_enabled_set_wrapped(o, arg_enabled);
      return ret;
    },
    instant_world_tracker_enabled: (o) => {
      let ret = instant_world_tracker_enabled_wrapped(o);
      ret = ret === 1;
      return ret;
    },
    instant_world_tracker_anchor_pose_raw: (o) => {
      let ret = instant_world_tracker_anchor_pose_raw_wrapped(o);
      let ab = new Float32Array(16);
      ab.set(mod.HEAPF32.subarray(ret / 4, 16 + ret / 4));
      ret = ab;
      return ret;
    },
    instant_world_tracker_anchor_pose_set_from_camera_offset_raw: (o, x, y, z, orientation) => {
      let arg_x = x;
      let arg_y = y;
      let arg_z = z;
      let arg_orientation = orientation;
      let ret = instant_world_tracker_anchor_pose_set_from_camera_offset_raw_wrapped(o, arg_x, arg_y, arg_z, arg_orientation);
      return ret;
    },
    zapcode_tracker_create: (pipeline) => {
      let arg_pipeline = pipeline;
      return zapcode_tracker_create_wrapped(arg_pipeline);
    },
    zapcode_tracker_destroy: () => {
      zapcode_tracker_destroy_wrapped();
    },
    zapcode_tracker_target_load_from_memory: (o, data) => {
      if (dataArrayArgLength < data.byteLength) {
        mod._free(dataArrayArg);
        dataArrayArgLength = data.byteLength;
        dataArrayArg = mod._malloc(dataArrayArgLength);
      }
      let arg_data = dataArrayArg;
      let arg_len_data = data.byteLength;
      mod.HEAPU8.set(new Uint8Array(data), dataArrayArg);
      let ret = zapcode_tracker_target_load_from_memory_wrapped(o, arg_data, arg_len_data);
      return ret;
    },
    zapcode_tracker_target_loaded_version: (o) => {
      let ret = zapcode_tracker_target_loaded_version_wrapped(o);
      return ret;
    },
    zapcode_tracker_enabled: (o) => {
      let ret = zapcode_tracker_enabled_wrapped(o);
      ret = ret === 1;
      return ret;
    },
    zapcode_tracker_enabled_set: (o, enabled) => {
      let arg_enabled = enabled ? 1 : 0;
      let ret = zapcode_tracker_enabled_set_wrapped(o, arg_enabled);
      return ret;
    },
    zapcode_tracker_anchor_count: (o) => {
      let ret = zapcode_tracker_anchor_count_wrapped(o);
      return ret;
    },
    zapcode_tracker_anchor_id: (o, indx) => {
      let arg_indx = indx;
      let ret = zapcode_tracker_anchor_id_wrapped(o, arg_indx);
      return ret;
    },
    zapcode_tracker_anchor_pose_raw: (o, indx) => {
      let arg_indx = indx;
      let ret = zapcode_tracker_anchor_pose_raw_wrapped(o, arg_indx);
      let ab = new Float32Array(16);
      ab.set(mod.HEAPF32.subarray(ret / 4, 16 + ret / 4));
      ret = ab;
      return ret;
    },
    world_tracker_create: (pipeline) => {
      let arg_pipeline = pipeline;
      return world_tracker_create_wrapped(arg_pipeline);
    },
    world_tracker_destroy: () => {
      world_tracker_destroy_wrapped();
    },
    world_tracker_enabled: (o) => {
      let ret = world_tracker_enabled_wrapped(o);
      ret = ret === 1;
      return ret;
    },
    world_tracker_enabled_set: (o, enabled) => {
      let arg_enabled = enabled ? 1 : 0;
      let ret = world_tracker_enabled_set_wrapped(o, arg_enabled);
      return ret;
    },
    world_tracker_scale_mode: (o) => {
      let ret = world_tracker_scale_mode_wrapped(o);
      return ret;
    },
    world_tracker_scale_mode_set: (o, scale_mode) => {
      let arg_scale_mode = scale_mode;
      let ret = world_tracker_scale_mode_set_wrapped(o, arg_scale_mode);
      return ret;
    },
    world_tracker_session_number: (o) => {
      let ret = world_tracker_session_number_wrapped(o);
      return ret;
    },
    world_tracker_quality: (o) => {
      let ret = world_tracker_quality_wrapped(o);
      return ret;
    },
    world_tracker_horizontal_plane_detection_enabled: (o) => {
      let ret = world_tracker_horizontal_plane_detection_enabled_wrapped(o);
      ret = ret === 1;
      return ret;
    },
    world_tracker_horizontal_plane_detection_enabled_set: (o, horizontal_plane_detection_enabled) => {
      let arg_horizontal_plane_detection_enabled = horizontal_plane_detection_enabled ? 1 : 0;
      let ret = world_tracker_horizontal_plane_detection_enabled_set_wrapped(o, arg_horizontal_plane_detection_enabled);
      return ret;
    },
    world_tracker_vertical_plane_detection_enabled: (o) => {
      let ret = world_tracker_vertical_plane_detection_enabled_wrapped(o);
      ret = ret === 1;
      return ret;
    },
    world_tracker_vertical_plane_detection_enabled_set: (o, vertical_plane_detection_enabled) => {
      let arg_vertical_plane_detection_enabled = vertical_plane_detection_enabled ? 1 : 0;
      let ret = world_tracker_vertical_plane_detection_enabled_set_wrapped(o, arg_vertical_plane_detection_enabled);
      return ret;
    },
    world_tracker_plane_anchor_count: (o) => {
      let ret = world_tracker_plane_anchor_count_wrapped(o);
      return ret;
    },
    world_tracker_plane_anchor_id: (o, indx) => {
      let arg_indx = indx;
      let ret = world_tracker_plane_anchor_id_wrapped(o, arg_indx);
      return ret;
    },
    world_tracker_plane_anchor_pose_raw: (o, indx) => {
      let arg_indx = indx;
      let ret = world_tracker_plane_anchor_pose_raw_wrapped(o, arg_indx);
      let ab = new Float32Array(16);
      ab.set(mod.HEAPF32.subarray(ret / 4, 16 + ret / 4));
      ret = ab;
      return ret;
    },
    world_tracker_plane_anchor_status: (o, indx) => {
      let arg_indx = indx;
      let ret = world_tracker_plane_anchor_status_wrapped(o, arg_indx);
      return ret;
    },
    world_tracker_plane_anchor_polygon_data_size: (o, indx) => {
      let arg_indx = indx;
      let ret = world_tracker_plane_anchor_polygon_data_size_wrapped(o, arg_indx);
      return ret;
    },
    world_tracker_plane_anchor_polygon_data: (o, indx) => {
      let arg_indx = indx;
      let ret = world_tracker_plane_anchor_polygon_data_wrapped(o, arg_indx);
      let retsize = world_tracker_plane_anchor_polygon_data_size_wrapped(o, indx);
      let ab = new Float32Array(retsize);
      ab.set(mod.HEAPF32.subarray(ret / 4, retsize + ret / 4));
      ret = ab;
      return ret;
    },
    world_tracker_plane_anchor_polygon_version: (o, indx) => {
      let arg_indx = indx;
      let ret = world_tracker_plane_anchor_polygon_version_wrapped(o, arg_indx);
      return ret;
    },
    world_tracker_plane_anchor_orientation: (o, indx) => {
      let arg_indx = indx;
      let ret = world_tracker_plane_anchor_orientation_wrapped(o, arg_indx);
      return ret;
    },
    world_tracker_world_anchor_status: (o) => {
      let ret = world_tracker_world_anchor_status_wrapped(o);
      return ret;
    },
    world_tracker_world_anchor_id: (o) => {
      let ret = world_tracker_world_anchor_id_wrapped(o);
      return ret;
    },
    world_tracker_world_anchor_pose_raw: (o) => {
      let ret = world_tracker_world_anchor_pose_raw_wrapped(o);
      let ab = new Float32Array(16);
      ab.set(mod.HEAPF32.subarray(ret / 4, 16 + ret / 4));
      ret = ab;
      return ret;
    },
    world_tracker_ground_anchor_id: (o) => {
      let ret = world_tracker_ground_anchor_id_wrapped(o);
      return ret;
    },
    world_tracker_ground_anchor_status: (o) => {
      let ret = world_tracker_ground_anchor_status_wrapped(o);
      return ret;
    },
    world_tracker_ground_anchor_pose_raw: (o) => {
      let ret = world_tracker_ground_anchor_pose_raw_wrapped(o);
      let ab = new Float32Array(16);
      ab.set(mod.HEAPF32.subarray(ret / 4, 16 + ret / 4));
      ret = ab;
      return ret;
    },
    world_tracker_reset: (o) => {
      let ret = world_tracker_reset_wrapped(o);
      return ret;
    },
    world_tracker_tracks_data_enabled: (o) => {
      let ret = world_tracker_tracks_data_enabled_wrapped(o);
      ret = ret === 1;
      return ret;
    },
    world_tracker_tracks_data_enabled_set: (o, tracks_data_enabled) => {
      let arg_tracks_data_enabled = tracks_data_enabled ? 1 : 0;
      let ret = world_tracker_tracks_data_enabled_set_wrapped(o, arg_tracks_data_enabled);
      return ret;
    },
    world_tracker_tracks_data_size: (o) => {
      let ret = world_tracker_tracks_data_size_wrapped(o);
      return ret;
    },
    world_tracker_tracks_data: (o) => {
      let ret = world_tracker_tracks_data_wrapped(o);
      let retsize = world_tracker_tracks_data_size_wrapped(o);
      let ab = new Float32Array(retsize);
      ab.set(mod.HEAPF32.subarray(ret / 4, retsize + ret / 4));
      ret = ab;
      return ret;
    },
    world_tracker_tracks_type_data_size: (o) => {
      let ret = world_tracker_tracks_type_data_size_wrapped(o);
      return ret;
    },
    world_tracker_tracks_type_data: (o) => {
      let ret = world_tracker_tracks_type_data_wrapped(o);
      let retsize = world_tracker_tracks_type_data_size_wrapped(o);
      let ab = new Uint8Array(retsize);
      ab.set(mod.HEAPU8.subarray(ret, retsize + ret));
      ret = ab;
      return ret;
    },
    world_tracker_projections_data_enabled: (o) => {
      let ret = world_tracker_projections_data_enabled_wrapped(o);
      ret = ret === 1;
      return ret;
    },
    world_tracker_projections_data_enabled_set: (o, projections_data_enabled) => {
      let arg_projections_data_enabled = projections_data_enabled ? 1 : 0;
      let ret = world_tracker_projections_data_enabled_set_wrapped(o, arg_projections_data_enabled);
      return ret;
    },
    world_tracker_projections_data_size: (o) => {
      let ret = world_tracker_projections_data_size_wrapped(o);
      return ret;
    },
    world_tracker_projections_data: (o) => {
      let ret = world_tracker_projections_data_wrapped(o);
      let retsize = world_tracker_projections_data_size_wrapped(o);
      let ab = new Float32Array(retsize);
      ab.set(mod.HEAPF32.subarray(ret / 4, retsize + ret / 4));
      ret = ab;
      return ret;
    },
    custom_anchor_create: (pipeline, worldtracker, id) => {
      let arg_pipeline = pipeline;
      let arg_worldtracker = worldtracker;
      let arg_id = id;
      return custom_anchor_create_wrapped(arg_pipeline, arg_worldtracker, arg_id);
    },
    custom_anchor_destroy: () => {
      custom_anchor_destroy_wrapped();
    },
    custom_anchor_status: (o) => {
      let ret = custom_anchor_status_wrapped(o);
      return ret;
    },
    custom_anchor_pose_version: (o) => {
      let ret = custom_anchor_pose_version_wrapped(o);
      return ret;
    },
    custom_anchor_pose_raw: (o) => {
      let ret = custom_anchor_pose_raw_wrapped(o);
      let ab = new Float32Array(16);
      ab.set(mod.HEAPF32.subarray(ret / 4, 16 + ret / 4));
      ret = ab;
      return ret;
    },
    custom_anchor_pose_set_from_camera_offset_raw: (o, x, y, z, orientation) => {
      let arg_x = x;
      let arg_y = y;
      let arg_z = z;
      let arg_orientation = orientation;
      let ret = custom_anchor_pose_set_from_camera_offset_raw_wrapped(o, arg_x, arg_y, arg_z, arg_orientation);
      return ret;
    },
    custom_anchor_pose_set_from_anchor_offset: (o, anchor_id, x, y, z, orientation) => {
      let arg_anchor_id = anchor_id;
      let arg_x = x;
      let arg_y = y;
      let arg_z = z;
      let arg_orientation = orientation;
      let ret = custom_anchor_pose_set_from_anchor_offset_wrapped(o, arg_anchor_id, arg_x, arg_y, arg_z, arg_orientation);
      return ret;
    },
    custom_anchor_pose_set: (o, pose) => {
      let arg_pose = getFloatDataArrayForArgIndex(0, pose.byteLength);
      mod.HEAPF32.set(pose, arg_pose / 4);
      let ret = custom_anchor_pose_set_wrapped(o, arg_pose);
      return ret;
    },
    custom_anchor_pose_set_with_parent: (o, pose, anchor_id) => {
      let arg_pose = getFloatDataArrayForArgIndex(0, pose.byteLength);
      mod.HEAPF32.set(pose, arg_pose / 4);
      let arg_anchor_id = anchor_id;
      let ret = custom_anchor_pose_set_with_parent_wrapped(o, arg_pose, arg_anchor_id);
      return ret;
    },
    d3_tracker_create: (pipeline) => {
      let arg_pipeline = pipeline;
      return d3_tracker_create_wrapped(arg_pipeline);
    },
    d3_tracker_destroy: () => {
      d3_tracker_destroy_wrapped();
    }
  };
}

// ../../node_modules/@zappar/zappar-cv/lib/serializer.js
var MessageSerializer = class {
  constructor(_messageSender) {
    this._messageSender = _messageSender;
    this._freeBufferPool = [];
    this._buffer = new ArrayBuffer(16);
    this._i32View = new Int32Array(this._buffer);
    this._f32View = new Float32Array(this._buffer);
    this._f64View = new Float64Array(this._buffer);
    this._u8View = new Uint8Array(this._buffer);
    this._u8cView = new Uint8ClampedArray(this._buffer);
    this._u16View = new Uint16Array(this._buffer);
    this._u32View = new Uint32Array(this._buffer);
    this._offset = 1;
    this._startOffset = -1;
    this._timeoutSet = false;
    this._appender = {
      int: (i) => this.int(i),
      bool: (i) => this.int(i ? 1 : 0),
      float: (i) => this.float(i),
      string: (i) => this.string(i),
      dataWithLength: (i) => this.arrayBuffer(i),
      type: (i) => this.int(i),
      matrix4x4: (i) => this.float32ArrayBuffer(i),
      matrix3x3: (i) => this.float32ArrayBuffer(i),
      floatArray: (i) => this.float32ArrayBuffer(i),
      ucharArray: (i) => this.uint8ArrayBuffer(i),
      identityCoefficients: (i) => this.float32ArrayBuffer(i),
      expressionCoefficients: (i) => this.float32ArrayBuffer(i),
      cameraModel: (i) => this.float32ArrayBuffer(i),
      timestamp: (i) => this.double(i),
      barcodeFormat: (i) => this.int(i),
      faceLandmarkName: (i) => this.int(i),
      instantTrackerTransformOrientation: (i) => this.int(i),
      transformOrientation: (i) => this.int(i),
      planeOrientation: (i) => this.int(i),
      anchorStatus: (i) => this.int(i),
      logLevel: (i) => this.int(i),
      worldScaleMode: (i) => this.int(i)
    };
    this._freeBufferPool.push(new ArrayBuffer(16));
    this._freeBufferPool.push(new ArrayBuffer(16));
  }
  bufferReturn(ab) {
    this._freeBufferPool.push(ab);
  }
  _ensureArrayBuffer(incremental) {
    let requirement = (this._offset + incremental + 8) * 4;
    if (this._buffer && this._buffer.byteLength >= requirement)
      return;
    let newBuffer = void 0;
    if (!newBuffer) {
      let nextPow2 = requirement;
      nextPow2--;
      nextPow2 |= nextPow2 >> 1;
      nextPow2 |= nextPow2 >> 2;
      nextPow2 |= nextPow2 >> 4;
      nextPow2 |= nextPow2 >> 8;
      nextPow2 |= nextPow2 >> 16;
      nextPow2++;
      newBuffer = new ArrayBuffer(nextPow2);
    }
    let oldView = this._buffer ? this._i32View : void 0;
    this._buffer = newBuffer;
    this._i32View = new Int32Array(this._buffer);
    this._f32View = new Float32Array(this._buffer);
    this._f64View = new Float64Array(this._buffer);
    this._u8View = new Uint8Array(this._buffer);
    this._u8cView = new Uint8ClampedArray(this._buffer);
    this._u16View = new Uint16Array(this._buffer);
    this._u32View = new Uint32Array(this._buffer);
    if (oldView)
      this._i32View.set(oldView.subarray(0, this._offset));
  }
  sendMessage(messageId, cb) {
    this._ensureArrayBuffer(4);
    this._startOffset = this._offset;
    this._i32View[this._offset + 1] = messageId;
    this._offset += 2;
    cb(this._appender);
    this._i32View[this._startOffset] = this._offset - this._startOffset;
    this._startOffset = -1;
    this._sendOneTime();
  }
  _sendOneTime() {
    if (this._timeoutSet === false) {
      this._timeoutSet = true;
      setTimeout(() => {
        this._timeoutSet = false;
        this._send();
      }, 0);
    }
  }
  _send() {
    if (this._freeBufferPool.length === 0) {
      this._sendOneTime();
      return;
    }
    this._i32View[0] = this._offset;
    this._messageSender(this._buffer);
    this._buffer = void 0;
    this._buffer = this._freeBufferPool.pop();
    this._i32View = new Int32Array(this._buffer);
    this._f32View = new Float32Array(this._buffer);
    this._f64View = new Float64Array(this._buffer);
    this._u8View = new Uint8Array(this._buffer);
    this._u8cView = new Uint8ClampedArray(this._buffer);
    this._u16View = new Uint16Array(this._buffer);
    this._u32View = new Uint32Array(this._buffer);
    this._offset = 1;
    this._startOffset = -1;
  }
  int(arg) {
    this._ensureArrayBuffer(1);
    this._i32View[this._offset] = arg;
    this._offset++;
  }
  double(arg) {
    this._ensureArrayBuffer(2);
    if (this._offset % 2 === 1)
      this._offset++;
    this._f64View[this._offset / 2] = arg;
    this._offset += 2;
  }
  float(arg) {
    this._ensureArrayBuffer(1);
    this._f32View[this._offset] = arg;
    this._offset++;
  }
  int32Array(args) {
    this._ensureArrayBuffer(args.length);
    for (let i = 0; i < args.length; ++i) {
      this._i32View[this._offset + i] = args[i];
    }
    this._offset += args.length;
  }
  float32Array(args) {
    this._ensureArrayBuffer(args.length);
    for (let i = 0; i < args.length; ++i) {
      this._f32View[this._offset + i] = args[i];
    }
    this._offset += args.length;
  }
  booleanArray(args) {
    this._ensureArrayBuffer(args.length);
    for (let i = 0; i < args.length; ++i) {
      this._i32View[this._offset + i] = args[i] ? 1 : 0;
    }
    this._offset += args.length;
  }
  uint8ArrayBuffer(data) {
    this._ensureArrayBuffer(data.byteLength / 4);
    this._i32View[this._offset] = data.byteLength;
    this._offset++;
    this._u8View.set(data, this._offset * 4);
    this._offset += data.byteLength >> 2;
    if ((data.byteLength & 3) !== 0)
      this._offset++;
  }
  arrayBuffer(data) {
    let view = new Uint8Array(data);
    this.uint8ArrayBuffer(view);
  }
  uint8ClampedArrayBuffer(data) {
    this._ensureArrayBuffer(data.byteLength / 4);
    this._i32View[this._offset] = data.byteLength;
    this._offset++;
    this._u8cView.set(data, this._offset * 4);
    this._offset += data.byteLength >> 2;
    if ((data.byteLength & 3) !== 0)
      this._offset++;
  }
  float32ArrayBuffer(data) {
    this._ensureArrayBuffer(data.byteLength / 4);
    this._i32View[this._offset] = data.length;
    this._offset++;
    this._f32View.set(data, this._offset);
    this._offset += data.length;
  }
  uint16ArrayBuffer(data) {
    this._ensureArrayBuffer(data.byteLength / 4);
    this._i32View[this._offset] = data.length;
    this._offset++;
    let u16Offset = this._offset * 2;
    this._u16View.set(data, u16Offset);
    this._offset += data.length >> 1;
    if ((data.length & 1) !== 0)
      this._offset++;
  }
  int32ArrayBuffer(data) {
    this._ensureArrayBuffer(data.byteLength / 4);
    this._i32View[this._offset] = data.length;
    this._offset++;
    this._i32View.set(data, this._offset);
    this._offset += data.length;
  }
  uint32ArrayBuffer(data) {
    this._ensureArrayBuffer(data.byteLength / 4);
    this._i32View[this._offset] = data.length;
    this._offset++;
    this._u32View.set(data, this._offset);
    this._offset += data.length;
  }
  string(data) {
    let encoder = new TextEncoder();
    let res = encoder.encode(data);
    this._ensureArrayBuffer(res.byteLength / 4);
    this._i32View[this._offset] = res.byteLength;
    this._offset++;
    this._u8View.set(res, this._offset * 4);
    this._offset += res.byteLength >> 2;
    if ((res.byteLength & 3) !== 0)
      this._offset++;
  }
};

// ../../node_modules/@zappar/zappar-cv/lib/deserializer.js
var MessageDeserializer = class {
  constructor() {
    this._buffer = new ArrayBuffer(0);
    this._i32View = new Int32Array(this._buffer);
    this._f32View = new Float32Array(this._buffer);
    this._f64View = new Float64Array(this._buffer);
    this._u8View = new Uint8Array(this._buffer);
    this._u16View = new Uint16Array(this._buffer);
    this._u32View = new Uint32Array(this._buffer);
    this._offset = 0;
    this._length = 0;
    this._startOffset = -1;
    this._processor = {
      int: () => this._i32View[this._startOffset++],
      bool: () => this._i32View[this._startOffset++] === 1,
      type: () => this._i32View[this._startOffset++],
      float: () => this._f32View[this._startOffset++],
      timestamp: () => {
        if (this._startOffset % 2 === 1)
          this._startOffset++;
        let ret = this._f64View[this._startOffset / 2];
        this._startOffset += 2;
        return ret;
      },
      string: () => {
        let len = this._i32View[this._startOffset++];
        let decoder = new TextDecoder();
        let res = decoder.decode(new Uint8Array(this._buffer, this._startOffset * 4, len));
        this._startOffset += len >> 2;
        if ((len & 3) !== 0)
          this._startOffset++;
        return res;
      },
      dataWithLength: () => {
        let len = this._i32View[this._startOffset++];
        let ret = new Uint8Array(len);
        ret.set(this._u8View.subarray(this._startOffset * 4, this._startOffset * 4 + len));
        this._startOffset += ret.byteLength >> 2;
        if ((ret.byteLength & 3) !== 0)
          this._startOffset++;
        return ret.buffer;
      },
      ucharArray: () => {
        let len = this._i32View[this._startOffset++];
        let ret = new Uint8Array(len);
        ret.set(this._u8View.subarray(this._startOffset * 4, this._startOffset * 4 + len));
        this._startOffset += ret.byteLength >> 2;
        if ((ret.byteLength & 3) !== 0)
          this._startOffset++;
        return ret;
      },
      floatArray: () => {
        let len = this._i32View[this._startOffset++];
        let ret = new Float32Array(len);
        ret.set(this._f32View.subarray(this._startOffset, this._startOffset + len));
        this._startOffset += len;
        return ret;
      },
      matrix4x4: () => {
        let len = this._i32View[this._startOffset++];
        let ret = new Float32Array(len);
        ret.set(this._f32View.subarray(this._startOffset, this._startOffset + 16));
        this._startOffset += len;
        return ret;
      },
      matrix3x3: () => {
        let len = this._i32View[this._startOffset++];
        let ret = new Float32Array(len);
        ret.set(this._f32View.subarray(this._startOffset, this._startOffset + 9));
        this._startOffset += len;
        return ret;
      },
      identityCoefficients: () => {
        let len = this._i32View[this._startOffset++];
        let ret = new Float32Array(len);
        ret.set(this._f32View.subarray(this._startOffset, this._startOffset + 50));
        this._startOffset += len;
        return ret;
      },
      expressionCoefficients: () => {
        let len = this._i32View[this._startOffset++];
        let ret = new Float32Array(len);
        ret.set(this._f32View.subarray(this._startOffset, this._startOffset + 29));
        this._startOffset += len;
        return ret;
      },
      cameraModel: () => {
        let len = this._i32View[this._startOffset++];
        let ret = new Float32Array(len);
        ret.set(this._f32View.subarray(this._startOffset, this._startOffset + 6));
        this._startOffset += len;
        return ret;
      },
      barcodeFormat: () => this._i32View[this._startOffset++],
      worldScaleMode: () => this._i32View[this._startOffset++],
      faceLandmarkName: () => this._i32View[this._startOffset++],
      instantTrackerTransformOrientation: () => this._i32View[this._startOffset++],
      transformOrientation: () => this._i32View[this._startOffset++],
      planeOrientation: () => this._i32View[this._startOffset++],
      anchorStatus: () => this._i32View[this._startOffset++],
      logLevel: () => this._i32View[this._startOffset++]
    };
  }
  setData(data) {
    this._buffer = data;
    this._i32View = new Int32Array(this._buffer);
    this._f32View = new Float32Array(this._buffer);
    this._f64View = new Float64Array(this._buffer);
    this._u8View = new Uint8Array(this._buffer);
    this._u16View = new Uint16Array(this._buffer);
    this._u32View = new Uint32Array(this._buffer);
    this._offset = 0;
    this._length = 0;
    if (data.byteLength >= 4) {
      this._offset = 1;
      this._length = this._i32View[0];
    }
    this._startOffset = -1;
  }
  hasMessage() {
    return this._offset + 1 < this._length;
  }
  forMessages(cb) {
    while (this.hasMessage()) {
      let len = this._i32View[this._offset];
      let messageId = this._i32View[this._offset + 1];
      this._startOffset = this._offset + 2;
      this._offset += len;
      cb(messageId, this._processor);
    }
  }
};

// ../../node_modules/@zappar/zappar-cv/lib/gen/zappar-server.js
var zappar_server = class {
  constructor(_impl, _sender) {
    this._impl = _impl;
    this._sender = _sender;
    this._deserializer = new MessageDeserializer();
    this.serializersByPipelineId = /* @__PURE__ */ new Map();
    this._pipeline_id_by_pipeline_id = /* @__PURE__ */ new Map();
    this._pipeline_by_instance = /* @__PURE__ */ new Map();
    this._pipeline_id_by_camera_source_id = /* @__PURE__ */ new Map();
    this._camera_source_by_instance = /* @__PURE__ */ new Map();
    this._pipeline_id_by_sequence_source_id = /* @__PURE__ */ new Map();
    this._sequence_source_by_instance = /* @__PURE__ */ new Map();
    this._pipeline_id_by_image_tracker_id = /* @__PURE__ */ new Map();
    this._image_tracker_by_instance = /* @__PURE__ */ new Map();
    this._pipeline_id_by_face_tracker_id = /* @__PURE__ */ new Map();
    this._face_tracker_by_instance = /* @__PURE__ */ new Map();
    this._pipeline_id_by_face_mesh_id = /* @__PURE__ */ new Map();
    this._face_mesh_by_instance = /* @__PURE__ */ new Map();
    this._pipeline_id_by_face_landmark_id = /* @__PURE__ */ new Map();
    this._face_landmark_by_instance = /* @__PURE__ */ new Map();
    this._pipeline_id_by_barcode_finder_id = /* @__PURE__ */ new Map();
    this._barcode_finder_by_instance = /* @__PURE__ */ new Map();
    this._pipeline_id_by_instant_world_tracker_id = /* @__PURE__ */ new Map();
    this._instant_world_tracker_by_instance = /* @__PURE__ */ new Map();
    this._pipeline_id_by_zapcode_tracker_id = /* @__PURE__ */ new Map();
    this._zapcode_tracker_by_instance = /* @__PURE__ */ new Map();
    this._pipeline_id_by_world_tracker_id = /* @__PURE__ */ new Map();
    this._world_tracker_by_instance = /* @__PURE__ */ new Map();
    this._pipeline_id_by_custom_anchor_id = /* @__PURE__ */ new Map();
    this._custom_anchor_by_instance = /* @__PURE__ */ new Map();
    this._pipeline_id_by_d3_tracker_id = /* @__PURE__ */ new Map();
    this._d3_tracker_by_instance = /* @__PURE__ */ new Map();
  }
  processBuffer(b) {
    this._deserializer.setData(b);
    this._deserializer.forMessages((messageId, msg) => {
      switch (messageId) {
        case 39: {
          this._impl.log_level_set(msg.logLevel());
          break;
        }
        case 36: {
          this._impl.analytics_project_id_set(msg.string(), msg.string());
          break;
        }
        case 32: {
          let clientId = msg.type();
          let handle = this._impl.pipeline_create();
          this._pipeline_by_instance.set(clientId, handle);
          this._pipeline_id_by_pipeline_id.set(clientId, clientId);
          this.serializersByPipelineId.set(clientId, new MessageSerializer((ab) => {
            this._sender(clientId, ab);
          }));
          break;
        }
        case 33: {
          let clientId = msg.type();
          let obj = this._pipeline_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.pipeline_destroy(obj);
          this._pipeline_by_instance.delete(clientId);
          break;
        }
        case 9: {
          let clientId = msg.type();
          let obj = this._pipeline_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.pipeline_frame_update(obj);
          break;
        }
        case 63: {
          let clientId = msg.type();
          let obj = this._pipeline_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.pipeline_camera_frame_sharpness_enabled_set(obj, msg.bool());
          break;
        }
        case 8: {
          let clientId = msg.type();
          let obj = this._pipeline_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.pipeline_camera_frame_submit(obj, msg.dataWithLength(), msg.int(), msg.int(), msg.int(), msg.matrix4x4(), msg.cameraModel(), msg.bool(), msg.int());
          break;
        }
        case 10: {
          let clientId = msg.type();
          let obj = this._pipeline_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.pipeline_motion_accelerometer_submit(obj, msg.timestamp(), msg.float(), msg.float(), msg.float());
          break;
        }
        case 12: {
          let clientId = msg.type();
          let obj = this._pipeline_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.pipeline_motion_accelerometer_with_gravity_submit_int(obj, msg.timestamp(), msg.timestamp(), msg.float(), msg.float(), msg.float());
          break;
        }
        case 11: {
          let clientId = msg.type();
          let obj = this._pipeline_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.pipeline_motion_accelerometer_without_gravity_submit_int(obj, msg.timestamp(), msg.timestamp(), msg.float(), msg.float(), msg.float());
          break;
        }
        case 15: {
          let clientId = msg.type();
          let obj = this._pipeline_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.pipeline_motion_rotation_rate_submit(obj, msg.timestamp(), msg.float(), msg.float(), msg.float());
          break;
        }
        case 13: {
          let clientId = msg.type();
          let obj = this._pipeline_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.pipeline_motion_rotation_rate_submit_int(obj, msg.timestamp(), msg.timestamp(), msg.float(), msg.float(), msg.float());
          break;
        }
        case 16: {
          let clientId = msg.type();
          let obj = this._pipeline_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.pipeline_motion_attitude_submit(obj, msg.timestamp(), msg.float(), msg.float(), msg.float());
          break;
        }
        case 14: {
          let clientId = msg.type();
          let obj = this._pipeline_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.pipeline_motion_attitude_submit_int(obj, msg.timestamp(), msg.timestamp(), msg.float(), msg.float(), msg.float());
          break;
        }
        case 17: {
          let clientId = msg.type();
          let obj = this._pipeline_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.pipeline_motion_relative_orientation_submit_int(obj, msg.timestamp(), msg.timestamp(), msg.float(), msg.float(), msg.float(), msg.float());
          break;
        }
        case 18: {
          let clientId = msg.type();
          let obj = this._pipeline_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.pipeline_motion_attitude_matrix_submit(obj, msg.matrix4x4());
          break;
        }
        case 34: {
          let clientId = msg.type();
          let arg_pipeline_id = msg.type();
          let arg_pipeline = this._pipeline_by_instance.get(arg_pipeline_id);
          let arg_device_id = msg.string();
          let handle = this._impl.camera_source_create(arg_pipeline, arg_device_id);
          this._camera_source_by_instance.set(clientId, handle);
          this._pipeline_id_by_camera_source_id.set(clientId, arg_pipeline_id);
          break;
        }
        case 35: {
          let clientId = msg.type();
          let obj = this._camera_source_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.camera_source_destroy(obj);
          this._camera_source_by_instance.delete(clientId);
          break;
        }
        case 40: {
          let clientId = msg.type();
          let arg_pipeline_id = msg.type();
          let arg_pipeline = this._pipeline_by_instance.get(arg_pipeline_id);
          let handle = this._impl.sequence_source_create(arg_pipeline);
          this._sequence_source_by_instance.set(clientId, handle);
          this._pipeline_id_by_sequence_source_id.set(clientId, arg_pipeline_id);
          break;
        }
        case 41: {
          let clientId = msg.type();
          let obj = this._sequence_source_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.sequence_source_destroy(obj);
          this._sequence_source_by_instance.delete(clientId);
          break;
        }
        case 2: {
          let clientId = msg.type();
          let arg_pipeline_id = msg.type();
          let arg_pipeline = this._pipeline_by_instance.get(arg_pipeline_id);
          let handle = this._impl.image_tracker_create(arg_pipeline);
          this._image_tracker_by_instance.set(clientId, handle);
          this._pipeline_id_by_image_tracker_id.set(clientId, arg_pipeline_id);
          break;
        }
        case 19: {
          let clientId = msg.type();
          let obj = this._image_tracker_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.image_tracker_destroy(obj);
          this._image_tracker_by_instance.delete(clientId);
          break;
        }
        case 4: {
          let clientId = msg.type();
          let obj = this._image_tracker_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.image_tracker_target_load_from_memory(obj, msg.dataWithLength());
          break;
        }
        case 3: {
          let clientId = msg.type();
          let obj = this._image_tracker_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.image_tracker_enabled_set(obj, msg.bool());
          break;
        }
        case 25: {
          let clientId = msg.type();
          let arg_pipeline_id = msg.type();
          let arg_pipeline = this._pipeline_by_instance.get(arg_pipeline_id);
          let handle = this._impl.face_tracker_create(arg_pipeline);
          this._face_tracker_by_instance.set(clientId, handle);
          this._pipeline_id_by_face_tracker_id.set(clientId, arg_pipeline_id);
          break;
        }
        case 26: {
          let clientId = msg.type();
          let obj = this._face_tracker_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.face_tracker_destroy(obj);
          this._face_tracker_by_instance.delete(clientId);
          break;
        }
        case 27: {
          let clientId = msg.type();
          let obj = this._face_tracker_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.face_tracker_model_load_from_memory(obj, msg.dataWithLength());
          break;
        }
        case 28: {
          let clientId = msg.type();
          let obj = this._face_tracker_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.face_tracker_enabled_set(obj, msg.bool());
          break;
        }
        case 29: {
          let clientId = msg.type();
          let obj = this._face_tracker_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.face_tracker_max_faces_set(obj, msg.int());
          break;
        }
        case 30: {
          let clientId = msg.type();
          let handle = this._impl.face_mesh_create();
          this._face_mesh_by_instance.set(clientId, handle);
          break;
        }
        case 31: {
          let clientId = msg.type();
          let obj = this._face_mesh_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.face_mesh_destroy(obj);
          this._face_mesh_by_instance.delete(clientId);
          break;
        }
        case 37: {
          let clientId = msg.type();
          let arg_landmark = msg.faceLandmarkName();
          let handle = this._impl.face_landmark_create(arg_landmark);
          this._face_landmark_by_instance.set(clientId, handle);
          break;
        }
        case 38: {
          let clientId = msg.type();
          let obj = this._face_landmark_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.face_landmark_destroy(obj);
          this._face_landmark_by_instance.delete(clientId);
          break;
        }
        case 21: {
          let clientId = msg.type();
          let arg_pipeline_id = msg.type();
          let arg_pipeline = this._pipeline_by_instance.get(arg_pipeline_id);
          let handle = this._impl.barcode_finder_create(arg_pipeline);
          this._barcode_finder_by_instance.set(clientId, handle);
          this._pipeline_id_by_barcode_finder_id.set(clientId, arg_pipeline_id);
          break;
        }
        case 22: {
          let clientId = msg.type();
          let obj = this._barcode_finder_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.barcode_finder_destroy(obj);
          this._barcode_finder_by_instance.delete(clientId);
          break;
        }
        case 23: {
          let clientId = msg.type();
          let obj = this._barcode_finder_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.barcode_finder_enabled_set(obj, msg.bool());
          break;
        }
        case 24: {
          let clientId = msg.type();
          let obj = this._barcode_finder_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.barcode_finder_formats_set(obj, msg.barcodeFormat());
          break;
        }
        case 5: {
          let clientId = msg.type();
          let arg_pipeline_id = msg.type();
          let arg_pipeline = this._pipeline_by_instance.get(arg_pipeline_id);
          let handle = this._impl.instant_world_tracker_create(arg_pipeline);
          this._instant_world_tracker_by_instance.set(clientId, handle);
          this._pipeline_id_by_instant_world_tracker_id.set(clientId, arg_pipeline_id);
          break;
        }
        case 20: {
          let clientId = msg.type();
          let obj = this._instant_world_tracker_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.instant_world_tracker_destroy(obj);
          this._instant_world_tracker_by_instance.delete(clientId);
          break;
        }
        case 6: {
          let clientId = msg.type();
          let obj = this._instant_world_tracker_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.instant_world_tracker_enabled_set(obj, msg.bool());
          break;
        }
        case 7: {
          let clientId = msg.type();
          let obj = this._instant_world_tracker_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.instant_world_tracker_anchor_pose_set_from_camera_offset_raw(obj, msg.float(), msg.float(), msg.float(), msg.instantTrackerTransformOrientation());
          break;
        }
        case 42: {
          let clientId = msg.type();
          let arg_pipeline_id = msg.type();
          let arg_pipeline = this._pipeline_by_instance.get(arg_pipeline_id);
          let handle = this._impl.zapcode_tracker_create(arg_pipeline);
          this._zapcode_tracker_by_instance.set(clientId, handle);
          this._pipeline_id_by_zapcode_tracker_id.set(clientId, arg_pipeline_id);
          break;
        }
        case 45: {
          let clientId = msg.type();
          let obj = this._zapcode_tracker_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.zapcode_tracker_destroy(obj);
          this._zapcode_tracker_by_instance.delete(clientId);
          break;
        }
        case 44: {
          let clientId = msg.type();
          let obj = this._zapcode_tracker_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.zapcode_tracker_target_load_from_memory(obj, msg.dataWithLength());
          break;
        }
        case 43: {
          let clientId = msg.type();
          let obj = this._zapcode_tracker_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.zapcode_tracker_enabled_set(obj, msg.bool());
          break;
        }
        case 46: {
          let clientId = msg.type();
          let arg_pipeline_id = msg.type();
          let arg_pipeline = this._pipeline_by_instance.get(arg_pipeline_id);
          let handle = this._impl.world_tracker_create(arg_pipeline);
          this._world_tracker_by_instance.set(clientId, handle);
          this._pipeline_id_by_world_tracker_id.set(clientId, arg_pipeline_id);
          break;
        }
        case 47: {
          let clientId = msg.type();
          let obj = this._world_tracker_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.world_tracker_destroy(obj);
          this._world_tracker_by_instance.delete(clientId);
          break;
        }
        case 48: {
          let clientId = msg.type();
          let obj = this._world_tracker_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.world_tracker_enabled_set(obj, msg.bool());
          break;
        }
        case 62: {
          let clientId = msg.type();
          let obj = this._world_tracker_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.world_tracker_scale_mode_set(obj, msg.worldScaleMode());
          break;
        }
        case 49: {
          let clientId = msg.type();
          let obj = this._world_tracker_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.world_tracker_horizontal_plane_detection_enabled_set(obj, msg.bool());
          break;
        }
        case 50: {
          let clientId = msg.type();
          let obj = this._world_tracker_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.world_tracker_vertical_plane_detection_enabled_set(obj, msg.bool());
          break;
        }
        case 51: {
          let clientId = msg.type();
          let obj = this._world_tracker_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.world_tracker_reset(obj);
          break;
        }
        case 52: {
          let clientId = msg.type();
          let obj = this._world_tracker_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.world_tracker_tracks_data_enabled_set(obj, msg.bool());
          break;
        }
        case 53: {
          let clientId = msg.type();
          let obj = this._world_tracker_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.world_tracker_projections_data_enabled_set(obj, msg.bool());
          break;
        }
        case 54: {
          let clientId = msg.type();
          let arg_pipeline_id = msg.type();
          let arg_pipeline = this._pipeline_by_instance.get(arg_pipeline_id);
          let arg_worldtracker_id = msg.type();
          let arg_worldtracker = this._world_tracker_by_instance.get(arg_worldtracker_id);
          let arg_id = msg.string();
          let handle = this._impl.custom_anchor_create(arg_pipeline, arg_worldtracker, arg_id);
          this._custom_anchor_by_instance.set(clientId, handle);
          this._pipeline_id_by_custom_anchor_id.set(clientId, arg_pipeline_id);
          break;
        }
        case 55: {
          let clientId = msg.type();
          let obj = this._custom_anchor_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.custom_anchor_destroy(obj);
          this._custom_anchor_by_instance.delete(clientId);
          break;
        }
        case 56: {
          let clientId = msg.type();
          let obj = this._custom_anchor_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.custom_anchor_pose_set_from_camera_offset_raw(obj, msg.float(), msg.float(), msg.float(), msg.transformOrientation());
          break;
        }
        case 57: {
          let clientId = msg.type();
          let obj = this._custom_anchor_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.custom_anchor_pose_set_from_anchor_offset(obj, msg.string(), msg.float(), msg.float(), msg.float(), msg.transformOrientation());
          break;
        }
        case 58: {
          let clientId = msg.type();
          let obj = this._custom_anchor_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.custom_anchor_pose_set(obj, msg.matrix4x4());
          break;
        }
        case 59: {
          let clientId = msg.type();
          let obj = this._custom_anchor_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.custom_anchor_pose_set_with_parent(obj, msg.matrix4x4(), msg.string());
          break;
        }
        case 60: {
          let clientId = msg.type();
          let arg_pipeline_id = msg.type();
          let arg_pipeline = this._pipeline_by_instance.get(arg_pipeline_id);
          let handle = this._impl.d3_tracker_create(arg_pipeline);
          this._d3_tracker_by_instance.set(clientId, handle);
          this._pipeline_id_by_d3_tracker_id.set(clientId, arg_pipeline_id);
          break;
        }
        case 61: {
          let clientId = msg.type();
          let obj = this._d3_tracker_by_instance.get(clientId);
          if (obj === void 0)
            return;
          this._impl.d3_tracker_destroy(obj);
          this._d3_tracker_by_instance.delete(clientId);
          break;
        }
      }
    });
  }
  exploreState() {
    for (let [k, v] of this._pipeline_by_instance) {
      let pipeline = this._pipeline_id_by_pipeline_id.get(k);
      if (!pipeline)
        continue;
      let serializer = this.serializersByPipelineId.get(pipeline);
      if (!serializer)
        continue;
      serializer.sendMessage(10, (msg) => {
        msg.type(k);
        msg.int(this._impl.pipeline_frame_number(v));
      });
      serializer.sendMessage(6, (msg) => {
        msg.type(k);
        msg.cameraModel(this._impl.pipeline_camera_model(v));
      });
      serializer.sendMessage(7, (msg) => {
        msg.type(k);
        msg.int(this._impl.pipeline_camera_data_width(v));
      });
      serializer.sendMessage(8, (msg) => {
        msg.type(k);
        msg.int(this._impl.pipeline_camera_data_height(v));
      });
      serializer.sendMessage(9, (msg) => {
        msg.type(k);
        msg.float(this._impl.pipeline_camera_frame_sharpness(v));
      });
      serializer.sendMessage(5, (msg) => {
        msg.type(k);
        msg.int(this._impl.pipeline_camera_frame_user_data(v));
      });
      serializer.sendMessage(14, (msg) => {
        msg.type(k);
        msg.matrix4x4(this._impl.pipeline_camera_frame_camera_attitude(v));
      });
      serializer.sendMessage(15, (msg) => {
        msg.type(k);
        msg.matrix4x4(this._impl.pipeline_camera_frame_device_attitude(v));
      });
    }
    for (let [k, v] of this._camera_source_by_instance) {
      let pipeline = this._pipeline_id_by_camera_source_id.get(k);
      if (!pipeline)
        continue;
      let serializer = this.serializersByPipelineId.get(pipeline);
      if (!serializer)
        continue;
    }
    for (let [k, v] of this._sequence_source_by_instance) {
      let pipeline = this._pipeline_id_by_sequence_source_id.get(k);
      if (!pipeline)
        continue;
      let serializer = this.serializersByPipelineId.get(pipeline);
      if (!serializer)
        continue;
    }
    for (let [k, v] of this._image_tracker_by_instance) {
      let pipeline = this._pipeline_id_by_image_tracker_id.get(k);
      if (!pipeline)
        continue;
      let serializer = this.serializersByPipelineId.get(pipeline);
      if (!serializer)
        continue;
      serializer.sendMessage(22, (msg) => {
        msg.type(k);
        msg.int(this._impl.image_tracker_target_loaded_version(v));
      });
      serializer.sendMessage(1, (msg) => {
        msg.type(k);
        msg.int(this._impl.image_tracker_anchor_count(v));
      });
      for (let i = 0; i < this._impl.image_tracker_anchor_count(v); i++) {
        serializer.sendMessage(2, (msg) => {
          msg.type(k);
          msg.int(i);
          msg.string(this._impl.image_tracker_anchor_id(v, i));
        });
      }
      for (let i = 0; i < this._impl.image_tracker_anchor_count(v); i++) {
        serializer.sendMessage(3, (msg) => {
          msg.type(k);
          msg.int(i);
          msg.matrix4x4(this._impl.image_tracker_anchor_pose_raw(v, i));
        });
      }
    }
    for (let [k, v] of this._face_tracker_by_instance) {
      let pipeline = this._pipeline_id_by_face_tracker_id.get(k);
      if (!pipeline)
        continue;
      let serializer = this.serializersByPipelineId.get(pipeline);
      if (!serializer)
        continue;
      serializer.sendMessage(21, (msg) => {
        msg.type(k);
        msg.int(this._impl.face_tracker_model_loaded_version(v));
      });
      serializer.sendMessage(16, (msg) => {
        msg.type(k);
        msg.int(this._impl.face_tracker_anchor_count(v));
      });
      for (let i = 0; i < this._impl.face_tracker_anchor_count(v); i++) {
        serializer.sendMessage(17, (msg) => {
          msg.type(k);
          msg.int(i);
          msg.string(this._impl.face_tracker_anchor_id(v, i));
        });
      }
      for (let i = 0; i < this._impl.face_tracker_anchor_count(v); i++) {
        serializer.sendMessage(18, (msg) => {
          msg.type(k);
          msg.int(i);
          msg.matrix4x4(this._impl.face_tracker_anchor_pose_raw(v, i));
        });
      }
      for (let i = 0; i < this._impl.face_tracker_anchor_count(v); i++) {
        serializer.sendMessage(19, (msg) => {
          msg.type(k);
          msg.int(i);
          msg.identityCoefficients(this._impl.face_tracker_anchor_identity_coefficients(v, i));
        });
      }
      for (let i = 0; i < this._impl.face_tracker_anchor_count(v); i++) {
        serializer.sendMessage(20, (msg) => {
          msg.type(k);
          msg.int(i);
          msg.expressionCoefficients(this._impl.face_tracker_anchor_expression_coefficients(v, i));
        });
      }
    }
    for (let [k, v] of this._face_mesh_by_instance) {
      let pipeline = this._pipeline_id_by_face_mesh_id.get(k);
      if (!pipeline)
        continue;
      let serializer = this.serializersByPipelineId.get(pipeline);
      if (!serializer)
        continue;
    }
    for (let [k, v] of this._face_landmark_by_instance) {
      let pipeline = this._pipeline_id_by_face_landmark_id.get(k);
      if (!pipeline)
        continue;
      let serializer = this.serializersByPipelineId.get(pipeline);
      if (!serializer)
        continue;
    }
    for (let [k, v] of this._barcode_finder_by_instance) {
      let pipeline = this._pipeline_id_by_barcode_finder_id.get(k);
      if (!pipeline)
        continue;
      let serializer = this.serializersByPipelineId.get(pipeline);
      if (!serializer)
        continue;
      serializer.sendMessage(11, (msg) => {
        msg.type(k);
        msg.int(this._impl.barcode_finder_found_number(v));
      });
      for (let i = 0; i < this._impl.barcode_finder_found_number(v); i++) {
        serializer.sendMessage(12, (msg) => {
          msg.type(k);
          msg.int(i);
          msg.string(this._impl.barcode_finder_found_text(v, i));
        });
      }
      for (let i = 0; i < this._impl.barcode_finder_found_number(v); i++) {
        serializer.sendMessage(13, (msg) => {
          msg.type(k);
          msg.int(i);
          msg.barcodeFormat(this._impl.barcode_finder_found_format(v, i));
        });
      }
    }
    for (let [k, v] of this._instant_world_tracker_by_instance) {
      let pipeline = this._pipeline_id_by_instant_world_tracker_id.get(k);
      if (!pipeline)
        continue;
      let serializer = this.serializersByPipelineId.get(pipeline);
      if (!serializer)
        continue;
      serializer.sendMessage(4, (msg) => {
        msg.type(k);
        msg.matrix4x4(this._impl.instant_world_tracker_anchor_pose_raw(v));
      });
    }
    for (let [k, v] of this._zapcode_tracker_by_instance) {
      let pipeline = this._pipeline_id_by_zapcode_tracker_id.get(k);
      if (!pipeline)
        continue;
      let serializer = this.serializersByPipelineId.get(pipeline);
      if (!serializer)
        continue;
      serializer.sendMessage(27, (msg) => {
        msg.type(k);
        msg.int(this._impl.zapcode_tracker_target_loaded_version(v));
      });
      serializer.sendMessage(24, (msg) => {
        msg.type(k);
        msg.int(this._impl.zapcode_tracker_anchor_count(v));
      });
      for (let i = 0; i < this._impl.zapcode_tracker_anchor_count(v); i++) {
        serializer.sendMessage(25, (msg) => {
          msg.type(k);
          msg.int(i);
          msg.string(this._impl.zapcode_tracker_anchor_id(v, i));
        });
      }
      for (let i = 0; i < this._impl.zapcode_tracker_anchor_count(v); i++) {
        serializer.sendMessage(26, (msg) => {
          msg.type(k);
          msg.int(i);
          msg.matrix4x4(this._impl.zapcode_tracker_anchor_pose_raw(v, i));
        });
      }
    }
    for (let [k, v] of this._world_tracker_by_instance) {
      let pipeline = this._pipeline_id_by_world_tracker_id.get(k);
      if (!pipeline)
        continue;
      let serializer = this.serializersByPipelineId.get(pipeline);
      if (!serializer)
        continue;
      serializer.sendMessage(28, (msg) => {
        msg.type(k);
        msg.int(this._impl.world_tracker_session_number(v));
      });
      serializer.sendMessage(44, (msg) => {
        msg.type(k);
        msg.int(this._impl.world_tracker_quality(v));
      });
      serializer.sendMessage(29, (msg) => {
        msg.type(k);
        msg.int(this._impl.world_tracker_plane_anchor_count(v));
      });
      for (let i = 0; i < this._impl.world_tracker_plane_anchor_count(v); i++) {
        serializer.sendMessage(37, (msg) => {
          msg.type(k);
          msg.int(i);
          msg.string(this._impl.world_tracker_plane_anchor_id(v, i));
        });
      }
      for (let i = 0; i < this._impl.world_tracker_plane_anchor_count(v); i++) {
        serializer.sendMessage(30, (msg) => {
          msg.type(k);
          msg.int(i);
          msg.matrix4x4(this._impl.world_tracker_plane_anchor_pose_raw(v, i));
        });
      }
      for (let i = 0; i < this._impl.world_tracker_plane_anchor_count(v); i++) {
        serializer.sendMessage(32, (msg) => {
          msg.type(k);
          msg.int(i);
          msg.anchorStatus(this._impl.world_tracker_plane_anchor_status(v, i));
        });
      }
      for (let i = 0; i < this._impl.world_tracker_plane_anchor_count(v); i++) {
        serializer.sendMessage(33, (msg) => {
          msg.type(k);
          msg.int(i);
          msg.int(this._impl.world_tracker_plane_anchor_polygon_data_size(v, i));
        });
      }
      for (let i = 0; i < this._impl.world_tracker_plane_anchor_count(v); i++) {
        serializer.sendMessage(34, (msg) => {
          msg.type(k);
          msg.int(i);
          msg.floatArray(this._impl.world_tracker_plane_anchor_polygon_data(v, i));
        });
      }
      for (let i = 0; i < this._impl.world_tracker_plane_anchor_count(v); i++) {
        serializer.sendMessage(35, (msg) => {
          msg.type(k);
          msg.int(i);
          msg.int(this._impl.world_tracker_plane_anchor_polygon_version(v, i));
        });
      }
      for (let i = 0; i < this._impl.world_tracker_plane_anchor_count(v); i++) {
        serializer.sendMessage(36, (msg) => {
          msg.type(k);
          msg.int(i);
          msg.planeOrientation(this._impl.world_tracker_plane_anchor_orientation(v, i));
        });
      }
      serializer.sendMessage(40, (msg) => {
        msg.type(k);
        msg.anchorStatus(this._impl.world_tracker_world_anchor_status(v));
      });
      serializer.sendMessage(39, (msg) => {
        msg.type(k);
        msg.string(this._impl.world_tracker_world_anchor_id(v));
      });
      serializer.sendMessage(38, (msg) => {
        msg.type(k);
        msg.matrix4x4(this._impl.world_tracker_world_anchor_pose_raw(v));
      });
      serializer.sendMessage(42, (msg) => {
        msg.type(k);
        msg.string(this._impl.world_tracker_ground_anchor_id(v));
      });
      serializer.sendMessage(43, (msg) => {
        msg.type(k);
        msg.anchorStatus(this._impl.world_tracker_ground_anchor_status(v));
      });
      serializer.sendMessage(41, (msg) => {
        msg.type(k);
        msg.matrix4x4(this._impl.world_tracker_ground_anchor_pose_raw(v));
      });
      serializer.sendMessage(47, (msg) => {
        msg.type(k);
        msg.int(this._impl.world_tracker_tracks_data_size(v));
      });
      serializer.sendMessage(46, (msg) => {
        msg.type(k);
        msg.floatArray(this._impl.world_tracker_tracks_data(v));
      });
      serializer.sendMessage(49, (msg) => {
        msg.type(k);
        msg.int(this._impl.world_tracker_tracks_type_data_size(v));
      });
      serializer.sendMessage(48, (msg) => {
        msg.type(k);
        msg.ucharArray(this._impl.world_tracker_tracks_type_data(v));
      });
      serializer.sendMessage(52, (msg) => {
        msg.type(k);
        msg.int(this._impl.world_tracker_projections_data_size(v));
      });
      serializer.sendMessage(51, (msg) => {
        msg.type(k);
        msg.floatArray(this._impl.world_tracker_projections_data(v));
      });
    }
    for (let [k, v] of this._custom_anchor_by_instance) {
      let pipeline = this._pipeline_id_by_custom_anchor_id.get(k);
      if (!pipeline)
        continue;
      let serializer = this.serializersByPipelineId.get(pipeline);
      if (!serializer)
        continue;
      serializer.sendMessage(54, (msg) => {
        msg.type(k);
        msg.anchorStatus(this._impl.custom_anchor_status(v));
      });
      serializer.sendMessage(55, (msg) => {
        msg.type(k);
        msg.int(this._impl.custom_anchor_pose_version(v));
      });
      serializer.sendMessage(53, (msg) => {
        msg.type(k);
        msg.matrix4x4(this._impl.custom_anchor_pose_raw(v));
      });
    }
    for (let [k, v] of this._d3_tracker_by_instance) {
      let pipeline = this._pipeline_id_by_d3_tracker_id.get(k);
      if (!pipeline)
        continue;
      let serializer = this.serializersByPipelineId.get(pipeline);
      if (!serializer)
        continue;
    }
  }
};

// ../../node_modules/@zappar/zappar-cv/lib/event.js
var Event = class {
  constructor() {
    this._funcs = [];
  }
  bind(f) {
    this._funcs.push(f);
  }
  unbind(f) {
    let indx = this._funcs.indexOf(f);
    if (indx > -1) {
      this._funcs.splice(indx, 1);
    }
  }
  emit() {
    for (var i = 0, total = this._funcs.length; i < total; i++) {
      this._funcs[i]();
    }
  }
};
var Event1 = class {
  constructor() {
    this._funcs = [];
  }
  bind(f) {
    this._funcs.push(f);
  }
  unbind(f) {
    let indx = this._funcs.indexOf(f);
    if (indx > -1) {
      this._funcs.splice(indx, 1);
    }
  }
  emit(a) {
    for (var i = 0, total = this._funcs.length; i < total; i++) {
      this._funcs[i](a);
    }
  }
};

// ../../node_modules/@zappar/zappar-cv/lib/messages.js
var MsgManager = class {
  constructor() {
    this.onOutgoingMessage = new Event();
    this.onIncomingMessage = new Event1();
    this._outgoingMessages = [];
  }
  postIncomingMessage(msg) {
    this.onIncomingMessage.emit(msg);
  }
  postOutgoingMessage(msg, trans) {
    this._outgoingMessages.push({
      msg,
      transferables: trans
    });
    this.onOutgoingMessage.emit();
  }
  getOutgoingMessages() {
    let ret = this._outgoingMessages;
    this._outgoingMessages = [];
    return ret;
  }
};

// ../../node_modules/@zappar/zappar-cv/node_modules/gl-matrix/esm/common.js
var EPSILON = 1e-6;
var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
var degree = Math.PI / 180;
if (!Math.hypot)
  Math.hypot = function() {
    var y = 0, i = arguments.length;
    while (i--) {
      y += arguments[i] * arguments[i];
    }
    return Math.sqrt(y);
  };

// ../../node_modules/@zappar/zappar-cv/node_modules/gl-matrix/esm/mat4.js
var mat4_exports = {};
__export(mat4_exports, {
  add: () => add,
  adjoint: () => adjoint,
  clone: () => clone,
  copy: () => copy,
  create: () => create,
  determinant: () => determinant,
  equals: () => equals,
  exactEquals: () => exactEquals,
  frob: () => frob,
  fromQuat: () => fromQuat,
  fromQuat2: () => fromQuat2,
  fromRotation: () => fromRotation,
  fromRotationTranslation: () => fromRotationTranslation,
  fromRotationTranslationScale: () => fromRotationTranslationScale,
  fromRotationTranslationScaleOrigin: () => fromRotationTranslationScaleOrigin,
  fromScaling: () => fromScaling,
  fromTranslation: () => fromTranslation,
  fromValues: () => fromValues,
  fromXRotation: () => fromXRotation,
  fromYRotation: () => fromYRotation,
  fromZRotation: () => fromZRotation,
  frustum: () => frustum,
  getRotation: () => getRotation,
  getScaling: () => getScaling,
  getTranslation: () => getTranslation,
  identity: () => identity,
  invert: () => invert,
  lookAt: () => lookAt,
  mul: () => mul,
  multiply: () => multiply,
  multiplyScalar: () => multiplyScalar,
  multiplyScalarAndAdd: () => multiplyScalarAndAdd,
  ortho: () => ortho,
  orthoNO: () => orthoNO,
  orthoZO: () => orthoZO,
  perspective: () => perspective,
  perspectiveFromFieldOfView: () => perspectiveFromFieldOfView,
  perspectiveNO: () => perspectiveNO,
  perspectiveZO: () => perspectiveZO,
  rotate: () => rotate,
  rotateX: () => rotateX,
  rotateY: () => rotateY,
  rotateZ: () => rotateZ,
  scale: () => scale,
  set: () => set,
  str: () => str,
  sub: () => sub,
  subtract: () => subtract,
  targetTo: () => targetTo,
  translate: () => translate,
  transpose: () => transpose
});
function create() {
  var out = new ARRAY_TYPE(16);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }
  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
function clone(a) {
  var out = new ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new ARRAY_TYPE(16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function transpose(out, a) {
  if (out === a) {
    var a01 = a[1], a02 = a[2], a03 = a[3];
    var a12 = a[6], a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }
  return out;
}
function invert(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
function adjoint(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
  out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
  out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
  out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
  out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
  out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
  return out;
}
function determinant(a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
function multiply(out, a, b) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
function translate(out, a, v) {
  var x = v[0], y = v[1], z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }
  return out;
}
function scale(out, a, v) {
  var x = v[0], y = v[1], z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function rotate(out, a, rad, axis) {
  var x = axis[0], y = axis[1], z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;
  if (len < EPSILON) {
    return null;
  }
  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11];
  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c;
  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;
  if (a !== out) {
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  return out;
}
function rotateX(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];
  if (a !== out) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}
function rotateY(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];
  if (a !== out) {
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}
function rotateZ(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  if (a !== out) {
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromRotation(out, rad, axis) {
  var x = axis[0], y = axis[1], z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;
  if (len < EPSILON) {
    return null;
  }
  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromXRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromYRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromZRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromRotationTranslation(out, q, v) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromQuat2(out, a) {
  var translation = new ARRAY_TYPE(3);
  var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7];
  var magnitude = bx * bx + by * by + bz * bz + bw * bw;
  if (magnitude > 0) {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }
  fromRotationTranslation(out, a, translation);
  return out;
}
function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}
function getRotation(out, mat) {
  var scaling = new ARRAY_TYPE(3);
  getScaling(scaling, mat);
  var is1 = 1 / scaling[0];
  var is2 = 1 / scaling[1];
  var is3 = 1 / scaling[2];
  var sm11 = mat[0] * is1;
  var sm12 = mat[1] * is2;
  var sm13 = mat[2] * is3;
  var sm21 = mat[4] * is1;
  var sm22 = mat[5] * is2;
  var sm23 = mat[6] * is3;
  var sm31 = mat[8] * is1;
  var sm32 = mat[9] * is2;
  var sm33 = mat[10] * is3;
  var trace = sm11 + sm22 + sm33;
  var S = 0;
  if (trace > 0) {
    S = Math.sqrt(trace + 1) * 2;
    out[3] = 0.25 * S;
    out[0] = (sm23 - sm32) / S;
    out[1] = (sm31 - sm13) / S;
    out[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
    out[3] = (sm23 - sm32) / S;
    out[0] = 0.25 * S;
    out[1] = (sm12 + sm21) / S;
    out[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
    out[3] = (sm31 - sm13) / S;
    out[0] = (sm12 + sm21) / S;
    out[1] = 0.25 * S;
    out[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
    out[3] = (sm12 - sm21) / S;
    out[0] = (sm31 + sm13) / S;
    out[1] = (sm23 + sm32) / S;
    out[2] = 0.25 * S;
  }
  return out;
}
function fromRotationTranslationScale(out, q, v, s) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  var ox = o[0];
  var oy = o[1];
  var oz = o[2];
  var out0 = (1 - (yy + zz)) * sx;
  var out1 = (xy + wz) * sx;
  var out2 = (xz - wy) * sx;
  var out4 = (xy - wz) * sy;
  var out5 = (1 - (xx + zz)) * sy;
  var out6 = (yz + wx) * sy;
  var out8 = (xz + wy) * sz;
  var out9 = (yz - wx) * sz;
  var out10 = (1 - (xx + yy)) * sz;
  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = 0;
  out[4] = out4;
  out[5] = out5;
  out[6] = out6;
  out[7] = 0;
  out[8] = out8;
  out[9] = out9;
  out[10] = out10;
  out[11] = 0;
  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
  out[15] = 1;
  return out;
}
function fromQuat(out, q) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}
function perspectiveNO(out, fovy, aspect, near, far) {
  var f = 1 / Math.tan(fovy / 2), nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }
  return out;
}
var perspective = perspectiveNO;
function perspectiveZO(out, fovy, aspect, near, far) {
  var f = 1 / Math.tan(fovy / 2), nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = far * nf;
    out[14] = far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -near;
  }
  return out;
}
function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan(fov.upDegrees * Math.PI / 180);
  var downTan = Math.tan(fov.downDegrees * Math.PI / 180);
  var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
  var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
  var xScale = 2 / (leftTan + rightTan);
  var yScale = 2 / (upTan + downTan);
  out[0] = xScale;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = yScale;
  out[6] = 0;
  out[7] = 0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near / (near - far);
  out[15] = 0;
  return out;
}
function orthoNO(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
var ortho = orthoNO;
function orthoZO(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = near * nf;
  out[15] = 1;
  return out;
}
function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];
  if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
    return identity(out);
  }
  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len = 1 / Math.hypot(z0, z1, z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.hypot(x0, x1, x2);
  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }
  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len = Math.hypot(y0, y1, y2);
  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }
  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}
function targetTo(out, eye, target, up) {
  var eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
  var z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
  var len = z0 * z0 + z1 * z1 + z2 * z2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }
  var x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
  len = x0 * x0 + x1 * x1 + x2 * x2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }
  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}
function str(a) {
  return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}
function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
}
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}
function multiplyScalarAndAdd(out, a, b, scale2) {
  out[0] = a[0] + b[0] * scale2;
  out[1] = a[1] + b[1] * scale2;
  out[2] = a[2] + b[2] * scale2;
  out[3] = a[3] + b[3] * scale2;
  out[4] = a[4] + b[4] * scale2;
  out[5] = a[5] + b[5] * scale2;
  out[6] = a[6] + b[6] * scale2;
  out[7] = a[7] + b[7] * scale2;
  out[8] = a[8] + b[8] * scale2;
  out[9] = a[9] + b[9] * scale2;
  out[10] = a[10] + b[10] * scale2;
  out[11] = a[11] + b[11] * scale2;
  out[12] = a[12] + b[12] * scale2;
  out[13] = a[13] + b[13] * scale2;
  out[14] = a[14] + b[14] * scale2;
  out[15] = a[15] + b[15] * scale2;
  return out;
}
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
function equals(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
  var a8 = a[8], a9 = a[9], a10 = a[10], a11 = a[11];
  var a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
  var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
  var b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= EPSILON * Math.max(1, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= EPSILON * Math.max(1, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= EPSILON * Math.max(1, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= EPSILON * Math.max(1, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= EPSILON * Math.max(1, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= EPSILON * Math.max(1, Math.abs(a15), Math.abs(b15));
}
var mul = multiply;
var sub = subtract;

// ../../node_modules/@zappar/zappar-cv/lib/gen/zappar-native.js
var barcode_format_t;
(function(barcode_format_t2) {
  barcode_format_t2[barcode_format_t2["UNKNOWN"] = 131072] = "UNKNOWN";
  barcode_format_t2[barcode_format_t2["AZTEC"] = 1] = "AZTEC";
  barcode_format_t2[barcode_format_t2["CODABAR"] = 2] = "CODABAR";
  barcode_format_t2[barcode_format_t2["CODE_39"] = 4] = "CODE_39";
  barcode_format_t2[barcode_format_t2["CODE_93"] = 8] = "CODE_93";
  barcode_format_t2[barcode_format_t2["CODE_128"] = 16] = "CODE_128";
  barcode_format_t2[barcode_format_t2["DATA_MATRIX"] = 32] = "DATA_MATRIX";
  barcode_format_t2[barcode_format_t2["EAN_8"] = 64] = "EAN_8";
  barcode_format_t2[barcode_format_t2["EAN_13"] = 128] = "EAN_13";
  barcode_format_t2[barcode_format_t2["ITF"] = 256] = "ITF";
  barcode_format_t2[barcode_format_t2["MAXICODE"] = 512] = "MAXICODE";
  barcode_format_t2[barcode_format_t2["PDF_417"] = 1024] = "PDF_417";
  barcode_format_t2[barcode_format_t2["QR_CODE"] = 2048] = "QR_CODE";
  barcode_format_t2[barcode_format_t2["RSS_14"] = 4096] = "RSS_14";
  barcode_format_t2[barcode_format_t2["RSS_EXPANDED"] = 8192] = "RSS_EXPANDED";
  barcode_format_t2[barcode_format_t2["UPC_A"] = 16384] = "UPC_A";
  barcode_format_t2[barcode_format_t2["UPC_E"] = 32768] = "UPC_E";
  barcode_format_t2[barcode_format_t2["UPC_EAN_EXTENSION"] = 65536] = "UPC_EAN_EXTENSION";
  barcode_format_t2[barcode_format_t2["ALL"] = 131071] = "ALL";
})(barcode_format_t || (barcode_format_t = {}));
var face_landmark_name_t;
(function(face_landmark_name_t2) {
  face_landmark_name_t2[face_landmark_name_t2["EYE_LEFT"] = 0] = "EYE_LEFT";
  face_landmark_name_t2[face_landmark_name_t2["EYE_RIGHT"] = 1] = "EYE_RIGHT";
  face_landmark_name_t2[face_landmark_name_t2["EAR_LEFT"] = 2] = "EAR_LEFT";
  face_landmark_name_t2[face_landmark_name_t2["EAR_RIGHT"] = 3] = "EAR_RIGHT";
  face_landmark_name_t2[face_landmark_name_t2["NOSE_BRIDGE"] = 4] = "NOSE_BRIDGE";
  face_landmark_name_t2[face_landmark_name_t2["NOSE_TIP"] = 5] = "NOSE_TIP";
  face_landmark_name_t2[face_landmark_name_t2["NOSE_BASE"] = 6] = "NOSE_BASE";
  face_landmark_name_t2[face_landmark_name_t2["LIP_TOP"] = 7] = "LIP_TOP";
  face_landmark_name_t2[face_landmark_name_t2["LIP_BOTTOM"] = 8] = "LIP_BOTTOM";
  face_landmark_name_t2[face_landmark_name_t2["MOUTH_CENTER"] = 9] = "MOUTH_CENTER";
  face_landmark_name_t2[face_landmark_name_t2["CHIN"] = 10] = "CHIN";
  face_landmark_name_t2[face_landmark_name_t2["EYEBROW_LEFT"] = 11] = "EYEBROW_LEFT";
  face_landmark_name_t2[face_landmark_name_t2["EYEBROW_RIGHT"] = 12] = "EYEBROW_RIGHT";
})(face_landmark_name_t || (face_landmark_name_t = {}));
var instant_world_tracker_transform_orientation_t;
(function(instant_world_tracker_transform_orientation_t2) {
  instant_world_tracker_transform_orientation_t2[instant_world_tracker_transform_orientation_t2["WORLD"] = 3] = "WORLD";
  instant_world_tracker_transform_orientation_t2[instant_world_tracker_transform_orientation_t2["MINUS_Z_AWAY_FROM_USER"] = 4] = "MINUS_Z_AWAY_FROM_USER";
  instant_world_tracker_transform_orientation_t2[instant_world_tracker_transform_orientation_t2["MINUS_Z_HEADING"] = 5] = "MINUS_Z_HEADING";
  instant_world_tracker_transform_orientation_t2[instant_world_tracker_transform_orientation_t2["UNCHANGED"] = 6] = "UNCHANGED";
})(instant_world_tracker_transform_orientation_t || (instant_world_tracker_transform_orientation_t = {}));
var transform_orientation_t;
(function(transform_orientation_t2) {
  transform_orientation_t2[transform_orientation_t2["UNCHANGED"] = 0] = "UNCHANGED";
  transform_orientation_t2[transform_orientation_t2["WORLD"] = 1] = "WORLD";
  transform_orientation_t2[transform_orientation_t2["PARENT"] = 2] = "PARENT";
  transform_orientation_t2[transform_orientation_t2["Z_TOWARDS_CAMERA"] = 3] = "Z_TOWARDS_CAMERA";
})(transform_orientation_t || (transform_orientation_t = {}));
var log_level_t;
(function(log_level_t2) {
  log_level_t2[log_level_t2["LOG_LEVEL_NONE"] = 0] = "LOG_LEVEL_NONE";
  log_level_t2[log_level_t2["LOG_LEVEL_ERROR"] = 1] = "LOG_LEVEL_ERROR";
  log_level_t2[log_level_t2["LOG_LEVEL_WARNING"] = 2] = "LOG_LEVEL_WARNING";
  log_level_t2[log_level_t2["LOG_LEVEL_VERBOSE"] = 3] = "LOG_LEVEL_VERBOSE";
})(log_level_t || (log_level_t = {}));
var frame_pixel_format_t;
(function(frame_pixel_format_t2) {
  frame_pixel_format_t2[frame_pixel_format_t2["FRAME_PIXEL_FORMAT_I420"] = 0] = "FRAME_PIXEL_FORMAT_I420";
  frame_pixel_format_t2[frame_pixel_format_t2["FRAME_PIXEL_FORMAT_I420A"] = 1] = "FRAME_PIXEL_FORMAT_I420A";
  frame_pixel_format_t2[frame_pixel_format_t2["FRAME_PIXEL_FORMAT_I422"] = 2] = "FRAME_PIXEL_FORMAT_I422";
  frame_pixel_format_t2[frame_pixel_format_t2["FRAME_PIXEL_FORMAT_I444"] = 3] = "FRAME_PIXEL_FORMAT_I444";
  frame_pixel_format_t2[frame_pixel_format_t2["FRAME_PIXEL_FORMAT_NV12"] = 4] = "FRAME_PIXEL_FORMAT_NV12";
  frame_pixel_format_t2[frame_pixel_format_t2["FRAME_PIXEL_FORMAT_RGBA"] = 5] = "FRAME_PIXEL_FORMAT_RGBA";
  frame_pixel_format_t2[frame_pixel_format_t2["FRAME_PIXEL_FORMAT_BGRA"] = 6] = "FRAME_PIXEL_FORMAT_BGRA";
  frame_pixel_format_t2[frame_pixel_format_t2["FRAME_PIXEL_FORMAT_Y"] = 7] = "FRAME_PIXEL_FORMAT_Y";
})(frame_pixel_format_t || (frame_pixel_format_t = {}));
var image_target_type_t;
(function(image_target_type_t2) {
  image_target_type_t2[image_target_type_t2["IMAGE_TRACKER_TYPE_PLANAR"] = 0] = "IMAGE_TRACKER_TYPE_PLANAR";
  image_target_type_t2[image_target_type_t2["IMAGE_TRACKER_TYPE_CYLINDRICAL"] = 1] = "IMAGE_TRACKER_TYPE_CYLINDRICAL";
  image_target_type_t2[image_target_type_t2["IMAGE_TRACKER_TYPE_CONICAL"] = 2] = "IMAGE_TRACKER_TYPE_CONICAL";
})(image_target_type_t || (image_target_type_t = {}));
var world_tracker_quality_t;
(function(world_tracker_quality_t2) {
  world_tracker_quality_t2[world_tracker_quality_t2["WORLD_TRACKER_QUALITY_INITIALIZING"] = 0] = "WORLD_TRACKER_QUALITY_INITIALIZING";
  world_tracker_quality_t2[world_tracker_quality_t2["WORLD_TRACKER_QUALITY_GOOD"] = 1] = "WORLD_TRACKER_QUALITY_GOOD";
  world_tracker_quality_t2[world_tracker_quality_t2["WORLD_TRACKER_QUALITY_LIMITED"] = 2] = "WORLD_TRACKER_QUALITY_LIMITED";
  world_tracker_quality_t2[world_tracker_quality_t2["WORLD_TRACKER_QUALITY_INACTIVE"] = 3] = "WORLD_TRACKER_QUALITY_INACTIVE";
})(world_tracker_quality_t || (world_tracker_quality_t = {}));
var anchor_status_t;
(function(anchor_status_t2) {
  anchor_status_t2[anchor_status_t2["ANCHOR_STATUS_INITIALIZING"] = 0] = "ANCHOR_STATUS_INITIALIZING";
  anchor_status_t2[anchor_status_t2["ANCHOR_STATUS_TRACKING"] = 1] = "ANCHOR_STATUS_TRACKING";
  anchor_status_t2[anchor_status_t2["ANCHOR_STATUS_PAUSED"] = 2] = "ANCHOR_STATUS_PAUSED";
  anchor_status_t2[anchor_status_t2["ANCHOR_STATUS_STOPPED"] = 3] = "ANCHOR_STATUS_STOPPED";
})(anchor_status_t || (anchor_status_t = {}));
var plane_orientation_t;
(function(plane_orientation_t2) {
  plane_orientation_t2[plane_orientation_t2["PLANE_ORIENTATION_HORIZONTAL"] = 0] = "PLANE_ORIENTATION_HORIZONTAL";
  plane_orientation_t2[plane_orientation_t2["PLANE_ORIENTATION_VERTICAL"] = 1] = "PLANE_ORIENTATION_VERTICAL";
})(plane_orientation_t || (plane_orientation_t = {}));
var camera_profile_t;
(function(camera_profile_t2) {
  camera_profile_t2[camera_profile_t2["DEFAULT"] = 0] = "DEFAULT";
  camera_profile_t2[camera_profile_t2["HIGH"] = 1] = "HIGH";
})(camera_profile_t || (camera_profile_t = {}));
var world_scale_mode_t;
(function(world_scale_mode_t2) {
  world_scale_mode_t2[world_scale_mode_t2["DEFAULT"] = 0] = "DEFAULT";
  world_scale_mode_t2[world_scale_mode_t2["ABSOLUTE"] = 1] = "ABSOLUTE";
  world_scale_mode_t2[world_scale_mode_t2["MEDIAN"] = 2] = "MEDIAN";
})(world_scale_mode_t || (world_scale_mode_t = {}));

// ../../node_modules/@zappar/zappar-cv/lib/gl-state-manager.js
var managers = /* @__PURE__ */ new Map();
var GLStateManager = class {
  constructor(_gl2) {
    this._gl = _gl2;
    this._viewports = [];
    this._underlyingViewport = this._gl.viewport;
    this._viewports.push(this._gl.getParameter(this._gl.VIEWPORT));
    this._gl.viewport = (x, y, width, height) => {
      this._viewports[this._viewports.length - 1] = [x, y, width, height];
      this._underlyingViewport.call(this._gl, x, y, width, height);
    };
  }
  static get(gl) {
    let existing = managers.get(gl);
    if (!existing) {
      existing = new GLStateManager(gl);
      managers.set(gl, existing);
    }
    return existing;
  }
  push() {
    this._viewports.push(this._viewports[this._viewports.length - 1]);
  }
  pop() {
    const current = this._viewports.pop();
    const prev = this._viewports[this._viewports.length - 1];
    if (!current || current[0] !== prev[0] || current[1] !== prev[1] || current[2] !== prev[2] || current[3] !== prev[3]) {
      this._underlyingViewport.call(this._gl, prev[0], prev[1], prev[2], prev[3]);
    }
  }
};

// ../../node_modules/@zappar/zappar-cv/lib/profile.js
var UAParser = __toESM(require_ua_parser());
var EmbeddedVideoImplementation;
(function(EmbeddedVideoImplementation2) {
  EmbeddedVideoImplementation2[EmbeddedVideoImplementation2["OBJECT_URL"] = 0] = "OBJECT_URL";
  EmbeddedVideoImplementation2[EmbeddedVideoImplementation2["SRC_OBJECT"] = 1] = "SRC_OBJECT";
})(EmbeddedVideoImplementation || (EmbeddedVideoImplementation = {}));
var profile = {
  deviceMotionMutliplier: -1,
  blacklisted: false,
  showGyroPermissionsWarningIfNecessary: false,
  showSafariPermissionsResetIfNecessary: false,
  requestHighFrameRate: false,
  videoWidth: 1280,
  videoHeight: 720,
  getDataSize: (p) => p === camera_profile_t.HIGH ? [640, 360] : [320, 180],
  videoElementInDOM: false,
  preferMediaStreamTrackProcessorCamera: false,
  preferImageBitmapCamera: false,
  ios164CameraSelection: false,
  relyOnConstraintsForCameraSelection: false,
  forceWindowOrientation: false,
  intervalMultiplier: 1,
  trustSensorIntervals: false,
  offscreenCanvasSupported: typeof globalThis.OffscreenCanvas !== "undefined"
};
if (typeof window !== "undefined") {
  window["zeeProfile"] = profile;
  if (window.location?.href?.indexOf("_mstppipeline") >= 0) {
    console.log("Configuring for MSTP camera pipeline (if supported)");
    profile.preferMediaStreamTrackProcessorCamera = true;
  }
  if (window.location?.href?.indexOf("_imagebitmappipeline") >= 0) {
    console.log("Configuring for ImageBitmap camera pipeline (if supported)");
    profile.preferImageBitmapCamera = true;
  }
}
var agent = new UAParser.UAParser();
var os = (agent.getOS().name || "unknown").toLowerCase();
var engine = (agent.getEngine().name || "unknown").toLowerCase();
if (engine === "webkit" && os !== "ios") {
  profile.deviceMotionMutliplier = 1;
  if (typeof window !== "undefined" && window.orientation !== void 0) {
    iDevice("15.0");
  }
}
if (engine === "webkit" && os === "ios") {
  profile.deviceMotionMutliplier = 1;
  const version = agent.getOS().version || "15.0";
  iDevice(version);
}
function iDevice(version) {
  profile.forceWindowOrientation = true;
  profile.preferMediaStreamTrackProcessorCamera = false;
  profile.intervalMultiplier = 1e3;
  profile.trustSensorIntervals = true;
  let versionParts = version.split(".");
  if (versionParts.length >= 2) {
    const majorVersion = parseInt(versionParts[0]);
    const minorVersion = parseInt(versionParts[1]);
    if (majorVersion < 11 || majorVersion === 11 && minorVersion < 3) {
      profile.blacklisted = true;
    }
    if (majorVersion < 12 || majorVersion === 12 && minorVersion < 2) {
      profile.videoElementInDOM = true;
    }
    if (majorVersion === 12 && minorVersion >= 2 || majorVersion >= 13)
      profile.showGyroPermissionsWarningIfNecessary = true;
    if (majorVersion >= 13) {
      profile.showSafariPermissionsResetIfNecessary = true;
    }
    if ((majorVersion >= 12 && minorVersion > 1 || majorVersion >= 13) && navigator.mediaDevices && navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().frameRate) {
      profile.requestHighFrameRate = true;
      if (majorVersion < 14) {
        profile.videoHeight = 360;
        profile.getDataSize = (p) => p === camera_profile_t.HIGH ? [640, 360] : [320, 180];
      }
    }
    if (majorVersion === 16 && minorVersion >= 4) {
      profile.ios164CameraSelection = true;
    }
    if (majorVersion >= 17) {
      profile.relyOnConstraintsForCameraSelection = true;
    }
  }
}

// ../../node_modules/@zappar/zappar-cv/lib/shader.js
function compileShader(gl, type, src) {
  let ret = gl.createShader(type);
  if (!ret)
    throw new Error("Unable to create shader");
  gl.shaderSource(ret, src);
  gl.compileShader(ret);
  let msg = gl.getShaderInfoLog(ret);
  if (msg && msg.trim().length > 0)
    throw new Error("Shader compile error: " + msg);
  return ret;
}
function linkProgram(gl, prog) {
  gl.linkProgram(prog);
  let msg = gl.getProgramInfoLog(prog);
  if (msg && msg.trim().length > 0)
    throw new Error("Unable to link: " + msg);
}

// ../../node_modules/@zappar/zappar-cv/lib/image-process-gl.js
var ImageProcessGL = class {
  constructor(_gl2) {
    this._gl = _gl2;
    this._isPaused = true;
    this._hadFrames = false;
    this._isUserFacing = false;
    this._cameraToScreenRotation = 0;
    this._isUploadFrame = true;
    this._computedTransformRotation = -1;
    this._computedFrontCameraRotation = false;
    this._cameraUvTransform = mat4_exports.create();
    this._framebufferWidth = 0;
    this._framebufferHeight = 0;
    this._framebufferId = null;
    this._renderTexture = null;
    this._isWebGL2 = false;
    this._isWebGL2 = _gl2.getParameter(_gl2.VERSION).indexOf("WebGL 2") >= 0;
    if (!this._isWebGL2) {
      this._instancedArraysExtension = this._gl.getExtension("ANGLE_instanced_arrays");
    }
  }
  resetGLContext() {
    this._framebufferId = null;
    this._renderTexture = null;
    this._vertexBuffer = void 0;
    this._indexBuffer = void 0;
    this._greyscaleShader = void 0;
  }
  destroy() {
    this.resetGLContext();
  }
  uploadFrame(texture2, img, rotation, fc, cp) {
    const [dataWidth, dataHeight] = profile.getDataSize(cp);
    this.uploadFrameForSize(texture2, img, rotation, fc, dataWidth, dataHeight);
  }
  uploadFrameForSize(texture2, img, rotation, fc, dataWidth, dataHeight) {
    let gl = this._gl;
    const glStateManager = GLStateManager.get(gl);
    glStateManager.push();
    const reenableScissorTest = gl.isEnabled(gl.SCISSOR_TEST);
    const reenableDepthTest = gl.isEnabled(gl.DEPTH_TEST);
    const reenableBlend = gl.isEnabled(gl.BLEND);
    const reenableCullFace = gl.isEnabled(gl.CULL_FACE);
    const reenableStencilTest = gl.isEnabled(gl.STENCIL_TEST);
    const previousActiveTexture = gl.getParameter(gl.ACTIVE_TEXTURE);
    const previousUnpackFlip = gl.getParameter(gl.UNPACK_FLIP_Y_WEBGL);
    const previousProgram = gl.getParameter(gl.CURRENT_PROGRAM);
    gl.activeTexture(gl.TEXTURE0);
    const previousBoundTexture = gl.getParameter(gl.TEXTURE_BINDING_2D);
    const previousBoundFramebuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
    const previousBoundArrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
    const previousBoundElementArrayBuffer = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
    gl.disable(gl.SCISSOR_TEST);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.STENCIL_TEST);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    const level = 0;
    const internalFormat = gl.RGBA;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, img);
    let videoWidth = 0;
    let videoHeight = 0;
    if (typeof HTMLVideoElement !== "undefined" && img instanceof HTMLVideoElement) {
      videoWidth = img.videoWidth;
      videoHeight = img.videoHeight;
    } else {
      videoWidth = img.width;
      videoHeight = img.height;
    }
    if (videoHeight > videoWidth)
      videoHeight = [videoWidth, videoWidth = videoHeight][0];
    this._updateTransforms(rotation, fc);
    let framebuffer = this._getFramebuffer(gl, dataWidth / 4, dataHeight);
    let vbo = this._getVertexBuffer(gl);
    let ibo = this._getIndexBuffer(gl);
    let shader = this._getGreyscaleShader(gl);
    const previousVertexAttribSize = gl.getVertexAttrib(shader.aVertexPositionLoc, gl.VERTEX_ATTRIB_ARRAY_SIZE);
    const previousVertexAttribType = gl.getVertexAttrib(shader.aVertexPositionLoc, gl.VERTEX_ATTRIB_ARRAY_TYPE);
    const previousVertexAttribNormalized = gl.getVertexAttrib(shader.aVertexPositionLoc, gl.VERTEX_ATTRIB_ARRAY_NORMALIZED);
    const previousVertexAttribStride = gl.getVertexAttrib(shader.aVertexPositionLoc, gl.VERTEX_ATTRIB_ARRAY_STRIDE);
    const previousVertexAttribOffset = gl.getVertexAttribOffset(shader.aVertexPositionLoc, gl.VERTEX_ATTRIB_ARRAY_POINTER);
    const previousVertexAttribEnabled = gl.getVertexAttrib(shader.aVertexPositionLoc, gl.VERTEX_ATTRIB_ARRAY_ENABLED);
    const previousVertexAttribBufferBinding = gl.getVertexAttrib(shader.aVertexPositionLoc, gl.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING);
    const previousTextureAttribSize = gl.getVertexAttrib(shader.aTextureCoordLoc, gl.VERTEX_ATTRIB_ARRAY_SIZE);
    const previousTextureAttribType = gl.getVertexAttrib(shader.aTextureCoordLoc, gl.VERTEX_ATTRIB_ARRAY_TYPE);
    const previousTextureAttribNormalized = gl.getVertexAttrib(shader.aTextureCoordLoc, gl.VERTEX_ATTRIB_ARRAY_NORMALIZED);
    const previousTextureAttribStride = gl.getVertexAttrib(shader.aTextureCoordLoc, gl.VERTEX_ATTRIB_ARRAY_STRIDE);
    const previousTextureAttribOffset = gl.getVertexAttribOffset(shader.aTextureCoordLoc, gl.VERTEX_ATTRIB_ARRAY_POINTER);
    const previousTextureAttribBufferBinding = gl.getVertexAttrib(shader.aTextureCoordLoc, gl.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING);
    const previousTextureAttribEnabled = gl.getVertexAttrib(shader.aTextureCoordLoc, gl.VERTEX_ATTRIB_ARRAY_ENABLED);
    let previousVertexAttribDivisor = 0;
    let previousTextureAttribDivisor = 0;
    if (this._isWebGL2) {
      previousVertexAttribDivisor = gl.getVertexAttrib(shader.aVertexPositionLoc, gl.VERTEX_ATTRIB_ARRAY_DIVISOR);
      previousTextureAttribDivisor = gl.getVertexAttrib(shader.aTextureCoordLoc, gl.VERTEX_ATTRIB_ARRAY_DIVISOR);
      gl.vertexAttribDivisor(shader.aVertexPositionLoc, 0);
      gl.vertexAttribDivisor(shader.aTextureCoordLoc, 0);
    } else if (this._instancedArraysExtension) {
      previousVertexAttribDivisor = gl.getVertexAttrib(shader.aVertexPositionLoc, this._instancedArraysExtension.VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE);
      previousTextureAttribDivisor = gl.getVertexAttrib(shader.aTextureCoordLoc, this._instancedArraysExtension.VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE);
      this._instancedArraysExtension.vertexAttribDivisorANGLE(shader.aVertexPositionLoc, 0);
      this._instancedArraysExtension.vertexAttribDivisorANGLE(shader.aTextureCoordLoc, 0);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.viewport(0, 0, this._framebufferWidth, this._framebufferHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.vertexAttribPointer(shader.aVertexPositionLoc, 2, gl.FLOAT, false, 4 * 4, 0);
    gl.enableVertexAttribArray(shader.aVertexPositionLoc);
    gl.vertexAttribPointer(shader.aTextureCoordLoc, 2, gl.FLOAT, false, 4 * 4, 2 * 4);
    gl.enableVertexAttribArray(shader.aTextureCoordLoc);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.useProgram(shader.program);
    gl.uniform1f(shader.uTexWidthLoc, dataWidth);
    gl.uniformMatrix4fv(shader.uUvTransformLoc, false, this._cameraUvTransform);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    gl.uniform1i(shader.uSamplerLoc, 0);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, previousVertexAttribBufferBinding);
    gl.vertexAttribPointer(shader.aVertexPositionLoc, previousVertexAttribSize, previousVertexAttribType, previousVertexAttribNormalized, previousVertexAttribStride, previousVertexAttribOffset);
    gl.bindBuffer(gl.ARRAY_BUFFER, previousTextureAttribBufferBinding);
    gl.vertexAttribPointer(shader.aTextureCoordLoc, previousTextureAttribSize, previousTextureAttribType, previousTextureAttribNormalized, previousTextureAttribStride, previousTextureAttribOffset);
    gl.bindBuffer(gl.ARRAY_BUFFER, previousBoundArrayBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, previousBoundElementArrayBuffer);
    if (!previousVertexAttribEnabled)
      gl.disableVertexAttribArray(shader.aVertexPositionLoc);
    if (!previousTextureAttribEnabled)
      gl.disableVertexAttribArray(shader.aTextureCoordLoc);
    if (this._isWebGL2) {
      gl.vertexAttribDivisor(shader.aVertexPositionLoc, previousVertexAttribDivisor);
      gl.vertexAttribDivisor(shader.aTextureCoordLoc, previousTextureAttribDivisor);
    } else if (this._instancedArraysExtension) {
      this._instancedArraysExtension.vertexAttribDivisorANGLE(shader.aVertexPositionLoc, previousVertexAttribDivisor);
      this._instancedArraysExtension.vertexAttribDivisorANGLE(shader.aTextureCoordLoc, previousTextureAttribDivisor);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, previousBoundFramebuffer);
    gl.useProgram(previousProgram);
    gl.bindTexture(gl.TEXTURE_2D, previousBoundTexture);
    gl.activeTexture(previousActiveTexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, previousUnpackFlip);
    glStateManager.pop();
    if (reenableBlend)
      gl.enable(gl.BLEND);
    if (reenableCullFace)
      gl.enable(gl.CULL_FACE);
    if (reenableDepthTest)
      gl.enable(gl.DEPTH_TEST);
    if (reenableScissorTest)
      gl.enable(gl.SCISSOR_TEST);
    if (reenableStencilTest)
      gl.enable(gl.STENCIL_TEST);
  }
  readFrame(texture2, pixels2, cp) {
    const [dataWidth, dataHeight] = profile.getDataSize(cp);
    return this.readFrameForSize(texture2, pixels2, dataWidth, dataHeight);
  }
  readFrameForSize(texture2, pixels2, dataWidth, dataHeight) {
    let gl = this._gl;
    let pixelsView = new Uint8Array(pixels2);
    const previousBoundFramebuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
    let framebuffer = this._getFramebuffer(gl, dataWidth / 4, dataHeight);
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.readPixels(0, 0, this._framebufferWidth, this._framebufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixelsView);
    gl.bindFramebuffer(gl.FRAMEBUFFER, previousBoundFramebuffer);
    return {
      uvTransform: this._cameraUvTransform,
      data: pixels2,
      texture: texture2,
      dataWidth,
      dataHeight,
      userFacing: this._computedFrontCameraRotation
    };
  }
  _updateTransforms(rot, fc) {
    if (rot == this._computedTransformRotation && fc == this._computedFrontCameraRotation)
      return;
    this._computedTransformRotation = rot;
    this._computedFrontCameraRotation = fc;
    this._cameraUvTransform = this._getCameraUvTransform();
  }
  _getCameraUvTransform() {
    switch (this._computedTransformRotation) {
      case 270:
        return new Float32Array([0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1]);
      case 180:
        return new Float32Array([-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1]);
      case 90:
        return new Float32Array([0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1]);
    }
    return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }
  _getFramebuffer(gl, fbWidth, fbHeight) {
    if (this._framebufferWidth === fbWidth && this._framebufferHeight === fbHeight && this._framebufferId)
      return this._framebufferId;
    if (this._framebufferId) {
      gl.deleteFramebuffer(this._framebufferId);
      this._framebufferId = null;
    }
    if (this._renderTexture) {
      gl.deleteTexture(this._renderTexture);
      this._renderTexture = null;
    }
    this._framebufferId = gl.createFramebuffer();
    if (!this._framebufferId)
      throw new Error("Unable to create framebuffer");
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebufferId);
    this._renderTexture = gl.createTexture();
    if (!this._renderTexture)
      throw new Error("Unable to create render texture");
    gl.activeTexture(gl.TEXTURE0);
    const previousBoundTexture = gl.getParameter(gl.TEXTURE_BINDING_2D);
    gl.bindTexture(gl.TEXTURE_2D, this._renderTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, fbWidth, fbHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._renderTexture, 0);
    let fbStatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (fbStatus !== gl.FRAMEBUFFER_COMPLETE)
      throw new Error("Framebuffer not complete: " + fbStatus.toString());
    this._framebufferWidth = fbWidth;
    this._framebufferHeight = fbHeight;
    gl.bindTexture(gl.TEXTURE_2D, previousBoundTexture);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return this._framebufferId;
  }
  _getVertexBuffer(gl) {
    if (this._vertexBuffer)
      return this._vertexBuffer;
    this._vertexBuffer = gl.createBuffer();
    if (!this._vertexBuffer)
      throw new Error("Unable to create vertex buffer");
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
    let buffer = new Float32Array([
      -1,
      -1,
      0,
      0,
      -1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      -1,
      1,
      0
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, buffer, gl.STATIC_DRAW);
    return this._vertexBuffer;
  }
  _getIndexBuffer(gl) {
    if (this._indexBuffer)
      return this._indexBuffer;
    this._indexBuffer = gl.createBuffer();
    if (!this._indexBuffer)
      throw new Error("Unable to create index buffer");
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
    let buffer = new Uint16Array([0, 1, 2, 0, 2, 3]);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, buffer, gl.STATIC_DRAW);
    return this._indexBuffer;
  }
  _getGreyscaleShader(gl) {
    if (this._greyscaleShader)
      return this._greyscaleShader;
    let prog = gl.createProgram();
    if (!prog)
      throw new Error("Unable to create program");
    let vertexShader = compileShader(gl, gl.VERTEX_SHADER, greyscaleVsSource);
    let fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, greyscaleFsSource);
    gl.attachShader(prog, vertexShader);
    gl.attachShader(prog, fragmentShader);
    linkProgram(gl, prog);
    let uTexWidthLoc = gl.getUniformLocation(prog, "uTexWidth");
    if (!uTexWidthLoc)
      throw new Error("Unable to get uniform location uTexWidth");
    let uUvTransformLoc = gl.getUniformLocation(prog, "uUvTransform");
    if (!uUvTransformLoc)
      throw new Error("Unable to get uniform location uUvTransform");
    let uSamplerLoc = gl.getUniformLocation(prog, "uSampler");
    if (!uSamplerLoc)
      throw new Error("Unable to get uniform location uSampler");
    this._greyscaleShader = {
      program: prog,
      aVertexPositionLoc: gl.getAttribLocation(prog, "aVertexPosition"),
      aTextureCoordLoc: gl.getAttribLocation(prog, "aTextureCoord"),
      uTexWidthLoc,
      uUvTransformLoc,
      uSamplerLoc
    };
    return this._greyscaleShader;
  }
};
var greyscaleVsSource = `
    attribute vec4 aVertexPosition;
    attribute vec2 aTextureCoord;

    varying highp vec2 vTextureCoord1;
    varying highp vec2 vTextureCoord2;
    varying highp vec2 vTextureCoord3;
    varying highp vec2 vTextureCoord4;

    uniform float uTexWidth;
	uniform mat4 uUvTransform;

    void main(void) {
      highp vec2 offset1 = vec2(1.5 / uTexWidth, 0);
      highp vec2 offset2 = vec2(0.5 / uTexWidth, 0);

      gl_Position = aVertexPosition;
      vTextureCoord1 = (uUvTransform * vec4(aTextureCoord - offset1, 0, 1)).xy;
      vTextureCoord2 = (uUvTransform * vec4(aTextureCoord - offset2, 0, 1)).xy;
      vTextureCoord3 = (uUvTransform * vec4(aTextureCoord + offset2, 0, 1)).xy;
      vTextureCoord4 = (uUvTransform * vec4(aTextureCoord + offset1, 0, 1)).xy;
    }
`;
var greyscaleFsSource = `
  varying highp vec2 vTextureCoord1;
  varying highp vec2 vTextureCoord2;
  varying highp vec2 vTextureCoord3;
  varying highp vec2 vTextureCoord4;

  uniform sampler2D uSampler;

  const lowp vec3 colorWeights = vec3(77.0 / 256.0, 150.0 / 256.0, 29.0 / 256.0);

  void main(void) {
    lowp vec4 outpx;

    outpx.r = dot(colorWeights, texture2D(uSampler, vTextureCoord1).xyz);
    outpx.g = dot(colorWeights, texture2D(uSampler, vTextureCoord2).xyz);
    outpx.b = dot(colorWeights, texture2D(uSampler, vTextureCoord3).xyz);
    outpx.a = dot(colorWeights, texture2D(uSampler, vTextureCoord4).xyz);

    gl_FragColor = outpx;
  }
`;

// ../../node_modules/@zappar/zappar-cv/lib/worker-imagebitmap.js
var pixels;
var texture;
var _imageProcessor;
var _gl;
function getImageProcessor() {
  if (!_imageProcessor || !_gl) {
    const canvas = new OffscreenCanvas(1, 1);
    _gl = canvas.getContext("webgl");
    if (!_gl)
      throw new Error("Unable to get offscreen GL context");
    _imageProcessor = new ImageProcessGL(_gl);
  }
  return [_imageProcessor, _gl];
}
function handleImageBitmap(m, r, server, mgr) {
  const [imageProcessor, gl] = getImageProcessor();
  if (!texture) {
    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }
  if (!texture)
    return;
  let [dataWidth, dataHeight] = profile.getDataSize(m.cp);
  let isPortrait = m.r == 90 || m.r == 270;
  let ibWidth = isPortrait ? m.i.height : m.i.width;
  let ibHeight = isPortrait ? m.i.width : m.i.height;
  let cropHeight = Math.round(dataWidth * ibHeight / ibWidth);
  if (cropHeight < dataHeight) {
    dataHeight = cropHeight;
  } else {
    dataWidth = Math.round(dataHeight * ibWidth / ibHeight);
  }
  if (!pixels || pixels.byteLength < dataWidth * dataHeight) {
    pixels = new ArrayBuffer(dataWidth * dataHeight);
  }
  imageProcessor.uploadFrameForSize(texture, m.i, m.r, m.userFacing, dataWidth, dataHeight);
  let info = imageProcessor.readFrameForSize(texture, pixels, dataWidth, dataHeight);
  let msg = {
    t: "imageBitmapS2C",
    dataWidth: info.dataWidth,
    dataHeight: info.dataHeight,
    frame: m.i,
    userFacing: info.userFacing,
    uvTransform: info.uvTransform || mat4_exports.create(),
    tokenId: m.tokenId,
    p: m.p,
    data: m.requestData ? info.data : void 0
  };
  mgr.postOutgoingMessage(msg, [m.i]);
  let pipeline = server._pipeline_by_instance.get(m.p);
  if (pipeline) {
    r.pipeline_camera_frame_submit(pipeline, pixels, info.dataWidth, info.dataHeight, m.tokenId, m.cameraToDevice, m.cameraModel, info.userFacing, performance.now());
    r.pipeline_frame_update(pipeline);
    server.exploreState();
  }
}

// ../../node_modules/@zappar/zappar-cv/lib/worker-messages.js
function getWorkerMessageAPI(mod) {
  return {
    worker_message_send_count: mod.cwrap("worker_message_send_count", "number", []),
    worker_message_send_clear: mod.cwrap("worker_message_send_clear", null, []),
    worker_message_send_data_size: mod.cwrap("worker_message_send_data_size", "number", ["number"]),
    worker_message_send_data: mod.cwrap("worker_message_send_data", "number", ["number"]),
    worker_message_send_reference: mod.cwrap("worker_message_send_reference", "number", ["number"]),
    worker_message_send_instance: mod.cwrap("worker_message_send_instance", "number", ["number"]),
    worker_message_receive: mod.cwrap("worker_message_receive", null, ["number", "number", "number", "number"])
  };
}

// ../../node_modules/@zappar/zappar-cv/lib/data-download.js
function getDataDownloadAPI(mod) {
  return {
    data_download_clear: mod.cwrap("data_download_clear", null, []),
    data_download_size: mod.cwrap("data_download_size", "number", []),
    data_download: mod.cwrap("data_download", "number", []),
    data_should_record_set: mod.cwrap("data_should_record_set", null, ["number"])
  };
}

// ../../node_modules/@zappar/zappar-cv/lib/worker-server.js
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var messageManager = new MsgManager();
var workerMessageChannel0;
var workerMessageChannel1;
var latestCameraToScreenRotation = 0;
var rawDataAccessEnabled = false;
var rawCameraFrameBuffersByPipeline = /* @__PURE__ */ new Map();
var cameraProfileBySource = /* @__PURE__ */ new Map();
function launchWorkerServer(wasmUrl, module, shouldRecordData) {
  return __awaiter(this, void 0, void 0, function* () {
    let mod = zappar_cv_default({
      locateFile: (path, prefix) => {
        if (path.endsWith("zappar-cv.wasm")) {
          return wasmUrl;
        }
        return prefix + path;
      },
      instantiateWasm: (imports, successCallback) => {
        const instance = new WebAssembly.Instance(module, imports);
        successCallback(instance);
        return instance.exports;
      },
      onRuntimeInitialized: () => {
        let r = getRuntimeObject(mod);
        const workerMessageAPI = getWorkerMessageAPI(mod);
        const dataDownloadAPI = shouldRecordData > 0 ? getDataDownloadAPI(mod) : void 0;
        dataDownloadAPI === null || dataDownloadAPI === void 0 ? void 0 : dataDownloadAPI.data_should_record_set(shouldRecordData);
        let server = new zappar_server(r, (pipelineId, ab) => {
          messageManager.postOutgoingMessage({
            p: pipelineId,
            t: "zappar",
            d: ab
          }, [ab]);
        });
        messageManager.postOutgoingMessage("loaded", []);
        messageManager.onIncomingMessage.bind((msg) => {
          var _a, _b, _c;
          switch (msg.t) {
            case "zappar":
              server.processBuffer(msg.d);
              messageManager.postOutgoingMessage({ t: "buf", d: msg.d }, [msg.d]);
              break;
            case "buf":
              (_a = server.serializersByPipelineId.get(msg.p)) === null || _a === void 0 ? void 0 : _a.bufferReturn(msg.d);
              break;
            case "cameraFrameC2S": {
              let msgt = msg;
              let pipeline = server._pipeline_by_instance.get(msgt.p);
              let att;
              if (pipeline) {
                r.pipeline_camera_frame_submit(pipeline, msgt.d, msgt.width, msgt.height, msgt.token, msgt.c2d, msgt.cm, msgt.userFacing, msgt.captureTime);
                r.pipeline_frame_update(pipeline);
                att = r.pipeline_camera_frame_device_attitude(pipeline);
                server.exploreState();
                handleMessages(mod, workerMessageAPI);
                if (dataDownloadAPI)
                  handleDataDownload(mod, dataDownloadAPI);
              }
              let ret = {
                token: msgt.token,
                d: msgt.d,
                p: msgt.p,
                t: "cameraFrameRecycleS2C",
                att
              };
              messageManager.postOutgoingMessage(ret, [msgt.d]);
              break;
            }
            case "rawenabled": {
              const msgt = msg;
              rawDataAccessEnabled = msgt.v;
              break;
            }
            case "rawrequest": {
              const msgt = msg;
              const buffers = rawCameraFrameBuffersByPipeline.get(msgt.p);
              const ret = {
                t: "raw",
                token: msgt.token,
                p: msgt.p,
                data: buffers ? (_c = (_b = buffers.ready.find((entry) => entry.token === msgt.token)) === null || _b === void 0 ? void 0 : _b.data) !== null && _c !== void 0 ? _c : null : null
              };
              messageManager.postOutgoingMessage(ret, []);
              break;
            }
            case "cameraProfileC2S": {
              let msgt = msg;
              cameraProfileBySource.set(msgt.source, msgt.p);
              break;
            }
            case "streamC2S": {
              let msgt = msg;
              consumeStream(mod, r, msgt.s, msgt.p, msgt.userFacing, server, msgt.source, workerMessageAPI, dataDownloadAPI).then(() => {
                let m = { t: "streamEndedS2C", p: msgt.p, source: msgt.source };
                messageManager.postOutgoingMessage(m, []);
              }).catch((err) => {
              });
              break;
            }
            case "cameraToScreenC2S": {
              let msgt = msg;
              latestCameraToScreenRotation = msgt.r;
              break;
            }
            case "imageBitmapC2S": {
              let msgt = msg;
              handleImageBitmap(msgt, r, server, messageManager);
              break;
            }
            case "sensorDataC2S": {
              const msgt = msg;
              const pipeline = server._pipeline_by_instance.get(msgt.p);
              if (!pipeline)
                break;
              switch (msgt.sensor) {
                case "accel":
                  r.pipeline_motion_accelerometer_submit(pipeline, msgt.timestamp, msgt.x, msgt.y, msgt.z);
                  break;
                case "accel_w_gravity_int":
                  r.pipeline_motion_accelerometer_with_gravity_submit_int(pipeline, msgt.timestamp, msgt.interval, msgt.x, msgt.y, msgt.z);
                  break;
                case "accel_wo_gravity_int":
                  r.pipeline_motion_accelerometer_without_gravity_submit_int(pipeline, msgt.timestamp, msgt.interval, msgt.x, msgt.y, msgt.z);
                  break;
                case "attitude_int":
                  r.pipeline_motion_attitude_submit_int(pipeline, msgt.timestamp, msgt.interval, msgt.x, msgt.y, msgt.z);
                  break;
                case "attitude":
                  r.pipeline_motion_attitude_submit(pipeline, msgt.timestamp, msgt.x, msgt.y, msgt.z);
                  break;
                case "rotation_rate_int":
                  r.pipeline_motion_rotation_rate_submit_int(pipeline, msgt.timestamp, msgt.interval, msgt.x, msgt.y, msgt.z);
                  break;
                case "rotation_rate":
                  r.pipeline_motion_rotation_rate_submit(pipeline, msgt.timestamp, msgt.x, msgt.y, msgt.z);
                  break;
                case "relative_orientation":
                  r.pipeline_motion_relative_orientation_submit_int(pipeline, msgt.timestamp, msgt.interval, msgt.x, msgt.y, msgt.z, msgt.w);
                  break;
              }
              break;
            }
            case "attitudeMatrixC2S": {
              const msgt = msg;
              const pipeline = server._pipeline_by_instance.get(msgt.p);
              if (!pipeline)
                break;
              r.pipeline_motion_attitude_matrix_submit(pipeline, msgt.m);
              break;
            }
          }
        });
      }
    });
  });
}
function consumeStream(mod, r, stream, p, userFacing, server, source, workerMessageAPI, dataDownloadAPI) {
  return __awaiter(this, void 0, void 0, function* () {
    while (true) {
      let reader;
      try {
        reader = yield stream.getReader();
      } catch (err) {
        yield delay(1e3);
        continue;
      }
      try {
        yield consumeReader(mod, r, reader, p, userFacing, server, source, workerMessageAPI, dataDownloadAPI);
        return;
      } catch (err) {
      }
      yield delay(1e3);
      return;
    }
  });
}
var streamDataBufferPointer = 0;
var streamDataBufferLength = 0;
var tokenId = 1;
function getFrameOrTimeout(reader) {
  return new Promise((resolve, reject) => {
    const token = setTimeout(() => {
      reject("Frame timeout");
    }, 2e3);
    reader.read().then((result) => {
      clearTimeout(token);
      resolve(result);
    });
  });
}
var cameraToDeviceTransform = mat4_exports.create();
var cameraModel = new Float32Array([300, 300, 160, 120, 0, 0]);
function consumeReader(mod, r, reader, p, userFacing, server, source, workerMessageAPI, dataDownloadAPI) {
  var _a, _b;
  return __awaiter(this, void 0, void 0, function* () {
    while (true) {
      let result = yield getFrameOrTimeout(reader);
      if (result.done) {
        (_a = result.value) === null || _a === void 0 ? void 0 : _a.close();
        return;
      }
      let frame = result.value;
      let size = frame.allocationSize();
      if (size > streamDataBufferLength) {
        if (streamDataBufferPointer > 0)
          mod._free(streamDataBufferPointer);
        streamDataBufferPointer = mod._malloc(size);
        streamDataBufferLength = size;
      }
      yield frame.copyTo(mod.HEAPU8.subarray(streamDataBufferPointer, streamDataBufferPointer + streamDataBufferLength));
      let token = tokenId;
      tokenId++;
      const width = frame.visibleRect.width;
      const height = frame.visibleRect.height;
      let uvTransform;
      let dataWidth = width;
      let dataHeight = height;
      switch (latestCameraToScreenRotation) {
        case 270:
          uvTransform = new Float32Array([0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1]);
          dataWidth = height;
          dataHeight = width;
          break;
        case 180:
          uvTransform = new Float32Array([-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1]);
          break;
        case 90:
          uvTransform = new Float32Array([0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1]);
          dataWidth = height;
          dataHeight = width;
          break;
        default:
          uvTransform = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
          break;
      }
      let downSample = false;
      if (cameraProfileBySource.get(source) !== camera_profile_t.HIGH) {
        dataWidth /= 2;
        dataHeight /= 2;
        downSample = true;
      }
      let clone2 = frame.clone();
      if (userFacing)
        mat4_exports.fromScaling(cameraToDeviceTransform, [-1, 1, -1]);
      else
        mat4_exports.identity(cameraToDeviceTransform);
      let focalLength = (userFacing ? 300 : 240) * dataWidth / 320;
      cameraModel[0] = focalLength;
      cameraModel[1] = focalLength;
      cameraModel[2] = dataWidth * 0.5;
      cameraModel[3] = dataHeight * 0.5;
      const ret = {
        token,
        d: clone2,
        p,
        t: "videoFrameS2C",
        userFacing,
        uvTransform,
        w: dataWidth,
        h: dataHeight,
        cameraToDevice: cameraToDeviceTransform,
        cameraModel,
        source
      };
      messageManager.postOutgoingMessage(ret, [ret.d, ret.uvTransform.buffer]);
      const pipeline = server._pipeline_by_instance.get(p);
      if (pipeline) {
        try {
          r.pipeline_camera_frame_submit_raw_pointer(pipeline, streamDataBufferPointer, size, framePixelFormatFromFormat(frame.format), width, height, token, cameraToDeviceTransform, latestCameraToScreenRotation, cameraModel, userFacing, (_b = frame.timestamp) !== null && _b !== void 0 ? _b : -1, downSample);
          handleMessages(mod, workerMessageAPI);
          if (dataDownloadAPI)
            handleDataDownload(mod, dataDownloadAPI);
        } catch (err) {
          console.log("Exception during camera processing", err);
        }
        r.pipeline_frame_update(pipeline);
        if (rawDataAccessEnabled) {
          let buffers = rawCameraFrameBuffersByPipeline.get(p);
          if (!buffers) {
            buffers = { available: [], ready: [] };
            rawCameraFrameBuffersByPipeline.set(p, buffers);
          }
          if (buffers.ready.length > 4) {
            const removed = buffers.ready.splice(0, 1);
            for (const entry of removed)
              buffers.available.push(new Uint8Array(entry.data.data));
          }
          const size2 = r.pipeline_camera_frame_data_raw_size(pipeline);
          let buffer;
          while (!buffer || buffer.byteLength < size2) {
            if (buffers.available.length < 1)
              buffers.available.push(new Uint8Array(size2));
            buffer = buffers.available.pop();
          }
          const dataPointer = r.pipeline_camera_frame_data_raw(pipeline);
          buffer.set(mod.HEAPU8.subarray(dataPointer, dataPointer + size2));
          buffers.ready.push({ token, data: {
            data: buffer,
            width: r.pipeline_camera_data_width(p),
            height: r.pipeline_camera_data_height(p)
          } });
        }
        server.exploreState();
      }
      frame.close();
    }
  });
}
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
function framePixelFormatFromFormat(f) {
  switch (f) {
    case "I420":
      return frame_pixel_format_t.FRAME_PIXEL_FORMAT_I420;
    case "I420A":
      return frame_pixel_format_t.FRAME_PIXEL_FORMAT_I420A;
    case "I422":
      return frame_pixel_format_t.FRAME_PIXEL_FORMAT_I422;
    case "I444":
      return frame_pixel_format_t.FRAME_PIXEL_FORMAT_I444;
    case "NV12":
      return frame_pixel_format_t.FRAME_PIXEL_FORMAT_NV12;
    case "RGBA":
    case "RGBX":
      return frame_pixel_format_t.FRAME_PIXEL_FORMAT_RGBA;
    case "BGRA":
    case "BGRX":
      return frame_pixel_format_t.FRAME_PIXEL_FORMAT_BGRA;
  }
  return frame_pixel_format_t.FRAME_PIXEL_FORMAT_Y;
}
function handleMessages(mod, m) {
  const toSend = m.worker_message_send_count();
  if (toSend === 0)
    return;
  if (!workerMessageChannel0 || !workerMessageChannel1) {
    workerMessageChannel0 = new MessageChannel();
    workerMessageChannel0.port1.start();
    workerMessageChannel0.port1.addEventListener("message", (evt) => {
      if (evt.data.t !== "msgrec")
        return;
      const data = evt.data.data;
      const ptr = mod._malloc(data.byteLength);
      mod.HEAPU8.set(data, ptr);
      m.worker_message_receive(evt.data.reference, data.byteLength, ptr, 0);
      mod._free(ptr);
    });
    workerMessageChannel1 = new MessageChannel();
    workerMessageChannel1.port1.start();
    workerMessageChannel1.port1.addEventListener("message", (evt) => {
      if (evt.data.t !== "msgrec")
        return;
      const data = evt.data.data;
      const ptr = mod._malloc(data.byteLength);
      mod.HEAPU8.set(data, ptr);
      m.worker_message_receive(evt.data.reference, data.byteLength, ptr, 1);
      mod._free(ptr);
    });
    messageManager.postOutgoingMessage({ t: "setupCeresWorker", port0: workerMessageChannel0.port2, port1: workerMessageChannel1.port2 }, [workerMessageChannel0.port2, workerMessageChannel1.port2]);
  }
  for (let i = 0; i < toSend; i++) {
    const reference = m.worker_message_send_reference(i);
    const dataSize = m.worker_message_send_data_size(i);
    const instance = m.worker_message_send_instance(i);
    const dataPtr = m.worker_message_send_data(i);
    const data = mod.HEAPU8.slice(dataPtr, dataPtr + dataSize);
    (instance === 0 ? workerMessageChannel0 : workerMessageChannel1).port1.postMessage({
      t: "msgsend",
      data,
      reference,
      instance
    }, [data.buffer]);
  }
  m.worker_message_send_clear();
}
function handleDataDownload(mod, d) {
  const size = d.data_download_size();
  if (size === 0)
    return;
  const dataPtr = d.data_download();
  const data = mod.HEAPU8.slice(dataPtr, dataPtr + size);
  messageManager.postOutgoingMessage({ t: "_z_datadownload", data }, [data.buffer]);
  d.data_download_clear();
}

// ../../node_modules/@zappar/zappar-cv/lib/worker.js
var ctx = self;
messageManager.onOutgoingMessage.bind(() => {
  let msgs = messageManager.getOutgoingMessages();
  for (let msg of msgs) {
    ctx.postMessage(msg.msg, msg.transferables);
  }
});
var launchHandler = (evt) => {
  var _a;
  if (evt && evt.data && evt.data.t === "wasm") {
    let url = location.href.startsWith("blob") ? evt.data.url : new URL("./zappar-cv.wasm", import.meta.url).toString();
    launchWorkerServer(url, evt.data.module, (_a = evt.data.shouldRecordData) !== null && _a !== void 0 ? _a : 0);
    ctx.removeEventListener("message", launchHandler);
  }
};
ctx.addEventListener("message", launchHandler);
ctx.addEventListener("message", (evt) => {
  messageManager.postIncomingMessage(evt.data);
});
