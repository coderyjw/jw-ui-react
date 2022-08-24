import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { jsx, jsxs } from 'react/jsx-runtime';
import classNames from 'classnames';
import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';

/******************************************************************************
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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 * ### 引用方法
 *
 * ```javascript
 * import { Button } from 'jw-ui-react'
 * ```
 */
var Button = function (props) {
    var _a;
    var btnType = props.btnType, className = props.className, disabled = props.disabled, size = props.size, children = props.children, href = props.href, restProps = __rest(props, ["btnType", "className", "disabled", "size", "children", "href"]);
    var classes = classNames('jw-btn', className, (_a = {},
        _a["jw-btn-".concat(btnType)] = btnType,
        _a["jw-btn-".concat(size)] = size,
        _a.disabled = btnType === 'link' && disabled,
        _a));
    if (btnType === 'link' && href) {
        return (jsx("a", __assign({ href: href, className: classes }, restProps, { children: children })));
    }
    else {
        return (jsx("button", __assign({ disabled: disabled, className: classes }, restProps, { children: children })));
    }
};
Button.defaultProps = {
    disabled: false,
    btnType: 'default',
};

var MenuContext = createContext({ index: '0' });
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 *
 * ```javascript
 * import { Menu } from 'jw-ui-react'
 *
 * //然后可以使用 Menu.Item 和 Menu.Submenu 访问选项和子下拉菜单组件
 * ```
 */
var Menu = function (props) {
    var className = props.className, mode = props.mode, defaultIndex = props.defaultIndex, style = props.style, children = props.children, onSelect = props.onSelect, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var classes = classNames('jw-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    });
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    var renderChiuldren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString(),
                });
            }
            else {
                console.error('Warning: Menu has a child which is not a MenuItem component');
            }
        });
    };
    return (jsx("ul", __assign({ className: classes, style: style, "data-testid": "test-menu" }, { children: jsx(MenuContext.Provider, __assign({ value: passedContext }, { children: renderChiuldren() })) })));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: [],
};

/**
 * 提供了一套常用的图标集合 基于 react-fontawesome。
 *
 * 支持 react-fontawesome的所有属性 可以在这里查询 https://fontawesome.com/v5/docs/web/use-with/react
 *
 * 支持 fontawesome 所有 free-solid-icons，可以在这里查看所有图标 https://fontawesome.com/icons?d=gallery&s=solid&m=free
 * ### 引用方法
 *
 * ~~~js
 * import { Icon } from 'jw-ui-react'
 * ~~~
 */
var Icon = function (props) {
    var _a;
    // icon-primary
    var className = props.className, theme = props.theme, resetProps = __rest(props, ["className", "theme"]);
    var classes = classNames('jw-icon', className, (_a = {},
        _a["icon-".concat(theme)] = theme,
        _a));
    return jsx(FontAwesomeIcon, __assign({ className: classes }, resetProps));
};

var Transition = function (props) {
    var children = props.children, classNames = props.classNames, animation = props.animation, wrapper = props.wrapper, restProps = __rest(props, ["children", "classNames", "animation", "wrapper"]);
    return (jsx(CSSTransition, __assign({ classNames: classNames ? classNames : animation }, restProps, { children: wrapper ? jsx("div", { children: children }) : children })));
};
Transition.defaultProps = {
    unmountOnExit: true,
    appear: true,
    animation: 'zoom-in-top'
};

var SubMenu = function (_a) {
    var index = _a.index, title = _a.title, className = _a.className, children = _a.children, disabled = _a.disabled;
    var context = useContext(MenuContext);
    var openSubMenus = context.defaultOpenSubMenus;
    var isOpend = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false;
    var _b = useState(isOpend), menuOpen = _b[0], setOpen = _b[1];
    var classes = classNames('jw-menu-item jw-submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical',
        'is-disabled': disabled,
    });
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index);
        }
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    var hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: function (e) { handleMouse(e, true); },
        onMouseLeave: function (e) { handleMouse(e, false); },
    } : {};
    var renderChildren = function () {
        var subMenuClasses = classNames('jw-submenu', {
            'menu-opened': menuOpen
        });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: "".concat(index, "-").concat(i),
                    disabled: disabled
                });
            }
            else {
                console.error('Warning: Menu has a child which is not a MenuItem component');
            }
        });
        return (jsx(Transition, __assign({ in: menuOpen, timeout: 300, animation: "zoom-in-top" }, { children: jsx("ul", __assign({ className: subMenuClasses }, { children: childrenComponent })) })));
    };
    return (jsxs("li", __assign({ className: classes }, hoverEvents, { children: [jsxs("div", __assign({ className: "jw-submenu-title" }, clickEvents, { children: [title, jsx(Icon, { icon: "angle-down", className: "arrow-icon" })] })), renderChildren()] }), index));
};
SubMenu.displayName = 'SubMenu';

