/**
 * ParamQuery Touch v1.0.0
 * 
 * Copyright (c) 2012-2019 Paramvir Dhindsa (http://paramquery.com)
 * Released under Commercial license
 * http://paramquery.com/pro/license
 * 
 */
! function(e) {
    function t(e, t, n, o) {
        var u = document.createEvent("MouseEvents");
        return u.initMouseEvent(e, !0, !0, window, 0, t.screenX, t.screenY, t.clientX, t.clientY, !1, !1, !1, !1, 0, o), n.dispatchEvent(u), u
    }

    function n(e) {
        if (1 == e.touches.length) {
            var n, s = e.changedTouches[0],
                i = e.target;
            t("mouseover", s, i), t("mousemove", s, i), n = t("mousedown", s, i), n.defaultPrevented && (i.addEventListener("touchmove", o), i.addEventListener("touchend", u))
        }
    }

    function o(e) {
        var n = e.changedTouches[0],
            o = document.elementFromPoint(n.clientX, n.clientY);
        o && (s ? o && s !== o && (t("mouseover", n, o, s), t("mouseout", n, s, o), s = o) : s = o, e.preventDefault(), t("mousemove", n, o))
    }

    function u(e) {
        var n = e.changedTouches[0],
            s = document.elementFromPoint(n.clientX, n.clientY),
            i = e.target;
        t("mouseup", n, s), t("mouseout", n, s), i.removeEventListener("touchmove", o), i.removeEventListener("touchend", u)
    }
    if ("ontouchstart" in window) {
        var s, i = e.ui.mouse.prototype,
            c = i._mouseInit,
            r = i._mouseDestroy;
        i._mouseInit = function() {
            this.element[0].addEventListener("touchstart", n), c.apply(this, arguments)
        }, i._mouseDestroy = function() {
            this.element[0].removeEventListener("touchstart", n), r.apply(this, arguments)
        }
    }
}(jQuery);