var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    var context = useContext(MenuContext);
    var classes = classNames('jw-menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index);
        }
    };
    return (jsx("li", __assign({ className: classes, style: style, onClick: handleClick }, { children: children })));
};
MenuItem.displayName = 'MenuItem';

var TransMenu = Menu;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 * import { Input } from 'jw-ui-react'
 * ~~~
 *
 * 支持 HTMLInput 的所有基本属性
 */
var Input = function (props) {
    var _a;
    // 取出各种属性
    var disabled = props.disabled, size = props.size, icon = props.icon, prepend = props.prepend, append = props.append, style = props.style, restProps = __rest(props, ["disabled", "size", "icon", "prepend", "append", "style"]);
    // 根据属性计算不同的className
    var cnames = classNames('jw-input-wrapper', (_a = {},
        _a["input-size-".concat(size)] = size,
        _a['is-disabled'] = disabled,
        _a['input-group'] = prepend || append,
        _a['input-group-append'] = !!append,
        _a['input-group-prepend'] = !!prepend,
        _a));
    var fixControlledValue = function (value) {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    };
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    }
    return (
    // 根据属性判断是否需要添加特定的节点
    jsxs("div", __assign({ className: cnames, style: style }, { children: [prepend && jsx("div", __assign({ className: "jw-input-group-prepend" }, { children: prepend })), icon && (jsx("div", __assign({ className: "icon-wrapper" }, { children: jsx(Icon, { icon: icon, title: "title-".concat(icon) }) }))), jsx("input", __assign({ className: "jw-input-inner", disabled: disabled }, restProps)), append && jsx("div", __assign({ className: "jw-input-group-append" }, { children: append }))] })));
};

function useDebounce(value, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
    useEffect(function () {
        var handler = window.setTimeout(function () {
            setDebouncedValue(value);
        }, delay);
        return function () {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

function useClickOutside(ref, handler) {
    useEffect(function () {
        var listener = function (e) {
            if (!ref.current || ref.current.contains(e.target))
                return;
            handler(e);
        };
        document.addEventListener('click', listener);
        return function () {
            document.removeEventListener('click', listener);
        };
    }, [ref, handler]);
}

/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式
 * 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 *
 * ~~~js
 * import { AutoComplete } from 'vikingship'
 * ~~~
 */
var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, value = props.value, onSelect = props.onSelect, renderOption = props.renderOption, style = props.style, restProps = __rest(props, ["fetchSuggestions", "value", "onSelect", "renderOption", "style"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var debounceValue = useDebounce(inputValue);
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var _e = useState(false), showDropdown = _e[0], setShowDropdown = _e[1];
    useClickOutside(componentRef, function () {
        setSuggestions([]);
    });
    useEffect(function () {
        if (debounceValue && triggerSearch.current) {
            setSuggestions([]);
            var result = fetchSuggestions(debounceValue);
            if (result instanceof Promise) {
                setLoading(true);
                result.then(function (res) {
                    setLoading(false);
                    setSuggestions(res || []);
                    if (res.length > 0) {
                        setShowDropdown(true);
                    }
                });
            }
            else {
                setSuggestions(result);
                if (result.length > 0) {
                    setShowDropdown(true);
                }
            }
        }
        else {
            setShowDropdown(false);
        }
        setHighlightIndex(-1);
    }, [debounceValue]);
    var handleChange = function (e) {
        var value = e.target.value;
        setInputValue(value);
        triggerSearch.current = true;
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setShowDropdown(false);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.key) {
            case 'Enter':
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 'ArrowDown':
                highlight(highlightIndex + 1);
                break;
            case 'ArrowUp':
                highlight(highlightIndex - 1);
                break;
            case 'Escape':
                setShowDropdown(false);
                break;
        }
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (jsx(Transition, __assign({ in: showDropdown || loading, animation: "zoom-in-top", timeout: 300, onExited: function () {
                setSuggestions([]);
            } }, { children: jsx("ul", __assign({ className: "jw-suggestion-list" }, { children: suggestions.map(function (item, index) {
                    var cnames = classNames('suggestion-item', {
                        'is-active': index === highlightIndex,
                    });
                    return (jsx("li", __assign({ className: cnames, onClick: function () { return handleSelect(item); } }, { children: renderTemplate(item) }), index));
                }) })) })));
    };
    return (jsxs("div", __assign({ className: "jw-auto-complete", ref: componentRef, style: style }, { children: [jsx(Input, __assign({ value: inputValue }, restProps, { onChange: handleChange, onKeyDown: handleKeyDown })), loading && (jsx("div", __assign({ className: "suggstions-loading-icon" }, { children: jsx(Icon, { icon: "spinner", spin: true }) }))), suggestions.length > 0 && generateDropdown()] })));
};

var Progress = function (props) {
    var percent = props.percent, strokeHeight = props.strokeHeight, showText = props.showText, styles = props.styles, theme = props.theme;
    return (jsx("div", __assign({ className: "jw-progress-bar", style: styles }, { children: jsx("div", __assign({ className: "jw-progress-bar-outer", style: { height: "".concat(strokeHeight, "px") } }, { children: jsx("div", __assign({ className: "jw-progress-bar-inner color-".concat(theme), style: { width: "".concat(percent, "%") } }, { children: showText && jsx("span", __assign({ className: "inner-text" }, { children: "".concat(percent, "%") })) })) })) })));
};
Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: "primary",
};

var UploadList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove;
    console.log('firelist', fileList);
    return (jsx("ul", __assign({ className: "jw-upload-list" }, { children: fileList.map(function (item) {
            return (jsxs("li", __assign({ className: "jw-upload-list-item" }, { children: [jsxs("span", __assign({ className: "file-name file-name-".concat(item.status) }, { children: [jsx(Icon, { icon: "file-alt", theme: "secondary" }), item.name] })), jsxs("span", __assign({ className: "file-status" }, { children: [(item.status === 'uploading' || item.status === 'ready') && jsx(Icon, { icon: "spinner", spin: true, theme: "primary" }), item.status === 'success' && jsx(Icon, { icon: "check-circle", theme: "success" }), item.status === 'error' && jsx(Icon, { icon: "times-circle", theme: "danger" })] })), jsx("span", __assign({ className: "file-actions" }, { children: jsx(Icon, { icon: "times", onClick: function () { onRemove(item); } }) })), item.status === 'uploading' &&
                        jsx(Progress, { percent: item.percent || 0 })] }), item.uid));
        }) })));
};

var Dragger = function (props) {
    var onFile = props.onFile, children = props.children;
    var _a = useState(false), dragOver = _a[0], setDragOver = _a[1];
    var klass = classNames('jw-uploader-dragger', {
        'is-dragover': dragOver
    });
    var handleDrop = function (e) {
        e.preventDefault();
        setDragOver(false);
        console.log('inside drag', e.dataTransfer.files);
        onFile(e.dataTransfer.files);
    };
    var handleDrag = function (e, over) {
        e.preventDefault();
        setDragOver(over);
    };
    return (jsx("div", __assign({ className: klass, onDragOver: function (e) { handleDrag(e, true); }, onDragLeave: function (e) { handleDrag(e, false); }, onDrop: handleDrop }, { children: children })));
};

/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Upload } from 'jwship'
 * ~~~
 */
var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, name = props.name, headers = props.headers, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, drag = props.drag;
    var fileInput = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    var uploadFiles = function (files, test) {
        var postFiles = Array.from(files);
        if (test) {
            console.log('drag', postFiles[0]);
        }
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    var post = function (file) {
        var _file = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        };
        setFileList(function (prevList) {
            return __spreadArray([_file], prevList, true);
        });
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' });
                    _file.status = 'uploading';
                    _file.percent = percentage;
                    if (onProgress) {
                        onProgress(percentage, _file);
                    }
                }
            }
        }).then(function (resp) {
            updateFileList(_file, { status: 'success', response: resp.data });
            _file.status = 'success';
            _file.response = resp.data;
            if (onSuccess) {
                onSuccess(resp.data, _file);
            }
            if (onChange) {
                onChange(_file);
            }
        }).catch(function (err) {
            updateFileList(_file, { status: 'error', error: err });
            _file.status = 'error';
            _file.error = err;
            if (onError) {
                onError(err, _file);
            }
            if (onChange) {
                onChange(_file);
            }
        });
    };
    return (jsxs("div", __assign({ className: "jw-upload-component" }, { children: [jsxs("div", __assign({ className: "jw-upload-input", style: { display: 'inline-block' }, onClick: handleClick }, { children: [drag ?
                        jsx(Dragger, __assign({ onFile: function (files) { uploadFiles(files, true); } }, { children: children })) :
                        children, jsx("input", { className: "jw-file-input", style: { display: 'none' }, ref: fileInput, onChange: handleFileChange, type: "file", accept: accept, multiple: multiple })] })), jsx(UploadList, { fileList: fileList, onRemove: handleRemove })] })));
};
Upload.defaultProps = {
    name: 'file'
};

/**
 * 选项卡切换组件。
 * 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * ### 引用方法
 *
 * ~~~js
 * import { Tabs } from 'jw-ui-react'
 * ~~~
 */
var Tabs = function (props) {
    var className = props.className, type = props.type, defaultIndex = props.defaultIndex, children = props.children, onSelect = props.onSelect;
    var _a = useState(defaultIndex), activeIndex = _a[0], setActiveIndex = _a[1];
    var handleClick = function (e, index, disabled) {
        if (!disabled) {
            setActiveIndex(index);
            if (onSelect) {
                onSelect(index);
            }
        }
    };
    var navClass = classNames('jw-tabs-nav', {
        'nav-line': type === 'line',
        'nav-card': type === 'card',
    });
    var renderNavLinks = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var _a = childElement.props, disabled = _a.disabled, label = _a.label;
            var classes = classNames('jw-tabs-nav-item', {
                'is-active': activeIndex === index,
                disabled: disabled,
            });
            return (jsx("li", __assign({ className: classes, onClick: function (e) {
                    handleClick(e, index, disabled);
                } }, { children: label }), "nav-item-".concat(index)));
        });
        // return  tabsList.map(item => <li className={classes} key={item} onClick={e => setLabel(item)}>{item}</li>)
    };
    var renderContent = function () {
        return React.Children.map(children, function (child, index) {
            if (index === activeIndex) {
                return child;
            }
        });
    };
    return (jsxs("div", __assign({ className: "jw-tabs ".concat(className) }, { children: [jsx("ul", __assign({ className: navClass }, { children: renderNavLinks() })), jsx("div", __assign({ className: "jw-tabs-content" }, { children: renderContent() }))] })));
};
Tabs.defaultProps = {
    defaultIndex: 0,
    type: 'line',
};

var TabItem = function (props) {
    var children = props.children;
    return (jsx("div", __assign({ className: "jw-tab-panel" }, { children: children })));
};

var TransTabs = Tabs;
TransTabs.Item = TabItem;

/**
 * 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 * ### 引用方法
 *
 * ~~~js
 * import { Alert } from 'jw-ui-react'
 * ~~~
*/
var Alert = function (props) {
    var _a;
    var _b = useState(false), hide = _b[0], setHide = _b[1];
    var title = props.title, type = props.type, description = props.description, closable = props.closable, onClose = props.onClose;
    var classes = classNames('jw-alert', (_a = {},
        _a["jw-alert-".concat(type)] = type,
        _a));
    var titleClass = classNames('jw-alert-title', {
        'bold-title': description
    });
    var handleClose = function (e) {
        if (onClose) {
            onClose();
        }
        setHide(true);
    };
    return (jsx(Transition, __assign({ in: !hide, timeout: 300, animation: "zoom-in-top" }, { children: jsxs("div", __assign({ className: classes }, { children: [jsx("span", __assign({ className: titleClass }, { children: title })), description && jsx("p", __assign({ className: "jw-alert-desc" }, { children: description })), closable && jsx("span", __assign({ className: "jw-alert-close", onClick: handleClose }, { children: jsx(Icon, { icon: "times" }) }))] })) })));
};
Alert.defaultProps = {
    type: 'default',
    closable: true,
};

library.add(fas);

export { Alert, AutoComplete, Button, Icon, Input, TransMenu as Menu, Progress, TransTabs as Tabs, Transition, Upload };
