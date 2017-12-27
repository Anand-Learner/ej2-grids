import { Browser, ChildProperty, Collection, Complex, Component, Draggable, Droppable, Event, EventHandler, Internationalization, KeyboardEvents, L10n, NotifyPropertyChanges, Property, addClass, append, attributes, classList, closest, compile, createElement, debounce, detach, extend, formatUnit, getEnumValue, getValue, isNullOrUndefined, isUndefined, matches, merge, print, remove, removeClass, select, setCulture, setStyleAttribute, setValue } from '@syncfusion/ej2-base';
import { Dialog, Tooltip, calculatePosition, calculateRelativeBasedPosition, createSpinner, hideSpinner, showSpinner } from '@syncfusion/ej2-popups';
import { DataManager, DataUtil, Deferred, Predicate, Query } from '@syncfusion/ej2-data';
import { Button, CheckBox, RadioButton, createCheckBox } from '@syncfusion/ej2-buttons';
import { FormValidator, Input, NumericTextBox } from '@syncfusion/ej2-inputs';
import { AutoComplete, DropDownList } from '@syncfusion/ej2-dropdowns';
import { DatePicker } from '@syncfusion/ej2-calendars';
import { ContextMenu, Toolbar } from '@syncfusion/ej2-navigations';
import { Workbook } from '@syncfusion/ej2-excel-export';
import { PdfBitmap, PdfBorders, PdfColor, PdfCompositeField, PdfDocument, PdfFontFamily, PdfFontStyle, PdfGrid, PdfPageCountField, PdfPageNumberField, PdfPageOrientation, PdfPageSettings, PdfPageTemplateElement, PdfPen, PdfSolidBrush, PdfStandardFont, PdfStringFormat, PdfTextAlignment, PdfVerticalAlignment, PointF, RectangleF, SizeF } from '@syncfusion/ej2-pdf-export';

/**
 * ValueFormatter class to globalize the value.
 * @hidden
 */
var ValueFormatter = /** @class */ (function () {
    function ValueFormatter(cultureName) {
        this.intl = new Internationalization();
        if (!isNullOrUndefined(cultureName)) {
            this.intl.culture = cultureName;
        }
    }
    ValueFormatter.prototype.getFormatFunction = function (format) {
        if (format.type) {
            return this.intl.getDateFormat(format);
        }
        else {
            return this.intl.getNumberFormat(format);
        }
    };
    ValueFormatter.prototype.getParserFunction = function (format) {
        if (format.type) {
            return this.intl.getDateParser(format);
        }
        else {
            return this.intl.getNumberParser(format);
        }
    };
    ValueFormatter.prototype.fromView = function (value, format, type) {
        if (type === 'date' || type === 'datetime' || type === 'number') {
            return format(value);
        }
        else {
            return value;
        }
    };
    ValueFormatter.prototype.toView = function (value, format) {
        var result = value;
        if (!isNullOrUndefined(format) && !isNullOrUndefined(value)) {
            result = format(value);
        }
        return result;
    };
    ValueFormatter.prototype.setCulture = function (cultureName) {
        if (!isNullOrUndefined(cultureName)) {
            setCulture(cultureName);
        }
    };
    return ValueFormatter;
}());

/**
 * Represents Grid `Column` model class.
 */
var Column = /** @class */ (function () {
    function Column(options) {
        /**
         * If `allowSorting` set to false, then it disables sorting option of a particular column.
         * By default all columns are sortable.
         * @default true
         */
        this.allowSorting = true;
        /**
         * If `allowResizing` set to false, then it disables resize option of a particular column.
         * By default all columns can be resized.
         * @default true
         */
        this.allowResizing = true;
        /**
         * If `allowFiltering` set to false, then it disables filtering option and filter bar element of a particular column.
         * By default all columns are filterable.
         * @default true
         */
        this.allowFiltering = true;
        /**
         * If `allowGrouping` set to false, then it disables grouping of a particular column.
         * By default all columns are groupable.
         * @default true
         */
        this.allowGrouping = true;
        /**
         * If `showColumnMenu` set to false, then it disable the column menu of a particular column.
         * By default column menu will show for all columns
         * @default true
         */
        this.showColumnMenu = true;
        /**
         * If `enableGroupByFormat` set to true, then it groups the particular column by formatted values.
         * @default true
         */
        this.enableGroupByFormat = false;
        /**
         * If `allowEditing` set to false, then it disables editing of a particular column.
         * By default all columns are editable.
         * @default true
         */
        this.allowEditing = true;
        /**
         *  It is used to customize the default filter options for a specific columns.
         * * type -  Specifies the filter type as menu or checkbox.
         * * ui - to render custom component for specific column it has following functions.
         * * create – It is used for creating custom components.
         * * read -  It is used for read the value from the component.
         * * write - It is used to apply component model as dynamically.
         *
         *  ``` html
         * <div id="Grid"></div>
         * ```
         * ```typescript
         * let gridObj: Grid = new Grid({
         * dataSource: filterData,
         * allowFiltering: true,
         * filterSettings: { type: 'menu'},
         *  columns: [
         *      {
         *          field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'right', filter: {
         *              ui: {
         *                  create: (args: { target: Element, column: Object }) => {
         *                      let db: Object = new DataManager(data);
         *                      let flValInput: HTMLElement = createElement('input', { className: 'flm-input' });
         *                      args.target.appendChild(flValInput);
         *                      this.dropInstance = new DropDownList({
         *                          dataSource: new DataManager(data),
         *                          fields: { text: 'OrderID', value: 'OrderID' },
         *                          placeholder: 'Select a value',
         *                          popupHeight: '200px'
         *                      });
         *                      this.dropInstance.appendTo(flValInput);
         *                  },
         *                  write: (args: {
         *                      column: Object, target: Element, parent: any,
         *                      filteredValue: number | string
         *                  }) => {
         *                      this.dropInstance.value = args.filteredValue;
         *                  },
         *                  read: (args: { target: Element, column: any, operator: string, fltrObj: Filter }) => {
         *                      args.fltrObj.filterByColumn(args.column.field, args.operator, this.dropInstance.value);
         *
         *                  }
         *              }
         *          }
         *      },
         *      { field: 'CustomerID', headerText: 'Customer Name', width: 150 },
         *      { field: 'EmployeeID', headerText: 'Employee ID', width: 150 },
         *      {
         *          field: 'ShipCountry', headerText: 'Ship Country', filter: {
         *              type: 'checkbox'
         *          }, width: 150
         *      }
         *  ]
         * });
         * gridObj.appendTo('#Grid');
         * ```
         *
         *  @default null
         */
        this.filter = {};
        /**
         * If `showInColumnChooser` set to false, then hide the particular column in column chooser.
         *  By default all columns are displayed in column Chooser.
         * @default true
         */
        this.showInColumnChooser = true;
        merge(this, options);
        this.uid = getUid('grid-column');
        var valueFormatter = new ValueFormatter();
        if (options.format && (options.format.skeleton || options.format.format)) {
            this.setFormatter(valueFormatter.getFormatFunction(options.format));
            this.setParser(valueFormatter.getParserFunction(options.format));
        }
        if (!this.field) {
            this.allowFiltering = false;
            this.allowGrouping = false;
            this.allowSorting = false;
        }
        if (this.commands && !this.textAlign) {
            this.textAlign = 'right';
        }
        if (this.template || this.commandsTemplate) {
            this.templateFn = templateCompiler(this.template || this.commandsTemplate);
        }
        if (this.filter.itemTemplate) {
            this.fltrTemplateFn = templateCompiler(this.filter.itemTemplate);
        }
    }
    /** @hidden */
    Column.prototype.getFormatter = function () {
        return this.formatFn;
    };
    /** @hidden */
    Column.prototype.setFormatter = function (value) {
        this.formatFn = value;
    };
    /** @hidden */
    Column.prototype.getParser = function () {
        return this.parserFn;
    };
    /** @hidden */
    Column.prototype.setParser = function (value) {
        this.parserFn = value;
    };
    /** @hidden */
    Column.prototype.getColumnTemplate = function () {
        return this.templateFn;
    };
    /** @hidden */
    Column.prototype.getFilterItemTemplate = function () {
        return this.fltrTemplateFn;
    };
    /** @hidden */
    Column.prototype.getDomSetter = function () {
        return this.disableHtmlEncode ? 'textContent' : 'innerHTML';
    };
    return Column;
}());

//https://typescript.codeplex.com/discussions/401501
/**
 * Function to check whether target object implement specific interface
 * @param  {Object} target
 * @param  {string} checkFor
 * @returns no
 * @hidden
 */
function doesImplementInterface(target, checkFor) {
    /* tslint:disable:no-any */
    return target.prototype && checkFor in target.prototype;
}
/**
 * Function to get value from provided data
 * @param  {string} field
 * @param  {Object} data
 * @param  {IColumn} column
 * @hidden
 */
function valueAccessor(field, data, column) {
    field = isNullOrUndefined(field) ? '' : field;
    return getValue(field, data);
}
/**
 * The function used to update Dom using requestAnimationFrame.
 * @param  {Function} fn - Function that contains the actual action
 * @return {Promise<T>}
 * @hidden
 */
function getUpdateUsingRaf(updateFunction, callBack) {
    requestAnimationFrame(function () {
        try {
            callBack(null, updateFunction());
        }
        catch (e) {
            callBack(e);
        }
    });
}
/**
 * @hidden
 */
function iterateArrayOrObject(collection, predicate) {
    var result = [];
    for (var i = 0, len = collection.length; i < len; i++) {
        var pred = predicate(collection[i], i);
        if (!isNullOrUndefined(pred)) {
            result.push(pred);
        }
    }
    return result;
}
/** @hidden */
function templateCompiler(template) {
    if (template) {
        try {
            if (document.querySelectorAll(template).length) {
                return compile(document.querySelector(template).innerHTML.trim());
            }
        }
        catch (e) {
            return compile(template);
        }
    }
    return undefined;
}
/** @hidden */
function setStyleAndAttributes(node, customAttributes) {
    var copyAttr = {};
    var literals = ['style', 'class'];
    //Dont touch the original object - make a copy
    extend(copyAttr, customAttributes, {});
    if ('style' in copyAttr) {
        setStyleAttribute(node, copyAttr[literals[0]]);
        delete copyAttr[literals[0]];
    }
    if ('class' in copyAttr) {
        addClass([node], copyAttr[literals[1]]);
        delete copyAttr[literals[1]];
    }
    attributes(node, copyAttr);
}
/** @hidden */
function extend$1(copied, first, second, exclude) {
    var moved = extend(copied, first, second);
    Object.keys(moved).forEach(function (value, index) {
        if (exclude.indexOf(value) !== -1) {
            delete moved[value];
        }
    });
    return moved;
}
/** @hidden */
function prepareColumns(columns, autoWidth) {
    for (var c = 0, len = columns.length; c < len; c++) {
        var column = void 0;
        if (typeof columns[c] === 'string') {
            column = new Column({ field: columns[c] });
        }
        else if (!(columns[c] instanceof Column)) {
            if (!columns[c].columns) {
                column = new Column(columns[c]);
            }
            else {
                column = new Column(columns[c]);
                columns[c].columns = prepareColumns(columns[c].columns);
            }
        }
        else {
            column = columns[c];
        }
        column.headerText = isNullOrUndefined(column.headerText) ? column.field || '' : column.headerText;
        column.valueAccessor = column.valueAccessor || valueAccessor;
        column.width = autoWidth && isNullOrUndefined(column.width) ? 200 : column.width;
        if (isNullOrUndefined(column.visible)) {
            column.visible = true;
        }
        columns[c] = column;
    }
    return columns;
}
/** @hidden */
function setCssInGridPopUp(popUp, e, className) {
    var popUpSpan = popUp.querySelector('span');
    var position = popUp.parentElement.getBoundingClientRect();
    var targetPosition = e.target.getBoundingClientRect();
    var isBottomTail;
    popUpSpan.className = className;
    popUp.style.display = '';
    isBottomTail = (isNullOrUndefined(e.clientY) ? e.changedTouches[0].clientY :
        e.clientY) > popUp.offsetHeight + 10;
    popUp.style.top = targetPosition.top - position.top +
        (isBottomTail ? -(popUp.offsetHeight + 10) : popUp.offsetHeight + 10) + 'px'; //10px for tail element
    popUp.style.left = getPopupLeftPosition(popUp, e, targetPosition, position.left) + 'px';
    if (isBottomTail) {
        popUp.querySelector('.e-downtail').style.display = '';
        popUp.querySelector('.e-uptail').style.display = 'none';
    }
    else {
        popUp.querySelector('.e-downtail').style.display = 'none';
        popUp.querySelector('.e-uptail').style.display = '';
    }
}
/** @hidden */
function getPopupLeftPosition(popup, e, targetPosition, left) {
    var width = popup.offsetWidth / 2;
    var x = getPosition(e).x;
    if (x - targetPosition.left < width) {
        return targetPosition.left - left;
    }
    else if (targetPosition.right - x < width) {
        return targetPosition.right - left - width * 2;
    }
    else {
        return x - left - width;
    }
}
/** @hidden */
function getActualProperties(obj) {
    if (obj instanceof ChildProperty) {
        return getValue('properties', obj);
    }
    else {
        return obj;
    }
}
/** @hidden */
function parentsUntil(elem, selector, isID) {
    var parent = elem;
    while (parent) {
        if (isID ? parent.id === selector : parent.classList.contains(selector)) {
            break;
        }
        parent = parent.parentElement;
    }
    return parent;
}
/** @hidden */
function getElementIndex(element, elements) {
    var index = -1;
    for (var i = 0, len = elements.length; i < len; i++) {
        if (elements[i].isEqualNode(element)) {
            index = i;
            break;
        }
    }
    return index;
}
/** @hidden */
function inArray(value, collection) {
    for (var i = 0, len = collection.length; i < len; i++) {
        if (collection[i] === value) {
            return i;
        }
    }
    return -1;
}
/** @hidden */
function getActualPropFromColl(collection) {
    var coll = [];
    for (var i = 0, len = collection.length; i < len; i++) {
        if (collection[i].hasOwnProperty('properties')) {
            coll.push(collection[i].properties);
        }
        else {
            coll.push(collection[i]);
        }
    }
    return coll;
}
/** @hidden */
function removeElement(target, selector) {
    var elements = [].slice.call(target.querySelectorAll(selector));
    for (var i = 0; i < elements.length; i++) {
        remove(elements[i]);
    }
}
/** @hidden */
function getPosition(e) {
    var position = {};
    position.x = (isNullOrUndefined(e.clientX) ? e.changedTouches[0].clientX :
        e.clientX);
    position.y = (isNullOrUndefined(e.clientY) ? e.changedTouches[0].clientY :
        e.clientY);
    return position;
}
var uid = 0;
/** @hidden */
function getUid(prefix) {
    return prefix + uid++;
}
/** @hidden */
function appendChildren(elem, children) {
    for (var i = 0, len = children.length; i < len; i++) {
        if (len === children.length) {
            elem.appendChild(children[i]);
        }
        else {
            elem.appendChild(children[0]);
        }
    }
    return elem;
}
/** @hidden */
function parents(elem, selector, isID) {
    var parent = elem;
    var parents = [];
    while (parent) {
        if (isID ? parent.id === selector : parent.classList.contains(selector)) {
            parents.push(parent);
        }
        parent = parent.parentElement;
    }
    return parents;
}
/** @hidden */
function calculateAggregate(type, data, column, context) {
    if (type === 'custom') {
        return column.customAggregate ? column.customAggregate.call(context, data, column) : '';
    }
    return DataUtil.aggregates[type](data, column.field);
}
/** @hidden */
var scrollWidth = null;
/** @hidden */
function getScrollBarWidth() {
    if (scrollWidth !== null) {
        return scrollWidth;
    }
    var divNode = document.createElement('div');
    var value = 0;
    divNode.style.cssText = 'width:100px;height: 100px;overflow: scroll;position: absolute;top: -9999px;';
    document.body.appendChild(divNode);
    value = (divNode.offsetWidth - divNode.clientWidth) | 0;
    document.body.removeChild(divNode);
    return scrollWidth = value;
}
/** @hidden */
var rowHeight;
/** @hidden */
function getRowHeight(element) {
    if (rowHeight !== undefined) {
        return rowHeight;
    }
    var table = createElement('table', { className: 'e-table', styles: 'visibility: hidden' });
    table.innerHTML = '<tr><td class="e-rowcell">A<td></tr>';
    element.appendChild(table);
    var rect = table.querySelector('td').getBoundingClientRect();
    element.removeChild(table);
    rowHeight = Math.ceil(rect.height);
    return rowHeight;
}
/** @hidden */
function isEditable(col, type, elem) {
    var row = parentsUntil(elem, 'e-row');
    var isOldRow = !row ? true : row && !row.classList.contains('e-insertedrow');
    if (type === 'beginEdit' && isOldRow) {
        if (col.isIdentity || col.isPrimaryKey || !col.allowEditing) {
            return false;
        }
        return true;
    }
    else {
        if (isOldRow && !col.allowEditing && !col.isIdentity && !col.isPrimaryKey) {
            return false;
        }
        return true;
    }
}
/** @hidden */
function isActionPrevent(inst) {
    var dlg = inst.element.querySelector('#' + inst.element.id + 'EditConfirm');
    return inst.editSettings.mode === 'batch' &&
        (inst.element.querySelectorAll('.e-updatedtd').length) && inst.editSettings.showConfirmDialog &&
        (dlg ? dlg.classList.contains('e-popup-close') : true);
}
/** @hidden */
function wrap(elem, action) {
    var clName = 'e-wrap';
    elem = elem instanceof Array ? elem : [elem];
    for (var i = 0; i < elem.length; i++) {
        action ? elem[i].classList.add(clName) : elem[i].classList.remove(clName);
    }
}
function changeButtonType(target) {
    var elements = [].slice.call(target.querySelectorAll('button'));
    for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
        var button = elements_1[_i];
        attributes(button, { type: 'button' });
    }
}
/** @hidden */
function setFormatter(serviceLocator, column) {
    var fmtr = serviceLocator.getService('valueFormatter');
    switch (column.type) {
        case 'date':
            column.setFormatter(fmtr.getFormatFunction({ type: 'date', skeleton: column.format }));
            column.setParser(fmtr.getParserFunction({ type: 'date', skeleton: column.format }));
            break;
        case 'datetime':
            column.setFormatter(fmtr.getFormatFunction({ type: 'dateTime', skeleton: column.format }));
            column.setParser(fmtr.getParserFunction({ type: 'dateTime', skeleton: column.format }));
            break;
        case 'number':
            column.setFormatter(fmtr.getFormatFunction({ format: column.format }));
            column.setParser(fmtr.getParserFunction({ format: column.format }));
            break;
    }
}
/** @hidden */
function addRemoveActiveClasses(cells, add) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    for (var i = 0, len = cells.length; i < len; i++) {
        if (add) {
            classList(cells[i], args.slice(), []);
            cells[i].setAttribute('aria-selected', 'true');
        }
        else {
            classList(cells[i], [], args.slice());
            cells[i].removeAttribute('aria-selected');
        }
    }
}
/** @hidden */
function distinctStringValues(result) {
    var temp = {};
    var res = [];
    for (var i = 0; i < result.length; i++) {
        if (!(result[i] in temp)) {
            res.push(result[i].toString());
            temp[result[i]] = 1;
        }
    }
    return res;
}
/** @hidden */
function getFilterMenuPostion(target, dialogObj) {
    var elementVisible = dialogObj.element.style.display;
    dialogObj.element.style.display = 'block';
    var dlgWidth = dialogObj.width;
    var newpos = calculateRelativeBasedPosition(target, dialogObj.element);
    dialogObj.element.style.display = elementVisible;
    dialogObj.element.style.top = (newpos.top + target.getBoundingClientRect().height) - 5 + 'px';
    var leftPos = ((newpos.left - dlgWidth) + target.clientWidth);
    if (leftPos < 1) {
        dialogObj.element.style.left = (dlgWidth + leftPos) - 16 + 'px'; // right calculation
    }
    else {
        dialogObj.element.style.left = leftPos + -4 + 'px';
    }
}
/** @hidden */
function getZIndexCalcualtion(args, dialogObj) {
    args.popup.element.style.zIndex = (dialogObj.zIndex + 1).toString();
}
/** @hidden */
function toogleCheckbox(elem) {
    var span = elem.querySelector('.e-frame');
    span.classList.contains('e-check') ? classList(span, ['e-uncheck'], ['e-check']) :
        classList(span, ['e-check'], ['e-uncheck']);
}
/** @hidden */
function createCboxWithWrap(uid, elem, className) {
    var div = createElement('div', { className: className });
    div.appendChild(elem);
    div.setAttribute('uid', uid);
    return div;
}
/** @hidden */
function removeAddCboxClasses(elem, checked) {
    removeClass([elem], ['e-check', 'e-stop', 'e-uncheck']);
    if (checked) {
        elem.classList.add('e-check');
    }
    else {
        elem.classList.add('e-uncheck');
    }
}

/** @hidden */
var created = 'create';
/** @hidden */
var destroyed = 'destroy';
/** @hidden */
var load = 'load';
/** @hidden */
var rowDataBound = 'rowDataBound';
/** @hidden */
var queryCellInfo = 'queryCellInfo';
/** @hidden */
var actionBegin = 'actionBegin';
/** @hidden */
var actionComplete = 'actionComplete';
/** @hidden */
var actionFailure = 'actionFailure';
/** @hidden */
var dataBound = 'dataBound';
/** @hidden */
var rowSelecting = 'rowSelecting';
/** @hidden */
var rowSelected = 'rowSelected';
/** @hidden */
var rowDeselecting = 'rowDeselecting';
/** @hidden */
var rowDeselected = 'rowDeselected';
/** @hidden */
var cellSelecting = 'cellSelecting';
/** @hidden */
var cellSelected = 'cellSelected';
/** @hidden */
var cellDeselecting = 'cellDeselecting';
/** @hidden */
var cellDeselected = 'cellDeselected';
/** @hidden */
var columnDragStart = 'columnDragStart';
/** @hidden */
var columnDrag = 'columnDrag';
/** @hidden */
var columnDrop = 'columnDrop';
/** @hidden */
var rowDragStart = 'rowDragStart';
/** @hidden */
var rowDrag = 'rowDrag';
/** @hidden */
var rowDrop = 'rowDrop';
/** @hidden */
var beforePrint = 'beforePrint';
/** @hidden */
var printComplete = 'printComplete';
/** @hidden */
var detailDataBound = 'detailDataBound';
/** @hidden */
var toolbarClick = 'toolbarClick';
/** @hidden */
var batchAdd = 'batchAdd';
/** @hidden */
var batchDelete = 'batchDelete';
/** @hidden */
var beforeBatchAdd = 'beforeBatchAdd';
/** @hidden */
var beforeBatchDelete = 'beforeBatchDelete';
/** @hidden */
var beforeBatchSave = 'beforeBatchSave';
/** @hidden */
var beginEdit = 'beginEdit';
/** @hidden */
var cellEdit = 'cellEdit';
/** @hidden */
var cellSave = 'cellSave';
/** @hidden */
var endAdd = 'endAdd';
/** @hidden */
var endDelete = 'endDelete';
/** @hidden */
var endEdit = 'endEdit';
/** @hidden */
var recordDoubleClick = 'recordDoubleClick';
/** @hidden */
var recordClick = 'recordClick';
/** @hidden */
var beforeDataBound = 'beforeDataBound';
/** @hidden */
var beforeOpenColumnChooser = 'beforeOpenColumnChooser';
/** @hidden */
var resizeStart = 'resizeStart';
/** @hidden */
var onResize = 'onResize';
/** @hidden */
var resizeStop = 'resizeStop';
/** @hidden */
var checkBoxChange = 'checkBoxChange';
/** @hidden */
var beforeCopy = 'beforeCopy';
/** @hidden */
var filterChoiceRequest = 'filterchoicerequest';
/** @hidden */
var filterAfterOpen = 'filterafteropen';
/** @hidden */
var filterBeforeOpen = 'filterbeforeopen';
/**
 * Specifies grid internal events
 */
/** @hidden */
var initialLoad = 'initial-load';
/** @hidden */
var initialEnd = 'initial-end';
/** @hidden */
var dataReady = 'data-ready';
/** @hidden */
var contentReady = 'content-ready';
/** @hidden */
var uiUpdate = 'ui-update';
/** @hidden */
var onEmpty = 'on-empty';
/** @hidden */
var inBoundModelChanged = 'inbound-model-changed';
/** @hidden */
var modelChanged = 'model-changed';
/** @hidden */
var colGroupRefresh = 'colgroup-refresh';
/** @hidden */
var headerRefreshed = 'header-refreshed';
/** @hidden */
var pageBegin = 'paging-begin';
/** @hidden */
var pageComplete = 'paging-complete';
/** @hidden */
var sortBegin = 'sorting-begin';
/** @hidden */
var sortComplete = 'sorting-complete';
/** @hidden */
var filterBegin = 'filtering-begin';
/** @hidden */
var filterComplete = 'filtering-complete';
/** @hidden */
var searchBegin = 'searching-begin';
/** @hidden */
var searchComplete = 'searching-complete';
/** @hidden */
var reorderBegin = 'reorder-begin';
/** @hidden */
var reorderComplete = 'reorder-complete';
/** @hidden */
var rowDragAndDropBegin = 'rowdraganddrop-begin';
/** @hidden */
var rowDragAndDropComplete = 'rowdraganddrop-complete';
/** @hidden */
var groupBegin = 'grouping-begin';
/** @hidden */
var groupComplete = 'grouping-complete';
/** @hidden */
var ungroupBegin = 'ungrouping-begin';
/** @hidden */
var ungroupComplete = 'ungrouping-complete';
/** @hidden */
var rowSelectionBegin = 'rowselecting';
/** @hidden */
var rowSelectionComplete = 'rowselected';
/** @hidden */
var columnSelectionBegin = 'columnselecting';
/** @hidden */
var columnSelectionComplete = 'columnselected';
/** @hidden */
var cellSelectionBegin = 'cellselecting';
/** @hidden */
var cellSelectionComplete = 'cellselected';
/** @hidden */
var beforeCellFocused = 'beforecellfocused';
/** @hidden */
var cellFocused = 'cellfocused';
/** @hidden */
var keyPressed = 'key-pressed';
/** @hidden */
var click = 'click';
/** @hidden */
var destroy = 'destroy';
/** @hidden */
var columnVisibilityChanged = 'column-visible-changed';
/** @hidden */
var scroll = 'scroll';
/** @hidden */
var columnWidthChanged = 'column-width-changed';
/** @hidden */
var columnPositionChanged = 'column-position-changed';
/** @hidden */
var rowDragAndDrop = 'row-drag-and-drop';
/** @hidden */
var rowsAdded = 'rows-added';
/** @hidden */
var rowsRemoved = 'rows-removed';
/** @hidden */
var columnDragStop = 'column-drag-stop';
/** @hidden */
var headerDrop = 'header-drop';
/** @hidden */
var dataSourceModified = 'datasource-modified';
/** @hidden */
var refreshComplete = 'refresh-complete';
/** @hidden */
var refreshVirtualBlock = 'refresh-virtual-block';
/** @hidden */
var dblclick = 'dblclick';
/** @hidden */
var toolbarRefresh = 'toolbar-refresh';
/** @hidden */
var bulkSave = 'bulk-save';
/** @hidden */
var autoCol = 'auto-col';
/** @hidden */
var tooltipDestroy = 'tooltip-destroy';
/** @hidden */
var updateData = 'update-data';
/** @hidden */
var editBegin = 'edit-begin';
/** @hidden */
var editComplete = 'edit-complete';
/** @hidden */
var addBegin = 'add-begin';
/** @hidden */
var addComplete = 'add-complete';
/** @hidden */
var saveComplete = 'save-complete';
/** @hidden */
var deleteBegin = 'delete-begin';
/** @hidden */
var deleteComplete = 'delete-complete';
/** @hidden */
var preventBatch = 'prevent-batch';
/** @hidden */
var dialogDestroy = 'dialog-destroy';
/** @hidden */
var crudAction = 'crud-Action';
/** @hidden */
var addDeleteAction = 'add-delete-Action';
/** @hidden */
var destroyForm = 'destroy-form';
/** @hidden */
var doubleTap = 'double-tap';
/** @hidden */
var beforeExcelExport = 'beforeExcelExport';
/** @hidden */
var excelExportComplete = 'excelExportComplete';
/** @hidden */
var excelQueryCellInfo = 'excelQueryCellInfo';
/** @hidden */
var beforePdfExport = 'beforePdfExport';
/** @hidden */
var pdfExportComplete = 'pdfExportComplete';
/** @hidden */
var pdfQueryCellInfo = 'pdfQueryCellInfo';
/** @hidden */
var accessPredicate = 'access-predicate';
/** @hidden */
var contextMenuClick = 'contextMenuClick';
/** @hidden */
var freezeRefresh = 'freezerefresh';
/** @hidden */
var freezeRender = 'freezerender';
/** @hidden */
var contextMenuOpen = 'contextMenuOpen';
/** @hidden */
var columnMenuClick = 'contextMenuClick';
/** @hidden */
var columnMenuOpen = 'columnMenuOpen';
/** @hidden */
var filterOpen = 'filterOpen';
/** @hidden */
var filterDialogCreated = 'filterDialogCreated';
/** @hidden */
var filterMenuClose = 'filter-menu-close';

/**
 * Defines types of Cell
 * @hidden
 */
var CellType;
(function (CellType) {
    /**  Defines CellType as Data */
    CellType[CellType["Data"] = 0] = "Data";
    /**  Defines CellType as Header */
    CellType[CellType["Header"] = 1] = "Header";
    /**  Defines CellType as Summary */
    CellType[CellType["Summary"] = 2] = "Summary";
    /**  Defines CellType as GroupSummary */
    CellType[CellType["GroupSummary"] = 3] = "GroupSummary";
    /**  Defines CellType as CaptionSummary */
    CellType[CellType["CaptionSummary"] = 4] = "CaptionSummary";
    /**  Defines CellType as Filter */
    CellType[CellType["Filter"] = 5] = "Filter";
    /**  Defines CellType as Indent */
    CellType[CellType["Indent"] = 6] = "Indent";
    /**  Defines CellType as GroupCaption */
    CellType[CellType["GroupCaption"] = 7] = "GroupCaption";
    /**  Defines CellType as GroupCaptionEmpty */
    CellType[CellType["GroupCaptionEmpty"] = 8] = "GroupCaptionEmpty";
    /**  Defines CellType as Expand */
    CellType[CellType["Expand"] = 9] = "Expand";
    /**  Defines CellType as HeaderIndent */
    CellType[CellType["HeaderIndent"] = 10] = "HeaderIndent";
    /**  Defines CellType as StackedHeader */
    CellType[CellType["StackedHeader"] = 11] = "StackedHeader";
    /**  Defines CellType as DetailHeader */
    CellType[CellType["DetailHeader"] = 12] = "DetailHeader";
    /**  Defines CellType as DetailExpand */
    CellType[CellType["DetailExpand"] = 13] = "DetailExpand";
    /**  Defines CellType as CommandColumn */
    CellType[CellType["CommandColumn"] = 14] = "CommandColumn";
})(CellType || (CellType = {}));
/**
 * Defines types of Render
 * @hidden
 */
var RenderType;
(function (RenderType) {
    /**  Defines RenderType as Header */
    RenderType[RenderType["Header"] = 0] = "Header";
    /**  Defines RenderType as Content */
    RenderType[RenderType["Content"] = 1] = "Content";
    /**  Defines RenderType as Summary */
    RenderType[RenderType["Summary"] = 2] = "Summary";
})(RenderType || (RenderType = {}));
/**
 * Defines Predefined toolbar items.
 */
var ToolbarItem;
(function (ToolbarItem) {
    ToolbarItem[ToolbarItem["Add"] = 0] = "Add";
    ToolbarItem[ToolbarItem["Edit"] = 1] = "Edit";
    ToolbarItem[ToolbarItem["Update"] = 2] = "Update";
    ToolbarItem[ToolbarItem["Delete"] = 3] = "Delete";
    ToolbarItem[ToolbarItem["Cancel"] = 4] = "Cancel";
    ToolbarItem[ToolbarItem["Print"] = 5] = "Print";
    ToolbarItem[ToolbarItem["Search"] = 6] = "Search";
    ToolbarItem[ToolbarItem["ColumnChooser"] = 7] = "ColumnChooser";
    ToolbarItem[ToolbarItem["PdfExport"] = 8] = "PdfExport";
    ToolbarItem[ToolbarItem["ExcelExport"] = 9] = "ExcelExport";
    ToolbarItem[ToolbarItem["CsvExport"] = 10] = "CsvExport";
    ToolbarItem[ToolbarItem["WordExport"] = 11] = "WordExport";
})(ToolbarItem || (ToolbarItem = {}));

/* tslint:disable-next-line:max-line-length */
/**
 * @hidden
 * `CheckBoxFilter` module is used to handle filtering action.
 */
var CheckBoxFilter = /** @class */ (function () {
    /**
     * Constructor for checkbox filtering module
     * @hidden
     */
    function CheckBoxFilter(parent, filterSettings, serviceLocator) {
        this.defaultConstants = {
            Search: 'Search',
            OK: 'OK',
            Cancel: 'Cancel',
            Filter: 'Filter',
            Clear: 'Clear',
            SelectAll: 'Select All',
            Blanks: 'Blanks',
            True: 'True',
            False: 'False',
            NoResult: 'No Matches Found'
        };
        this.values = {};
        this.cBoxTrue = createCheckBox(false, { checked: true, label: ' ' });
        this.cBoxFalse = createCheckBox(false, { checked: false, label: ' ' });
        this.parent = parent;
        this.id = this.parent.element.id;
        this.serviceLocator = serviceLocator;
        this.filterSettings = filterSettings;
        this.valueFormatter = new ValueFormatter(this.parent.locale);
        this.initLocale(this.defaultConstants);
        this.cBoxTrue.insertBefore(createElement('input', {
            className: 'e-chk-hidden', attrs: { type: 'checkbox' }
        }), this.cBoxTrue.firstChild);
        this.cBoxFalse.insertBefore(createElement('input', {
            className: 'e-chk-hidden', attrs: { 'type': 'checkbox' }
        }), this.cBoxFalse.firstChild);
        this.cBoxFalse.querySelector('.e-frame').classList.add('e-uncheck');
        if (this.parent.enableRtl) {
            addClass([this.cBoxTrue, this.cBoxFalse], ['e-rtl']);
        }
    }
    CheckBoxFilter.prototype.initLocale = function (constants) {
        this.localeObj = new L10n(this.getModuleName(), this.defaultConstants, this.parent.locale || 'en-US');
    };
    /**
     * To destroy the filter bar.
     * @return {void}
     * @hidden
     */
    CheckBoxFilter.prototype.destroy = function () {
        this.closeDialog();
    };
    CheckBoxFilter.prototype.wireEvents = function () {
        EventHandler.add(this.dlg, 'click', this.clickHandler, this);
        EventHandler.add(this.dlg.querySelector('.e-searchinput'), 'keyup', this.searchBoxKeyUp, this);
    };
    CheckBoxFilter.prototype.unWireEvents = function () {
        EventHandler.remove(this.dlg, 'click', this.clickHandler);
        var elem = this.dlg.querySelector('.e-searchinput');
        if (elem) {
            EventHandler.remove(elem, 'keyup', this.searchBoxKeyUp);
        }
    };
    CheckBoxFilter.prototype.searchBoxClick = function (e) {
        var target = e.target;
        if (target.classList.contains('e-searchclear')) {
            this.sInput.value = '';
            this.refreshCheckboxes();
            this.updateSearchIcon();
            this.sInput.focus();
        }
    };
    CheckBoxFilter.prototype.searchBoxKeyUp = function (e) {
        this.refreshCheckboxes();
        this.updateSearchIcon();
    };
    CheckBoxFilter.prototype.updateSearchIcon = function () {
        if (this.sInput.value.length) {
            classList(this.sIcon, ['e-chkcancel-icon'], ['e-search-icon']);
        }
        else {
            classList(this.sIcon, ['e-search-icon'], ['e-chkcancel-icon']);
        }
    };
    /**
     * Gets the localized label by locale keyword.
     * @param  {string} key
     * @return {string}
     */
    CheckBoxFilter.prototype.getLocalizedLabel = function (key) {
        return this.localeObj.getConstant(key);
    };
    CheckBoxFilter.prototype.updateDataSource = function () {
        var dataSource = this.options.dataSource;
        if (!(dataSource instanceof DataManager)) {
            for (var i = 0; i < dataSource.length; i++) {
                if (typeof dataSource !== 'object') {
                    var obj = {};
                    obj[this.options.field] = dataSource[i];
                    dataSource[i] = obj;
                }
            }
        }
    };
    CheckBoxFilter.prototype.updateModel = function (options) {
        this.options = options;
        this.options.dataSource = options.dataSource;
        this.updateDataSource();
        this.options.type = options.type || 'string';
        this.options.format = options.format || '';
        this.options.filteredColumns = options.filteredColumns || this.parent.filterSettings.columns;
        this.options.sortedColumns = options.sortedColumns || this.parent.sortSettings.columns;
        this.options.query = options.query || new Query();
        this.options.allowCaseSensitive = options.allowCaseSensitive || false;
        this.values = {};
        this.isFiltered = options.filteredColumns.length;
        extend(this.defaultConstants, options.localizedStrings);
    };
    CheckBoxFilter.prototype.getAndSetChkElem = function (options) {
        this.dlg = createElement('div', {
            id: this.id + this.options.type + '_excelDlg',
            className: 'e-checkboxfilter e-filter-popup'
        });
        this.sBox = createElement('div', { className: 'e-searchcontainer' });
        if (!options.hideSearchbox) {
            this.sInput = createElement('input', {
                id: this.id + '_SearchBox',
                className: 'e-searchinput'
            });
            this.sIcon = createElement('span', {
                className: 'e-searchclear e-search-icon e-icons', attrs: {
                    type: 'text', placeholder: this.getLocalizedLabel('Search')
                }
            });
            this.searchBox = createElement('span', { className: 'e-searchbox e-fields' });
            this.searchBox.appendChild(this.sInput);
            this.sBox.appendChild(this.searchBox);
            Input.createInput({
                element: this.sInput, floatLabelType: 'Never', properties: {
                    placeholder: this.getLocalizedLabel('Search')
                }
            });
            this.searchBox.querySelector('.e-input-group').appendChild(this.sIcon);
        }
        this.spinner = createElement('div', { className: 'e-spinner' }); //for spinner
        this.cBox = createElement('div', {
            id: this.id + this.options.type + '_CheckBoxList',
            className: 'e-checkboxlist e-fields'
        });
        this.spinner.appendChild(this.cBox);
        this.sBox.appendChild(this.spinner);
        return this.sBox;
    };
    CheckBoxFilter.prototype.showDialog = function (options) {
        var args = {
            requestType: filterBeforeOpen, filterModel: this,
            columnName: this.options.field, columnType: this.options.type
        };
        this.parent.trigger(actionBegin, args);
        this.dialogObj = new Dialog({
            visible: false, content: this.sBox,
            close: this.closeDialog.bind(this),
            width: (!isNullOrUndefined(parentsUntil(options.target, 'e-bigger')))
                || this.parent.element.classList.contains('e-device') ? 260 : 250,
            target: this.parent.element, animationSettings: { effect: 'None' },
            buttons: [{
                    click: this.btnClick.bind(this),
                    buttonModel: { content: this.getLocalizedLabel(this.isExcel ? 'OK' : 'Filter'), cssClass: 'e-primary', isPrimary: true }
                },
                {
                    click: this.btnClick.bind(this),
                    buttonModel: { cssClass: 'e-flat', content: this.getLocalizedLabel(this.isExcel ? 'Cancel' : 'Clear') }
                }],
            created: this.dialogCreated.bind(this),
            open: this.dialogOpen.bind(this)
        });
        this.dialogObj.appendTo(this.dlg);
        this.dialogObj.element.style.maxHeight = '800px';
        this.dialogObj.show();
        this.wireEvents();
        createSpinner({ target: this.spinner });
        showSpinner(this.spinner);
        this.getAllData();
    };
    CheckBoxFilter.prototype.dialogCreated = function (e) {
        if (!Browser.isDevice) {
            getFilterMenuPostion(this.options.target, this.dialogObj);
        }
        else {
            this.dialogObj.position = { X: 'center', Y: 'center' };
        }
        this.parent.notify(filterDialogCreated, e);
    };
    CheckBoxFilter.prototype.openDialog = function (options) {
        this.updateModel(options);
        this.getAndSetChkElem(options);
        this.showDialog(options);
    };
    CheckBoxFilter.prototype.closeDialog = function () {
        if (this.dialogObj && !this.dialogObj.isDestroyed) {
            this.parent.notify(filterMenuClose, { field: this.options.field });
            this.dialogObj.destroy();
            this.unWireEvents();
            remove(this.dlg);
            this.dlg = null;
        }
    };
    CheckBoxFilter.prototype.clearFilter = function () {
        this.options.handler({ action: 'clear-filter', field: this.options.field });
    };
    CheckBoxFilter.prototype.btnClick = function (e) {
        var text = e.target.firstChild.textContent.toLowerCase();
        if (this.getLocalizedLabel(this.isExcel ? 'OK' : 'Filter').toLowerCase() === text) {
            this.fltrBtnHandler();
        }
        else if (this.getLocalizedLabel('Clear').toLowerCase() === text) {
            this.clearFilter();
        }
        this.closeDialog();
    };
    CheckBoxFilter.prototype.fltrBtnHandler = function () {
        var checked = [].slice.call(this.cBox.querySelectorAll('.e-check:not(.e-selectall)'));
        var optr = 'equal';
        var caseSen = this.options.type === 'string' ?
            this.options.allowCaseSensitive : true;
        var defaults = {
            field: this.options.field, predicate: 'or',
            operator: optr, matchcase: caseSen
        };
        var isNotEqual = this.itemsCnt !== checked.length && this.itemsCnt - checked.length < checked.length;
        if (isNotEqual) {
            optr = 'notequal';
            checked = [].slice.call(this.cBox.querySelectorAll('.e-uncheck:not(.e-selectall)'));
            defaults.predicate = 'and';
            defaults.operator = 'notequal';
        }
        var value;
        var fObj;
        var coll = [];
        for (var i = 0; i < checked.length; i++) {
            value = this.values[parentsUntil(checked[i], 'e-ftrchk').getAttribute('uid')];
            fObj = extend({}, { value: value }, defaults);
            if (value && !value.toString().length) {
                fObj.operator = isNotEqual ? 'notequal' : 'equal';
            }
            coll.push(this.options.type === 'date' ? CheckBoxFilter.setDateObject(fObj) : fObj);
        }
        this.initiateFilter(coll);
    };
    CheckBoxFilter.prototype.initiateFilter = function (fColl) {
        var firstVal = fColl[0];
        var predicate;
        if (!isNullOrUndefined(firstVal)) {
            predicate = firstVal.ejpredicate ? firstVal.ejpredicate :
                new Predicate(firstVal.field, firstVal.operator, firstVal.value, !firstVal.matchCase);
            for (var j = 1; j < fColl.length; j++) {
                predicate = fColl[j].ejpredicate !== undefined ?
                    predicate[fColl[j].predicate](fColl[j].ejpredicate) :
                    predicate[fColl[j].predicate](fColl[j].field, fColl[j].operator, fColl[j].value, !fColl[j].matchCase);
            }
            var args = {
                action: 'filtering', filterCollection: fColl, field: this.options.field,
                ejpredicate: Predicate.or(predicate)
            };
            this.options.handler(args);
        }
    };
    CheckBoxFilter.prototype.refreshCheckboxes = function () {
        var val = this.sInput.value;
        var query = this.options.query.clone();
        var parsed = (this.options.type !== 'string' && parseFloat(val)) ? parseFloat(val) : val;
        var operator = 'contains';
        var matchcase = true;
        parsed = (parsed === '' || parsed === undefined) ? undefined : parsed;
        if (this.options.type === 'boolean') {
            if (parsed !== undefined &&
                this.getLocalizedLabel('True').toLowerCase().indexOf(parsed.toLowerCase()) !== -1) {
                parsed = 'true';
            }
            else if (parsed !== undefined &&
                this.getLocalizedLabel('False').toLowerCase().indexOf(parsed.toLowerCase()) !== -1) {
                parsed = 'false';
            }
        }
        if (this.options.type === 'date' || this.options.type === 'datetime') {
            parsed = this.valueFormatter.fromView(val, this.options.parserFn, this.options.type);
            operator = 'equal';
            if (isNullOrUndefined(parsed) && val.length) {
                return;
            }
        }
        if (val.length) {
            query.where(this.options.field, operator, parsed, matchcase);
        }
        this.processDataSource(query);
    };
    CheckBoxFilter.prototype.getPredicateFromCols = function (columns) {
        var predicate;
        var predicates = CheckBoxFilter.getPredicate(columns);
        for (var _i = 0, _a = Object.keys(predicates); _i < _a.length; _i++) {
            var prop = _a[_i];
            var and = 'and';
            var obj = predicates[prop];
            predicate = !isNullOrUndefined(predicate) ?
                predicate[and](obj) :
                obj;
        }
        return predicate;
    };
    CheckBoxFilter.prototype.getAllData = function () {
        var _this = this;
        var query = new Query();
        query.requiresCount(); //consider take query
        this.options.dataSource = this.options.dataSource instanceof DataManager ?
            this.options.dataSource : new DataManager(this.options.dataSource);
        var promise = this.options.dataSource.executeQuery(query);
        promise.then(function (e) { return _this.dataSuccess(e); });
    };
    CheckBoxFilter.prototype.dataSuccess = function (e) {
        this.fullData = e.result;
        var query = new Query();
        if ((this.options.filteredColumns.length)) {
            var cols = [];
            for (var i = 0; i < this.options.filteredColumns.length; i++) {
                if (this.options.filteredColumns[i].field !== this.options.field) {
                    cols.push(this.options.filteredColumns[i]);
                }
            }
            var predicate = this.getPredicateFromCols(cols);
            if (predicate) {
                query.where(predicate);
            }
        }
        // query.select(this.options.field);
        var result = new DataManager(this.fullData).executeLocal(query);
        var res = CheckBoxFilter.getDistinct(result, this.options.field);
        this.filteredData = res.records;
        this.processDataSource(null, true);
        var args = {
            requestType: filterAfterOpen,
            filterModel: this, columnName: this.options.field, columnType: this.options.type
        };
        this.parent.trigger(actionComplete, args);
    };
    CheckBoxFilter.prototype.processDataSource = function (query, isInitial) {
        showSpinner(this.spinner);
        query = query ? query : this.options.query.clone();
        query.requiresCount();
        var args = {
            requestType: filterChoiceRequest, filterModel: this, query: query,
            dataSource: this.filteredData
        };
        this.parent.trigger(actionBegin, args);
        var result = new DataManager(args.dataSource).executeLocal(args.query);
        var res = result;
        this.updateResult();
        this.createFilterItems(res.result, isInitial);
    };
    CheckBoxFilter.prototype.updateResult = function () {
        this.result = {};
        var predicate = this.getPredicateFromCols(this.options.filteredColumns);
        var query = new Query();
        if (predicate) {
            query.where(predicate);
        }
        var result = new DataManager(this.fullData).executeLocal(query);
        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
            var res = result_1[_i];
            this.result[getValue(this.options.field, res)] = true;
        }
    };
    CheckBoxFilter.prototype.clickHandler = function (e) {
        var target = e.target;
        var elem = parentsUntil(target, 'e-checkbox-wrapper');
        if (parentsUntil(target, 'e-searchbox')) {
            this.searchBoxClick(e);
        }
        if (elem) {
            var selectAll = elem.querySelector('.e-selectall');
            if (selectAll) {
                this.updateAllCBoxes(!selectAll.classList.contains('e-check'));
            }
            else {
                toogleCheckbox(elem.parentElement);
            }
            this.updateIndeterminatenBtn();
            elem.querySelector('.e-chk-hidden').focus();
        }
    };
    CheckBoxFilter.prototype.updateAllCBoxes = function (checked) {
        var cBoxes = [].slice.call(this.cBox.querySelectorAll('.e-frame'));
        for (var _i = 0, cBoxes_1 = cBoxes; _i < cBoxes_1.length; _i++) {
            var cBox = cBoxes_1[_i];
            removeAddCboxClasses(cBox, checked);
        }
    };
    CheckBoxFilter.prototype.dialogOpen = function () {
        if (this.parent.element.classList.contains('e-device')) {
            this.dialogObj.element.querySelector('.e-input-group').classList.remove('e-input-focus');
            this.dialogObj.element.querySelector('.e-btn').focus();
        }
    };
    CheckBoxFilter.prototype.createCheckbox = function (value, checked) {
        var elem = checked ? this.cBoxTrue.cloneNode(true) :
            this.cBoxFalse.cloneNode(true);
        var label = elem.querySelector('.e-label');
        label.innerHTML = !isNullOrUndefined(value) && value.toString().length ? value :
            this.getLocalizedLabel('Blanks');
        if (this.options.template) {
            label.innerHTML = '';
            var args = {};
            args[this.options.field] = value;
            appendChildren(label, this.options.template(args));
        }
        return elem;
    };
    CheckBoxFilter.prototype.updateIndeterminatenBtn = function () {
        var cnt = this.cBox.children.length - 1;
        var className = [];
        var elem = this.cBox.querySelector('.e-selectall');
        var selected = this.cBox.querySelectorAll('.e-check:not(.e-selectall)').length;
        var btn = this.dlg.querySelector('.e-footer-content').querySelector('.e-btn').ej2_instances[0];
        btn.disabled = false;
        if (cnt === selected) {
            className = ['e-check'];
        }
        else if (selected) {
            className = ['e-stop'];
        }
        else {
            className = ['e-uncheck'];
            btn.disabled = true;
        }
        removeClass([elem], ['e-check', 'e-stop', 'e-uncheck']);
        addClass([elem], className);
    };
    CheckBoxFilter.prototype.createFilterItems = function (data, isInitial) {
        var cBoxes = createElement('div');
        this.itemsCnt = data.length;
        if (data.length) {
            var selectAll = createCboxWithWrap(getUid('cbox'), this.createCheckbox(this.getLocalizedLabel('SelectAll'), false), 'e-ftrchk');
            selectAll.querySelector('.e-frame').classList.add('e-selectall');
            cBoxes.appendChild(selectAll);
            var isColFiltered = new DataManager(this.options.filteredColumns).executeLocal(new Query().where('field', 'equal', this.options.field)).length;
            for (var i = 0; i < data.length; i++) {
                var uid = getUid('cbox');
                this.values[uid] = getValue(this.options.field, data[i]);
                var value = this.valueFormatter.toView(getValue(this.options.field, data[i]), this.options.formatFn);
                cBoxes.appendChild(createCboxWithWrap(uid, this.createCheckbox(value, this.getCheckedState(isColFiltered, this.values[uid])), 'e-ftrchk'));
            }
            this.cBox.innerHTML = cBoxes.innerHTML;
            this.updateIndeterminatenBtn();
        }
        else {
            cBoxes.appendChild(createElement('span', { innerHTML: this.getLocalizedLabel('NoResult') }));
            this.cBox.innerHTML = cBoxes.innerHTML;
        }
        var args = { requestType: filterChoiceRequest, filterModel: this, dataSource: data };
        this.parent.trigger(actionComplete, args);
        hideSpinner(this.spinner);
    };
    CheckBoxFilter.prototype.getCheckedState = function (isColFiltered, value) {
        if (!this.isFiltered || !isColFiltered) {
            return true;
        }
        else {
            return this.result[value];
        }
    };
    CheckBoxFilter.getDistinct = function (json, field) {
        var len = json.length;
        var result = [];
        var value;
        var ejValue = 'ejValue';
        var lookup = {};
        while (len--) {
            value = json[len];
            value = getValue(field, value); //local remote diff, check with mdu           
            if (!isNullOrUndefined(value)) {
                if (!(value in lookup)) {
                    var obj = {};
                    obj[ejValue] = value;
                    setValue(field, value, obj);
                    result.push(obj);
                }
                lookup[value] = true;
            }
        }
        return DataUtil.group(DataUtil.sort(result, field, DataUtil.fnAscending), 'ejValue');
    };
    CheckBoxFilter.setDateObject = function (filterObject) {
        var prevObj = extend({}, getActualProperties(filterObject));
        var nextObj = extend({}, getActualProperties(filterObject));
        var value = new Date(filterObject.value);
        var prevDate = new Date(value.setDate(value.getDate() - 1));
        var nextDate = new Date(value.setDate(value.getDate() + 2));
        prevObj.value = prevDate;
        nextObj.value = nextDate;
        if (filterObject.operator === 'equal') {
            nextObj.operator = 'lessthan';
            nextObj.predicate = 'and';
            prevObj.operator = 'greaterthan';
            prevObj.predicate = 'and';
        }
        else if (filterObject.operator === 'notequal') {
            nextObj.operator = 'greaterthanorequal';
            nextObj.predicate = 'or';
            prevObj.operator = 'lessthanorequal';
            prevObj.predicate = 'or';
        }
        var predicateSt = new Predicate(prevObj.field, prevObj.operator, prevObj.value, false);
        var predicateEnd = new Predicate(nextObj.field, nextObj.operator, nextObj.value, false);
        filterObject.ejpredicate = filterObject.operator === 'equal' ? predicateSt.and(predicateEnd) :
            predicateSt.or(predicateEnd);
        filterObject.type = 'date';
        return filterObject;
    };
    CheckBoxFilter.getPredicate = function (columns) {
        var cols = CheckBoxFilter.getDistinct(columns, 'field').records;
        var collection = [];
        var pred = {};
        for (var i = 0; i < cols.length; i++) {
            collection = new DataManager(columns).executeLocal(new Query().where('field', 'equal', cols[i].field));
            if (collection.length !== 0) {
                pred[cols[i].field] = CheckBoxFilter.generatePredicate(collection);
            }
        }
        return pred;
    };
    CheckBoxFilter.generatePredicate = function (cols) {
        var len = cols ? cols.length : 0;
        var predicate;
        var first;
        first = CheckBoxFilter.updateDateFilter(cols[0]);
        if (first.type === 'date' || first.type === 'datetime') {
            predicate = CheckBoxFilter.getDatePredicate(first);
        }
        else {
            predicate = first.ejpredicate ? first.ejpredicate :
                new Predicate(first.field, first.operator, first.value, CheckBoxFilter.getCaseValue(first));
        }
        for (var p = 1; p < len; p++) {
            cols[p] = CheckBoxFilter.updateDateFilter(cols[p]);
            if (len > 2 && p > 1 && cols[p].predicate === 'or') {
                if (cols[p].type === 'date' || cols[p].type === 'datetime') {
                    predicate.predicates.push(CheckBoxFilter.getDatePredicate(cols[p]));
                }
                else {
                    predicate.predicates.push(new Predicate(cols[p].field, cols[p].operator, cols[p].value, CheckBoxFilter.getCaseValue(cols[p])));
                }
            }
            else {
                if (cols[p].type === 'date' || cols[p].type === 'datetime') {
                    predicate = predicate[(cols[p].predicate)](CheckBoxFilter.getDatePredicate(cols[p]));
                }
                else {
                    predicate = cols[p].ejpredicate ?
                        predicate[cols[p].predicate](cols[p].ejpredicate) :
                        predicate[(cols[p].predicate)](cols[p].field, cols[p].operator, cols[p].value, CheckBoxFilter.getCaseValue(cols[p]));
                }
            }
        }
        return predicate || null;
    };
    CheckBoxFilter.getCaseValue = function (filter) {
        if (isNullOrUndefined(filter.ignoreCase) && isNullOrUndefined(filter.matchCase)) {
            return false;
        }
        else if (isNullOrUndefined(filter.ignoreCase)) {
            return !filter.matchCase;
        }
        else {
            return filter.ignoreCase;
        }
    };
    CheckBoxFilter.getDatePredicate = function (predicate) {
        if (predicate.value instanceof Date) {
            predicate.ignoreCase = (['equal', 'notequal'].indexOf(predicate.operator) === -1) ? false : true;
        }
        return new Predicate(predicate.field, predicate.operator, predicate.value, predicate.ignoreCase);
    };
    CheckBoxFilter.updateDateFilter = function (filter) {
        if (filter.type !== 'date' && !(filter.value instanceof Date)) {
            return filter;
        }
        return ['equal', 'notequal'].indexOf(filter.operator) === -1 ? filter :
            CheckBoxFilter.setDateObject(filter);
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    CheckBoxFilter.prototype.getModuleName = function () {
        return 'checkboxFilter';
    };
    return CheckBoxFilter;
}());

/**
 * Grid data module is used to generate query and data source.
 * @hidden
 */
var Data = /** @class */ (function () {
    /**
     * Constructor for data module.
     * @hidden
     */
    function Data(parent, serviceLocator) {
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.initDataManager();
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(rowsAdded, this.addRows, this);
        this.parent.on(rowsRemoved, this.removeRows, this);
        this.parent.on(dataSourceModified, this.initDataManager, this);
        this.parent.on(destroy, this.destroy, this);
        this.parent.on(updateData, this.crudActions, this);
        this.parent.on(addDeleteAction, this.getData, this);
    }
    /**
     * The function used to initialize dataManager and external query
     * @return {void}
     */
    Data.prototype.initDataManager = function () {
        var gObj = this.parent;
        this.dataManager = gObj.dataSource instanceof DataManager ? gObj.dataSource :
            (isNullOrUndefined(gObj.dataSource) ? new DataManager() : new DataManager(gObj.dataSource));
        gObj.query = gObj.query instanceof Query ? gObj.query : new Query();
    };
    /**
     * The function is used to generate updated Query from Grid model.
     * @return {Query}
     * @hidden
     */
    Data.prototype.generateQuery = function (skipPage) {
        var gObj = this.parent;
        var query = gObj.query.clone();
        if (gObj.allowFiltering && gObj.filterSettings.columns.length) {
            var columns = gObj.filterSettings.columns;
            var predicate = void 0;
            if (gObj.filterSettings.type === 'checkbox' || gObj.filterSettings.type === 'excel') {
                var excelPredicate = CheckBoxFilter.getPredicate(gObj.filterSettings.columns);
                for (var _i = 0, _a = Object.keys(excelPredicate); _i < _a.length; _i++) {
                    var prop = _a[_i];
                    var and = 'and';
                    var obj = excelPredicate[prop];
                    predicate = !isNullOrUndefined(predicate) ?
                        predicate[and](obj) :
                        obj;
                }
                if (predicate !== undefined) {
                    query.where(predicate);
                }
            }
            else {
                for (var _b = 0, columns_1 = columns; _b < columns_1.length; _b++) {
                    var col = columns_1[_b];
                    var sType = gObj.getColumnByField(col.field).type;
                    if (sType !== 'date' && sType !== 'datetime') {
                        query.where(col.field, col.operator, col.value, !col.matchCase);
                    }
                    else {
                        query.where(this.getDatePredicate(col));
                    }
                }
            }
        }
        if (gObj.searchSettings.key.length) {
            var sSettings = gObj.searchSettings;
            sSettings.fields = sSettings.fields.length ? sSettings.fields : gObj.getColumnFieldNames();
            query.search(sSettings.key, sSettings.fields, sSettings.operator, sSettings.ignoreCase);
        }
        gObj.aggregates.forEach(function (row) {
            row.columns.forEach(function (column) {
                var types = column.type instanceof Array ? column.type : [column.type];
                types.forEach(function (type) { return query.aggregate(type, column.field); });
            });
        });
        if ((gObj.allowSorting || gObj.allowGrouping) && gObj.sortSettings.columns.length) {
            var columns = gObj.sortSettings.columns;
            var sortGrp = [];
            for (var i = columns.length - 1; i > -1; i--) {
                if (gObj.groupSettings.columns.indexOf(columns[i].field) === -1) {
                    query.sortBy(columns[i].field, columns[i].direction);
                }
                else {
                    sortGrp.push(columns[i]);
                }
            }
            for (var i = 0, len = sortGrp.length; i < len; i++) {
                query.sortBy(sortGrp[i].field, sortGrp[i].direction);
            }
        }
        if ((gObj.allowPaging || gObj.enableVirtualization) && skipPage !== true) {
            gObj.pageSettings.currentPage = Math.max(1, gObj.pageSettings.currentPage);
            if (gObj.pageSettings.pageCount <= 0) {
                gObj.pageSettings.pageCount = 8;
            }
            if (gObj.pageSettings.pageSize <= 0) {
                gObj.pageSettings.pageSize = 12;
            }
            query.page(gObj.pageSettings.currentPage, gObj.pageSettings.pageSize);
        }
        if (gObj.allowGrouping && gObj.groupSettings.columns.length) {
            var columns = gObj.groupSettings.columns;
            for (var i = 0, len = columns.length; i < len; i++) {
                var isGrpFmt = gObj.getColumnByField(columns[i]).enableGroupByFormat;
                var format = gObj.getColumnByField(columns[i]).format;
                if (isGrpFmt) {
                    query.group(columns[i], this.formatGroupColumn.bind(this), format);
                }
                else {
                    query.group(columns[i], null);
                }
            }
        }
        return query;
    };
    /**
     * The function is used to get dataManager promise by executing given Query.
     * @param  {Query} query - Defines the query which will execute along with data processing.
     * @return {Promise<Object>}
     * @hidden
     */
    Data.prototype.getData = function (args, query) {
        var _this = this;
        if (args === void 0) { args = { requestType: '' }; }
        var key = this.getKey(args.foreignKeyData &&
            Object.keys(args.foreignKeyData).length ?
            args.foreignKeyData : this.parent.getPrimaryKeyFieldNames());
        switch (args.requestType) {
            case 'delete':
                query = query ? query : this.generateQuery();
                this.dataManager.remove(key, args.data[0], null, query);
                break;
            case 'save':
                query = query ? query : this.generateQuery();
                this.dataManager.insert(args.data, null, query, 0);
                break;
        }
        if (this.dataManager.ready) {
            var deferred_1 = new Deferred();
            var ready = this.dataManager.ready;
            ready.then(function (e) {
                _this.dataManager.executeQuery(query).then(function (result) {
                    deferred_1.resolve(result);
                });
            }).catch(function (e) {
                deferred_1.reject(e);
            });
            return deferred_1.promise;
        }
        else {
            return this.dataManager.executeQuery(query);
        }
    };
    Data.prototype.formatGroupColumn = function (value, field) {
        var gObj = this.parent;
        var serviceLocator = this.serviceLocator;
        var column = gObj.getColumnByField(field);
        var date = value;
        if (!column.type) {
            column.type = date.getDay ? (date.getHours() > 0 || date.getMinutes() > 0 ||
                date.getSeconds() > 0 || date.getMilliseconds() > 0 ? 'datetime' : 'date') : typeof (value);
        }
        if (isNullOrUndefined(column.getFormatter())) {
            setFormatter(serviceLocator, column);
        }
        var formatVal = ValueFormatter.prototype.toView(value, column.getFormatter());
        return formatVal;
    };
    Data.prototype.crudActions = function (args) {
        this.generateQuery();
        var promise = null;
        var pr = 'promise';
        var key = this.getKey(args.foreignKeyData &&
            Object.keys(args.foreignKeyData).length ? args.foreignKeyData :
            this.parent.getPrimaryKeyFieldNames());
        switch (args.requestType) {
            case 'save':
                promise = this.dataManager.update(key, args.data, null, this.generateQuery());
                break;
        }
        args[pr] = promise;
        this.parent.notify(crudAction, args);
    };
    /** @hidden */
    Data.prototype.saveChanges = function (changes, key) {
        var promise = this.dataManager.saveChanges(changes, key, null, this.generateQuery().requiresCount());
        return promise;
    };
    Data.prototype.getKey = function (keys) {
        if (keys && keys.length) {
            return keys[0];
        }
        return undefined;
    };
    /** @hidden */
    Data.prototype.isRemote = function () {
        return this.dataManager.dataSource.offline !== true && this.dataManager.dataSource.url !== undefined;
    };
    /** @hidden */
    Data.prototype.getDatePredicate = function (filterObject) {
        var datePredicate;
        var prevDate;
        var nextDate;
        var prevObj = extend({}, getActualProperties(filterObject));
        var nextObj = extend({}, getActualProperties(filterObject));
        var value = new Date(filterObject.value);
        if (filterObject.operator === 'equal' || filterObject.operator === 'notEqual') {
            prevDate = new Date(value.setDate(value.getDate() - 1));
            nextDate = new Date(value.setDate(value.getDate() + 2));
            prevObj.value = prevDate;
            nextObj.value = nextDate;
            if (filterObject.operator === 'equal') {
                prevObj.operator = 'greaterthan';
                nextObj.operator = 'lessthan';
            }
            else if (filterObject.operator === 'notEqual') {
                prevObj.operator = 'lessthanorequal';
                nextObj.operator = 'greaterthanorequal';
            }
            var predicateSt = new Predicate(prevObj.field, prevObj.operator, prevObj.value, false);
            var predicateEnd = new Predicate(nextObj.field, nextObj.operator, nextObj.value, false);
            datePredicate = filterObject.operator === 'equal' ? predicateSt.and(predicateEnd) : predicateSt.or(predicateEnd);
        }
        else {
            var predicates = new Predicate(prevObj.field, prevObj.operator, prevObj.value, false);
            datePredicate = predicates;
        }
        return datePredicate;
    };
    Data.prototype.addRows = function (e) {
        for (var i = e.records.length; i > 0; i--) {
            this.dataManager.dataSource.json.splice(e.toIndex, 0, e.records[i - 1]);
        }
    };
    Data.prototype.removeRows = function (e) {
        var json = this.dataManager.dataSource.json;
        this.dataManager.dataSource.json = json.filter(function (value, index) { return e.records.indexOf(value) === -1; });
    };
    Data.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(rowsAdded, this.addRows);
        this.parent.off(rowsRemoved, this.removeRows);
        this.parent.off(dataSourceModified, this.initDataManager);
        this.parent.off(dataSourceModified, this.destroy);
        this.parent.off(updateData, this.crudActions);
        this.parent.off(addDeleteAction, this.getData);
    };
    return Data;
}());

/**
 * Row
 * @hidden
 */
var Row = /** @class */ (function () {
    function Row(options) {
        merge(this, options);
    }
    return Row;
}());

/**
 * Cell
 * @hidden
 */
var Cell = /** @class */ (function () {
    function Cell(options) {
        this.isSpanned = false;
        merge(this, options);
    }
    return Cell;
}());

/**
 * `CellMergeRender` module.
 * @hidden
 */
var CellMergeRender = /** @class */ (function () {
    function CellMergeRender(serviceLocator, parent) {
        this.serviceLocator = serviceLocator;
        this.parent = parent;
    }
    CellMergeRender.prototype.render = function (cellArgs, row, i, td) {
        var cellRendererFact = this.serviceLocator.getService('cellRendererFactory');
        var cellRenderer = cellRendererFact.getCellRenderer(row.cells[i].cellType || CellType.Data);
        var span = row.cells[i].cellSpan ? row.cells[i].cellSpan :
            (cellArgs.colSpan + i) <= row.cells.length ? cellArgs.colSpan : row.cells.length - i;
        var visible = 0;
        for (var j = i + 1; j < i + span && j < row.cells.length; j++) {
            if (row.cells[j].visible === false) {
                visible++;
            }
            else {
                row.cells[j].isSpanned = true;
            }
        }
        if (visible > 0) {
            for (var j = i + span; j < i + span + visible && j < row.cells.length; j++) {
                row.cells[j].isSpanned = true;
            }
            if (i + span + visible >= row.cells.length) {
                span -= (i + span + visible) - row.cells.length;
            }
        }
        if (row.cells[i].cellSpan) {
            row.data[cellArgs.column.field] = row.cells[i].spanText;
            td = cellRenderer.render(row.cells[i], row.data, { 'index': !isNullOrUndefined(row.index) ? row.index.toString() : '' });
        }
        if (span > 1) {
            attributes(td, { 'colSpan': span.toString(), 'aria-colSpan': span.toString() });
        }
        if (this.parent.enableColumnVirtualization && !row.cells[i].cellSpan &&
            !this.containsKey(cellArgs.column.field, cellArgs.data[cellArgs.column.field])) {
            this.backupMergeCells(cellArgs.column.field, cellArgs.data[cellArgs.column.field], cellArgs.colSpan);
        }
        return td;
    };
    CellMergeRender.prototype.backupMergeCells = function (fName, data, span) {
        this.setMergeCells(this.generteKey(fName, data), span);
    };
    CellMergeRender.prototype.generteKey = function (fname, data) {
        return fname + '__' + data.toString();
    };
    CellMergeRender.prototype.splitKey = function (key) {
        return key.split('__');
    };
    CellMergeRender.prototype.containsKey = function (fname, data) {
        return this.getMergeCells().hasOwnProperty(this.generteKey(fname, data));
    };
    CellMergeRender.prototype.getMergeCells = function () {
        return this.parent.mergeCells;
    };
    CellMergeRender.prototype.setMergeCells = function (key, span) {
        this.parent.mergeCells[key] = span;
    };
    CellMergeRender.prototype.updateVirtualCells = function (rows) {
        var mCells = this.getMergeCells();
        for (var _i = 0, _a = Object.keys(mCells); _i < _a.length; _i++) {
            var key = _a[_i];
            var value = mCells[key];
            var merge$$1 = this.splitKey(key);
            var columnIndex = this.getIndexFromAllColumns(merge$$1[0]);
            var vColumnIndices = this.parent.getColumnIndexesInView();
            var span = value - (vColumnIndices[0] - columnIndex);
            if (columnIndex < vColumnIndices[0] && span > 1) {
                for (var _b = 0, rows_1 = rows; _b < rows_1.length; _b++) {
                    var row = rows_1[_b];
                    if (row.data[merge$$1[0]].toString() === merge$$1[1].toString()) {
                        row.cells[0].cellSpan = span;
                        row.cells[0].spanText = merge$$1[1];
                        break;
                    }
                }
            }
        }
        return rows;
    };
    CellMergeRender.prototype.getIndexFromAllColumns = function (field) {
        var index = iterateArrayOrObject(this.parent.getVisibleColumns(), function (item, index) {
            if (item.field === field) {
                return index;
            }
            return undefined;
        })[0];
        return index;
    };
    return CellMergeRender;
}());

/**
 * RowRenderer class which responsible for building row content.
 * @hidden
 */
var RowRenderer = /** @class */ (function () {
    function RowRenderer(serviceLocator, cellType, parent) {
        this.element = createElement('tr', { attrs: { role: 'row' } });
        this.cellType = cellType;
        this.serviceLocator = serviceLocator;
        this.parent = parent;
    }
    /**
     * Function to render the row content based on Column[] and data.
     * @param  {Column[]} columns
     * @param  {Object} data?
     * @param  {{[x:string]:Object}} attributes?
     * @param  {string} rowTemplate?
     */
    RowRenderer.prototype.render = function (row, columns, attributes$$1, rowTemplate, cloneNode) {
        return this.refreshRow(row, columns, attributes$$1, rowTemplate, cloneNode);
    };
    /**
     * Function to refresh the row content based on Column[] and data.
     * @param  {Column[]} columns
     * @param  {Object} data?
     * @param  {{[x:string]:Object}} attributes?
     * @param  {string} rowTemplate?
     */
    RowRenderer.prototype.refresh = function (row, columns, isChanged, attributes$$1, rowTemplate) {
        if (isChanged) {
            row.data = extend({}, row.changes);
            this.refreshMergeCells(row);
        }
        var node = this.parent.element.querySelector('[data-uid=' + row.uid + ']');
        var tr = this.refreshRow(row, columns, attributes$$1, rowTemplate);
        var cells = [].slice.call(tr.cells);
        node.innerHTML = '';
        for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
            var cell = cells_1[_i];
            node.appendChild(cell);
        }
    };
    RowRenderer.prototype.refreshRow = function (row, columns, attributes$$1, rowTemplate, cloneNode) {
        var tr = !isNullOrUndefined(cloneNode) ? cloneNode : this.element.cloneNode();
        var rowArgs = { data: row.data };
        var cellArgs = { data: row.data };
        var attrCopy = extend({}, attributes$$1, {});
        if (row.isDataRow) {
            row.isSelected = this.parent.getSelectedRowIndexes().indexOf(row.index) > -1;
        }
        this.buildAttributeFromRow(tr, row);
        attributes(tr, attrCopy);
        setStyleAndAttributes(tr, row.attributes);
        var cellRendererFact = this.serviceLocator.getService('cellRendererFactory');
        for (var i = 0, len = row.cells.length; i < len; i++) {
            var cell = row.cells[i];
            cell.isSelected = row.isSelected;
            var cellRenderer = cellRendererFact.getCellRenderer(row.cells[i].cellType || CellType.Data);
            var td = cellRenderer.render(row.cells[i], row.data, { 'index': !isNullOrUndefined(row.index) ? row.index.toString() : '' });
            if (row.cells[i].cellType !== CellType.Filter) {
                if (row.cells[i].cellType === CellType.Data) {
                    this.parent.trigger(queryCellInfo, extend(cellArgs, { cell: td, column: cell.column, colSpan: 1 }));
                    if (cellArgs.colSpan > 1 || row.cells[i].cellSpan > 1) {
                        var cellMerge = new CellMergeRender(this.serviceLocator, this.parent);
                        td = cellMerge.render(cellArgs, row, i, td);
                    }
                }
                if (!row.cells[i].isSpanned) {
                    tr.appendChild(td);
                }
            }
        }
        if (row.isDataRow) {
            this.parent.trigger(rowDataBound, extend(rowArgs, { row: tr }));
        }
        if (row.cssClass) {
            tr.classList.add(row.cssClass);
        }
        return tr;
    };
    RowRenderer.prototype.refreshMergeCells = function (row) {
        for (var _i = 0, _a = row.cells; _i < _a.length; _i++) {
            var cell = _a[_i];
            cell.isSpanned = false;
        }
        return row;
    };
    /**
     * Function to check and add alternative row css class.
     * @param  {Element} tr
     * @param  {{[x:string]:Object}} attr
     */
    RowRenderer.prototype.buildAttributeFromRow = function (tr, row) {
        var attr = {};
        var prop = { 'rowindex': 'aria-rowindex', 'dataUID': 'data-uid', 'ariaSelected': 'aria-selected' };
        var classes = [];
        if (row.isDataRow) {
            classes.push('e-row');
        }
        if (row.isAltRow) {
            classes.push('e-altrow');
        }
        if (!isNullOrUndefined(row.index)) {
            attr[prop.rowindex] = row.index;
        }
        if (row.rowSpan) {
            attr.rowSpan = row.rowSpan;
        }
        if (row.uid) {
            attr[prop.dataUID] = row.uid;
        }
        if (row.isSelected) {
            attr[prop.ariaSelected] = true;
        }
        if (row.visible === false) {
            classes.push('e-hide');
        }
        attr.class = classes;
        setStyleAndAttributes(tr, attr);
    };
    return RowRenderer;
}());

/**
 * RowModelGenerator is used to generate grid data rows.
 * @hidden
 */
var RowModelGenerator = /** @class */ (function () {
    /**
     * Constructor for header renderer module
     */
    function RowModelGenerator(parent) {
        this.parent = parent;
    }
    RowModelGenerator.prototype.generateRows = function (data, args) {
        var rows = [];
        var startIndex = this.parent.enableVirtualization ? args.startIndex : 0;
        for (var i = 0, len = Object.keys(data).length; i < len; i++, startIndex++) {
            rows[i] = this.generateRow(data[i], startIndex);
        }
        return rows;
    };
    RowModelGenerator.prototype.ensureColumns = function () {
        //TODO: generate dummy column for group, detail here;
        var cols = [];
        if (this.parent.detailTemplate || this.parent.childGrid) {
            cols.push(this.generateCell({}, null, CellType.DetailExpand));
        }
        return cols;
    };
    RowModelGenerator.prototype.generateRow = function (data, index, cssClass, indent) {
        var options = {};
        options.uid = getUid('grid-row');
        options.data = data;
        options.index = index;
        options.indent = indent;
        options.isDataRow = true;
        options.cssClass = cssClass;
        options.isAltRow = this.parent.enableAltRow ? index % 2 !== 0 : false;
        options.isSelected = this.parent.getSelectedRowIndexes().indexOf(index) > -1;
        var cells = this.ensureColumns();
        var row = new Row(options);
        row.cells = cells.concat(this.generateCells(options));
        return row;
    };
    RowModelGenerator.prototype.generateCells = function (options) {
        var _this = this;
        var dummies = this.parent.getColumns();
        var tmp = [];
        dummies.forEach(function (dummy, index) {
            return tmp.push(_this.generateCell(dummy, options.uid, isNullOrUndefined(dummy.commands) ? undefined : CellType.CommandColumn, null, index));
        });
        return tmp;
    };
    RowModelGenerator.prototype.generateCell = function (column, rowId, cellType, colSpan, oIndex) {
        var opt = {
            'visible': column.visible,
            'isDataCell': !isNullOrUndefined(column.field || column.template),
            'isTemplate': !isNullOrUndefined(column.template),
            'rowID': rowId,
            'column': column,
            'cellType': !isNullOrUndefined(cellType) ? cellType : CellType.Data,
            'colSpan': colSpan,
            'commands': column.commands
        };
        if (opt.isDataCell || opt.column.type === 'checkbox') {
            opt.index = this.parent.getColumnIndexByField(column.field);
        }
        return new Cell(opt);
    };
    RowModelGenerator.prototype.refreshRows = function (input) {
        var _this = this;
        input.forEach(function (row) { return row.cells = _this.generateCells(row); });
        return input;
    };
    return RowModelGenerator;
}());

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Summary row model generator
 * @hidden
 */
var SummaryModelGenerator = /** @class */ (function () {
    /**
     * Constructor for Summary row model generator
     */
    function SummaryModelGenerator(parent) {
        this.parent = parent;
    }
    SummaryModelGenerator.prototype.getData = function () {
        var _this = this;
        var rows = [];
        this.parent.aggregates.slice().forEach(function (row) {
            var columns = row.columns.filter(function (column) {
                return !(column.footerTemplate || column.groupFooterTemplate || column.groupCaptionTemplate)
                    || _this.columnSelector(column);
            });
            if (columns.length) {
                rows.push({ columns: columns });
            }
        });
        return rows;
    };
    SummaryModelGenerator.prototype.columnSelector = function (column) {
        return column.footerTemplate !== undefined;
    };
    SummaryModelGenerator.prototype.getColumns = function () {
        var columns = [];
        if (this.parent.allowGrouping) {
            this.parent.groupSettings.columns.forEach(function (value) { return columns.push(new Column({})); });
        }
        if (this.parent.detailTemplate) {
            columns.push(new Column({}));
        }
        columns.push.apply(columns, this.parent.getColumns());
        return columns;
    };
    SummaryModelGenerator.prototype.generateRows = function (input, args) {
        var _this = this;
        if (this.parent.currentViewData.length === 0) {
            return [];
        }
        var data = this.buildSummaryData(input, args);
        var rows = [];
        this.getData().forEach(function (row, index) {
            rows.push(_this.getGeneratedRow(row, data[index], args ? args.level : undefined));
        });
        return rows;
    };
    SummaryModelGenerator.prototype.getGeneratedRow = function (summaryRow, data, raw) {
        var _this = this;
        var tmp = [];
        var indents = this.getIndentByLevel(raw);
        var indentLength = this.parent.groupSettings.columns.length + (this.parent.detailTemplate ? 1 : 0);
        this.getColumns().forEach(function (value, index) { return tmp.push(_this.getGeneratedCell(value, summaryRow, index >= indentLength ? _this.getCellType() : CellType.Indent, indents[index])); });
        var row = new Row({ data: data, attributes: { class: 'e-summaryrow' } });
        row.cells = tmp;
        row.visible = tmp.some(function (cell) { return cell.isDataCell && cell.visible; });
        return row;
    };
    SummaryModelGenerator.prototype.getGeneratedCell = function (column, summaryRow, cellType, indent) {
        //Get the summary column by display
        var sColumn = summaryRow.columns.filter(function (scolumn) { return scolumn.columnName === column.field; })[0];
        var attrs = { 'style': { 'textAlign': column.textAlign } };
        if (indent) {
            attrs.class = indent;
        }
        var opt = {
            'visible': column.visible,
            'isDataCell': !isNullOrUndefined(sColumn),
            'isTemplate': sColumn && !isNullOrUndefined(sColumn.footerTemplate
                || sColumn.groupFooterTemplate || sColumn.groupCaptionTemplate),
            'column': sColumn || {},
            'attributes': attrs,
            'cellType': cellType
        };
        return new Cell(opt);
    };
    SummaryModelGenerator.prototype.buildSummaryData = function (data, args) {
        var _this = this;
        var dummy = [];
        var summaryRows = this.getData();
        var single = {};
        summaryRows.forEach(function (row) {
            single = {};
            row.columns.forEach(function (column) {
                single = _this.setTemplate(column, (args && args.aggregates) ? args : data, single);
            });
            dummy.push(single);
        });
        return dummy;
    };
    SummaryModelGenerator.prototype.getIndentByLevel = function (data) {
        return this.parent.groupSettings.columns.map(function () { return 'e-indentcelltop'; });
    };
    SummaryModelGenerator.prototype.setTemplate = function (column, data, single) {
        var _this = this;
        var types = column.type;
        var helper = {};
        var formatFn = column.getFormatter() || (function () { return function (a) { return a; }; })();
        var group = data;
        if (!(types instanceof Array)) {
            types = [column.type];
        }
        types.forEach(function (type) {
            var key = column.field + ' - ' + type;
            var disp = column.columnName;
            var val = group.aggregates && !isNullOrUndefined(group.aggregates[key]) ? group.aggregates[key] :
                calculateAggregate(type, group.aggregates ? group.result : data, column, _this.parent);
            single[disp] = single[disp] || {};
            single[disp][key] = val;
            single[disp][type] = formatFn(val);
            if (group.field) {
                single[disp].field = group.field;
                single[disp].key = group.key;
            }
        });
        helper.format = column.getFormatter();
        column.setTemplate(helper);
        return single;
    };
    SummaryModelGenerator.prototype.getCellType = function () {
        return CellType.Summary;
    };
    return SummaryModelGenerator;
}());
var GroupSummaryModelGenerator = /** @class */ (function (_super) {
    __extends$2(GroupSummaryModelGenerator, _super);
    function GroupSummaryModelGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupSummaryModelGenerator.prototype.columnSelector = function (column) {
        return column.groupFooterTemplate !== undefined;
    };
    GroupSummaryModelGenerator.prototype.getIndentByLevel = function (level) {
        if (level === void 0) { level = this.parent.groupSettings.columns.length; }
        return this.parent.groupSettings.columns.map(function (v, indx) { return indx <= level - 1 ? '' : 'e-indentcelltop'; });
    };
    GroupSummaryModelGenerator.prototype.getCellType = function () {
        return CellType.GroupSummary;
    };
    return GroupSummaryModelGenerator;
}(SummaryModelGenerator));
var CaptionSummaryModelGenerator = /** @class */ (function (_super) {
    __extends$2(CaptionSummaryModelGenerator, _super);
    function CaptionSummaryModelGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CaptionSummaryModelGenerator.prototype.columnSelector = function (column) {
        return column.groupCaptionTemplate !== undefined;
    };
    CaptionSummaryModelGenerator.prototype.getData = function () {
        var initVal = { columns: [] };
        return [_super.prototype.getData.call(this).reduce(function (prev, cur) {
                prev.columns = prev.columns.concat(cur.columns);
                return prev;
            }, initVal)];
    };
    CaptionSummaryModelGenerator.prototype.isEmpty = function () {
        return (this.getData()[0].columns || []).length === 0;
    };
    CaptionSummaryModelGenerator.prototype.getCellType = function () {
        return CellType.CaptionSummary;
    };
    return CaptionSummaryModelGenerator;
}(SummaryModelGenerator));

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * GroupModelGenerator is used to generate group caption rows and data rows.
 * @hidden
 */
var GroupModelGenerator = /** @class */ (function (_super) {
    __extends$1(GroupModelGenerator, _super);
    function GroupModelGenerator(parent) {
        var _this = _super.call(this, parent) || this;
        _this.rows = [];
        _this.index = 0;
        _this.parent = parent;
        _this.summaryModelGen = new GroupSummaryModelGenerator(parent);
        _this.captionModelGen = new CaptionSummaryModelGenerator(parent);
        return _this;
    }
    GroupModelGenerator.prototype.generateRows = function (data, args) {
        if (this.parent.groupSettings.columns.length === 0) {
            return _super.prototype.generateRows.call(this, data, args);
        }
        this.rows = [];
        this.index = this.parent.enableVirtualization ? (this.parent.pageSettings.currentPage - 1) * data.records.length : 0;
        for (var i = 0, len = data.length; i < len; i++) {
            this.getGroupedRecords(0, data[i], data.level);
        }
        this.index = 0;
        return this.rows;
    };
    GroupModelGenerator.prototype.getGroupedRecords = function (index, data, raw) {
        var level = raw;
        if (isNullOrUndefined(data.items)) {
            if (isNullOrUndefined(data.GroupGuid)) {
                this.rows = this.rows.concat(this.generateDataRows(data, index));
            }
            else {
                for (var j = 0, len = data.length; j < len; j++) {
                    this.getGroupedRecords(index, data[j], data.level);
                }
            }
        }
        else {
            this.rows = this.rows.concat(this.generateCaptionRow(data, index));
            if (data.items && data.items.length) {
                this.getGroupedRecords(index + 1, data.items, data.items.level);
            }
            if (this.parent.aggregates.length) {
                (_a = this.rows).push.apply(_a, this.summaryModelGen.generateRows(data, { level: level }));
            }
        }
        var _a;
    };
    GroupModelGenerator.prototype.getCaptionRowCells = function (field, indent, data) {
        var _this = this;
        var cells = [];
        var visibles = [];
        var column = this.parent.getColumnByField(field);
        var indexes = this.parent.getColumnIndexesInView();
        if (this.parent.enableColumnVirtualization) {
            column = this.parent.columns.filter(function (c) { return c.field === field; })[0];
        }
        var groupedLen = this.parent.groupSettings.columns.length;
        var gObj = this.parent;
        if (!this.parent.enableColumnVirtualization || indexes.indexOf(indent) !== -1) {
            for (var i = 0; i < indent; i++) {
                cells.push(this.generateIndentCell());
            }
            cells.push(this.generateCell({}, null, CellType.Expand));
        }
        indent = this.parent.enableColumnVirtualization ? 1 :
            (this.parent.getVisibleColumns().length + groupedLen + (gObj.detailTemplate || gObj.childGrid ? 1 : 0) -
                indent + (this.parent.getVisibleColumns().length ? -1 : 0));
        //Captionsummary cells will be added here.    
        if (this.parent.aggregates.length && !this.captionModelGen.isEmpty()) {
            var captionCells = this.captionModelGen.generateRows(data)[0];
            extend(data, captionCells.data);
            var cIndex_1 = 0;
            captionCells.cells.some(function (cell, index) { cIndex_1 = index; return cell.visible && cell.isDataCell; });
            visibles = captionCells.cells.slice(cIndex_1).filter(function (cell) { return cell.visible; });
            if (captionCells.visible && visibles[0].column.field === this.parent.getVisibleColumns()[0].field) {
                visibles = visibles.slice(1);
            }
            if (this.parent.getVisibleColumns().length === 1) {
                visibles = [];
            }
            indent = indent - visibles.length;
        }
        var cols = (!this.parent.enableColumnVirtualization ? [column] : this.parent.getColumns());
        var wFlag = true;
        cols.forEach(function (col, index) {
            var tmpFlag = wFlag && indexes.indexOf(indent) !== -1;
            if (tmpFlag) {
                wFlag = false;
            }
            var cellType = !_this.parent.enableColumnVirtualization || tmpFlag ?
                CellType.GroupCaption : CellType.GroupCaptionEmpty;
            indent = _this.parent.enableColumnVirtualization && cellType === CellType.GroupCaption ? indent + groupedLen : indent;
            cells.push(_this.generateCell(column, null, cellType, indent));
        });
        cells.push.apply(cells, visibles);
        return cells;
    };
    GroupModelGenerator.prototype.generateCaptionRow = function (data, indent) {
        var options = {};
        var col = this.parent.getColumnByField(data.field);
        options.data = extend({}, data);
        if (col) {
            options.data.field = data.field;
        }
        options.isDataRow = false;
        var row = new Row(options);
        row.indent = indent;
        row.cells = this.getCaptionRowCells(data.field, indent, row.data);
        return row;
    };
    GroupModelGenerator.prototype.generateDataRows = function (data, indent) {
        var rows = [];
        var indexes = this.parent.getColumnIndexesInView();
        for (var i = 0, len = data.length; i < len; i++) {
            rows[i] = this.generateRow(data[i], this.index, i ? undefined : 'e-firstchildrow', indent);
            for (var j = 0; j < indent; j++) {
                if (this.parent.enableColumnVirtualization && indexes.indexOf(indent) === -1) {
                    continue;
                }
                rows[i].cells.unshift(this.generateIndentCell());
            }
            this.index++;
        }
        return rows;
    };
    GroupModelGenerator.prototype.generateIndentCell = function () {
        return this.generateCell({}, null, CellType.Indent);
    };
    GroupModelGenerator.prototype.refreshRows = function (input) {
        var _this = this;
        var indexes = this.parent.getColumnIndexesInView();
        input.forEach(function (row) {
            if (row.isDataRow) {
                row.cells = _this.generateCells(row);
                for (var j = 0; j < row.indent; j++) {
                    if (_this.parent.enableColumnVirtualization && indexes.indexOf(row.indent) === -1) {
                        continue;
                    }
                    row.cells.unshift(_this.generateIndentCell());
                }
            }
            else {
                var cRow = _this.generateCaptionRow(row.data, row.indent);
                row.cells = cRow.cells;
            }
        });
        return input;
    };
    return GroupModelGenerator;
}(RowModelGenerator));

/**
 * Content module is used to render grid content
 * @hidden
 */
var ContentRender = /** @class */ (function () {
    /**
     * Constructor for content renderer module
     */
    function ContentRender(parent, serviceLocator) {
        var _this = this;
        this.rows = [];
        this.isLoaded = true;
        this.drop = function (e) {
            _this.parent.notify(columnDrop, { target: e.target, droppedElement: e.droppedElement });
            remove(e.droppedElement);
        };
        this.rafCallback = function (args) { return function () {
            _this.ariaService.setBusy(_this.getPanel().firstChild, false);
            if (_this.parent.isDestroyed) {
                return;
            }
            _this.parent.notify(contentReady, { rows: _this.rows, args: args });
            if (_this.isLoaded) {
                _this.parent.trigger(dataBound, {});
                if (_this.parent.allowTextWrap) {
                    _this.parent.notify(freezeRender, { case: 'textwrap' });
                }
            }
            if (args) {
                var action = (args.requestType || '').toLowerCase() + '-complete';
                _this.parent.notify(action, args);
            }
            _this.parent.hideSpinner();
        }; };
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.ariaService = this.serviceLocator.getService('ariaService');
        this.generator = this.getModelGenerator();
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(columnVisibilityChanged, this.setVisible, this);
        this.parent.on(colGroupRefresh, this.colGroupRefresh, this);
    }
    /**
     * The function is used to render grid content div
     */
    ContentRender.prototype.renderPanel = function () {
        var gObj = this.parent;
        var div = createElement('div', { className: 'e-gridcontent' });
        var innerDiv = createElement('div', {
            className: 'e-content'
        });
        if (!Browser.isDevice) {
            innerDiv.setAttribute('tabindex', '0');
        }
        this.ariaService.setOptions(innerDiv, { busy: false });
        div.appendChild(innerDiv);
        this.setPanel(div);
        gObj.element.appendChild(div);
    };
    /**
     * The function is used to render grid content table
     */
    ContentRender.prototype.renderTable = function () {
        var contentDiv = this.getPanel();
        contentDiv.appendChild(this.createContentTable());
        this.setTable(contentDiv.querySelector('.e-table'));
        this.ariaService.setOptions(this.getTable(), {
            multiselectable: this.parent.selectionSettings.type === 'multiple'
        });
        this.initializeContentDrop();
    };
    /**
     * The function is used to create content table elements
     * @return {Element}
     * @hidden
     */
    ContentRender.prototype.createContentTable = function () {
        var innerDiv = this.getPanel().firstChild;
        var table = createElement('table', {
            className: 'e-table', attrs: {
                cellspacing: '0.25px', role: 'grid',
                id: this.parent.element.id + '_content_table'
            }
        });
        this.setColGroup(this.parent.element.querySelector('.e-gridheader').querySelector('colgroup').cloneNode(true));
        table.appendChild(this.getColGroup());
        table.appendChild(createElement('tbody'));
        innerDiv.appendChild(table);
        return innerDiv;
    };
    /**
     * Refresh the content of the Grid.
     * @return {void}
     */
    ContentRender.prototype.refreshContentRows = function (args) {
        var _this = this;
        if (args === void 0) { args = {}; }
        var gObj = this.parent;
        if (gObj.currentViewData.length === 0) {
            return;
        }
        var dataSource = gObj.currentViewData;
        var frag = document.createDocumentFragment();
        var hdrfrag = document.createDocumentFragment();
        var columns = gObj.getColumns();
        var tr;
        var hdrTbody;
        var row = new RowRenderer(this.serviceLocator, null, this.parent);
        this.rowElements = [];
        this.rows = [];
        var modelData = this.generator.generateRows(dataSource, args);
        var idx = modelData[0].cells[0].index;
        var fCont = this.getPanel().querySelector('.e-frozencontent');
        var mCont = this.getPanel().querySelector('.e-movablecontent');
        var cont = this.getPanel().querySelector('.e-content');
        if (this.parent.enableColumnVirtualization) {
            var cellMerge = new CellMergeRender(this.serviceLocator, this.parent);
            cellMerge.updateVirtualCells(modelData);
        }
        if (this.parent.frozenColumns && idx >= this.parent.frozenColumns) {
            this.tbody = mCont.querySelector('tbody');
        }
        else {
            this.tbody = this.getTable().querySelector('tbody');
        }
        for (var i = 0, len = modelData.length; i < len; i++) {
            if (!gObj.rowTemplate) {
                tr = row.render(modelData[i], columns);
            }
            else {
                var elements = gObj.getRowTemplate()(extend({ index: i }, dataSource[i]), gObj, 'rowTemplate');
                for (var j = 0; j < elements.length; j++) {
                    var isTR = elements[j].nodeName.toLowerCase() === 'tr';
                    if (isTR || (elements[j].querySelectorAll && elements[j].querySelectorAll('tr').length)) {
                        tr = isTR ? elements[j] : elements[j].querySelector('tr');
                    }
                }
            }
            if (gObj.frozenRows && i < gObj.frozenRows) {
                hdrfrag.appendChild(tr);
            }
            else {
                frag.appendChild(tr);
            }
            this.rows.push(modelData[i]);
            if (modelData[i].isDataRow) {
                //detailrowvisible 
                var td = tr.querySelectorAll('.e-rowcell:not(.e-hide)')[0];
                if (td) {
                    td.classList.add('e-detailrowvisible');
                }
                this.rowElements.push(tr);
            }
            this.ariaService.setOptions(this.getTable(), { colcount: gObj.getColumns().length.toString() });
        }
        if (gObj.frozenRows) {
            hdrTbody = gObj.frozenColumns ? gObj.getHeaderContent().querySelector(idx === 0 ? '.e-frozenheader'
                : '.e-movableheader').querySelector('tbody') : gObj.getHeaderTable().querySelector('tbody');
            hdrTbody.innerHTML = '';
            hdrTbody.appendChild(hdrfrag);
        }
        if (gObj.frozenRows && idx === 0 && cont.offsetHeight === Number(gObj.height)) {
            cont.style.height = (cont.offsetHeight - hdrTbody.offsetHeight) + 'px';
        }
        if (gObj.frozenColumns && idx === 0) {
            this.getPanel().firstChild.style.overflowY = 'hidden';
        }
        this.args = args;
        getUpdateUsingRaf(function () {
            remove(_this.tbody);
            _this.tbody = createElement('tbody');
            if (gObj.frozenColumns) {
                _this.tbody.appendChild(frag);
                if (idx === 0) {
                    _this.isLoaded = false;
                    fCont.querySelector('table').appendChild(_this.tbody);
                }
                else {
                    if (_this.tbody.childElementCount < 1) {
                        _this.tbody.appendChild(createElement('tr').appendChild(createElement('td')));
                    }
                    _this.isLoaded = true;
                    mCont.querySelector('table').appendChild(_this.tbody);
                    fCont.style.height = ((mCont.offsetHeight) - getScrollBarWidth()) + 'px';
                    mCont.style.overflow = 'scroll';
                }
            }
            else {
                _this.appendContent(_this.tbody, frag, args);
            }
            if (gObj.frozenColumns && idx === 0) {
                _this.refreshContentRows(args);
            }
        }, this.rafCallback(args));
    };
    ContentRender.prototype.appendContent = function (tbody, frag, args) {
        tbody.appendChild(frag);
        this.getTable().appendChild(tbody);
    };
    /**
     * Get the content div element of grid
     * @return {Element}
     */
    ContentRender.prototype.getPanel = function () {
        return this.contentPanel;
    };
    /**
     * Set the content div element of grid
     * @param  {Element} panel
     */
    ContentRender.prototype.setPanel = function (panel) {
        this.contentPanel = panel;
    };
    /**
     * Get the content table element of grid
     * @return {Element}
     */
    ContentRender.prototype.getTable = function () {
        return this.contentTable;
    };
    /**
     * Set the content table element of grid
     * @param  {Element} table
     */
    ContentRender.prototype.setTable = function (table) {
        this.contentTable = table;
    };
    /**
     * Get the Row collection in the Grid.
     * @returns {Row[] | HTMLCollectionOf<HTMLTableRowElement>}
     */
    ContentRender.prototype.getRows = function () {
        return this.rows;
    };
    /**
     * Get the content table data row elements
     * @return {Element}
     */
    ContentRender.prototype.getRowElements = function () {
        return this.rowElements;
    };
    /**
     * Get the content table data row elements
     * @return {Element}
     */
    ContentRender.prototype.setRowElements = function (elements) {
        this.rowElements = elements;
    };
    /**
     * Get the header colgroup element
     * @returns {Element}
     */
    ContentRender.prototype.getColGroup = function () {
        return this.colgroup;
    };
    /**
     * Set the header colgroup element
     * @param {Element} colgroup
     * @returns {Element}
     */
    ContentRender.prototype.setColGroup = function (colGroup) {
        return this.colgroup = colGroup;
    };
    /**
     * Function to hide content table column based on visible property
     * @param  {Column[]} columns?
     */
    ContentRender.prototype.setVisible = function (columns) {
        var rows = this.getRows();
        var testRow;
        rows.some(function (r) { if (r.isDataRow) {
            testRow = r;
        } return r.isDataRow; });
        for (var c = 0, clen = columns.length; c < clen; c++) {
            var column = columns[c];
            var idx = this.parent.getNormalizedColumnIndex(column.uid);
            //used canSkip method to skip unwanted visible toggle operation. 
            if (this.canSkip(column, testRow, idx)) {
                continue;
            }
            var displayVal = column.visible === true ? '' : 'none';
            setStyleAttribute(this.getColGroup().childNodes[idx], { 'display': displayVal });
        }
        this.refreshContentRows({ requestType: 'refresh' });
    };
    ContentRender.prototype.colGroupRefresh = function () {
        if (this.getColGroup()) {
            var colGroup = this.getColGroup();
            colGroup.innerHTML = this.parent.element.querySelector('.e-gridheader').querySelector('colgroup').innerHTML;
            this.setColGroup(colGroup);
        }
    };
    ContentRender.prototype.initializeContentDrop = function () {
        var gObj = this.parent;
        var drop = new Droppable(gObj.getContent(), {
            accept: '.e-dragclone',
            drop: this.drop
        });
    };
    ContentRender.prototype.canSkip = function (column, row, index) {
        /**
         * Skip the toggle visiblity operation when one of the following success
         * 1. Grid has empty records
         * 2. column visible property is unchanged
         * 3. cell`s isVisible property is same as column`s visible property.
         */
        return isNullOrUndefined(row) || //(1)
            isNullOrUndefined(column.visible) || //(2)    
            row.cells[index].visible === column.visible; //(3)
    };
    ContentRender.prototype.getModelGenerator = function () {
        return this.generator = this.parent.allowGrouping ? new GroupModelGenerator(this.parent) : new RowModelGenerator(this.parent);
    };
    ContentRender.prototype.renderEmpty = function (tbody) {
        this.getTable().appendChild(tbody);
    };
    ContentRender.prototype.setSelection = function (uid, set, clearAll) {
        this.getRows().filter(function (row) { return clearAll || uid === row.uid; })
            .forEach(function (row) { return row.isSelected = set; });
    };
    ContentRender.prototype.getRowByIndex = function (index) {
        return this.parent.getDataRows()[index];
    };
    return ContentRender;
}());

/**
 * Content module is used to render grid content
 * @hidden
 */
var HeaderRender = /** @class */ (function () {
    /**
     * Constructor for header renderer module
     */
    function HeaderRender(parent, serviceLocator) {
        var _this = this;
        this.helper = function (e) {
            var gObj = _this.parent;
            var target = e.sender.target;
            var parentEle = parentsUntil(target, 'e-headercell');
            if (!(gObj.allowReordering || gObj.allowGrouping) || (!isNullOrUndefined(parentEle)
                && parentEle.querySelectorAll('.e-checkselectall').length > 0)) {
                return false;
            }
            var visualElement = createElement('div', { className: 'e-cloneproperties e-dragclone e-headerclone' });
            var element = target.classList.contains('e-headercell') ? target : parentEle;
            if (!element) {
                return false;
            }
            var height = element.offsetHeight;
            var headercelldiv = element.querySelector('.e-headercelldiv');
            var col = gObj.getColumnByUid(headercelldiv.getAttribute('e-mappinguid'));
            if (!isNullOrUndefined(col.headerTemplate)) {
                if (col.headerTemplate.indexOf('#') !== -1) {
                    visualElement.innerHTML = document.querySelector(col.headerTemplate).innerHTML.trim();
                }
                else {
                    visualElement.innerHTML = col.headerTemplate;
                }
            }
            else {
                visualElement.textContent = headercelldiv ?
                    gObj.getColumnByUid(headercelldiv.getAttribute('e-mappinguid')).headerText : element.firstElementChild.innerHTML;
            }
            visualElement.style.width = element.offsetWidth + 'px';
            visualElement.style.height = element.offsetHeight + 'px';
            visualElement.style.lineHeight = (height - 6).toString() + 'px';
            if (element.querySelector('.e-headercelldiv')) {
                _this.column = gObj.getColumnByUid(element.querySelector('.e-headercelldiv').getAttribute('e-mappinguid'));
                visualElement.setAttribute('e-mappinguid', _this.column.uid);
            }
            gObj.element.appendChild(visualElement);
            return visualElement;
        };
        this.dragStart = function (e) {
            var gObj = _this.parent;
            gObj.element.querySelector('.e-gridpopup').style.display = 'none';
            gObj.notify(columnDragStart, { target: e.target, column: _this.column, event: e.event });
        };
        this.drag = function (e) {
            var gObj = _this.parent;
            var target = e.target;
            if (target) {
                var closest$$1 = closest(target, '.e-grid');
                var cloneElement = _this.parent.element.querySelector('.e-cloneproperties');
                if (!closest$$1 || closest$$1.getAttribute('id') !== gObj.element.getAttribute('id')) {
                    classList(cloneElement, ['e-notallowedcur'], ['e-defaultcur']);
                    if (gObj.allowReordering) {
                        gObj.element.querySelector('.e-reorderuparrow').style.display = 'none';
                        gObj.element.querySelector('.e-reorderdownarrow').style.display = 'none';
                    }
                    return;
                }
                gObj.notify(columnDrag, { target: e.target, column: _this.column, event: e.event });
            }
        };
        this.dragStop = function (e) {
            var gObj = _this.parent;
            var cancel;
            gObj.element.querySelector('.e-gridpopup').style.display = 'none';
            if ((!parentsUntil(e.target, 'e-headercell') && !parentsUntil(e.target, 'e-groupdroparea')) ||
                (!gObj.allowReordering && parentsUntil(e.target, 'e-headercell')) ||
                (!e.helper.getAttribute('e-mappinguid') && parentsUntil(e.target, 'e-groupdroparea'))) {
                remove(e.helper);
                cancel = true;
            }
            gObj.notify(columnDragStop, { target: e.target, event: e.event, column: _this.column, cancel: cancel });
        };
        this.drop = function (e) {
            var gObj = _this.parent;
            var uid = e.droppedElement.getAttribute('e-mappinguid');
            var closest$$1 = closest(e.target, '.e-grid');
            remove(e.droppedElement);
            if (closest$$1 && closest$$1.getAttribute('id') !== gObj.element.getAttribute('id') ||
                !(gObj.allowReordering || gObj.allowGrouping)) {
                return;
            }
            gObj.notify(headerDrop, { target: e.target, uid: uid });
        };
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.ariaService = this.serviceLocator.getService('ariaService');
        this.widthService = this.serviceLocator.getService('widthService');
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(columnVisibilityChanged, this.setVisible, this);
        this.parent.on(columnPositionChanged, this.refreshUI, this);
    }
    /**
     * The function is used to render grid header div
     */
    HeaderRender.prototype.renderPanel = function () {
        var div = createElement('div', { className: 'e-gridheader' });
        var innerDiv = createElement('div', { className: 'e-headercontent' });
        div.appendChild(innerDiv);
        this.setPanel(div);
        this.parent.element.appendChild(div);
    };
    /**
     * The function is used to render grid header table
     */
    HeaderRender.prototype.renderTable = function () {
        var headerDiv = this.getPanel();
        headerDiv.appendChild(this.createHeaderTable());
        this.setTable(headerDiv.querySelector('.e-table'));
        this.initializeHeaderDrag();
        this.initializeHeaderDrop();
        this.parent.notify(headerRefreshed, { rows: this.rows });
    };
    /**
     * Get the header content div element of grid
     * @return {Element}
     */
    HeaderRender.prototype.getPanel = function () {
        return this.headerPanel;
    };
    /**
     * Set the header content div element of grid
     * @param  {Element} panel
     */
    HeaderRender.prototype.setPanel = function (panel) {
        this.headerPanel = panel;
    };
    /**
     * Get the header table element of grid
     * @return {Element}
     */
    HeaderRender.prototype.getTable = function () {
        return this.headerTable;
    };
    /**
     * Set the header table element of grid
     * @param  {Element} table
     */
    HeaderRender.prototype.setTable = function (table) {
        this.headerTable = table;
    };
    /**
     * Get the header colgroup element
     * @returns {Element}
     */
    HeaderRender.prototype.getColGroup = function () {
        return this.colgroup;
    };
    /**
     * Set the header colgroup element
     * @param {Element} colgroup
     * @returns {Element}
     */
    HeaderRender.prototype.setColGroup = function (colGroup) {
        return this.colgroup = colGroup;
    };
    /**
     * Get the header row element collection.
     * @return {Element[]}
     */
    HeaderRender.prototype.getRows = function () {
        var table = this.getTable();
        return table.tHead.rows;
    };
    /**
     * The function is used to create header table elements
     * @return {Element}
     * @hidden
     */
    HeaderRender.prototype.createHeaderTable = function () {
        var table = this.createTable();
        var innerDiv = this.getPanel().firstChild;
        innerDiv.appendChild(table);
        return innerDiv;
    };
    /**
     * @hidden
     */
    HeaderRender.prototype.createTable = function () {
        var gObj = this.parent;
        var columns = gObj.getColumns();
        var table = createElement('table', { className: 'e-table', attrs: { cellspacing: '0.25px', role: 'grid' } });
        var innerDiv = this.getPanel().firstChild;
        var findHeaderRow = this.createHeaderContent();
        var thead = findHeaderRow.thead;
        var tbody = createElement('tbody', { className: this.parent.frozenRows ? '' : 'e-hide' });
        var colGroup = createElement('colgroup');
        var rowBody = createElement('tr');
        var bodyCell;
        var rows = this.rows = findHeaderRow.rows;
        var rowRenderer = new RowRenderer(this.serviceLocator, CellType.Header);
        for (var i = 0, len = rows.length; i < len; i++) {
            for (var j = 0, len_1 = rows[i].cells.length; j < len_1; j++) {
                var cell = rows[i].cells[j];
                bodyCell = createElement('td');
                rowBody.appendChild(bodyCell);
            }
        }
        if (gObj.allowFiltering || gObj.allowSorting || gObj.allowGrouping) {
            table.classList.add('e-sortfilter');
        }
        this.updateColGroup(colGroup);
        tbody.appendChild(rowBody);
        table.appendChild(this.setColGroup(colGroup));
        table.appendChild(thead);
        table.appendChild(tbody);
        this.ariaService.setOptions(table, { colcount: gObj.getColumns().length.toString() });
        return table;
    };
    HeaderRender.prototype.createHeaderContent = function () {
        var gObj = this.parent;
        var columns = gObj.getColumns();
        var thead = createElement('thead');
        var colHeader = createElement('tr', { className: 'e-columnheader' });
        var rowRenderer = new RowRenderer(this.serviceLocator, CellType.Header, gObj);
        rowRenderer.element = colHeader;
        var rows = [];
        var headerRow;
        this.colDepth = this.getObjDepth();
        for (var i = 0, len = this.colDepth; i < len; i++) {
            rows[i] = this.generateRow(i);
            rows[i].cells = [];
        }
        rows = this.ensureColumns(rows);
        rows = this.getHeaderCells(rows);
        for (var i = 0, len = this.colDepth; i < len; i++) {
            headerRow = rowRenderer.render(rows[i], columns);
            thead.appendChild(headerRow);
        }
        var findHeaderRow = {
            thead: thead,
            rows: rows
        };
        return findHeaderRow;
    };
    HeaderRender.prototype.updateColGroup = function (colGroup) {
        var cols = this.parent.getColumns();
        var col;
        var indexes = this.parent.getColumnIndexesInView();
        if (this.parent.allowGrouping) {
            for (var i = 0, len = this.parent.groupSettings.columns.length; i < len; i++) {
                if (this.parent.enableColumnVirtualization && indexes.indexOf(i) === -1) {
                    continue;
                }
                col = createElement('col');
                colGroup.appendChild(col);
            }
        }
        if (this.parent.detailTemplate || this.parent.childGrid) {
            col = createElement('col');
            colGroup.appendChild(col);
        }
        for (var i = 0, len = cols.length; i < len; i++) {
            col = createElement('col');
            if (cols[i].visible === false) {
                setStyleAttribute(col, { 'display': 'none' });
            }
            colGroup.appendChild(col);
        }
        return colGroup;
    };
    HeaderRender.prototype.ensureColumns = function (rows) {
        //TODO: generate dummy column for group, detail, stacked row here; ensureColumns here
        var gObj = this.parent;
        var indexes = this.parent.getColumnIndexesInView();
        for (var i = 0, len = rows.length; i < len; i++) {
            if (gObj.allowGrouping) {
                for (var c = 0, len_2 = gObj.groupSettings.columns.length; c < len_2; c++) {
                    if (this.parent.enableColumnVirtualization && indexes.indexOf(c) === -1) {
                        continue;
                    }
                    rows[i].cells.push(this.generateCell({}, CellType.HeaderIndent));
                }
            }
            if (gObj.detailTemplate || gObj.childGrid) {
                rows[i].cells.push(this.generateCell({}, CellType.DetailHeader));
            }
        }
        return rows;
    };
    HeaderRender.prototype.getHeaderCells = function (rows) {
        var column;
        if (this.parent.frozenColumns) {
            if (this.parent.getHeaderTable() && this.parent.getHeaderTable().querySelector('thead')) {
                column = this.parent.columns.slice(this.parent.frozenColumns, this.parent.columns.length);
            }
            else {
                column = this.parent.columns.slice(0, this.parent.frozenColumns);
            }
        }
        var cols = this.parent.enableColumnVirtualization ? this.parent.getColumns()
            : (this.parent.frozenColumns ? column : this.parent.columns);
        for (var i = 0, len = cols.length; i < len; i++) {
            rows = this.appendCells(cols[i], rows, 0, i === 0, false, i === (len - 1));
        }
        return rows;
    };
    HeaderRender.prototype.appendCells = function (cols, rows, index, isFirstObj, isFirstCol, isLastCol) {
        var lastCol = isLastCol ? 'e-lastcell' : '';
        if (!cols.columns) {
            rows[index].cells.push(this.generateCell(cols, CellType.Header, this.colDepth - index, (isFirstObj ? '' : (isFirstCol ? 'e-firstcell' : '')) + lastCol, index, this.parent.getColumnIndexByUid(cols.uid)));
        }
        else {
            var colSpan = this.getCellCnt(cols, 0);
            if (colSpan) {
                rows[index].cells.push(new Cell({
                    cellType: CellType.StackedHeader, column: cols, colSpan: colSpan
                }));
            }
            for (var i = 0, len = cols.columns.length; i < len; i++) {
                rows = this.appendCells(cols.columns[i], rows, index + 1, isFirstObj, i === 0, i === (len - 1) && isLastCol);
            }
        }
        return rows;
    };
    HeaderRender.prototype.generateRow = function (index) {
        return new Row({});
    };
    HeaderRender.prototype.generateCell = function (column, cellType, rowSpan, className, rowIndex, colIndex) {
        var opt = {
            'visible': column.visible,
            'isDataCell': false,
            'isTemplate': !isNullOrUndefined(column.headerTemplate),
            'rowID': '',
            'column': column,
            'cellType': cellType,
            'rowSpan': rowSpan,
            'className': className,
            'index': rowIndex,
            'colIndex': colIndex
        };
        if (!opt.rowSpan || opt.rowSpan < 2) {
            delete opt.rowSpan;
        }
        return new Cell(opt);
    };
    /**
     * Function to hide header table column based on visible property
     * @param  {Column[]} columns?
     */
    HeaderRender.prototype.setVisible = function (columns) {
        var rows = [].slice.call(this.getRows()); //NodeList -> Array        
        var displayVal = '';
        var idx;
        for (var c = 0, clen = columns.length; c < clen; c++) {
            var column = columns[c];
            idx = this.parent.getNormalizedColumnIndex(column.uid);
            if (column.visible === false) {
                displayVal = 'none';
            }
            setStyleAttribute(this.getColGroup().childNodes[idx], { 'display': displayVal });
            this.refreshUI();
        }
    };
    /**
     * Refresh the header of the Grid.
     * @returns {void}
     */
    HeaderRender.prototype.refreshUI = function () {
        var headerDiv = this.getPanel();
        var table = this.getTable();
        remove(this.getTable());
        table.removeChild(table.firstChild);
        table.removeChild(table.childNodes[0]);
        var colGroup = createElement('colgroup');
        var findHeaderRow = this.createHeaderContent();
        this.rows = findHeaderRow.rows;
        table.insertBefore(findHeaderRow.thead, table.firstChild);
        this.updateColGroup(colGroup);
        table.insertBefore(this.setColGroup(colGroup), table.firstChild);
        this.setTable(table);
        this.appendContent(table);
        this.parent.notify(colGroupRefresh, {});
        this.widthService.setWidthToColumns();
        this.initializeHeaderDrag();
        var rows = [].slice.call(headerDiv.querySelectorAll('tr.e-columnheader'));
        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
            var row = rows_1[_i];
            var gCells = [].slice.call(row.querySelectorAll('.e-grouptopleftcell'));
            if (gCells.length) {
                gCells[gCells.length - 1].classList.add('e-lastgrouptopleftcell');
            }
        }
        this.parent.notify(headerRefreshed, { rows: this.rows });
        if (this.parent.allowTextWrap && this.parent.textWrapSettings.wrapMode === 'header') {
            wrap(rows, true);
        }
    };
    HeaderRender.prototype.appendContent = function (table) {
        this.getPanel().firstChild.appendChild(table);
    };
    HeaderRender.prototype.getObjDepth = function () {
        var max = 0;
        var cols = this.parent.columns;
        for (var i = 0, len = cols.length; i < len; i++) {
            var depth = this.checkDepth(cols[i], 0);
            if (max < depth) {
                max = depth;
            }
        }
        return max + 1;
    };
    HeaderRender.prototype.checkDepth = function (col, index) {
        if (col.columns) {
            index++;
            for (var i = 0, len = col.columns.length; i < len; i++) {
                index = this.checkDepth(col.columns[i], index);
            }
        }
        return index;
    };
    HeaderRender.prototype.getCellCnt = function (col, cnt) {
        if (col.columns) {
            for (var i = 0, len = col.columns.length; i < len; i++) {
                cnt = this.getCellCnt(col.columns[i], cnt);
            }
        }
        else {
            if (col.visible) {
                cnt++;
            }
        }
        return cnt;
    };
    HeaderRender.prototype.initializeHeaderDrag = function () {
        var gObj = this.parent;
        if (!(this.parent.allowReordering || (this.parent.allowGrouping && this.parent.groupSettings.showDropArea))) {
            return;
        }
        var headerRows = [].slice.call(gObj.getHeaderContent().querySelectorAll('.e-columnheader'));
        for (var i = 0, len = headerRows.length; i < len; i++) {
            var drag = new Draggable(headerRows[i], {
                dragTarget: '.e-headercell',
                distance: 5,
                helper: this.helper,
                dragStart: this.dragStart,
                drag: this.drag,
                dragStop: this.dragStop,
                abort: '.e-rhandler'
            });
        }
    };
    HeaderRender.prototype.initializeHeaderDrop = function () {
        var gObj = this.parent;
        var drop = new Droppable(gObj.getHeaderContent(), {
            accept: '.e-dragclone',
            drop: this.drop
        });
    };
    return HeaderRender;
}());

/**
 * CellRenderer class which responsible for building cell content.
 * @hidden
 */
var CellRenderer = /** @class */ (function () {
    function CellRenderer(parent, locator) {
        this.element = createElement('TD', { className: 'e-rowcell', attrs: { role: 'gridcell', tabindex: '-1' } });
        this.rowChkBox = createElement('input', { className: 'e-checkselect', attrs: { 'type': 'checkbox' } });
        this.localizer = locator.getService('localization');
        this.formatter = locator.getService('valueFormatter');
        this.parent = parent;
    }
    /**
     * Function to return the wrapper for the TD content
     * @returns string
     */
    CellRenderer.prototype.getGui = function () {
        return '';
    };
    /**
     * Function to format the cell value.
     * @param  {Column} column
     * @param  {Object} value
     * @param  {Object} data
     */
    CellRenderer.prototype.format = function (column, value, data) {
        if (!isNullOrUndefined(column.format)) {
            value = this.formatter.toView(value, column.getFormatter());
        }
        return isNullOrUndefined(value) ? '' : value.toString();
    };
    CellRenderer.prototype.evaluate = function (node, cell, data, attributes$$1) {
        var result;
        if (cell.column.template) {
            var literals = ['index'];
            result = cell.column.getColumnTemplate()(extend({ 'index': attributes$$1[literals[0]] }, data), this.parent, 'template');
            appendChildren(node, result);
            node.setAttribute('aria-label', node.innerText + ' is template cell' + ' column header ' +
                cell.column.headerText);
            return false;
        }
        return true;
    };
    /**
     * Function to invoke the custom formatter available in the column object.
     * @param  {Column} column
     * @param  {Object} value
     * @param  {Object} data
     */
    CellRenderer.prototype.invokeFormatter = function (column, value, data) {
        if (!isNullOrUndefined(column.formatter)) {
            if (doesImplementInterface(column.formatter, 'getValue')) {
                var formatter = column.formatter;
                value = new formatter().getValue(column, data);
            }
            else if (typeof column.formatter === 'function') {
                value = column.formatter(column, data);
            }
            else {
                value = column.formatter.getValue(column, data);
            }
        }
        return value;
    };
    /**
     * Function to render the cell content based on Column object.
     * @param  {Column} column
     * @param  {Object} data
     * @param  {{[x:string]:Object}} attributes?
     * @param  {Element}
     */
    CellRenderer.prototype.render = function (cell, data, attributes$$1) {
        return this.refreshCell(cell, data, attributes$$1);
    };
    /**
     * Function to refresh the cell content based on Column object.
     * @param  {Column} column
     * @param  {Object} data
     * @param  {{[x:string]:Object}} attributes?
     * @param  {Element}
     */
    CellRenderer.prototype.refreshTD = function (td, cell, data, attributes$$1) {
        var node = this.refreshCell(cell, data, attributes$$1);
        td.innerHTML = '';
        var elements = [].slice.call(node.childNodes);
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var elem = elements_1[_i];
            td.appendChild(elem);
        }
    };
    CellRenderer.prototype.refreshCell = function (cell, data, attributes$$1) {
        var node = this.element.cloneNode();
        var column = cell.column;
        //Prepare innerHtml
        var innerHtml = this.getGui();
        var value = this.getValue(column.field, data, column);
        if (column.type === 'date' && !isNullOrUndefined(value)) {
            value = new Date(value);
        }
        value = this.format(column, value, data);
        innerHtml = value.toString();
        if (column.type === 'boolean') {
            if (column.displayAsCheckBox) {
                node.classList.add('e-checkbox');
                innerHtml = '<input type="checkbox" disabled ' + '/>';
            }
            else {
                var localeStr = (value !== 'true' && value !== 'false') ? null : value === 'true' ? 'True' : 'False';
                innerHtml = localeStr ? this.localizer.getConstant(localeStr) : innerHtml;
            }
        }
        var fromFormatter = this.invokeFormatter(column, value, data);
        innerHtml = !isNullOrUndefined(column.formatter) ? isNullOrUndefined(fromFormatter) ? '' : fromFormatter.toString() : innerHtml;
        node.setAttribute('aria-label', innerHtml + ' column header ' + cell.column.headerText);
        if (this.evaluate(node, cell, data, attributes$$1) && column.type !== 'checkbox') {
            this.appendHtml(node, innerHtml, column.getDomSetter ? column.getDomSetter() : 'innerHTML');
        }
        else if (column.type === 'checkbox') {
            node.classList.add('e-gridchkbox');
            node.setAttribute('aria-label', 'column header ' + cell.column.headerText);
            if (this.parent.selectionSettings.persistSelection) {
                value = value === 'true';
            }
            else {
                value = false;
            }
            var checkWrap = createCheckBox(false, { checked: value, label: ' ' });
            checkWrap.insertBefore(this.rowChkBox.cloneNode(), checkWrap.firstChild);
            node.appendChild(checkWrap);
        }
        this.setAttributes(node, cell, attributes$$1);
        if (column.type === 'boolean') {
            var obj = new CheckBox({
                disabled: true,
                checked: isNaN(parseInt(value, 10)) ? value === 'true' : parseInt(value, 10) > 0
            });
            obj.appendTo(node.firstElementChild);
        }
        return node;
    };
    /**
     * Function to specifies how the result content to be placed in the cell.
     * @param  {Element} node
     * @param  {string|Element} innerHtml
     * @returns Element
     */
    CellRenderer.prototype.appendHtml = function (node, innerHtml, property) {
        if (property === void 0) { property = 'innerHTML'; }
        node[property] = innerHtml;
        return node;
    };
    /**
     * @hidden
     */
    CellRenderer.prototype.setAttributes = function (node, cell, attributes$$1) {
        var column = cell.column;
        this.buildAttributeFromCell(node, cell);
        setStyleAndAttributes(node, attributes$$1);
        setStyleAndAttributes(node, cell.attributes);
        if (column.customAttributes) {
            setStyleAndAttributes(node, column.customAttributes);
        }
        if (column.textAlign) {
            node.style.textAlign = column.textAlign;
        }
        if (column.clipMode === 'clip') {
            node.classList.add('e-gridclip');
        }
        else if (column.clipMode === 'ellipsiswithtooltip') {
            node.classList.add('e-ellipsistooltip');
        }
    };
    CellRenderer.prototype.buildAttributeFromCell = function (node, cell) {
        var attr = {};
        var prop = { 'colindex': 'aria-colindex' };
        var classes = [];
        if (cell.colSpan) {
            attr.colSpan = cell.colSpan;
        }
        if (cell.rowSpan) {
            attr.rowSpan = cell.rowSpan;
        }
        if (cell.isTemplate) {
            classes.push('e-templatecell');
        }
        if (cell.isSelected) {
            classes.push.apply(classes, ['e-selectionbackground', 'e-active']);
        }
        if (!isNullOrUndefined(cell.index)) {
            attr[prop.colindex] = cell.index;
        }
        if (!cell.visible) {
            classes.push('e-hide');
        }
        attr.class = classes;
        setStyleAndAttributes(node, attr);
    };
    CellRenderer.prototype.getValue = function (field, data, column) {
        return column.valueAccessor(column.field, data, column);
    };
    return CellRenderer;
}());

/**
 * AriaService
 * @hidden
 */
var AriaService = /** @class */ (function () {
    function AriaService() {
    }
    AriaService.prototype.setOptions = function (target, options) {
        var props = Object.keys(options);
        props.forEach(function (name) { return setStateAndProperties(target, config[name], options[name]); });
    };
    AriaService.prototype.setExpand = function (target, expand) {
        setStateAndProperties(target, config.expand, expand);
    };
    AriaService.prototype.setSort = function (target, direction) {
        setStateAndProperties(target, config.sort, direction, typeof direction === 'boolean');
    };
    AriaService.prototype.setBusy = function (target, isBusy) {
        setStateAndProperties(target, config.busy, isBusy);
        setStateAndProperties(target, config.invalid, null, true);
    };
    AriaService.prototype.setGrabbed = function (target, isGrabbed, remove$$1) {
        setStateAndProperties(target, config.grabbed, isGrabbed, remove$$1);
    };
    AriaService.prototype.setDropTarget = function (target, isTarget) {
        setStateAndProperties(target, config.dropeffect, 'copy', !isTarget);
    };
    return AriaService;
}());
/**
 * @hidden
 */
function setStateAndProperties(target, attribute, value, remove$$1) {
    if (remove$$1) {
        target.removeAttribute(attribute);
        return;
    }
    if (target) {
        target.setAttribute(attribute, value);
    }
}
var config = {
    expand: 'aria-expanded',
    role: 'role',
    selected: 'aria-selected',
    multiselectable: 'aria-multiselectable',
    sort: 'aria-sort',
    busy: 'aria-busy',
    invalid: 'aria-invalid',
    grabbed: 'aria-grabbed',
    dropeffect: 'aria-dropeffect',
    haspopup: 'aria-haspopup',
    level: 'aria-level',
    colcount: 'aria-colcount'
};

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * HeaderCellRenderer class which responsible for building header cell content.
 * @hidden
 */
var HeaderCellRenderer = /** @class */ (function (_super) {
    __extends$3(HeaderCellRenderer, _super);
    function HeaderCellRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.element = createElement('TH', { className: 'e-headercell', attrs: { role: 'columnheader', tabindex: '-1' } });
        _this.ariaService = new AriaService();
        _this.hTxtEle = createElement('span', { className: 'e-headertext' });
        _this.sortEle = createElement('div', { className: 'e-sortfilterdiv e-icons' });
        _this.gui = createElement('div');
        _this.chkAllBox = createElement('input', { className: 'e-checkselectall', attrs: { 'type': 'checkbox' } });
        return _this;
    }
    /**
     * Function to return the wrapper for the TH content.
     * @returns string
     */
    HeaderCellRenderer.prototype.getGui = function () {
        return this.gui.cloneNode();
    };
    /**
     * Function to render the cell content based on Column object.
     * @param  {Column} column
     * @param  {Object} data
     * @param  {Element}
     */
    HeaderCellRenderer.prototype.render = function (cell, data, attributes$$1) {
        var node = this.element.cloneNode();
        var fltrMenuEle = createElement('div', { className: 'e-filtermenudiv e-icons e-icon-filter' });
        return this.prepareHeader(cell, node, fltrMenuEle);
    };
    /**
     * Function to refresh the cell content based on Column object.
     * @param  {Cell} cell
     * @param  {Element} node
     */
    HeaderCellRenderer.prototype.refresh = function (cell, node) {
        this.clean(node);
        var fltrMenuEle = createElement('div', { className: 'e-filtermenudiv e-icons e-icon-filter' });
        return this.prepareHeader(cell, node, fltrMenuEle);
    };
    HeaderCellRenderer.prototype.clean = function (node) {
        node.innerHTML = '';
    };
    HeaderCellRenderer.prototype.prepareHeader = function (cell, node, fltrMenuEle) {
        var column = cell.column;
        var ariaAttr = {};
        //Prepare innerHtml
        var innerDIV = this.getGui();
        attributes(innerDIV, {
            'e-mappinguid': column.uid,
            'class': 'e-headercelldiv'
        });
        if (column.type !== 'checkbox') {
            var value = column.headerText;
            var headerText = this.hTxtEle.cloneNode();
            //TODO: Header Template support.
            headerText[column.getDomSetter()] = value;
            innerDIV.appendChild(headerText);
        }
        else {
            column.editType = 'booleanedit';
            var checkAllWrap = createCheckBox(false, { checked: false, label: ' ' });
            checkAllWrap.insertBefore(this.chkAllBox.cloneNode(), checkAllWrap.firstChild);
            innerDIV.appendChild(checkAllWrap);
            innerDIV.classList.add('e-headerchkcelldiv');
        }
        this.buildAttributeFromCell(node, cell);
        this.appendHtml(node, innerDIV);
        node.appendChild(this.sortEle.cloneNode());
        if ((this.parent.allowFiltering && this.parent.filterSettings.type !== 'filterbar') &&
            (column.allowFiltering && !isNullOrUndefined(column.field)) &&
            !(this.parent.showColumnMenu && column.showColumnMenu)) {
            attributes(fltrMenuEle, {
                'e-mappinguid': 'e-flmenu-' + column.uid,
            });
            node.classList.add('e-fltr-icon');
            var matchFlColumns = [];
            if (this.parent.filterSettings.columns.length && this.parent.filterSettings.columns.length !== matchFlColumns.length) {
                for (var index = 0; index < this.parent.columns.length; index++) {
                    for (var count = 0; count < this.parent.filterSettings.columns.length; count++) {
                        if (this.parent.filterSettings.columns[count].field === column.field) {
                            fltrMenuEle.classList.add('e-filtered');
                            matchFlColumns.push(column.field);
                            break;
                        }
                    }
                }
            }
            node.appendChild(fltrMenuEle.cloneNode());
        }
        if (cell.className) {
            node.classList.add(cell.className);
        }
        if (column.customAttributes) {
            setStyleAndAttributes(node, column.customAttributes);
        }
        if (column.allowSorting) {
            ariaAttr.sort = 'none';
        }
        if (column.allowGrouping) {
            ariaAttr.grabbed = false;
        }
        node = this.extendPrepareHeader(column, node);
        if (!isNullOrUndefined(column.headerTemplate)) {
            if (column.headerTemplate.indexOf('#') !== -1) {
                innerDIV.innerHTML = document.querySelector(column.headerTemplate).innerHTML.trim();
            }
            else {
                innerDIV.innerHTML = column.headerTemplate;
            }
        }
        this.ariaService.setOptions(node, ariaAttr);
        if (!isNullOrUndefined(column.headerTextAlign) || !isNullOrUndefined(column.textAlign)) {
            var alignment = column.headerTextAlign || column.textAlign;
            innerDIV.style.textAlign = alignment;
            if (alignment === 'right' || alignment === 'left') {
                node.classList.add(alignment === 'right' ? 'e-rightalign' : 'e-leftalign');
            }
            else if (alignment === 'center') {
                node.classList.add('e-centeralign');
            }
        }
        if (column.clipMode === 'clip') {
            node.classList.add('e-gridclip');
        }
        else if (column.clipMode === 'ellipsiswithtooltip') {
            node.classList.add('e-ellipsistooltip');
        }
        node.setAttribute('aria-rowspan', (!isNullOrUndefined(cell.rowSpan) ? cell.rowSpan : 1).toString());
        node.setAttribute('aria-colspan', '1');
        return node;
    };
    HeaderCellRenderer.prototype.extendPrepareHeader = function (column, node) {
        if (this.parent.showColumnMenu && column.showColumnMenu) {
            var element = (createElement('div', { className: 'e-icons e-columnmenu' }));
            var matchFilteredColumns = [];
            if (this.parent.filterSettings.columns.length && this.parent.filterSettings.columns.length !== matchFilteredColumns.length) {
                for (var i = 0; i < this.parent.columns.length; i++) {
                    for (var j = 0; j < this.parent.filterSettings.columns.length; j++) {
                        if (this.parent.filterSettings.columns[j].field === column.field) {
                            element.classList.add('e-filtered');
                            matchFilteredColumns.push(column.field);
                            break;
                        }
                    }
                }
            }
            node.classList.add('e-fltr-icon');
            node.appendChild(element);
        }
        if (this.parent.allowResizing) {
            var handler = createElement('div');
            handler.className = column.allowResizing ? 'e-rhandler e-rcursor' : 'e-rsuppress';
            node.appendChild(handler);
        }
        return node;
    };
    /**
     * Function to specifies how the result content to be placed in the cell.
     * @param  {Element} node
     * @param  {string|Element} innerHtml
     * @returns Element
     */
    HeaderCellRenderer.prototype.appendHtml = function (node, innerHtml) {
        node.appendChild(innerHtml);
        return node;
    };
    return HeaderCellRenderer;
}(CellRenderer));

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * StackedHeaderCellRenderer class which responsible for building stacked header cell content.
 * @hidden
 */
var StackedHeaderCellRenderer = /** @class */ (function (_super) {
    __extends$4(StackedHeaderCellRenderer, _super);
    function StackedHeaderCellRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.element = createElement('TH', {
            className: 'e-headercell e-stackedheadercell', attrs: {
                role: 'columnheader',
                tabindex: '-1'
            }
        });
        return _this;
    }
    /**
     * Function to render the cell content based on Column object.
     * @param  {Column} column
     * @param  {Object} data
     * @param  {Element}
     */
    StackedHeaderCellRenderer.prototype.render = function (cell, data, attributes$$1) {
        var node = this.element.cloneNode();
        var div = createElement('div', { className: 'e-stackedheadercelldiv' });
        node.appendChild(div);
        div.innerHTML = cell.column.headerText;
        if (cell.column.toolTip) {
            node.setAttribute('title', cell.column.toolTip);
        }
        if (!isNullOrUndefined(cell.column.textAlign)) {
            div.style.textAlign = cell.column.textAlign;
        }
        node.setAttribute('colspan', cell.colSpan.toString());
        node.setAttribute('aria-colspan', cell.colSpan.toString());
        node.setAttribute('aria-rowspan', '1');
        return node;
    };
    return StackedHeaderCellRenderer;
}(CellRenderer));

var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * IndentCellRenderer class which responsible for building group indent cell.
 * @hidden
 */
var IndentCellRenderer = /** @class */ (function (_super) {
    __extends$5(IndentCellRenderer, _super);
    function IndentCellRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.element = createElement('TD', { className: 'e-indentcell' });
        return _this;
    }
    /**
     * Function to render the indent cell
     * @param  {Cell} cell
     * @param  {Object} data
     */
    IndentCellRenderer.prototype.render = function (cell, data) {
        var node = this.element.cloneNode();
        setStyleAndAttributes(node, cell.attributes);
        return node;
    };
    return IndentCellRenderer;
}(CellRenderer));

var __extends$6 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * GroupCaptionCellRenderer class which responsible for building group caption cell.
 * @hidden
 */
var GroupCaptionCellRenderer = /** @class */ (function (_super) {
    __extends$6(GroupCaptionCellRenderer, _super);
    function GroupCaptionCellRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.element = createElement('TD', { className: 'e-groupcaption', attrs: { role: 'gridcell', tabindex: '-1' } });
        return _this;
    }
    /**
     * Function to render the cell content based on Column object.
     * @param  {Cell} cell
     * @param  {Object} data
     */
    GroupCaptionCellRenderer.prototype.render = function (cell, data) {
        var node = this.element.cloneNode();
        var gObj = this.parent;
        var result;
        var value = cell.column.enableGroupByFormat ? data.key :
            this.format(cell.column, cell.column.valueAccessor('key', data, cell.column));
        if (!isNullOrUndefined(gObj.groupSettings.captionTemplate)) {
            if (gObj.groupSettings.captionTemplate.indexOf('#') !== -1) {
                result = templateCompiler(document.querySelector(gObj.groupSettings.captionTemplate).innerHTML.trim())(data);
            }
            else {
                result = templateCompiler(gObj.groupSettings.captionTemplate)(data);
            }
            appendChildren(node, result);
        }
        else {
            node.innerHTML = cell.column.headerText + ': ' + value + ' - ' + data.count + ' ' +
                (data.count < 2 ? this.localizer.getConstant('Item') : this.localizer.getConstant('Items'));
        }
        node.setAttribute('colspan', cell.colSpan.toString());
        node.setAttribute('aria-label', node.innerHTML + ' is groupcaption cell');
        return node;
    };
    return GroupCaptionCellRenderer;
}(CellRenderer));
/**
 * GroupCaptionEmptyCellRenderer class which responsible for building group caption empty cell.
 * @hidden
 */
var GroupCaptionEmptyCellRenderer = /** @class */ (function (_super) {
    __extends$6(GroupCaptionEmptyCellRenderer, _super);
    function GroupCaptionEmptyCellRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.element = createElement('TD', { className: 'e-groupcaption' });
        return _this;
    }
    /**
     * Function to render the cell content based on Column object.
     * @param  {Cell} cell
     * @param  {Object} data
     */
    GroupCaptionEmptyCellRenderer.prototype.render = function (cell, data) {
        var node = this.element.cloneNode();
        node.innerHTML = '&nbsp;';
        node.setAttribute('colspan', cell.colSpan.toString());
        return node;
    };
    return GroupCaptionEmptyCellRenderer;
}(CellRenderer));

var __extends$7 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * ExpandCellRenderer class which responsible for building group expand cell.
 * @hidden
 */
var ExpandCellRenderer = /** @class */ (function (_super) {
    __extends$7(ExpandCellRenderer, _super);
    function ExpandCellRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Function to render the expand cell
     * @param  {Cell} cell
     * @param  {Object} data
     */
    ExpandCellRenderer.prototype.render = function (cell, data) {
        var node = this.element.cloneNode();
        node.className = 'e-recordplusexpand';
        node.setAttribute('ej-mappingname', data.field);
        node.setAttribute('ej-mappingvalue', data.key);
        node.setAttribute('aria-expanded', 'true');
        node.setAttribute('tabindex', '-1');
        node.appendChild(createElement('div', { className: 'e-icons e-gdiagonaldown e-icon-gdownarrow' }));
        return node;
    };
    return ExpandCellRenderer;
}(IndentCellRenderer));

var __extends$8 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * HeaderIndentCellRenderer class which responsible for building header indent cell.
 * @hidden
 */
var HeaderIndentCellRenderer = /** @class */ (function (_super) {
    __extends$8(HeaderIndentCellRenderer, _super);
    function HeaderIndentCellRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.element = createElement('TH', { className: 'e-grouptopleftcell' });
        return _this;
    }
    /**
     * Function to render the indent cell
     * @param  {Cell} cell
     * @param  {Object} data
     */
    HeaderIndentCellRenderer.prototype.render = function (cell, data) {
        var node = this.element.cloneNode();
        node.appendChild(createElement('div', { className: 'e-headercelldiv e-emptycell', innerHTML: '&nbsp;' }));
        return node;
    };
    return HeaderIndentCellRenderer;
}(CellRenderer));

var __extends$9 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * DetailHeaderIndentCellRenderer class which responsible for building detail header indent cell.
 * @hidden
 */
var DetailHeaderIndentCellRenderer = /** @class */ (function (_super) {
    __extends$9(DetailHeaderIndentCellRenderer, _super);
    function DetailHeaderIndentCellRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.element = createElement('TH', { className: 'e-detailheadercell' });
        return _this;
    }
    /**
     * Function to render the detail indent cell
     * @param  {Cell} cell
     * @param  {Object} data
     */
    DetailHeaderIndentCellRenderer.prototype.render = function (cell, data) {
        var node = this.element.cloneNode();
        node.appendChild(createElement('div', { className: 'e-emptycell' }));
        return node;
    };
    return DetailHeaderIndentCellRenderer;
}(CellRenderer));

var __extends$10 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * ExpandCellRenderer class which responsible for building group expand cell.
 * @hidden
 */
var DetailExpandCellRenderer = /** @class */ (function (_super) {
    __extends$10(DetailExpandCellRenderer, _super);
    function DetailExpandCellRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.element = createElement('TD', {
            className: 'e-detailrowcollapse',
            attrs: { 'aria-expanded': 'false', role: 'gridcell', tabindex: '-1' }
        });
        return _this;
    }
    /**
     * Function to render the detail expand cell
     */
    DetailExpandCellRenderer.prototype.render = function () {
        var node = this.element.cloneNode();
        node.appendChild(createElement('div', { className: 'e-icons e-dtdiagonalright e-icon-grightarrow' }));
        return node;
    };
    return DetailExpandCellRenderer;
}(CellRenderer));

/**
 * Content module is used to render grid content
 * @hidden
 */
var Render = /** @class */ (function () {
    /**
     * Constructor for render module
     */
    function Render(parent, locator) {
        this.parent = parent;
        this.locator = locator;
        this.data = new Data(parent, locator);
        this.l10n = locator.getService('localization');
        this.ariaService = this.locator.getService('ariaService');
        this.renderer = this.locator.getService('rendererFactory');
        this.addEventListener();
    }
    /**
     * To initialize grid header, content and footer rendering
     */
    Render.prototype.render = function () {
        var gObj = this.parent;
        this.headerRenderer = this.renderer.getRenderer(RenderType.Header);
        this.contentRenderer = this.renderer.getRenderer(RenderType.Content);
        this.headerRenderer.renderPanel();
        this.contentRenderer.renderPanel();
        if (gObj.getColumns().length) {
            this.headerRenderer.renderTable();
            this.contentRenderer.renderTable();
            this.emptyRow(false);
        }
        this.refreshDataManager();
    };
    /**
     * Refresh the entire Grid.
     * @return {void}
     */
    Render.prototype.refresh = function (e) {
        if (e === void 0) { e = { requestType: 'refresh' }; }
        this.parent.notify(e.requestType + "-begin", e);
        this.parent.trigger(actionBegin, e);
        if (e.cancel) {
            return;
        }
        this.refreshDataManager(e);
    };
    Render.prototype.refreshComplete = function (e) {
        this.parent.trigger(actionComplete, e);
    };
    /**
     * The function is used to refresh the dataManager
     * @return {void}
     */
    Render.prototype.refreshDataManager = function (args) {
        var _this = this;
        if (args === void 0) { args = {}; }
        if (args.requestType !== 'virtualscroll') {
            this.parent.showSpinner();
        }
        this.parent.isEdit = false;
        this.ariaService.setBusy(this.parent.getContent().firstChild, true);
        var dataManager = this.data.getData(args, this.data.generateQuery().requiresCount());
        if (this.parent.groupSettings.disablePageWiseAggregates && this.parent.groupSettings.columns.length) {
            dataManager = dataManager.then(function (e) { return _this.validateGroupRecords(e); });
        }
        dataManager.then(function (e) { return _this.dataManagerSuccess(e, args); })
            .catch(function (e) { return _this.dataManagerFailure(e); });
    };
    Render.prototype.sendBulkRequest = function (args) {
        var _this = this;
        var promise = this.data.saveChanges(args.changes, this.parent.getPrimaryKeyFieldNames()[0]);
        if (this.data.dataManager.dataSource.offline) {
            this.refreshDataManager({ requestType: 'batchsave' });
            return;
        }
        else {
            promise.then(function (e) { return _this.dmSuccess(e, args); })
                .catch(function (e) { return _this.dmFailure(e); });
        }
    };
    Render.prototype.dmSuccess = function (e, args) {
        this.dataManagerSuccess(e, args);
    };
    Render.prototype.dmFailure = function (e) {
        this.dataManagerFailure(e);
    };
    /**
     * Render empty row to Grid which is used at the time to represent to no records.
     * @return {void}
     * @hidden
     */
    Render.prototype.renderEmptyRow = function () {
        this.emptyRow(true);
    };
    Render.prototype.emptyRow = function (isTrigger) {
        var gObj = this.parent;
        var tbody = this.contentRenderer.getTable().querySelector('tbody');
        var tr;
        remove(tbody);
        tbody = createElement('tbody');
        tr = createElement('tr', { className: 'e-emptyrow' });
        tr.appendChild(createElement('td', {
            innerHTML: this.l10n.getConstant('EmptyRecord'),
            attrs: { colspan: gObj.getColumns().length.toString() }
        }));
        tbody.appendChild(tr);
        this.contentRenderer.renderEmpty(tbody);
        if (isTrigger) {
            this.parent.trigger(dataBound, {});
            this.parent.notify(onEmpty, { rows: [new Row({ isDataRow: true, cells: [new Cell({ isDataCell: true, visible: true })] })] });
        }
    };
    Render.prototype.updateColumnType = function (record) {
        var columns = this.parent.getColumns();
        var value;
        var data = record && record.items ? record.items[0] : record;
        var fmtr = this.locator.getService('valueFormatter');
        for (var i = 0, len = columns.length; i < len; i++) {
            value = getValue(columns[i].field || '', data);
            if (!isNullOrUndefined(value)) {
                this.isColTypeDef = true;
                if (!columns[i].type) {
                    columns[i].type = value.getDay ? (value.getHours() > 0 || value.getMinutes() > 0 ||
                        value.getSeconds() > 0 || value.getMilliseconds() > 0 ? 'datetime' : 'date') : typeof (value);
                }
            }
            else {
                columns[i].type = columns[i].type || null;
            }
            var valueFormatter = new ValueFormatter();
            if (columns[i].format && (columns[i].format.skeleton || columns[i].format.format)) {
                columns[i].setFormatter(valueFormatter.getFormatFunction(columns[i].format));
                columns[i].setParser(valueFormatter.getParserFunction(columns[i].format));
            }
            if (typeof (columns[i].format) === 'string') {
                setFormatter(this.locator, columns[i]);
            }
            else if (!columns[i].format && columns[i].type === 'number') {
                columns[i].setParser(fmtr.getParserFunction({ format: 'n2' }));
            }
        }
    };
    Render.prototype.dataManagerSuccess = function (e, args) {
        var gObj = this.parent;
        gObj.trigger(beforeDataBound, e);
        var len = Object.keys(e.result).length;
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.notify(tooltipDestroy, {});
        gObj.currentViewData = e.result;
        if (!len && e.count && gObj.allowPaging) {
            gObj.pageSettings.currentPage = Math.ceil(e.count / gObj.pageSettings.pageSize);
            gObj.dataBind();
            return;
        }
        if (!gObj.getColumns().length && len) {
            this.updatesOnInitialRender(e);
        }
        if (!this.isColTypeDef) {
            this.updateColumnType(gObj.getCurrentViewRecords()[0]);
        }
        this.parent.notify(dataReady, extend({ count: e.count, result: e.result, aggregates: e.aggregates }, args));
        if (gObj.groupSettings.columns.length || (args && args.requestType === 'ungrouping')) {
            this.headerRenderer.refreshUI();
        }
        if (len) {
            this.contentRenderer.refreshContentRows(args);
        }
        else {
            if (!gObj.getColumns().length) {
                gObj.element.innerHTML = '';
                alert(this.l10n.getConstant('EmptyDataSourceError')); //ToDO: change this alert as dialog
                return;
            }
            this.contentRenderer.setRowElements([]);
            this.renderEmptyRow();
            if (args) {
                var action = (args.requestType || '').toLowerCase() + '-complete';
                this.parent.notify(action, args);
            }
            this.parent.hideSpinner();
        }
    };
    Render.prototype.dataManagerFailure = function (e) {
        this.ariaService.setOptions(this.parent.getContent().firstChild, { busy: false, invalid: true });
        this.parent.trigger(actionFailure, { error: e });
        this.parent.currentViewData = [];
        this.renderEmptyRow();
        this.parent.hideSpinner();
    };
    Render.prototype.updatesOnInitialRender = function (e) {
        this.buildColumns(e.result[0]);
        prepareColumns(this.parent.columns);
        this.headerRenderer.renderTable();
        this.contentRenderer.renderTable();
        this.parent.notify(autoCol, {});
    };
    Render.prototype.buildColumns = function (record) {
        var columns = Object.keys(record);
        var cols = [];
        for (var i = 0, len = columns.length; i < len; i++) {
            cols[i] = { 'field': columns[i] };
            if (this.parent.enableColumnVirtualization) {
                cols[i].width = !isNullOrUndefined(cols[i].width) ? cols[i].width : 200;
            }
        }
        this.parent.columns = cols;
    };
    Render.prototype.instantiateRenderer = function () {
        this.renderer.addRenderer(RenderType.Header, new HeaderRender(this.parent, this.locator));
        this.renderer.addRenderer(RenderType.Content, new ContentRender(this.parent, this.locator));
        var cellrender = this.locator.getService('cellRendererFactory');
        cellrender.addCellRenderer(CellType.Header, new HeaderCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.Data, new CellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.StackedHeader, new StackedHeaderCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.Indent, new IndentCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.GroupCaption, new GroupCaptionCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.GroupCaptionEmpty, new GroupCaptionEmptyCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.Expand, new ExpandCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.HeaderIndent, new HeaderIndentCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.StackedHeader, new StackedHeaderCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.DetailHeader, new DetailHeaderIndentCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.DetailExpand, new DetailExpandCellRenderer(this.parent, this.locator));
    };
    Render.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(initialLoad, this.instantiateRenderer, this);
        this.parent.on(modelChanged, this.refresh, this);
        this.parent.on(refreshComplete, this.refreshComplete, this);
        this.parent.on(bulkSave, this.sendBulkRequest, this);
    };
    /** @hidden */
    Render.prototype.validateGroupRecords = function (e) {
        var _this = this;
        var index = e.result.length - 1;
        if (index < 0) {
            return Promise.resolve(e);
        }
        var group0 = e.result[0];
        var groupN = e.result[index];
        var predicate = [];
        var addWhere = function (input) {
            [group0, groupN].forEach(function (group) {
                return predicate.push(new Predicate('field', '==', group.field).and(_this.getPredicate('key', 'equal', group.key)));
            });
            input.where(Predicate.or(predicate));
        };
        var query = new Query();
        addWhere(query);
        var curDm = new DataManager(e.result);
        var curFilter = curDm.executeLocal(query);
        var newQuery = this.data.generateQuery(true);
        var rPredicate = [];
        if (this.data.isRemote()) {
            [group0, groupN].forEach(function (group) {
                return rPredicate.push(_this.getPredicate(group.field, 'equal', group.key));
            });
            newQuery.where(Predicate.or(rPredicate));
        }
        else {
            addWhere(newQuery);
        }
        var deferred = new Deferred();
        this.data.getData({}, newQuery).then(function (r) {
            _this.updateGroupInfo(curFilter, r.result);
            deferred.resolve(e);
        }).catch(function (e) { return deferred.reject(e); });
        return deferred.promise;
    };
    Render.prototype.getPredicate = function (key, operator, value) {
        if (value instanceof Date) {
            return this.data.getDatePredicate({ field: key, operator: operator, value: value });
        }
        return new Predicate(key, operator, value);
    };
    Render.prototype.updateGroupInfo = function (current, untouched) {
        var _this = this;
        var dm = new DataManager(untouched);
        current.forEach(function (element, index, array) {
            var uGroup = dm.executeLocal(new Query()
                .where(new Predicate('field', '==', element.field).and(_this.getPredicate('key', 'equal', element.key))))[0];
            element.count = uGroup.count;
            var itemGroup = element.items;
            var uGroupItem = uGroup.items;
            if (itemGroup.GroupGuid) {
                element.items = _this.updateGroupInfo(element.items, uGroup.items);
            }
            _this.parent.aggregates.forEach(function (row) {
                return row.columns.forEach(function (column) {
                    var types = column.type instanceof Array ? column.type : [column.type];
                    types.forEach(function (type) {
                        var key = column.field + ' - ' + type;
                        element.aggregates[key] = calculateAggregate(type, itemGroup.level ? uGroupItem.records : uGroup.items, column);
                    });
                });
            });
        });
        return current;
    };
    return Render;
}());

/**
 * CellRendererFactory
 * @hidden
 */
var CellRendererFactory = /** @class */ (function () {
    function CellRendererFactory() {
        this.cellRenderMap = {};
    }
    CellRendererFactory.prototype.addCellRenderer = function (name, type) {
        name = typeof name === 'string' ? name : getEnumValue(CellType, name);
        if (isNullOrUndefined(this.cellRenderMap[name])) {
            this.cellRenderMap[name] = type;
        }
    };
    CellRendererFactory.prototype.getCellRenderer = function (name) {
        name = typeof name === 'string' ? name : getEnumValue(CellType, name);
        if (isNullOrUndefined(this.cellRenderMap[name])) {
            throw "The cellRenderer " + name + " is not found";
        }
        else {
            return this.cellRenderMap[name];
        }
    };
    return CellRendererFactory;
}());

/**
 * ServiceLocator
 * @hidden
 */
var ServiceLocator = /** @class */ (function () {
    function ServiceLocator() {
        this.services = {};
    }
    ServiceLocator.prototype.register = function (name, type) {
        if (isNullOrUndefined(this.services[name])) {
            this.services[name] = type;
        }
    };
    ServiceLocator.prototype.getService = function (name) {
        if (isNullOrUndefined(this.services[name])) {
            throw "The service " + name + " is not registered";
        }
        return this.services[name];
    };
    return ServiceLocator;
}());

/**
 * RendererFactory
 * @hidden
 */
var RendererFactory = /** @class */ (function () {
    function RendererFactory() {
        this.rendererMap = {};
    }
    RendererFactory.prototype.addRenderer = function (name, type) {
        var rName = getEnumValue(RenderType, name);
        if (isNullOrUndefined(this.rendererMap[rName])) {
            this.rendererMap[rName] = type;
        }
    };
    RendererFactory.prototype.getRenderer = function (name) {
        var rName = getEnumValue(RenderType, name);
        if (isNullOrUndefined(this.rendererMap[rName])) {
            throw "The renderer " + rName + " is not found";
        }
        else {
            return this.rendererMap[rName];
        }
    };
    return RendererFactory;
}());

/**
 * ColumnWidthService
 * @hidden
 */
var ColumnWidthService = /** @class */ (function () {
    function ColumnWidthService(parent) {
        this.parent = parent;
    }
    ColumnWidthService.prototype.setWidthToColumns = function () {
        var _this = this;
        var i = 0;
        var indexes = this.parent.getColumnIndexesInView();
        var wFlag = true;
        if (this.parent.allowGrouping) {
            for (var len = this.parent.groupSettings.columns.length; i < len; i++) {
                if (this.parent.enableColumnVirtualization && indexes.indexOf(i) === -1) {
                    wFlag = false;
                    continue;
                }
                this.setColumnWidth(new Column({ width: '30px' }), i);
            }
        }
        if (this.parent.detailTemplate || this.parent.childGrid) {
            this.setColumnWidth(new Column({ width: '30px' }), i);
        }
        this.parent.getColumns().forEach(function (column, index) {
            _this.setColumnWidth(column, wFlag ? undefined : index);
        });
    };
    ColumnWidthService.prototype.setColumnWidth = function (column, index, module) {
        var columnIndex = isNullOrUndefined(index) ? this.parent.getNormalizedColumnIndex(column.uid) : index;
        var cWidth = this.getWidth(column);
        if (cWidth !== null) {
            this.setWidth(cWidth, columnIndex);
            if (this.parent.allowResizing && module === 'resize') {
                this.setWidthToTable();
            }
            this.parent.notify(columnWidthChanged, { index: columnIndex, width: cWidth, column: column, module: module });
        }
    };
    ColumnWidthService.prototype.setWidth = function (width, index) {
        var header = this.parent.getHeaderTable();
        var content = this.parent.getContentTable();
        var fWidth = formatUnit(width);
        var headerCol;
        var mHdr = this.parent.getHeaderContent().querySelector('.e-movableheader');
        if (this.parent.frozenColumns && index >= this.parent.frozenColumns && mHdr && mHdr.querySelector('colgroup')) {
            headerCol = mHdr.querySelector('colgroup').children[index - this.parent.frozenColumns];
        }
        else {
            headerCol = header.querySelector('colgroup').children[index];
        }
        if (headerCol) {
            headerCol.style.width = fWidth;
        }
        var contentCol;
        if (this.parent.frozenColumns && index >= this.parent.frozenColumns) {
            contentCol = this.parent.getContent().querySelector('.e-movablecontent')
                .querySelector('colgroup').children[index - this.parent.frozenColumns];
        }
        else {
            contentCol = content.querySelector('colgroup').children[index];
        }
        if (contentCol) {
            contentCol.style.width = fWidth;
        }
        var edit = content.querySelector('.e-table.e-inline-edit');
        if (edit) {
            edit.querySelector('colgroup').children[index].style.width = fWidth;
        }
    };
    ColumnWidthService.prototype.getSiblingsHeight = function (element) {
        var previous = this.getHeightFromDirection(element, 'previous');
        var next = this.getHeightFromDirection(element, 'next');
        return previous + next;
    };
    ColumnWidthService.prototype.getHeightFromDirection = function (element, direction) {
        var sibling = element[direction + 'ElementSibling'];
        var result = 0;
        var classList$$1 = ['e-gridheader', 'e-gridfooter', 'e-groupdroparea', 'e-gridpager', 'e-toolbar'];
        while (sibling) {
            if (classList$$1.some(function (value) { return sibling.classList.contains(value); })) {
                result += sibling.offsetHeight;
            }
            sibling = sibling[direction + 'ElementSibling'];
        }
        return result;
    };
    ColumnWidthService.prototype.getWidth = function (column) {
        if (isNullOrUndefined(column.width) && this.parent.allowResizing) {
            column.width = 200;
        }
        if (!column.width) {
            return null;
        }
        var width = parseInt(column.width.toString(), 10);
        if (column.minWidth && width < parseInt(column.minWidth.toString(), 10)) {
            return column.minWidth;
        }
        else if ((column.maxWidth && width > parseInt(column.maxWidth.toString(), 10))) {
            return column.maxWidth;
        }
        else {
            return column.width;
        }
    };
    ColumnWidthService.prototype.getTableWidth = function (columns) {
        var tWidth = 0;
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var column = columns_1[_i];
            var cWidth = this.getWidth(column);
            if (column.visible !== false && cWidth !== null) {
                tWidth += parseInt(cWidth.toString(), 10);
            }
        }
        return tWidth;
    };
    ColumnWidthService.prototype.setWidthToTable = function () {
        var tWidth = null;
        if (this.parent.frozenColumns) {
            var freezeWidth = 0;
            var colGrp = this.parent.getContentTable().querySelector('colgroup');
            var mColGrp = select('.e-movablecontent');
            for (var i = 0; i < this.parent.getHeaderTable().querySelector('.e-columnheader').children.length; i++) {
                freezeWidth += parseInt(colGrp.children[i].style.width, 10);
            }
            tWidth = formatUnit(freezeWidth);
            this.parent.getHeaderTable().style.width = tWidth;
            this.parent.getContentTable().style.width = tWidth;
            freezeWidth = 0;
            for (var i = 0; i < select('.e-movableheader').querySelector('.e-columnheader').children.length; i++) {
                freezeWidth += parseInt(mColGrp.children[0].querySelector('colgroup').children[i].style.width, 10);
            }
            tWidth = formatUnit(freezeWidth);
            select('.e-movableheader').firstElementChild.style.width = tWidth;
            select('.e-movablecontent').firstElementChild.style.width = tWidth;
        }
        else {
            tWidth = formatUnit(this.getTableWidth(this.parent.getColumns()));
            this.parent.getHeaderTable().style.width = tWidth;
            this.parent.getContentTable().style.width = tWidth;
        }
        var edit = this.parent.element.querySelector('.e-table.e-inline-edit');
        if (edit) {
            edit.style.width = tWidth;
        }
    };
    return ColumnWidthService;
}());

var __extends$11 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * FocusStrategy class
 * @hidden
 */
var FocusStrategy = /** @class */ (function () {
    function FocusStrategy(parent) {
        this.currentInfo = {};
        this.oneTime = true;
        this.forget = true;
        this.skipFocus = false;
        this.prevIndexes = {};
        this.parent = parent;
        this.addEventListener();
    }
    FocusStrategy.prototype.focusCheck = function (e) {
        var target = e.target;
        this.skipFocus = closest(target, 'e-pager') !== null;
    };
    FocusStrategy.prototype.onFocus = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.setActive(true);
        var current = this.getContent().matrix.get(0, -1, [0, 1], null, this.getContent().validator());
        this.getContent().matrix.select(current[0], current[1]);
        if (this.skipFocus) {
            this.focus();
            this.skipFocus = false;
        }
    };
    FocusStrategy.prototype.onClick = function (e, force) {
        var isContent = !isNullOrUndefined(closest(e.target, '.e-gridcontent'));
        if (!isContent && isNullOrUndefined(closest(e.target, '.e-gridheader')) ||
            e.target.classList.contains('e-filtermenudiv')) {
            return;
        }
        var beforeArgs = { cancel: false, byKey: false, byClick: !isNullOrUndefined(e.target), clickArgs: e };
        this.parent.notify(beforeCellFocused, beforeArgs);
        if (beforeArgs.cancel) {
            return;
        }
        this.setActive(isContent);
        var returnVal = this.getContent().onClick(e, force);
        if (returnVal === false) {
            return;
        }
        this.focus();
    };
    FocusStrategy.prototype.onKeyPress = function (e) {
        if (this.skipOn(e)) {
            return;
        }
        var beforeArgs = { cancel: false, byKey: true, byClick: false, keyArgs: e };
        this.parent.notify(beforeCellFocused, beforeArgs);
        if (beforeArgs.cancel) {
            return;
        }
        var bValue = this.getContent().matrix.current;
        this.currentInfo.outline = true;
        this.swap = this.getContent().jump(e.action, bValue);
        if (this.swap) {
            var isHeader = this.header === this.getContent();
            this.setActive(isHeader);
            var rowInitVal = isHeader ? -1 : this.header.matrix.matrix.length;
            var current = this.getContent().matrix.get(rowInitVal, bValue[1], [0, 0], e.action, this.getContent().validator());
            this.getContent().matrix.current = [rowInitVal, current[1]];
            this.prevIndexes = {};
        }
        e.preventDefault();
        this.getContent().onKeyPress(e);
        this.focus(e);
    };
    FocusStrategy.prototype.skipOn = function (e) {
        var target = e.target;
        if (!target) {
            return false;
        }
        return (this.parent.editSettings.mode !== 'batch' && (this.parent.isEdit || ['insert', 'f2', 'delete'].indexOf(e.action) > -1)
            || (closest(document.activeElement, '.e-filterbarcell') !== null && ['leftArrow', 'rightArrow'].indexOf(e.action) > -1)
            || (closest(target, '.e-gridcontent') === null && closest(target, '.e-gridheader') === null)
            || (e.action === 'space' && (!target.classList.contains('e-gridchkbox') && closest(target, '.e-gridchkbox') === null
                && closest(target, '.e-headerchkcelldiv') === null)));
    };
    FocusStrategy.prototype.getFocusedElement = function () {
        return this.currentInfo.elementToFocus;
    };
    FocusStrategy.prototype.getContent = function () {
        return this.active || this.content;
    };
    FocusStrategy.prototype.setActive = function (content) {
        this.active = content ? this.content : this.header;
    };
    FocusStrategy.prototype.setFocusedElement = function (element) {
        var _this = this;
        this.currentInfo.elementToFocus = element;
        setTimeout(function () { return _this.currentInfo.elementToFocus.focus(); }, 0);
    };
    FocusStrategy.prototype.focus = function (e) {
        this.removeFocus();
        this.addFocus(this.getContent().getFocusInfo(), e);
    };
    FocusStrategy.prototype.removeFocus = function () {
        if (!this.currentInfo.element) {
            return;
        }
        removeClass([this.currentInfo.element, this.currentInfo.elementToFocus], ['e-focused', 'e-focus']);
        this.currentInfo.elementToFocus.tabIndex = -1;
    };
    FocusStrategy.prototype.addFocus = function (info, e) {
        this.currentInfo = info;
        this.currentInfo.outline = info.outline && !isNullOrUndefined(e);
        if (!info.element) {
            return;
        }
        var isFocused = info.elementToFocus.classList.contains('e-focus');
        if (isFocused) {
            return;
        }
        if (this.currentInfo.outline) {
            addClass([info.element], ['e-focused']);
        }
        addClass([info.elementToFocus], ['e-focus']);
        info.element.tabIndex = 0;
        if (!isFocused) {
            this.setFocusedElement(info.elementToFocus);
        }
        this.parent.notify(cellFocused, {
            element: info.elementToFocus,
            parent: info.element,
            indexes: this.getContent().matrix.current,
            byKey: !isNullOrUndefined(e),
            byClick: isNullOrUndefined(e),
            keyArgs: e,
            isJump: this.swap,
            container: this.getContent().getInfo(e),
            outline: !isNullOrUndefined(e)
        });
        var _a = this.getContent().matrix.current, rowIndex = _a[0], cellIndex = _a[1];
        this.prevIndexes = { rowIndex: rowIndex, cellIndex: cellIndex };
    };
    FocusStrategy.prototype.refreshMatrix = function (content) {
        var _this = this;
        return function (e) {
            if (content && !_this.content) {
                _this.content = new ContentFocus(_this.parent);
            }
            if (!content && !_this.header) {
                _this.header = new HeaderFocus(_this.parent);
            }
            var cFocus = content ? _this.content : _this.header;
            cFocus.matrix.generate(e.rows, cFocus.selector);
            cFocus.generateRows(e.rows);
            var actions = ['paging', 'grouping'];
            if (e.args && actions.indexOf(e.args.requestType) > -1) {
                _this.skipFocus = true;
                _this.onFocus();
            }
        };
    };
    FocusStrategy.prototype.addEventListener = function () {
        var _this = this;
        if (this.parent.isDestroyed || this.parent.frozenColumns || this.parent.frozenRows) {
            return;
        }
        EventHandler.add(this.parent.element, 'mousedown', this.focusCheck, this);
        EventHandler.add(this.parent.element, 'focus', this.onFocus, this);
        this.parent.on(keyPressed, this.onKeyPress, this);
        this.parent.on(click, this.onClick, this);
        this.parent.on(contentReady, this.refreshMatrix(true), this);
        this.parent.on(headerRefreshed, this.refreshMatrix(), this);
        this.parent.on('close-edit', this.restoreFocus, this);
        ['start-edit', 'start-add'].forEach(function (evt) { return _this.parent.on(evt, _this.clearOutline, _this); });
        ['sorting'].forEach(function (action) { return _this.parent.on(action + "-complete", _this.restoreFocus, _this); });
        this.parent.on(batchAdd, this.refreshMatrix(true), this);
        this.parent.on(batchDelete, this.refreshMatrix(true), this);
        this.parent.on(detailDataBound, this.refreshMatrix(true), this);
        this.parent.on(onEmpty, this.refreshMatrix(true), this);
    };
    FocusStrategy.prototype.removeEventListener = function () {
        var _this = this;
        if (this.parent.isDestroyed) {
            return;
        }
        EventHandler.remove(this.parent.element, 'mousedown', this.focusCheck);
        EventHandler.remove(this.parent.element, 'focus', this.onFocus);
        this.parent.off(keyPressed, this.onKeyPress);
        this.parent.off(click, this.onClick);
        this.parent.off(contentReady, this.refreshMatrix(true));
        this.parent.off(headerRefreshed, this.refreshMatrix());
        this.parent.off('close-edit', this.restoreFocus);
        ['start-edit', 'start-add'].forEach(function (evt) { return _this.parent.off(evt, _this.clearOutline); });
        ['sorting'].forEach(function (action) { return _this.parent.off(action + "-complete", _this.restoreFocus); });
        this.parent.off(batchAdd, this.refreshMatrix(true));
        this.parent.off(batchDelete, this.refreshMatrix(true));
        this.parent.off(detailDataBound, this.refreshMatrix(true));
        this.parent.off(onEmpty, this.refreshMatrix(true));
    };
    FocusStrategy.prototype.destroy = function () {
        this.removeEventListener();
    };
    FocusStrategy.prototype.restoreFocus = function () {
        this.addFocus(this.getContent().getFocusInfo());
    };
    FocusStrategy.prototype.clearOutline = function () {
        this.getContent().matrix.current = this.getContent().matrix.get(0, -1, [0, 1], 'downArrow', this.getContent().validator());
        if (!this.currentInfo.element || !this.currentInfo.elementToFocus) {
            return;
        }
        removeClass([this.currentInfo.element, this.currentInfo.elementToFocus], ['e-focus', 'e-focused']);
    };
    FocusStrategy.prototype.getPrevIndexes = function () {
        var forget = this.forget;
        this.forget = false;
        return forget ? { rowIndex: null, cellIndex: null } : this.prevIndexes;
    };
    FocusStrategy.prototype.forgetPrevious = function () {
        this.forget = true;
    };
    return FocusStrategy;
}());
/**
 * Create matrix from row collection which act as mental model for cell navigation
 * @hidden
 */
var Matrix = /** @class */ (function () {
    function Matrix() {
        this.matrix = [];
        this.current = [];
    }
    Matrix.prototype.set = function (rowIndex, columnIndex, allow) {
        rowIndex = Math.max(0, Math.min(rowIndex, this.rows));
        columnIndex = Math.max(0, Math.min(columnIndex, this.columns));
        this.matrix[rowIndex] = this.matrix[rowIndex] || [];
        this.matrix[rowIndex][columnIndex] = allow ? 1 : 0;
    };
    Matrix.prototype.get = function (rowIndex, columnIndex, navigator, action, validator) {
        var tmp = columnIndex;
        if (rowIndex + navigator[0] < 0) {
            return [rowIndex, columnIndex];
        }
        rowIndex = Math.max(0, Math.min(rowIndex + navigator[0], this.rows));
        columnIndex = Math.max(0, Math.min(columnIndex + navigator[1], this.matrix[rowIndex].length - 1));
        var first = this.first(this.matrix[rowIndex], columnIndex, navigator, true, action);
        columnIndex = first === null ? tmp : first; //console.log(`${rowIndex} ${columnIndex}`);
        var val = getValue(rowIndex + "." + columnIndex, this.matrix);
        return this.inValid(val) || !validator(rowIndex, columnIndex, action) ?
            this.get(rowIndex, tmp, navigator, action, validator) : [rowIndex, columnIndex];
    };
    Matrix.prototype.first = function (vector, index, navigator, moveTo, action) {
        if (((index < 0 || index === vector.length) && this.inValid(vector[index])
            && (action !== 'upArrow' && action !== 'downArrow')) || !vector.some(function (v) { return v === 1; })) {
            return null;
        }
        return !this.inValid(vector[index]) ? index :
            this.first(vector, (['upArrow', 'downArrow', 'shiftUp', 'shiftDown'].indexOf(action) !== -1) ? moveTo ? 0 : ++index : index + navigator[1], navigator, false, action);
    };
    Matrix.prototype.select = function (rowIndex, columnIndex) {
        rowIndex = Math.max(0, Math.min(rowIndex, this.rows));
        columnIndex = Math.max(0, Math.min(columnIndex, this.matrix[rowIndex].length - 1));
        this.current = [rowIndex, columnIndex];
    };
    Matrix.prototype.generate = function (rows, selector) {
        var _this = this;
        this.rows = rows.length - 1;
        this.matrix = [];
        rows.forEach(function (row, rIndex) {
            var cells = row.cells.filter(function (c) { return c.isSpanned !== true; });
            _this.columns = Math.max(cells.length - 1, _this.columns | 0);
            cells.forEach(function (cell, cIndex) {
                _this.set(rIndex, cIndex, selector(row, cell));
            });
        });
        return this.matrix;
    };
    Matrix.prototype.inValid = function (value) {
        return value === 0 || value === undefined;
    };
    return Matrix;
}());
/**
 * @hidden
 */
var ContentFocus = /** @class */ (function () {
    function ContentFocus(parent) {
        var _this = this;
        this.matrix = new Matrix();
        this.parent = parent;
        this.keyActions = {
            'rightArrow': [0, 1],
            'tab': [0, 1],
            'leftArrow': [0, -1],
            'shiftTab': [0, -1],
            'upArrow': [-1, 0],
            'downArrow': [1, 0],
            'shiftUp': [-1, 0],
            'shiftDown': [1, 0],
            'shiftRight': [0, 1],
            'shiftLeft': [0, -1],
            'enter': [1, 0],
            'shiftEnter': [-1, 0]
        };
        this.indexesByKey = function (action) {
            var opt = {
                'home': [_this.matrix.current[0], -1, 0, 1],
                'end': [_this.matrix.current[0], _this.matrix.columns + 1, 0, -1],
                'ctrlHome': [0, -1, 0, 1],
                'ctrlEnd': [_this.matrix.rows, _this.matrix.columns + 1, 0, -1]
            };
            return opt[action] || null;
        };
    }
    ContentFocus.prototype.onKeyPress = function (e) {
        var navigator = this.keyActions[e.action];
        var current = this.getCurrentFromAction(e.action, navigator, e.action in this.keyActions, e);
        if (!current) {
            return;
        }
        this.matrix.select(current[0], current[1]);
    };
    ContentFocus.prototype.getCurrentFromAction = function (action, navigator, isPresent, e) {
        if (navigator === void 0) { navigator = [0, 0]; }
        if (!isPresent && !this.indexesByKey(action)) {
            return null;
        }
        if (!this.shouldFocusChange(e)) {
            return this.matrix.current;
        }
        var _a = this.indexesByKey(action) || this.matrix.current.concat(navigator), rowIndex = _a[0], cellIndex = _a[1], rN = _a[2], cN = _a[3];
        var current = this.matrix.get(rowIndex, cellIndex, [rN, cN], action, this.validator());
        return current;
    };
    ContentFocus.prototype.onClick = function (e, force) {
        var target = e.target;
        target = (target.classList.contains('e-rowcell') ? target : closest(target, 'td.e-rowcell'));
        if (!target) {
            return;
        }
        var _a = [target.parentElement.rowIndex, target.cellIndex], rowIndex = _a[0], cellIndex = _a[1];
        var _b = this.matrix.current, oRowIndex = _b[0], oCellIndex = _b[1];
        var val = getValue(rowIndex + "." + cellIndex, this.matrix.matrix);
        if (this.matrix.inValid(val) || (!force && oRowIndex === rowIndex && oCellIndex === cellIndex)) {
            return false;
        }
        this.matrix.select(rowIndex, cellIndex);
    };
    ContentFocus.prototype.getFocusInfo = function () {
        var info = {};
        var _a = this.matrix.current, _b = _a[0], rowIndex = _b === void 0 ? 0 : _b, _c = _a[1], cellIndex = _c === void 0 ? 0 : _c;
        this.matrix.current = [rowIndex, cellIndex];
        info.element = this.parent.getContentTable()
            .rows[rowIndex].cells[cellIndex];
        info.elementToFocus = this.getFocusable(info.element);
        info.outline = !info.element.classList.contains('e-detailcell');
        return info;
    };
    ContentFocus.prototype.getFocusable = function (element) {
        var child = [].slice
            .call(element.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'));
        /* Select the first focusable child element
         * if no child found then select the cell itself.
         */
        return child.length ? child[0] : element;
    };
    ContentFocus.prototype.selector = function (row, cell) {
        var types = [CellType.Expand, CellType.GroupCaption, CellType.CaptionSummary, CellType.GroupSummary];
        return ((row.isDataRow && cell.visible && (cell.isDataCell || cell.isTemplate))
            || (row.isDataRow && cell.cellType === CellType.DetailExpand)
            || (!row.isDataRow && types.indexOf(cell.cellType) > -1)
            || (cell.column && cell.column.type === 'checkbox'))
            && !(row.edit === 'delete' && row.isDirty);
    };
    ContentFocus.prototype.jump = function (action, current) {
        return action === 'upArrow' && current[0] === 0;
    };
    ContentFocus.prototype.generateRows = function (rows) {
        //extend in headerFocus 
    };
    ContentFocus.prototype.getInfo = function (e) {
        var info = this.getFocusInfo();
        var _a = this.matrix.current, rIndex = _a[0], cIndex = _a[1];
        var isData = info.element.classList.contains('e-rowcell');
        var isSelectable = isData || (e && e.action !== 'enter' && (info.element.classList.contains('e-detailrowcollapse')
            || info.element.classList.contains('e-detailrowexpand')));
        var _b = [Math.min(parseInt(info.element.parentElement.getAttribute('aria-rowindex'), 10), rIndex),
            Math.min(parseInt(info.element.getAttribute('aria-colindex'), 10), cIndex)], rowIndex = _b[0], cellIndex = _b[1];
        return { isContent: true, isDataCell: isData, indexes: [rowIndex, cellIndex], isSelectable: isSelectable };
    };
    ContentFocus.prototype.validator = function () {
        var table = this.parent.getContentTable();
        return function (rowIndex, cellIndex, action) {
            var cell = table.rows[rowIndex].cells[cellIndex];
            if (action === 'enter' || action === 'shiftEnter') {
                return cell.classList.contains('e-rowcell');
            }
            if ((action === 'shiftUp' || action === 'shiftDown') && cell.classList.contains('e-rowcell')) {
                return true;
            }
            else if (action !== 'shiftUp' && action !== 'shiftDown') {
                return cell.getBoundingClientRect().width !== 0;
            }
            return false;
        };
    };
    ContentFocus.prototype.shouldFocusChange = function (e) {
        var _a = this.matrix.current, _b = _a[0], rIndex = _b === void 0 ? -1 : _b, _c = _a[1], cIndex = _c === void 0 ? -1 : _c;
        if (rIndex < 0 || cIndex < 0) {
            return true;
        }
        var cell = this.parent.getContentTable().rows[rIndex].cells[cIndex];
        return e.action === 'enter' || e.action === 'shiftEnter' ? cell.classList.contains('e-rowcell') : true;
    };
    return ContentFocus;
}());
/**
 * @hidden
 */
var HeaderFocus = /** @class */ (function (_super) {
    __extends$11(HeaderFocus, _super);
    function HeaderFocus(parent) {
        return _super.call(this, parent) || this;
    }
    HeaderFocus.prototype.onClick = function (e) {
        var target = e.target;
        target = (target.classList.contains('e-headercell') ? target : closest(target, 'th'));
        if (!target) {
            return;
        }
        var _a = [target.parentElement.rowIndex, target.cellIndex], rowIndex = _a[0], cellIndex = _a[1];
        var val = getValue(rowIndex + "." + cellIndex, this.matrix.matrix);
        if (this.matrix.inValid(val)) {
            return false;
        }
        this.matrix.select(target.parentElement.rowIndex, target.cellIndex);
    };
    HeaderFocus.prototype.getFocusInfo = function () {
        var info = {};
        var _a = this.matrix.current, _b = _a[0], rowIndex = _b === void 0 ? 0 : _b, _c = _a[1], cellIndex = _c === void 0 ? 0 : _c;
        info.element = this.parent.getHeaderTable()
            .rows[rowIndex].cells[cellIndex];
        info.elementToFocus = this.getFocusable(info.element);
        info.outline = !info.element.classList.contains('e-filterbarcell');
        return info;
    };
    HeaderFocus.prototype.selector = function (row, cell) {
        return (cell.visible && (cell.column.field !== undefined || cell.isTemplate)) || cell.column.type === 'checkbox';
    };
    HeaderFocus.prototype.jump = function (action, current) {
        return action === 'downArrow' && current[0] === this.matrix.matrix.length - 1;
    };
    HeaderFocus.prototype.generateRows = function (rows) {
        var _this = this;
        var length = this.matrix.matrix.length;
        if (this.parent.allowFiltering && this.parent.filterSettings.type === 'filterbar') {
            this.matrix.rows = ++this.matrix.rows;
            rows[0].cells.forEach(function (cell, cIndex) {
                return _this.matrix.set(length, cIndex, cell.visible && cell.column.allowFiltering !== false);
            });
        }
    };
    HeaderFocus.prototype.getInfo = function () {
        return { isContent: false, isHeader: true };
    };
    HeaderFocus.prototype.validator = function () {
        return function () { return true; };
    };
    HeaderFocus.prototype.shouldFocusChange = function (e) {
        var _a = this.matrix.current, rIndex = _a[0], cIndex = _a[1];
        if (rIndex < 0 || cIndex < 0) {
            return true;
        }
        var cell = this.parent.getHeaderTable().rows[rIndex].cells[cIndex];
        return e.action === 'enter' ? !cell.classList.contains('e-headercell') : true;
    };
    return HeaderFocus;
}(ContentFocus));

var __extends$12 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configures the paging behavior of Grid.
 */
var PageSettings = /** @class */ (function (_super) {
    __extends$12(PageSettings, _super);
    function PageSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(12)
    ], PageSettings.prototype, "pageSize", void 0);
    __decorate$1([
        Property(8)
    ], PageSettings.prototype, "pageCount", void 0);
    __decorate$1([
        Property(1)
    ], PageSettings.prototype, "currentPage", void 0);
    __decorate$1([
        Property()
    ], PageSettings.prototype, "totalRecordsCount", void 0);
    __decorate$1([
        Property(false)
    ], PageSettings.prototype, "enableQueryString", void 0);
    __decorate$1([
        Property(false)
    ], PageSettings.prototype, "pageSizes", void 0);
    __decorate$1([
        Property(null)
    ], PageSettings.prototype, "template", void 0);
    return PageSettings;
}(ChildProperty));

/**
 * `Selection` module is used to handle cell and row selection.
 */
var Selection = /** @class */ (function () {
    /**
     * Constructor for the Grid selection module
     * @hidden
     */
    function Selection(parent, selectionSettings, locator) {
        //Internal variables       
        /**
         * @hidden
         */
        this.selectedRowIndexes = [];
        /**
         * @hidden
         */
        this.selectedRowCellIndexes = [];
        /**
         * @hidden
         */
        this.selectedRecords = [];
        this.preventFocus = false;
        this.isMultiShiftRequest = false;
        this.isMultiCtrlRequest = false;
        this.enableSelectMultiTouch = false;
        this.persistSelection = false;
        this.selectedRowState = {};
        this.isBatchEdit = false;
        this.prevKey = 0;
        this.totalRecordsCount = 0;
        this.isChkAll = false;
        this.isUnChkAll = false;
        this.chkAllCollec = [];
        this.isCheckedOnAdd = false;
        this.persistSelectedData = [];
        this.selectionRequest = false;
        this.parent = parent;
        this.selectionSettings = selectionSettings;
        this.factory = locator.getService('rendererFactory');
        this.focus = locator.getService('focus');
        this.addEventListener();
    }
    Selection.prototype.initializeSelection = function () {
        EventHandler.add(this.parent.getContent(), 'mousedown', this.mouseDownHandler, this);
    };
    /**
     * The function used to trigger onActionBegin
     * @return {void}
     * @hidden
     */
    Selection.prototype.onActionBegin = function (args, type) {
        this.parent.trigger(type, args);
    };
    /**
     * The function used to trigger onActionComplete
     * @return {void}
     * @hidden
     */
    Selection.prototype.onActionComplete = function (args, type) {
        this.parent.trigger(type, args);
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Selection.prototype.getModuleName = function () {
        return 'selection';
    };
    /**
     * To destroy the selection
     * @return {void}
     * @hidden
     */
    Selection.prototype.destroy = function () {
        this.hidePopUp();
        this.clearSelection();
        this.removeEventListener();
        EventHandler.remove(this.parent.getContent(), 'mousedown', this.mouseDownHandler);
    };
    Selection.prototype.isEditing = function () {
        return (this.parent.editSettings.mode === 'inline' || (this.parent.editSettings.mode === 'batch' &&
            this.parent.editModule.formObj && !this.parent.editModule.formObj.validate())) &&
            this.parent.isEdit && !this.persistSelection;
    };
    /**
     * Selects a row by given index.
     * @param  {number} index - Defines the row index.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @return {void}
     */
    Selection.prototype.selectRow = function (index, isToggle) {
        var gObj = this.parent;
        var selectedRow = gObj.getRowByIndex(index);
        var selectData = gObj.getCurrentViewRecords()[index];
        if (!this.isRowType() || !selectedRow || this.isEditing()) {
            // if (this.isEditing()) {
            //     gObj.selectedRowIndex = index;
            // }
            return;
        }
        var isRowSelected = selectedRow.hasAttribute('aria-selected');
        isToggle = !isToggle ? isToggle : index === this.prevRowIndex && isRowSelected;
        if (!isToggle) {
            this.onActionBegin({
                data: selectData, rowIndex: index, isCtrlPressed: this.isMultiCtrlRequest,
                isShiftPressed: this.isMultiShiftRequest, row: selectedRow, previousRow: gObj.getRows()[this.prevRowIndex],
                previousRowIndex: this.prevRowIndex, target: this.target
            }, rowSelecting);
        }
        this.clearRow();
        if (!isToggle) {
            this.updateRowSelection(selectedRow, index);
            this.parent.selectedRowIndex = index;
        }
        this.updateRowProps(index);
        if (!isToggle) {
            this.onActionComplete({
                data: selectData, rowIndex: index,
                row: selectedRow, previousRow: gObj.getRows()[this.prevRowIndex],
                previousRowIndex: this.prevRowIndex, target: this.target
            }, rowSelected);
        }
    };
    /**
     * Selects a range of rows from start and end row index.
     * @param  {number} startIndex - Specifies the start row index.
     * @param  {number} endIndex - Specifies the end row index.
     * @return {void}
     */
    Selection.prototype.selectRowsByRange = function (startIndex, endIndex) {
        this.selectRows(this.getCollectionFromIndexes(startIndex, endIndex));
        this.parent.selectedRowIndex = endIndex;
    };
    /**
     * Selects a collection of rows by indexes.
     * @param  {number[]} rowIndexes - Specifies the row indexes.
     * @return {void}
     */
    Selection.prototype.selectRows = function (rowIndexes) {
        var gObj = this.parent;
        var selectedRow = gObj.getRowByIndex(rowIndexes[0]);
        var selectedData = gObj.getCurrentViewRecords()[rowIndexes[0]];
        if (this.isSingleSel() || !this.isRowType() || this.isEditing()) {
            return;
        }
        this.onActionBegin({
            rowIndexes: rowIndexes, row: selectedRow, rowIndex: rowIndexes[0], target: this.target,
            prevRow: gObj.getRows()[this.prevRowIndex], previousRowIndex: this.prevRowIndex,
            isCtrlPressed: this.isMultiCtrlRequest, isShiftPressed: this.isMultiShiftRequest,
            data: selectedData
        }, rowSelecting);
        this.clearRow();
        for (var _i = 0, rowIndexes_1 = rowIndexes; _i < rowIndexes_1.length; _i++) {
            var rowIndex = rowIndexes_1[_i];
            this.updateRowSelection(gObj.getRowByIndex(rowIndex), rowIndex);
        }
        this.updateRowProps(rowIndexes[0]);
        this.onActionComplete({
            rowIndexes: rowIndexes, row: selectedRow, rowIndex: rowIndexes[0], target: this.target,
            prevRow: gObj.getRows()[this.prevRowIndex], previousRowIndex: this.prevRowIndex,
            data: selectedData
        }, rowSelected);
    };
    /**
     * Select rows with existing row selection by passing row indexes.
     * @param  {number} startIndex - Specifies the row indexes.
     * @return {void}
     * @hidden
     */
    Selection.prototype.addRowsToSelection = function (rowIndexes) {
        var gObj = this.parent;
        var selectedRow = gObj.getRowByIndex(rowIndexes[0]);
        if (this.isSingleSel() || !this.isRowType() || this.isEditing()) {
            return;
        }
        for (var _i = 0, rowIndexes_2 = rowIndexes; _i < rowIndexes_2.length; _i++) {
            var rowIndex = rowIndexes_2[_i];
            var data = gObj.getCurrentViewRecords()[rowIndex];
            var isUnSelected = this.selectedRowIndexes.indexOf(rowIndex) > -1;
            gObj.selectedRowIndex = rowIndex;
            if (isUnSelected) {
                this.rowDeselect(rowDeselecting, [rowIndex], data, [selectedRow]);
                this.selectedRowIndexes.splice(this.selectedRowIndexes.indexOf(rowIndex), 1);
                this.selectedRecords.splice(this.selectedRecords.indexOf(selectedRow), 1);
                selectedRow.removeAttribute('aria-selected');
                this.addRemoveClassesForRow(selectedRow, false, null, 'e-selectionbackground', 'e-active');
                this.rowDeselect(rowDeselecting, [rowIndex], data, [selectedRow]);
            }
            else {
                this.onActionBegin({
                    data: data, rowIndex: rowIndex, row: selectedRow, target: this.target,
                    prevRow: gObj.getRows()[this.prevRowIndex], previousRowIndex: this.prevRowIndex,
                    isCtrlPressed: this.isMultiCtrlRequest, isShiftPressed: this.isMultiShiftRequest
                }, rowSelecting);
                this.updateRowSelection(selectedRow, rowIndex);
            }
            this.updateRowProps(rowIndex);
            if (!isUnSelected) {
                this.onActionComplete({
                    data: data, rowIndex: rowIndex, row: selectedRow, target: this.target,
                    prevRow: gObj.getRows()[this.prevRowIndex], previousRowIndex: this.prevRowIndex
                }, rowSelected);
            }
        }
    };
    Selection.prototype.getCollectionFromIndexes = function (startIndex, endIndex) {
        var indexes = [];
        var _a = (startIndex < endIndex) ?
            { i: startIndex, max: endIndex } : { i: endIndex, max: startIndex }, i = _a.i, max = _a.max;
        for (; i <= max; i++) {
            indexes.push(i);
        }
        if (startIndex > endIndex) {
            indexes.reverse();
        }
        return indexes;
    };
    Selection.prototype.clearRow = function () {
        this.clearRowSelection();
        this.selectedRowIndexes = [];
        this.selectedRecords = [];
        this.parent.selectedRowIndex = -1;
        if (this.selectionSettings.type === 'single' && this.persistSelection) {
            this.selectedRowState = {};
        }
    };
    Selection.prototype.updateRowProps = function (startIndex) {
        this.prevRowIndex = startIndex;
        this.isRowSelected = this.selectedRowIndexes.length && true;
    };
    Selection.prototype.updatePersistCollection = function (selectedRow, chkState) {
        if (this.persistSelection && !isNullOrUndefined(selectedRow)) {
            var rowObj = this.parent.getRowObjectFromUID(selectedRow.getAttribute('data-uid'));
            var pKey = rowObj ? rowObj.data[this.primaryKey] : null;
            if (pKey === null) {
                return;
            }
            rowObj.isSelected = chkState;
            if (chkState) {
                this.selectedRowState[pKey] = chkState;
                if (this.selectionRequest && this.persistSelectedData.indexOf(rowObj.data) < 0) {
                    this.persistSelectedData.push(rowObj.data);
                }
            }
            else {
                delete (this.selectedRowState[pKey]);
                if (this.selectionRequest && this.persistSelectedData.indexOf(rowObj.data) >= 0) {
                    this.persistSelectedData.splice(this.persistSelectedData.indexOf(rowObj.data), 1);
                }
            }
        }
    };
    Selection.prototype.updateCheckBoxes = function (row, chkState) {
        if (!isNullOrUndefined(row)) {
            var chkBox = row.querySelector('.e-checkselect');
            if (!isNullOrUndefined(chkBox)) {
                removeAddCboxClasses(chkBox.nextElementSibling, chkState);
                if (isNullOrUndefined(this.checkedTarget) || (!isNullOrUndefined(this.checkedTarget)
                    && !this.checkedTarget.classList.contains('e-checkselectall'))) {
                    this.setCheckAllState();
                }
            }
        }
    };
    Selection.prototype.updateRowSelection = function (selectedRow, startIndex) {
        if (!selectedRow) {
            return;
        }
        this.selectedRowIndexes.push(startIndex);
        this.selectedRecords.push(selectedRow);
        selectedRow.setAttribute('aria-selected', 'true');
        this.updatePersistCollection(selectedRow, true);
        this.updateCheckBoxes(selectedRow, true);
        this.addRemoveClassesForRow(selectedRow, true, null, 'e-selectionbackground', 'e-active');
        if (!this.preventFocus) {
            var target = this.focus.getPrevIndexes().cellIndex ?
                selectedRow.cells[this.focus.getPrevIndexes().cellIndex] :
                selectedRow.querySelector('.e-selectionbackground:not(.e-hide)');
            if (!target) {
                return;
            }
            this.focus.onClick({ target: target }, true);
        }
    };
    /**
     * Deselects the current selected rows and cells.
     * @return {void}
     */
    Selection.prototype.clearSelection = function () {
        if (!this.persistSelection || (this.persistSelection && !this.parent.isEdit) ||
            (!isNullOrUndefined(this.checkedTarget) && this.checkedTarget.classList.contains('e-checkselectall'))) {
            var span = this.parent.element.querySelector('.e-gridpopup').querySelector('span');
            if (span.classList.contains('e-rowselect')) {
                span.classList.remove('e-spanclicked');
            }
            this.clearRowSelection();
            this.clearCellSelection();
            this.enableSelectMultiTouch = false;
        }
    };
    /**
     * Deselects the current selected rows.
     * @return {void}
     */
    Selection.prototype.clearRowSelection = function () {
        if (this.isRowSelected) {
            var rows = this.parent.getDataRows();
            var data = [];
            var row = [];
            var rowIndex = [];
            var currentViewData = this.parent.getCurrentViewRecords();
            for (var i = 0, len = this.selectedRowIndexes.length; i < len; i++) {
                data.push(currentViewData[this.selectedRowIndexes[i]]);
                row.push(this.parent.getRows()[this.selectedRowIndexes[i]]);
                rowIndex.push(this.selectedRowIndexes[i]);
            }
            this.rowDeselect(rowDeselecting, rowIndex, data, row);
            for (var i = 0, len = this.selectedRowIndexes.length; i < len; i++) {
                var row_1 = this.parent.getRowByIndex(this.selectedRowIndexes[i]);
                if (row_1) {
                    row_1.removeAttribute('aria-selected');
                }
                this.addRemoveClassesForRow(row_1, false, true, 'e-selectionbackground', 'e-active');
                this.updatePersistCollection(row_1, false);
                this.updateCheckBoxes(row_1);
            }
            this.selectedRowIndexes = [];
            this.selectedRecords = [];
            this.isRowSelected = false;
            this.parent.selectedRowIndex = undefined;
            this.rowDeselect(rowDeselected, rowIndex, data, row);
        }
    };
    Selection.prototype.rowDeselect = function (type, rowIndex, data, row) {
        this.updatePersistCollection(row[0], false);
        this.parent.trigger(type, {
            rowIndex: rowIndex, data: data, row: row
        });
        this.updateCheckBoxes(row[0]);
    };
    /**
     * Selects a cell by given index.
     * @param  {IIndex} cellIndex - Defines the row and column index.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @return {void}
     */
    Selection.prototype.selectCell = function (cellIndex, isToggle) {
        if (!this.isCellType()) {
            return;
        }
        var gObj = this.parent;
        var selectedCell = gObj.getCellFromIndex(cellIndex.rowIndex, this.getColIndex(cellIndex.rowIndex, cellIndex.cellIndex));
        this.currentIndex = cellIndex.rowIndex;
        var selectedData = gObj.getCurrentViewRecords()[this.currentIndex];
        if (!this.isCellType() || !selectedCell || this.isEditing()) {
            return;
        }
        var isCellSelected = selectedCell.classList.contains('e-cellselectionbackground');
        isToggle = !isToggle ? isToggle : !(!isUndefined(this.prevCIdxs) &&
            cellIndex.rowIndex === this.prevCIdxs.rowIndex && cellIndex.cellIndex === this.prevCIdxs.cellIndex &&
            isCellSelected);
        if (isToggle) {
            this.onActionBegin({
                data: selectedData, cellIndex: cellIndex, currentCell: selectedCell,
                isCtrlPressed: this.isMultiCtrlRequest, isShiftPressed: this.isMultiShiftRequest, previousRowCellIndex: this.prevECIdxs,
                previousRowCell: this.prevECIdxs ?
                    gObj.getCellFromIndex(this.prevECIdxs.rowIndex, this.prevECIdxs.cellIndex) : undefined
            }, cellSelecting);
        }
        this.clearCell();
        if (isToggle) {
            this.updateCellSelection(selectedCell, cellIndex.rowIndex, cellIndex.cellIndex);
        }
        this.updateCellProps(cellIndex, cellIndex);
        if (isToggle) {
            this.onActionComplete({
                data: selectedData, cellIndex: cellIndex, currentCell: selectedCell,
                previousRowCellIndex: this.prevECIdxs, selectedRowCellIndex: this.selectedRowCellIndexes,
                previousRowCell: this.prevECIdxs ?
                    gObj.getCellFromIndex(this.prevECIdxs.rowIndex, this.prevECIdxs.cellIndex) : undefined
            }, cellSelected);
        }
    };
    /**
     * Selects a range of cells from start and end index.
     * @param  {IIndex} startIndex - Specifies the row and column index of start index.
     * @param  {IIndex} endIndex - Specifies the row and column index of end index.
     * @return {void}
     */
    Selection.prototype.selectCellsByRange = function (startIndex, endIndex) {
        if (!this.isCellType()) {
            return;
        }
        var gObj = this.parent;
        var selectedCell = gObj.getCellFromIndex(startIndex.rowIndex, startIndex.cellIndex);
        var min;
        var max;
        var stIndex = startIndex;
        var edIndex = endIndex = endIndex ? endIndex : startIndex;
        var cellIndexes;
        this.currentIndex = startIndex.rowIndex;
        var selectedData = gObj.getCurrentViewRecords()[this.currentIndex];
        if (this.isSingleSel() || !this.isCellType() || this.isEditing()) {
            return;
        }
        this.onActionBegin({
            data: selectedData, cellIndex: startIndex, currentCell: selectedCell,
            isCtrlPressed: this.isMultiCtrlRequest, isShiftPressed: this.isMultiShiftRequest, previousRowCellIndex: this.prevECIdxs,
            previousRowCell: this.prevECIdxs ? gObj.getCellFromIndex(this.prevECIdxs.rowIndex, this.prevECIdxs.cellIndex) : undefined
        }, cellSelecting);
        this.clearCell();
        if (startIndex.rowIndex > endIndex.rowIndex) {
            var temp = startIndex;
            startIndex = endIndex;
            endIndex = temp;
        }
        for (var i = startIndex.rowIndex; i <= endIndex.rowIndex; i++) {
            if (this.selectionSettings.cellSelectionMode !== 'box') {
                min = i === startIndex.rowIndex ? (startIndex.cellIndex) : 0;
                max = i === endIndex.rowIndex ? (endIndex.cellIndex) : this.getLastColIndex(i);
            }
            else {
                min = startIndex.cellIndex;
                max = endIndex.cellIndex;
            }
            cellIndexes = [];
            for (var j = min < max ? min : max, len = min > max ? min : max; j <= len; j++) {
                selectedCell = gObj.getCellFromIndex(i, j);
                if (!selectedCell) {
                    continue;
                }
                cellIndexes.push(j);
                this.updateCellSelection(selectedCell);
                this.addAttribute(selectedCell);
            }
            this.selectedRowCellIndexes.push({ rowIndex: i, cellIndexes: cellIndexes });
        }
        this.updateCellProps(stIndex, edIndex);
        this.onActionComplete({
            data: selectedData, cellIndex: startIndex, currentCell: selectedCell,
            previousRowCellIndex: this.prevECIdxs, selectedRowCellIndex: this.selectedRowCellIndexes,
            previousRowCell: this.prevECIdxs ? gObj.getCellFromIndex(this.prevECIdxs.rowIndex, this.prevECIdxs.cellIndex) : undefined
        }, cellSelected);
    };
    /**
     * Selects a collection of cells by row and column indexes.
     * @param  {{ rowIndex: number, cellIndexes: number[] }[]} rowCellIndexes - Specifies the row and column indexes.
     * @return {void}
     */
    Selection.prototype.selectCells = function (rowCellIndexes) {
        if (!this.isCellType()) {
            return;
        }
        var gObj = this.parent;
        var selectedCell = gObj.getCellFromIndex(rowCellIndexes[0].rowIndex, rowCellIndexes[0].cellIndexes[0]);
        this.currentIndex = rowCellIndexes[0].rowIndex;
        var selectedData = gObj.getCurrentViewRecords()[this.currentIndex];
        if (this.isSingleSel() || !this.isCellType() || this.isEditing()) {
            return;
        }
        this.onActionBegin({
            data: selectedData, cellIndex: rowCellIndexes[0].cellIndexes[0],
            currentCell: selectedCell, isCtrlPressed: this.isMultiCtrlRequest,
            isShiftPressed: this.isMultiShiftRequest, previousRowCellIndex: this.prevECIdxs,
            previousRowCell: this.prevECIdxs ? gObj.getCellFromIndex(this.prevECIdxs.rowIndex, this.prevECIdxs.cellIndex) : undefined
        }, cellSelecting);
        for (var i = 0, len = rowCellIndexes.length; i < len; i++) {
            for (var j = 0, cellLen = rowCellIndexes[i].cellIndexes.length; j < cellLen; j++) {
                selectedCell = gObj.getCellFromIndex(rowCellIndexes[i].rowIndex, rowCellIndexes[i].cellIndexes[j]);
                if (!selectedCell) {
                    continue;
                }
                this.updateCellSelection(selectedCell);
                this.addAttribute(selectedCell);
                this.addRowCellIndex({ rowIndex: rowCellIndexes[i].rowIndex, cellIndex: rowCellIndexes[i].cellIndexes[j] });
            }
        }
        this.updateCellProps({ rowIndex: rowCellIndexes[0].rowIndex, cellIndex: rowCellIndexes[0].cellIndexes[0] }, { rowIndex: rowCellIndexes[0].rowIndex, cellIndex: rowCellIndexes[0].cellIndexes[0] });
        this.onActionComplete({
            data: selectedData, cellIndex: rowCellIndexes[0].cellIndexes[0],
            currentCell: selectedCell,
            previousRowCellIndex: this.prevECIdxs, selectedRowCellIndex: this.selectedRowCellIndexes,
            previousRowCell: this.prevECIdxs ? gObj.getCellFromIndex(this.prevECIdxs.rowIndex, this.prevECIdxs.cellIndex) : undefined
        }, cellSelected);
    };
    /**
     * Select cells with existing cell selection by passing row and column index.
     * @param  {IIndex} startIndex - Defines the collection of row and column index.
     * @return {void}
     * @hidden
     */
    Selection.prototype.addCellsToSelection = function (cellIndexes) {
        if (!this.isCellType()) {
            return;
        }
        var gObj = this.parent;
        var selectedCell = gObj.getCellFromIndex(cellIndexes[0].rowIndex, this.getColIndex(cellIndexes[0].rowIndex, cellIndexes[0].cellIndex));
        var index;
        this.currentIndex = cellIndexes[0].rowIndex;
        var selectedData = gObj.getCurrentViewRecords()[this.currentIndex];
        if (this.isSingleSel() || !this.isCellType() || this.isEditing()) {
            return;
        }
        for (var _i = 0, cellIndexes_1 = cellIndexes; _i < cellIndexes_1.length; _i++) {
            var cellIndex = cellIndexes_1[_i];
            for (var i = 0, len = this.selectedRowCellIndexes.length; i < len; i++) {
                if (this.selectedRowCellIndexes[i].rowIndex === cellIndex.rowIndex) {
                    index = i;
                    break;
                }
            }
            var args = {
                data: selectedData, cellIndex: cellIndexes[0],
                isShiftPressed: this.isMultiShiftRequest, previousRowCellIndex: this.prevECIdxs,
                currentCell: selectedCell, isCtrlPressed: this.isMultiCtrlRequest,
                previousRowCell: this.prevECIdxs ?
                    gObj.getCellFromIndex(this.prevECIdxs.rowIndex, this.prevECIdxs.cellIndex) : undefined
            };
            var isUnSelected = index > -1;
            if (isUnSelected) {
                var selectedCellIdx = this.selectedRowCellIndexes[index].cellIndexes;
                if (selectedCellIdx.indexOf(cellIndex.cellIndex) > -1) {
                    this.cellDeselect(cellDeselecting, [{ rowIndex: cellIndex.rowIndex, cellIndexes: [cellIndex.cellIndex] }], selectedData, [selectedCell]);
                    selectedCellIdx.splice(selectedCellIdx.indexOf(cellIndex.cellIndex), 1);
                    selectedCell.classList.remove('e-cellselectionbackground');
                    selectedCell.removeAttribute('aria-selected');
                    this.cellDeselect(cellDeselected, [{ rowIndex: cellIndex.rowIndex, cellIndexes: [cellIndex.cellIndex] }], selectedData, [selectedCell]);
                }
                else {
                    isUnSelected = false;
                    this.onActionBegin(args, cellSelecting);
                    this.addRowCellIndex({ rowIndex: cellIndex.rowIndex, cellIndex: cellIndex.cellIndex });
                    this.updateCellSelection(selectedCell);
                    this.addAttribute(selectedCell);
                }
            }
            else {
                this.onActionBegin(args, cellSelecting);
                this.updateCellSelection(selectedCell, cellIndex.rowIndex, cellIndex.cellIndex);
            }
            this.updateCellProps(cellIndex, cellIndex);
            if (!isUnSelected) {
                this.onActionComplete({
                    data: selectedData, cellIndex: cellIndexes[0], currentCell: selectedCell,
                    previousRowCell: this.prevECIdxs ? gObj.getCellFromIndex(this.prevECIdxs.rowIndex, this.prevECIdxs.cellIndex) :
                        undefined, previousRowCellIndex: this.prevECIdxs, selectedRowCellIndex: this.selectedRowCellIndexes
                }, cellSelected);
            }
        }
    };
    Selection.prototype.getColIndex = function (rowIndex, index) {
        var cells = this.parent.getDataRows()[rowIndex].querySelectorAll('td.e-rowcell');
        for (var m = 0; m < cells.length; m++) {
            var colIndex = parseInt(cells[m].getAttribute('aria-colindex'), 10);
            if (colIndex === index) {
                return m;
            }
        }
        return -1;
    };
    Selection.prototype.getLastColIndex = function (rowIndex) {
        var cells = this.parent.getDataRows()[rowIndex].querySelectorAll('td.e-rowcell');
        return parseInt(cells[cells.length - 1].getAttribute('aria-colindex'), 10);
    };
    Selection.prototype.clearCell = function () {
        this.clearCellSelection();
    };
    Selection.prototype.cellDeselect = function (type, cellIndexes, data, cells) {
        if (cells[0] && cells[0].classList.contains('e-gridchkbox')) {
            this.updateCheckBoxes(closest(cells[0], 'tr'));
        }
        this.parent.trigger(type, {
            cells: cells, data: data, cellIndexes: cellIndexes
        });
    };
    Selection.prototype.updateCellSelection = function (selectedCell, rowIndex, cellIndex) {
        if (!isNullOrUndefined(rowIndex)) {
            this.addRowCellIndex({ rowIndex: rowIndex, cellIndex: cellIndex });
        }
        selectedCell.classList.add('e-cellselectionbackground');
        if (selectedCell.classList.contains('e-gridchkbox')) {
            this.updateCheckBoxes(closest(selectedCell, 'tr'), true);
        }
        this.addAttribute(selectedCell);
    };
    Selection.prototype.addAttribute = function (cell) {
        this.target = cell;
        if (!isNullOrUndefined(cell)) {
            cell.setAttribute('aria-selected', 'true');
            if (!this.preventFocus) {
                this.focus.onClick({ target: cell }, true);
            }
        }
    };
    Selection.prototype.updateCellProps = function (startIndex, endIndex) {
        this.prevCIdxs = startIndex;
        this.prevECIdxs = endIndex;
        this.isCellSelected = this.selectedRowCellIndexes.length && true;
    };
    Selection.prototype.addRowCellIndex = function (rowCellIndex) {
        var isRowAvail;
        var index;
        for (var i = 0, len = this.selectedRowCellIndexes.length; i < len; i++) {
            if (this.selectedRowCellIndexes[i].rowIndex === rowCellIndex.rowIndex) {
                isRowAvail = true;
                index = i;
                break;
            }
        }
        if (isRowAvail) {
            if (this.selectedRowCellIndexes[index].cellIndexes.indexOf(rowCellIndex.cellIndex) < 0) {
                this.selectedRowCellIndexes[index].cellIndexes.push(rowCellIndex.cellIndex);
            }
        }
        else {
            this.selectedRowCellIndexes.push({ rowIndex: rowCellIndex.rowIndex, cellIndexes: [rowCellIndex.cellIndex] });
        }
    };
    /**
     * Deselects the current selected cells.
     * @return {void}
     */
    Selection.prototype.clearCellSelection = function () {
        if (this.isCellSelected) {
            var gObj = this.parent;
            var selectedCells = this.getSelectedCellsElement();
            var rowCell = this.selectedRowCellIndexes;
            var data = [];
            var cells = [];
            var currentViewData = gObj.getCurrentViewRecords();
            for (var i = 0, len = rowCell.length; i < len; i++) {
                data.push(currentViewData[rowCell[i].rowIndex]);
                for (var j = 0, cLen = rowCell.length; j < cLen; j++) {
                    cells.push(this.parent.getCellFromIndex(rowCell[i].rowIndex, rowCell[i].cellIndexes[j]));
                }
            }
            this.cellDeselect(cellDeselecting, rowCell, data, cells);
            for (var i = 0, len = selectedCells.length; i < len; i++) {
                selectedCells[i].classList.remove('e-cellselectionbackground');
                selectedCells[i].removeAttribute('aria-selected');
            }
            this.selectedRowCellIndexes = [];
            this.isCellSelected = false;
            this.cellDeselect(cellDeselected, rowCell, data, cells);
        }
    };
    Selection.prototype.getSelectedCellsElement = function () {
        var rows = this.parent.getDataRows();
        var cells = [];
        for (var i = 0, len = rows.length; i < len; i++) {
            cells = cells.concat([].slice.call(rows[i].querySelectorAll('.e-cellselectionbackground')));
        }
        return cells;
    };
    Selection.prototype.mouseMoveHandler = function (e) {
        e.preventDefault();
        var gBRect = this.parent.element.getBoundingClientRect();
        var x1 = this.x;
        var y1 = this.y;
        var position = getPosition(e);
        var x2 = position.x - gBRect.left;
        var y2 = position.y - gBRect.top;
        var tmp;
        var target = closest(e.target, 'tr');
        this.isDragged = true;
        if (!target) {
            target = closest(document.elementFromPoint(this.parent.element.offsetLeft + 2, e.clientY), 'tr');
        }
        if (x1 > x2) {
            tmp = x2;
            x2 = x1;
            x1 = tmp;
        }
        if (y1 > y2) {
            tmp = y2;
            y2 = y1;
            y1 = tmp;
        }
        this.element.style.left = x1 + 'px';
        this.element.style.top = y1 + 'px';
        this.element.style.width = x2 - x1 + 'px';
        this.element.style.height = y2 - y1 + 'px';
        if (target && !e.ctrlKey && !e.shiftKey) {
            var rowIndex = parseInt(target.getAttribute('aria-rowindex'), 10);
            this.selectRowsByRange(this.startIndex, rowIndex);
        }
    };
    Selection.prototype.mouseUpHandler = function (e) {
        document.body.classList.remove('e-disableuserselect');
        remove(this.element);
        EventHandler.remove(this.parent.getContent(), 'mousemove', this.mouseMoveHandler);
        EventHandler.remove(document.body, 'mouseup', this.mouseUpHandler);
        this.isDragged = false;
    };
    Selection.prototype.mouseDownHandler = function (e) {
        var target = e.target;
        var gridElement = parentsUntil(target, 'e-grid');
        if (gridElement && gridElement.id !== this.parent.element.id) {
            return;
        }
        if (e.shiftKey || e.ctrlKey) {
            e.preventDefault();
        }
        if (this.parent.allowRowDragAndDrop && target.classList.contains('e-rowcell') && !e.shiftKey && !e.ctrlKey) {
            if (!this.isRowType() || this.isSingleSel() || closest(target, 'td').classList.contains('e-selectionbackground')) {
                this.isDragged = false;
                return;
            }
            document.body.classList.add('e-disableuserselect');
            var tr = closest(e.target, 'tr');
            var gBRect = this.parent.element.getBoundingClientRect();
            var postion = getPosition(e);
            this.startIndex = parseInt(tr.getAttribute('aria-rowindex'), 10);
            this.x = postion.x - gBRect.left;
            this.y = postion.y - gBRect.top;
            this.element = createElement('div', { className: 'e-griddragarea' });
            this.parent.getContent().appendChild(this.element);
            EventHandler.add(this.parent.getContent(), 'mousemove', this.mouseMoveHandler, this);
            EventHandler.add(document.body, 'mouseup', this.mouseUpHandler, this);
        }
    };
    Selection.prototype.clearSelAfterRefresh = function (e) {
        if (e.requestType !== 'virtualscroll' && !this.persistSelection) {
            this.clearSelection();
        }
    };
    /**
     * @hidden
     */
    Selection.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(initialEnd, this.initializeSelection, this);
        this.parent.on(rowSelectionComplete, this.onActionComplete, this);
        this.parent.on(cellSelectionComplete, this.onActionComplete, this);
        this.parent.on(inBoundModelChanged, this.onPropertyChanged, this);
        this.parent.on(click, this.clickHandler, this);
        this.parent.on(cellFocused, this.onCellFocused, this);
        this.parent.on(dataReady, this.dataReady, this);
        this.parent.on(dataReady, this.clearSelAfterRefresh, this);
        this.parent.on(columnPositionChanged, this.clearSelection, this);
        this.parent.on(contentReady, this.initialEnd, this);
        this.parent.addEventListener(dataBound, this.onDataBound.bind(this));
        this.parent.addEventListener(actionBegin, this.actionBegin.bind(this));
        this.parent.addEventListener(actionComplete, this.actionComplete.bind(this));
        this.parent.on(rowsRemoved, this.rowsRemoved, this);
    };
    /**
     * @hidden
     */
    Selection.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(initialEnd, this.initializeSelection);
        this.parent.off(rowSelectionComplete, this.onActionComplete);
        this.parent.off(cellSelectionComplete, this.onActionComplete);
        this.parent.off(inBoundModelChanged, this.onPropertyChanged);
        this.parent.off(click, this.clickHandler);
        this.parent.off(cellFocused, this.onCellFocused);
        this.parent.off(dataReady, this.dataReady);
        this.parent.off(dataReady, this.clearSelAfterRefresh);
        this.parent.off(columnPositionChanged, this.clearSelection);
        this.parent.removeEventListener(dataBound, this.onDataBound);
        this.parent.removeEventListener(actionBegin, this.actionBegin);
        this.parent.removeEventListener(actionComplete, this.actionComplete);
        this.parent.off(rowsRemoved, this.rowsRemoved);
    };
    Selection.prototype.rowsRemoved = function (e) {
        for (var i = 0; i < e.records.length; i++) {
            delete (this.selectedRowState[e.records[i][this.primaryKey]]);
            --this.totalRecordsCount;
        }
        this.setCheckAllState();
    };
    
    Selection.prototype.dataReady = function (e) {
        if (e.requestType !== 'virtualscroll' && !this.persistSelection) {
            this.clearSelection();
        }
    };
    
    Selection.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        var gObj = this.parent;
        if (!isNullOrUndefined(e.properties.type) && this.selectionSettings.type === 'single') {
            if (this.selectedRowCellIndexes.length > 1) {
                this.clearCellSelection();
            }
            if (this.selectedRowIndexes.length > 1) {
                this.clearRowSelection();
            }
            this.enableSelectMultiTouch = false;
            this.hidePopUp();
        }
        if (!isNullOrUndefined(e.properties.mode) ||
            !isNullOrUndefined(e.properties.cellSelectionMode)) {
            this.clearSelection();
        }
        this.checkBoxSelectionChanged();
    };
    Selection.prototype.hidePopUp = function () {
        if (this.parent.element.querySelector('.e-gridpopup').querySelectorAll('.e-rowselect').length) {
            this.parent.element.querySelector('.e-gridpopup').style.display = 'none';
        }
    };
    Selection.prototype.initialEnd = function () {
        this.parent.off(contentReady, this.initialEnd);
        this.selectRow(this.parent.selectedRowIndex);
        this.checkBoxSelectionChanged();
    };
    Selection.prototype.checkBoxSelectionChanged = function () {
        var isCheckColumn = false;
        for (var _i = 0, _a = this.parent.columns; _i < _a.length; _i++) {
            var col = _a[_i];
            if (col.type === 'checkbox') {
                this.isChkSelection = true;
                this.parent.selectionSettings.type = 'multiple';
                this.chkField = col.field;
                this.totalRecordsCount = this.parent.pageSettings.totalRecordsCount;
                if (isNullOrUndefined(this.totalRecordsCount)) {
                    this.totalRecordsCount = this.parent.getCurrentViewRecords().length;
                }
                this.chkAllBox = this.parent.element.querySelector('.e-checkselectall');
                this.chkAllObj = this.chkAllBox;
                isCheckColumn = true;
                this.parent.element.classList.add('e-checkboxselection');
                break;
            }
        }
        if (!isCheckColumn) {
            this.isChkSelection = false;
            this.chkField = '';
            this.chkAllBox = this.chkAllObj = null;
            this.parent.element.classList.remove('e-checkboxselection');
        }
        if (this.parent.selectionSettings.persistSelection && this.parent.getPrimaryKeyFieldNames().length > 0) {
            this.persistSelection = true;
            this.parent.element.classList.add('e-persistselection');
            this.primaryKey = this.parent.getPrimaryKeyFieldNames()[0];
            if (!this.parent.enableVirtualization && this.chkField && Object.keys(this.selectedRowState).length === 0) {
                var data = this.parent.getDataModule();
                var query = new Query().where(this.chkField, 'equal', true);
                var dataManager = data.getData({}, query);
                var proxy_1 = this;
                this.parent.showSpinner();
                dataManager.then(function (e) {
                    proxy_1.dataSuccess(e.result);
                    proxy_1.refreshPersistSelection();
                    proxy_1.parent.hideSpinner();
                });
            }
        }
        else {
            this.persistSelection = false;
            this.parent.element.classList.remove('e-persistselection');
            this.selectedRowState = {};
        }
    };
    Selection.prototype.dataSuccess = function (res) {
        for (var i = 0; i < res.length; i++) {
            if (isNullOrUndefined(this.selectedRowState[res[i][this.primaryKey]]) && res[i][this.chkField]) {
                this.selectedRowState[res[i][this.primaryKey]] = res[i][this.chkField];
            }
        }
        this.persistSelectedData = res;
    };
    Selection.prototype.refreshPersistSelection = function () {
        this.chkAllBox = this.parent.element.querySelector('.e-checkselectall');
        this.chkAllObj = this.chkAllBox;
        var rows = this.parent.getRows();
        if (rows.length > 0 && (this.persistSelection || this.chkField)) {
            var indexes = [];
            for (var j = 0; j < rows.length; j++) {
                var rowObj = this.parent.getRowObjectFromUID(rows[j].getAttribute('data-uid'));
                var pKey = rowObj ? rowObj.data[this.primaryKey] : null;
                if (pKey === null) {
                    return;
                }
                var checkState = void 0;
                var chkBox = rows[j].querySelector('.e-checkselect');
                if (this.selectedRowState[pKey] || (this.isChkAll && this.chkAllCollec.indexOf(pKey) < 0)
                    || (this.isUnChkAll && this.chkAllCollec.indexOf(pKey) > 0)
                    || (!this.isChkAll && !this.isUnChkAll && this.chkField && rowObj.data[this.chkField]
                        && chkBox.checked)) {
                    indexes.push(parseInt(rows[j].getAttribute('aria-rowindex'), 10));
                    checkState = true;
                }
                else {
                    checkState = false;
                    if (this.checkedTarget !== chkBox && this.isChkSelection) {
                        removeAddCboxClasses(chkBox.nextElementSibling, checkState);
                    }
                }
                this.updatePersistCollection(rows[j], checkState);
            }
            if (this.selectionSettings.type === 'multiple') {
                this.selectRows(indexes);
            }
            else {
                this.clearSelection();
                if (indexes.length > 0) {
                    this.selectRow(indexes[0], true);
                }
            }
        }
        if (this.isChkSelection) {
            this.setCheckAllState();
        }
    };
    Selection.prototype.actionBegin = function (e) {
        if (e.requestType === 'save' && this.persistSelection) {
            var editChkBox = this.parent.element.querySelector('.e-edit-checkselect');
            if (!isNullOrUndefined(editChkBox)) {
                var row = closest(editChkBox, '.e-editedrow');
                if (row) {
                    if (this.parent.editSettings.mode === 'dialog') {
                        row = this.parent.element.querySelector('.e-dlgeditrow');
                    }
                    var rowObj = this.parent.getRowObjectFromUID(row.getAttribute('data-uid'));
                    if (!rowObj) {
                        return;
                    }
                    this.selectedRowState[rowObj.data[this.primaryKey]] = rowObj.isSelected = editChkBox.checked;
                }
                else {
                    this.isCheckedOnAdd = editChkBox.checked;
                }
            }
        }
    };
    Selection.prototype.actionComplete = function (e) {
        if (e.requestType === 'save' && this.persistSelection) {
            if (e.action === 'add' && this.isCheckedOnAdd) {
                var rowObj = this.parent.getRowObjectFromUID(this.parent.getRows()[e.selectedRow].getAttribute('data-uid'));
                this.selectedRowState[rowObj.data[this.primaryKey]] = rowObj.isSelected = this.isCheckedOnAdd;
            }
            this.refreshPersistSelection();
        }
    };
    Selection.prototype.onDataBound = function () {
        if (this.persistSelection || this.chkField) {
            if (this.parent.enableVirtualization) {
                var records = this.parent.getCurrentViewRecords();
                this.dataSuccess(records);
            }
            this.refreshPersistSelection();
        }
    };
    Selection.prototype.checkSelectAllAction = function (checkState) {
        var editForm = this.parent.element.querySelector('.e-gridform');
        this.checkedTarget = this.chkAllBox;
        if (checkState) {
            this.selectRowsByRange(0, this.parent.getCurrentViewRecords().length);
            this.isChkAll = true;
            this.isUnChkAll = false;
        }
        else {
            this.clearSelection();
            this.isUnChkAll = true;
            this.isChkAll = false;
        }
        this.chkAllCollec = [];
        if (this.persistSelection) {
            var rows = this.parent.getRows();
            for (var i = 0; i < rows.length; i++) {
                this.updatePersistCollection(rows[i], checkState);
            }
            if (this.isUnChkAll) {
                this.selectedRowState = {};
                this.persistSelectedData = [];
            }
        }
        if (!isNullOrUndefined(editForm)) {
            var editChkBox = editForm.querySelector('.e-edit-checkselect');
            removeAddCboxClasses(editChkBox.nextElementSibling, checkState);
        }
    };
    Selection.prototype.checkSelectAll = function (checkBox) {
        var state = checkBox.nextElementSibling.classList.contains('e-check');
        this.checkSelectAllAction(!state);
        this.target = null;
        this.setCheckAllState();
        this.triggerChkChangeEvent(checkBox, !state);
    };
    Selection.prototype.checkSelect = function (checkBox) {
        var target = closest(this.checkedTarget, '.e-rowcell');
        this.isMultiCtrlRequest = true;
        var rIndex = parseInt(target.parentElement.getAttribute('aria-rowindex'), 10);
        if (this.persistSelection && this.parent.element.querySelectorAll('.e-addedrow').length > 0) {
            ++rIndex;
        }
        this.rowCellSelectionHandler(rIndex, parseInt(target.getAttribute('aria-colindex'), 10));
        this.moveIntoUncheckCollection(closest(target, '.e-row'));
        this.setCheckAllState();
        this.isMultiCtrlRequest = false;
        this.triggerChkChangeEvent(checkBox, checkBox.nextElementSibling.classList.contains('e-check'));
    };
    Selection.prototype.moveIntoUncheckCollection = function (row) {
        if (this.isChkAll || this.isUnChkAll) {
            var rowObj = this.parent.getRowObjectFromUID(row.getAttribute('data-uid'));
            var pKey = rowObj ? rowObj.data[this.primaryKey] : null;
            if (!pKey) {
                return;
            }
            if (this.chkAllCollec.indexOf(pKey) < 0) {
                this.chkAllCollec.push(pKey);
            }
            else {
                this.chkAllCollec.splice(this.chkAllCollec.indexOf(pKey), 1);
            }
        }
    };
    Selection.prototype.triggerChkChangeEvent = function (checkBox, checkState) {
        this.parent.trigger(checkBoxChange, {
            checked: checkState, selectedRowIndexes: this.parent.getSelectedRowIndexes(),
            target: checkBox
        });
        if (!this.parent.isEdit) {
            this.checkedTarget = null;
        }
    };
    Selection.prototype.setCheckAllState = function () {
        if (this.isChkSelection) {
            var checkedLen = Object.keys(this.selectedRowState).length;
            if (!this.persistSelection) {
                checkedLen = this.selectedRecords.length;
                this.totalRecordsCount = this.parent.getCurrentViewRecords().length;
            }
            var spanEle = this.chkAllBox.nextElementSibling;
            removeClass([spanEle], ['e-check', 'e-stop', 'e-uncheck']);
            if (checkedLen === this.totalRecordsCount || (this.persistSelection && this.parent.allowPaging
                && this.isChkAll && this.chkAllCollec.length === 0)) {
                addClass([spanEle], ['e-check']);
            }
            else if (checkedLen === 0 || this.parent.getCurrentViewRecords().length === 0) {
                addClass([spanEle], ['e-uncheck']);
            }
            else {
                addClass([spanEle], ['e-stop']);
            }
        }
    };
    Selection.prototype.clickHandler = function (e) {
        var target = e.target;
        this.isMultiCtrlRequest = e.ctrlKey || this.enableSelectMultiTouch;
        this.isMultiShiftRequest = e.shiftKey;
        this.popUpClickHandler(e);
        var chkSelect = false;
        this.preventFocus = true;
        var checkBox;
        this.selectionRequest = true;
        var checkWrap = parentsUntil(target, 'e-checkbox-wrapper');
        if (checkWrap && checkWrap.querySelectorAll('.e-checkselect,.e-checkselectall').length > 0) {
            target = checkWrap.querySelector('input[type="checkbox"]');
            checkBox = target;
            chkSelect = true;
        }
        if (target && (target.classList.contains('e-rowcell') && !this.parent.selectionSettings.checkboxOnly) || chkSelect) {
            if (this.isChkSelection) {
                this.isMultiCtrlRequest = true;
            }
            this.target = target;
            if (!isNullOrUndefined(checkBox)) {
                this.checkedTarget = checkBox;
                if (checkBox.classList.contains('e-checkselectall')) {
                    this.checkSelectAll(checkBox);
                }
                else {
                    this.checkSelect(checkBox);
                    this.target = closest(target, '.e-rowcell');
                }
            }
            else {
                var rIndex = parseInt(target.parentElement.getAttribute('aria-rowindex'), 10);
                if (this.persistSelection && this.parent.element.querySelectorAll('.e-addedrow').length > 0) {
                    ++rIndex;
                }
                this.rowCellSelectionHandler(rIndex, parseInt(target.getAttribute('aria-colindex'), 10));
                if (this.isChkSelection) {
                    this.moveIntoUncheckCollection(closest(target, '.e-row'));
                    this.setCheckAllState();
                }
            }
            if (!this.isChkSelection && Browser.isDevice && this.parent.selectionSettings.type === 'multiple') {
                this.showPopup(e);
            }
        }
        this.isMultiCtrlRequest = false;
        this.isMultiShiftRequest = false;
        this.selectionRequest = false;
        this.preventFocus = false;
    };
    Selection.prototype.popUpClickHandler = function (e) {
        var target = e.target;
        if (closest(target, '.e-headercell') || e.target.classList.contains('e-rowcell') ||
            closest(target, '.e-gridpopup')) {
            if (target.classList.contains('e-rowselect')) {
                if (!target.classList.contains('e-spanclicked')) {
                    target.classList.add('e-spanclicked');
                    this.enableSelectMultiTouch = true;
                }
                else {
                    target.classList.remove('e-spanclicked');
                    this.enableSelectMultiTouch = false;
                    this.parent.element.querySelector('.e-gridpopup').style.display = 'none';
                }
            }
        }
        else {
            this.parent.element.querySelector('.e-gridpopup').style.display = 'none';
        }
    };
    Selection.prototype.showPopup = function (e) {
        setCssInGridPopUp(this.parent.element.querySelector('.e-gridpopup'), e, 'e-rowselect e-icons e-icon-rowselect' +
            (this.selectionSettings.type === 'multiple' &&
                (this.selectedRecords.length > 1 || this.selectedRowCellIndexes.length > 1) ? ' e-spanclicked' : ''));
    };
    Selection.prototype.rowCellSelectionHandler = function (rowIndex, cellIndex) {
        if (!this.isMultiCtrlRequest && !this.isMultiShiftRequest) {
            if (!this.isDragged) {
                this.selectRow(rowIndex, true);
            }
            this.selectCell({ rowIndex: rowIndex, cellIndex: cellIndex }, true);
        }
        else if (this.isMultiShiftRequest) {
            this.selectRowsByRange(isUndefined(this.prevRowIndex) ? rowIndex : this.prevRowIndex, rowIndex);
            this.selectCellsByRange(isUndefined(this.prevCIdxs) ? { rowIndex: rowIndex, cellIndex: cellIndex } : this.prevCIdxs, { rowIndex: rowIndex, cellIndex: cellIndex });
        }
        else {
            this.addRowsToSelection([rowIndex]);
            this.addCellsToSelection([{ rowIndex: rowIndex, cellIndex: cellIndex }]);
        }
        this.isDragged = false;
    };
    Selection.prototype.onCellFocused = function (e) {
        var clear = ((e.container.isHeader && e.isJump) || (e.container.isContent && !e.container.isSelectable)) &&
            !(e.byKey && e.keyArgs.action === 'space');
        var headerAction = e.container.isHeader && !(e.byKey && e.keyArgs.action === 'space');
        if (!e.byKey || clear) {
            if (clear) {
                this.clearSelection();
            }
            return;
        }
        var _a = e.container.isContent ? e.container.indexes : e.indexes, rowIndex = _a[0], cellIndex = _a[1];
        var prev = this.focus.getPrevIndexes();
        if (headerAction || (['ctrlPlusA', 'escape'].indexOf(e.keyArgs.action) === -1 && e.keyArgs.action !== 'space' &&
            rowIndex === prev.rowIndex && cellIndex === prev.cellIndex)) {
            return;
        }
        this.preventFocus = true;
        switch (e.keyArgs.action) {
            case 'downArrow':
            case 'upArrow':
            case 'enter':
            case 'shiftEnter':
                this.applyDownUpKey(rowIndex, cellIndex);
                break;
            case 'rightArrow':
            case 'leftArrow':
                this.applyRightLeftKey(rowIndex, cellIndex);
                break;
            case 'shiftDown':
            case 'shiftUp':
                this.shiftDownKey(rowIndex, cellIndex);
                break;
            case 'shiftLeft':
            case 'shiftRight':
                this.applyShiftLeftRightKey(rowIndex, cellIndex);
                break;
            case 'home':
            case 'end':
                this.applyHomeEndKey(rowIndex, cellIndex);
                break;
            case 'ctrlHome':
            case 'ctrlEnd':
                this.applyCtrlHomeEndKey(rowIndex, cellIndex);
                break;
            case 'escape':
                this.clearSelection();
                break;
            case 'ctrlPlusA':
                this.ctrlPlusA();
                break;
            case 'space':
                this.selectionRequest = true;
                var target = e.element;
                if (target.classList.contains('e-checkselectall')) {
                    this.checkedTarget = target;
                    this.checkSelectAll(this.checkedTarget);
                }
                else {
                    if (target.classList.contains('e-checkselect')) {
                        this.checkedTarget = target;
                        this.checkSelect(this.checkedTarget);
                    }
                }
                this.selectionRequest = false;
                break;
        }
        this.preventFocus = false;
    };
    /**
     * Apply ctrl + A key selection
     * @return {void}
     * @hidden
     */
    Selection.prototype.ctrlPlusA = function () {
        if (this.isRowType() && !this.isSingleSel()) {
            this.selectRowsByRange(0, this.parent.getRows().length - 1);
        }
        if (this.isCellType() && !this.isSingleSel()) {
            this.selectCellsByRange({ rowIndex: 0, cellIndex: 0 }, { rowIndex: this.parent.getRows().length - 1, cellIndex: this.parent.getColumns().length - 1 });
        }
    };
    Selection.prototype.applyDownUpKey = function (rowIndex, cellIndex) {
        var gObj = this.parent;
        if (this.isChkSelection && this.isChkAll) {
            this.checkSelectAllAction(false);
            this.checkedTarget = null;
        }
        if (this.isRowType()) {
            this.selectRow(rowIndex, true);
            this.applyUpDown(gObj.selectedRowIndex);
        }
        if (this.isCellType()) {
            this.selectCell({ rowIndex: rowIndex, cellIndex: cellIndex }, true);
        }
    };
    Selection.prototype.applyUpDown = function (rowIndex) {
        if (rowIndex < 0) {
            return;
        }
        if (!this.target) {
            this.target = this.parent.getRows()[0].children[this.parent.groupSettings.columns.length || 0];
        }
        var cIndex = parseInt(this.target.getAttribute('aria-colindex'), 10);
        this.target = this.contentRenderer.getRowByIndex(rowIndex).querySelectorAll('.e-rowcell')[cIndex];
        this.addAttribute(this.target);
    };
    Selection.prototype.applyRightLeftKey = function (rowIndex, cellIndex) {
        var gObj = this.parent;
        if (this.isCellType()) {
            this.selectCell({ rowIndex: rowIndex, cellIndex: cellIndex }, true);
            this.addAttribute(this.target);
        }
    };
    Selection.prototype.applyHomeEndKey = function (rowIndex, cellIndex) {
        if (this.isCellType()) {
            this.selectCell({ rowIndex: rowIndex, cellIndex: cellIndex }, true);
        }
        else {
            this.addAttribute(this.parent.getCellFromIndex(rowIndex, cellIndex));
        }
    };
    /**
     * Apply shift+down key selection
     * @return {void}
     * @hidden
     */
    Selection.prototype.shiftDownKey = function (rowIndex, cellIndex) {
        var gObj = this.parent;
        this.isMultiShiftRequest = true;
        if (this.isRowType() && !this.isSingleSel()) {
            if (!isUndefined(this.prevRowIndex)) {
                this.selectRowsByRange(this.prevRowIndex, rowIndex);
                this.applyUpDown(rowIndex);
            }
            else {
                this.selectRow(0, true);
            }
        }
        if (this.isCellType() && !this.isSingleSel()) {
            this.selectCellsByRange(this.prevCIdxs || { rowIndex: 0, cellIndex: 0 }, { rowIndex: rowIndex, cellIndex: cellIndex });
        }
        this.isMultiShiftRequest = false;
    };
    Selection.prototype.applyShiftLeftRightKey = function (rowIndex, cellIndex) {
        var gObj = this.parent;
        this.isMultiShiftRequest = true;
        this.selectCellsByRange(this.prevCIdxs, { rowIndex: rowIndex, cellIndex: cellIndex });
        this.isMultiShiftRequest = false;
    };
    Selection.prototype.applyCtrlHomeEndKey = function (rowIndex, cellIndex) {
        if (this.isRowType()) {
            this.selectRow(rowIndex, true);
            this.addAttribute(this.parent.getCellFromIndex(rowIndex, cellIndex));
        }
        if (this.isCellType()) {
            this.selectCell({ rowIndex: rowIndex, cellIndex: cellIndex }, true);
        }
    };
    Selection.prototype.addRemoveClassesForRow = function (row, isAdd, clearAll) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        if (row) {
            var cells = [].slice.call(row.querySelectorAll('.e-rowcell'));
            var cell = row.querySelector('.e-detailrowcollapse') || row.querySelector('.e-detailrowexpand');
            if (cell) {
                cells.push(cell);
            }
            addRemoveActiveClasses.apply(void 0, [cells, isAdd].concat(args));
        }
        this.getRenderer().setSelection(row ? row.getAttribute('data-uid') : null, isAdd, clearAll);
    };
    Selection.prototype.isRowType = function () {
        return this.selectionSettings.mode === 'row' || this.selectionSettings.mode === 'both';
    };
    Selection.prototype.isCellType = function () {
        return this.selectionSettings.mode === 'cell' || this.selectionSettings.mode === 'both';
    };
    Selection.prototype.isSingleSel = function () {
        return this.selectionSettings.type === 'single';
    };
    Selection.prototype.getRenderer = function () {
        if (isNullOrUndefined(this.contentRenderer)) {
            this.contentRenderer = this.factory.getRenderer(RenderType.Content);
        }
        return this.contentRenderer;
    };
    /**
     * Gets the collection of selected records.
     * @return {Object[]}
     */
    Selection.prototype.getSelectedRecords = function () {
        var selectedData = [];
        if (!this.selectionSettings.persistSelection) {
            selectedData = this.parent.getRowsObject().filter(function (row) { return row.isSelected; })
                .map(function (m) { return m.data; });
        }
        else {
            selectedData = this.persistSelectedData;
        }
        return selectedData;
    };
    return Selection;
}());

/**
 *
 * `Search` module is used to handle search action.
 */
var Search = /** @class */ (function () {
    /**
     * Constructor for Grid search module.
     * @hidden
     */
    function Search(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * Searches Grid records by given key.
     * @param  {string} searchString - Defines the key.
     * @return {void}
     */
    Search.prototype.search = function (searchString) {
        var gObj = this.parent;
        if (isActionPrevent(gObj)) {
            gObj.notify(preventBatch, { instance: this, handler: this.search, arg1: searchString });
            return;
        }
        searchString = searchString.toLowerCase();
        if (searchString !== gObj.searchSettings.key) {
            gObj.searchSettings.key = searchString;
            gObj.dataBind();
        }
    };
    /**
     * @hidden
     */
    Search.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(inBoundModelChanged, this.onPropertyChanged, this);
        this.parent.on(searchComplete, this.onActionComplete, this);
        this.parent.on(destroy, this.destroy, this);
    };
    /**
     * @hidden
     */
    Search.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(inBoundModelChanged, this.onPropertyChanged);
        this.parent.off(searchComplete, this.onActionComplete);
        this.parent.off(destroy, this.destroy);
    };
    /**
     * To destroy the print
     * @return {void}
     * @hidden
     */
    Search.prototype.destroy = function () {
        this.removeEventListener();
    };
    /**
     * @hidden
     */
    Search.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        if (!isNullOrUndefined(e.properties.key)) {
            this.parent.notify(modelChanged, {
                requestType: 'searching', type: actionBegin, searchString: this.parent.searchSettings.key
            });
        }
        else {
            this.parent.notify(modelChanged, {
                requestType: 'searching', type: actionBegin
            });
        }
    };
    /**
     * The function used to trigger onActionComplete
     * @return {void}
     * @hidden
     */
    Search.prototype.onActionComplete = function (e) {
        this.parent.trigger(actionComplete, extend(e, {
            searchString: this.parent.searchSettings.key, requestType: 'searching', type: actionComplete
        }));
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Search.prototype.getModuleName = function () {
        return 'search';
    };
    return Search;
}());

/**
 * `ShowHide` module is used to control column visibility.
 */
var ShowHide = /** @class */ (function () {
    /**
     * Constructor for the show hide module.
     * @hidden
     */
    function ShowHide(parent) {
        this.parent = parent;
    }
    /**
     * Shows a column by column name.
     * @param  {string|string[]} columnName - Defines a single or collection of column names to show.
     * @param  {string} showBy - Defines the column key either as field name or header text.
     * @return {void}
     */
    ShowHide.prototype.show = function (columnName, showBy) {
        if (this.batchChanges(this.show, columnName, showBy)) {
            return;
        }
        var keys = this.getToggleFields(columnName);
        var columns = this.getColumns(keys, showBy);
        columns.forEach(function (value) {
            value.visible = true;
        });
        this.setVisible(columns);
    };
    /**
     * Hides a column by column name.
     * @param  {string|string[]} columnName - Defines a single or collection of column names to hide.
     * @param  {string} hideBy - Defines the column key either as field name or header text.
     * @return {void}
     */
    ShowHide.prototype.hide = function (columnName, hideBy) {
        if (this.batchChanges(this.hide, columnName, hideBy)) {
            return;
        }
        var keys = this.getToggleFields(columnName);
        var columns = this.getColumns(keys, hideBy);
        columns.forEach(function (value) {
            value.visible = false;
        });
        this.setVisible(columns);
    };
    ShowHide.prototype.batchChanges = function (handler, columnName, showHide) {
        if (isActionPrevent(this.parent)) {
            this.parent.notify(preventBatch, {
                instance: this, handler: handler,
                arg1: columnName, arg2: showHide
            });
            return true;
        }
        return false;
    };
    ShowHide.prototype.getToggleFields = function (key) {
        var finalized = [];
        if (typeof key === 'string') {
            finalized = [key];
        }
        else {
            finalized = key;
        }
        return finalized;
    };
    ShowHide.prototype.getColumns = function (keys, getKeyBy) {
        var _this = this;
        var columns = iterateArrayOrObject(keys, function (key, index) {
            return iterateArrayOrObject(_this.parent.getColumns(), function (item, index) {
                if (item[getKeyBy] === key) {
                    return item;
                }
                return undefined;
            })[0];
        });
        return columns;
    };
    /**
     * Shows or hides columns by given column collection.
     * @private
     * @param  {Column[]} columns - Specifies the columns.
     * @return {void}
     */
    ShowHide.prototype.setVisible = function (columns) {
        columns = isNullOrUndefined(columns) ? this.parent.getColumns() : columns;
        this.parent.notify(columnVisibilityChanged, columns);
    };
    return ShowHide;
}());

/**
 * `Scroll` module is used to handle scrolling behaviour.
 */
var Scroll = /** @class */ (function () {
    /**
     * Constructor for the Grid scrolling.
     * @hidden
     */
    function Scroll(parent) {
        this.lastScrollTop = 0;
        //To maintain scroll state on grid actions.
        this.previousValues = { top: 0, left: 0 };
        this.oneTimeReady = true;
        this.parent = parent;
        this.widthService = new ColumnWidthService(parent);
        this.addEventListener();
    }
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Scroll.prototype.getModuleName = function () {
        return 'scroll';
    };
    /**
     * @hidden
     */
    Scroll.prototype.setWidth = function () {
        this.parent.element.style.width = formatUnit(this.parent.width);
        if (this.parent.toolbarModule && this.parent.toolbarModule.toolbar &&
            this.parent.toolbarModule.toolbar.element) {
            this.parent.toolbarModule.toolbar.refreshOverflow();
        }
    };
    /**
     * @hidden
     */
    Scroll.prototype.setHeight = function () {
        var mHdrHeight = 0;
        var content = this.parent.getContent().firstChild;
        if (this.parent.frozenRows) {
            mHdrHeight =
                this.parent.getHeaderContent().querySelector('tbody').offsetHeight;
            content.style.height = formatUnit(this.parent.height - mHdrHeight);
        }
        else {
            content.style.height = formatUnit(this.parent.height);
        }
        this.ensureOverflow(content);
    };
    /**
     * @hidden
     */
    Scroll.prototype.setPadding = function () {
        var content = this.parent.getHeaderContent();
        var scrollWidth = Scroll.getScrollBarWidth() - this.getThreshold();
        var cssProps = this.getCssProperties();
        content.firstChild.style[cssProps.border] = scrollWidth > 0 ? '1px' : '0px';
        content.style[cssProps.padding] = scrollWidth > 0 ? scrollWidth + 'px' : '0px';
    };
    /**
     * @hidden
     */
    Scroll.prototype.removePadding = function (rtl) {
        var cssProps = this.getCssProperties(rtl);
        this.parent.getHeaderContent().firstChild.style[cssProps.border] = '';
        this.parent.getHeaderContent().firstChild.parentElement.style[cssProps.padding] = '';
    };
    /**
     * Refresh makes the Grid to adopt with height of parent container.
     * > The `height` must be set to 100%.
     * @return
     */
    Scroll.prototype.refresh = function () {
        if (this.parent.height !== '100%') {
            return;
        }
        var content = this.parent.getContent();
        this.parent.element.style.height = '100%';
        var height = this.widthService.getSiblingsHeight(content);
        content.style.height = 'calc(100% - ' + height + 'px)'; //Set the height to the '.e-gridcontent';
    };
    Scroll.prototype.getThreshold = function () {
        /* Some browsers places the scroller outside the content,
         * hence the padding should be adjusted.*/
        var appName = Browser.info.name;
        if (appName === 'mozilla') {
            return 0.5;
        }
        return 1;
    };
    /**
     * @hidden
     */
    Scroll.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(onEmpty, this.wireEvents, this);
        this.parent.on(contentReady, this.wireEvents, this);
        this.parent.on(uiUpdate, this.onPropertyChanged, this);
    };
    /**
     * @hidden
     */
    Scroll.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(onEmpty, this.wireEvents);
        this.parent.off(contentReady, this.wireEvents);
        this.parent.off(uiUpdate, this.onPropertyChanged);
    };
    Scroll.prototype.onContentScroll = function (scrollTarget) {
        var _this = this;
        var element = scrollTarget;
        var isHeader = element.classList.contains('e-headercontent');
        return function (e) {
            if (_this.content.querySelector('tbody') === null) {
                return;
            }
            var target = e.target;
            var left = target.scrollLeft;
            var sLimit = target.scrollWidth;
            var isFooter = target.classList.contains('e-summarycontent');
            if (_this.previousValues.left === left) {
                _this.previousValues.top = !isHeader ? _this.previousValues.top : target.scrollTop;
                return;
            }
            element.scrollLeft = left;
            if (isFooter) {
                _this.header.scrollLeft = left;
            }
            _this.previousValues.left = left;
            _this.parent.notify(scroll, { left: left });
        };
    };
    Scroll.prototype.onFreezeContentScroll = function (scrollTarget) {
        var _this = this;
        var element = scrollTarget;
        return function (e) {
            if (_this.content.querySelector('tbody') === null) {
                return;
            }
            var target = e.target;
            var top = target.scrollTop;
            if (_this.previousValues.top === top) {
                return;
            }
            element.scrollTop = top;
            _this.previousValues.top = top;
            if (_this.parent.isDestroyed) {
                return;
            }
        };
    };
    Scroll.prototype.onWheelScroll = function (scrollTarget) {
        var _this = this;
        var element = scrollTarget;
        return function (e) {
            if (_this.content.querySelector('tbody') === null) {
                return;
            }
            var top = element.scrollTop + e.deltaMode === 1 ? e.deltaY * 30 : e.deltaY;
            if (_this.previousValues.top === top) {
                return;
            }
            e.preventDefault();
            _this.parent.getContent().querySelector('.e-frozencontent').scrollTop = top;
            element.scrollTop = top;
            _this.previousValues.top = top;
        };
    };
    Scroll.prototype.onTouchScroll = function (scrollTarget) {
        var _this = this;
        var element = scrollTarget;
        return function (e) {
            if (e.pointerType === 'mouse') {
                return;
            }
            var cont;
            var mHdr;
            var pageXY = _this.getPointXY(e);
            var top = element.scrollTop + (_this.pageXY.y - pageXY.y);
            var left = element.scrollLeft + (_this.pageXY.x - pageXY.x);
            if (_this.parent.getHeaderContent().contains(e.target)) {
                mHdr = _this.parent.frozenColumns ?
                    _this.parent.getHeaderContent().querySelector('.e-movableheader') : _this.parent.getHeaderContent().firstChild;
                if (_this.previousValues.left === left || (left < 0 || (mHdr.scrollWidth - mHdr.clientWidth) < left)) {
                    return;
                }
                e.preventDefault();
                mHdr.scrollLeft = left;
                element.scrollLeft = left;
                _this.pageXY.x = pageXY.x;
                _this.previousValues.left = left;
            }
            else {
                cont = _this.parent.getContent().querySelector('.e-frozencontent');
                if (_this.previousValues.top === top || (top < 0 || (cont.scrollHeight - cont.clientHeight) < top)) {
                    return;
                }
                e.preventDefault();
                cont.scrollTop = top;
                element.scrollTop = top;
                _this.pageXY.y = pageXY.y;
                _this.previousValues.top = top;
            }
        };
    };
    Scroll.prototype.setPageXY = function () {
        var _this = this;
        return function (e) {
            if (e.pointerType === 'mouse') {
                return;
            }
            _this.pageXY = _this.getPointXY(e);
        };
    };
    Scroll.prototype.getPointXY = function (e) {
        var pageXY = { x: 0, y: 0 };
        if (e.touches && e.touches.length) {
            pageXY.x = e.touches[0].pageX;
            pageXY.y = e.touches[0].pageY;
        }
        else {
            pageXY.x = e.pageX;
            pageXY.y = e.pageY;
        }
        return pageXY;
    };
    Scroll.prototype.wireEvents = function () {
        if (this.oneTimeReady) {
            this.content = this.parent.getContent().firstChild;
            this.header = this.parent.getHeaderContent().firstChild;
            var mCont = this.content.querySelector('.e-movablecontent');
            var fCont = this.content.querySelector('.e-frozencontent');
            var mHdr = this.header.querySelector('.e-movableheader');
            if (this.parent.frozenRows) {
                EventHandler.add(this.parent.frozenColumns ? mHdr : this.header, 'touchstart pointerdown', this.setPageXY(), this);
                EventHandler.add(this.parent.frozenColumns ? mHdr : this.header, 'touchmove pointermove', this.onTouchScroll(this.parent.frozenColumns ? mCont : this.content), this);
            }
            if (this.parent.frozenColumns) {
                EventHandler.add(mCont, 'scroll', this.onContentScroll(mHdr), this);
                EventHandler.add(mCont, 'scroll', this.onFreezeContentScroll(fCont), this);
                EventHandler.add(fCont, 'scroll', this.onFreezeContentScroll(mCont), this);
                EventHandler.add(mHdr, 'scroll', this.onContentScroll(mCont), this);
                EventHandler.add(fCont, 'wheel', this.onWheelScroll(mCont), this);
                EventHandler.add(fCont, 'touchstart pointerdown', this.setPageXY(), this);
                EventHandler.add(fCont, 'touchmove pointermove', this.onTouchScroll(mCont), this);
            }
            else {
                EventHandler.add(this.content, 'scroll', this.onContentScroll(this.header), this);
                EventHandler.add(this.header, 'scroll', this.onContentScroll(this.content), this);
            }
            if (this.parent.aggregates.length) {
                EventHandler.add(this.parent.getFooterContent().firstChild, 'scroll', this.onContentScroll(this.content), this);
            }
            this.refresh();
            this.oneTimeReady = false;
        }
        var table = this.parent.getContentTable();
        if (table.scrollHeight < this.parent.getContent().clientHeight) {
            addClass(table.querySelectorAll('tr:last-child td'), 'e-lastrowcell');
            if (this.parent.frozenColumns) {
                addClass(this.parent.getContent().querySelector('.e-movablecontent').querySelectorAll('tr:last-child td'), 'e-lastrowcell');
            }
        }
        if (!this.parent.enableVirtualization) {
            this.content.scrollLeft = this.header.scrollLeft;
            this.content.scrollTop = this.previousValues.top;
        }
        if (!this.parent.enableColumnVirtualization) {
            this.content.scrollLeft = this.header.scrollLeft;
        }
    };
    /**
     * @hidden
     */
    Scroll.prototype.getCssProperties = function (rtl) {
        var css = {};
        var enableRtl = isNullOrUndefined(rtl) ? this.parent.enableRtl : rtl;
        css.border = enableRtl ? 'borderLeftWidth' : 'borderRightWidth';
        css.padding = enableRtl ? 'paddingLeft' : 'paddingRight';
        return css;
    };
    Scroll.prototype.ensureOverflow = function (content) {
        if (this.parent.frozenColumns) {
            content.querySelector('.e-movablecontent').style.overflowY = this.parent.height === 'auto' ? 'auto' : 'scroll';
        }
        else {
            content.style.overflowY = this.parent.height === 'auto' ? 'auto' : 'scroll';
        }
    };
    Scroll.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        this.setPadding();
        this.oneTimeReady = true;
        if (this.parent.height === 'auto') {
            this.removePadding();
        }
        this.wireEvents();
        this.setHeight();
        this.setWidth();
    };
    /**
     * @hidden
     */
    Scroll.prototype.destroy = function () {
        this.removeEventListener();
        //Remove padding
        this.removePadding();
        removeClass([this.parent.getHeaderContent().firstChild], 'e-headercontent');
        removeClass([this.parent.getContent().firstChild], 'e-content');
        //Remove height
        this.parent.getContent().firstChild.style.height = '';
        //Remove width
        this.parent.element.style.width = '';
        //Remove Dom event
        EventHandler.remove(this.parent.getContent().firstChild, 'scroll', this.onContentScroll);
    };
    /**
     * Function to get the scrollbar width of the browser.
     * @return {number}
     * @hidden
     */
    Scroll.getScrollBarWidth = function () {
        return getScrollBarWidth();
    };
    return Scroll;
}());

/**
 *
 * `Print` module is used to handle the print action.
 */
var Print = /** @class */ (function () {
    /**
     * Constructor for the Grid print module
     * @hidden
     */
    function Print(parent, scrollModule) {
        this.parent = parent;
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(contentReady, this.contentReady.bind(this));
        this.scrollModule = scrollModule;
    }
    /**
     * By default, it prints all the pages of Grid and hides pager.
     * > Customize print options using [`printMode`](http://ej2.syncfusion.com/documentation/grid/api-grid.html#printmode-string).
     * @return {void}
     */
    Print.prototype.print = function () {
        var gObj = this.parent;
        this.isPrinting = true;
        //Todo: close dialog if opened
        this.element = gObj.element.cloneNode(true);
        this.printWindow = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth + ',tabbar=no');
        this.printWindow.moveTo(0, 0);
        this.printWindow.resizeTo(screen.availWidth, screen.availHeight);
        if (gObj.allowPaging) {
            if (gObj.printMode === 'currentpage') {
                this.element.querySelector('.e-gridpager').style.display = 'none';
                this.contentReady();
            }
            else {
                this.isPagerDisabled = true;
                gObj.allowPaging = false;
                gObj.dataBind();
            }
        }
        else {
            this.contentReady();
        }
    };
    Print.prototype.contentReady = function () {
        var gObj = this.parent;
        if (!this.isPrinting) {
            return;
        }
        if (this.isPagerDisabled) {
            this.element = gObj.element.cloneNode(true);
            this.isPagerDisabled = false;
            gObj.allowPaging = true;
            //  gObj.dataBind();
        }
        if (gObj.height !== 'auto') {
            var cssProps = this.scrollModule.getCssProperties();
            var contentDiv = this.element.querySelector('.e-content');
            var headerDiv = this.element.querySelector('.e-gridheader');
            contentDiv.style.height = 'auto';
            contentDiv.style.overflowY = 'auto';
            headerDiv.style[cssProps.padding] = '';
            headerDiv.firstElementChild.style[cssProps.border] = '';
        }
        if (gObj.allowGrouping) {
            if (!gObj.groupSettings.columns.length) {
                this.element.querySelector('.e-groupdroparea').style.display = 'none';
            }
            else {
                this.removeColGroup(gObj.groupSettings.columns.length);
                removeElement(this.element, '.e-grouptopleftcell');
                removeElement(this.element, '.e-recordpluscollapse');
                removeElement(this.element, '.e-indentcell');
                removeElement(this.element, '.e-recordplusexpand');
            }
        }
        //Todo: consider scrolling, toolbar     
        if (gObj.toolbar) {
            this.element.querySelector('.e-toolbar').style.display = 'none';
        }
        if (gObj.allowFiltering && gObj.filterSettings.type === 'filterbar') {
            this.element.querySelector('.e-filterbar').style.display = 'none';
        }
        if (gObj.allowSelection) {
            removeClass(this.element.querySelectorAll('.e-active'), 'e-active');
            removeClass(this.element.querySelectorAll('.e-cellselection1background'), 'e-cellselection1background');
        }
        var args = {
            requestType: 'print', element: this.element,
            selectedRows: gObj.getContentTable().querySelectorAll('tr[aria-selected="true"]')
        };
        gObj.trigger(beforePrint, args);
        print(this.element, this.printWindow);
        this.isPrinting = false;
        gObj.trigger(printComplete, args);
    };
    Print.prototype.removeColGroup = function (depth) {
        var groupCaption = this.element.querySelectorAll('.e-groupcaption');
        var colSpan = groupCaption[depth - 1].getAttribute('colspan');
        for (var i = 0; i < groupCaption.length; i++) {
            groupCaption[i].setAttribute('colspan', colSpan);
        }
        var colGroups = this.element.querySelectorAll('colgroup');
        for (var i = 0; i < colGroups.length; i++) {
            for (var j = 0; j < depth; j++) {
                colGroups[i].childNodes[j].style.display = 'none';
            }
        }
    };
    /**
     * To destroy the print
     * @return {void}
     * @hidden
     */
    Print.prototype.destroy = function () {
        //destroy
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Print.prototype.getModuleName = function () {
        return 'print';
    };
    return Print;
}());

var __extends$13 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configures the Grid aggregate column.
 */
var AggregateColumn = /** @class */ (function (_super) {
    __extends$13(AggregateColumn, _super);
    function AggregateColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.templateFn = {};
        return _this;
    }
    /**
     * @hidden
     */
    AggregateColumn.prototype.setFormatter = function () {
        var valueFormatter = new ValueFormatter();
        if (this.format && (this.format.skeleton || this.format.format)) {
            this.formatFn = valueFormatter.getFormatFunction(this.format);
        }
    };
    /**
     * @hidden
     */
    AggregateColumn.prototype.getFormatter = function () {
        return this.formatFn;
    };
    /**
     * @hidden
     */
    AggregateColumn.prototype.setTemplate = function (helper) {
        if (helper === void 0) { helper = {}; }
        if (this.footerTemplate !== undefined) {
            this.templateFn[getEnumValue(CellType, CellType.Summary)] = { fn: compile(this.footerTemplate, helper),
                property: 'footerTemplate' };
        }
        if (this.groupFooterTemplate !== undefined) {
            this.templateFn[getEnumValue(CellType, CellType.GroupSummary)] = { fn: compile(this.groupFooterTemplate, helper),
                property: 'groupFooterTemplate' };
        }
        if (this.groupCaptionTemplate !== undefined) {
            this.templateFn[getEnumValue(CellType, CellType.CaptionSummary)] = { fn: compile(this.groupCaptionTemplate, helper),
                property: 'groupCaptionTemplate' };
        }
    };
    /**
     * @hidden
     */
    AggregateColumn.prototype.getTemplate = function (type) {
        return this.templateFn[getEnumValue(CellType, type)];
    };
    __decorate$2([
        Property()
    ], AggregateColumn.prototype, "type", void 0);
    __decorate$2([
        Property()
    ], AggregateColumn.prototype, "field", void 0);
    __decorate$2([
        Property()
    ], AggregateColumn.prototype, "columnName", void 0);
    __decorate$2([
        Property()
    ], AggregateColumn.prototype, "format", void 0);
    __decorate$2([
        Property()
    ], AggregateColumn.prototype, "footerTemplate", void 0);
    __decorate$2([
        Property()
    ], AggregateColumn.prototype, "groupFooterTemplate", void 0);
    __decorate$2([
        Property()
    ], AggregateColumn.prototype, "groupCaptionTemplate", void 0);
    __decorate$2([
        Property()
    ], AggregateColumn.prototype, "customAggregate", void 0);
    return AggregateColumn;
}(ChildProperty));
/**
 * Configures the aggregate row.
 */
var AggregateRow = /** @class */ (function (_super) {
    __extends$13(AggregateRow, _super);
    function AggregateRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Collection([], AggregateColumn)
    ], AggregateRow.prototype, "columns", void 0);
    return AggregateRow;
}(ChildProperty));

/**
 * `Clipboard` module is used to handle clipboard copy action.
 */
var Clipboard = /** @class */ (function () {
    /**
     * Constructor for the Grid clipboard module
     * @hidden
     */
    function Clipboard(parent) {
        this.copyContent = '';
        this.isSelect = false;
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * @hidden
     */
    Clipboard.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(contentReady, this.initialEnd, this);
        this.parent.on(keyPressed, this.keyDownHandler, this);
    };
    /**
     * @hidden
     */
    Clipboard.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(keyPressed, this.keyDownHandler);
    };
    Clipboard.prototype.initialEnd = function () {
        this.parent.off(contentReady, this.initialEnd);
        this.clipBoardTextArea = createElement('textarea', {
            className: 'e-clipboard',
            styles: 'opacity: 0',
            attrs: { readonly: 'true' }
        });
        this.parent.element.appendChild(this.clipBoardTextArea);
    };
    Clipboard.prototype.keyDownHandler = function (e) {
        if (e.action === 'ctrlPlusC') {
            this.copy();
        }
        else if (e.action === 'ctrlShiftPlusH') {
            this.copy(true);
        }
    };
    Clipboard.prototype.setCopyData = function (withHeader) {
        if (window.getSelection().toString() === '') {
            this.clipBoardTextArea.value = this.copyContent = '';
            if (this.parent.selectionSettings.mode !== 'cell') {
                var rows = this.parent.getRows();
                var selectedIndexes = this.parent.getSelectedRowIndexes().sort(function (a, b) { return a - b; });
                if (withHeader) {
                    this.getCopyData([].slice.call(this.parent.element.querySelectorAll('.e-headercell')), false, '\t', withHeader);
                    this.copyContent += '\n';
                }
                for (var i = 0; i < selectedIndexes.length; i++) {
                    if (i > 0) {
                        this.copyContent += '\n';
                    }
                    this.getCopyData([].slice.call(rows[selectedIndexes[i]].querySelectorAll('.e-rowcell')), false, '\t', withHeader);
                }
            }
            else {
                this.getCopyData([].slice.call(this.parent.element.querySelectorAll('.e-cellselectionbackground')), true, '\n', withHeader);
            }
            var args = {
                data: this.copyContent,
                cancel: false,
            };
            this.parent.trigger(beforeCopy, args);
            if (args.cancel) {
                return;
            }
            this.clipBoardTextArea.value = this.copyContent = args.data;
            if (!Browser.userAgent.match(/ipad|ipod|iphone/i)) {
                this.clipBoardTextArea.select();
            }
            else {
                this.clipBoardTextArea.setSelectionRange(0, this.clipBoardTextArea.value.length);
            }
            this.isSelect = true;
        }
    };
    Clipboard.prototype.getCopyData = function (cells, isCell, splitKey, withHeader) {
        for (var j = 0; j < cells.length; j++) {
            if (withHeader && isCell) {
                this.copyContent += this.parent.getVisibleColumns()[parseInt(cells[j].getAttribute('aria-colindex'), 10)].headerText + '\n';
            }
            this.copyContent += cells[j].textContent;
            if (j < cells.length - 1) {
                this.copyContent += splitKey;
            }
        }
    };
    /**
     * Copy selected rows or cells data into clipboard.
     * @param {boolean} withHeader - Specifies whether the column header data need to be copied or not.
     */
    Clipboard.prototype.copy = function (withHeader) {
        if (document.queryCommandSupported('copy')) {
            this.setCopyData(withHeader);
            document.execCommand('copy');
            this.clipBoardTextArea.blur();
        }
        if (this.isSelect) {
            window.getSelection().removeAllRanges();
            this.isSelect = false;
        }
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Clipboard.prototype.getModuleName = function () {
        return 'clipboard';
    };
    /**
     * To destroy the clipboard
     * @return {void}
     * @hidden
     */
    Clipboard.prototype.destroy = function () {
        this.removeEventListener();
        remove(this.clipBoardTextArea);
    };
    return Clipboard;
}());

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Represents the field name and direction of sort column.
 */
var SortDescriptor = /** @class */ (function (_super) {
    __extends(SortDescriptor, _super);
    function SortDescriptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], SortDescriptor.prototype, "field", void 0);
    __decorate([
        Property()
    ], SortDescriptor.prototype, "direction", void 0);
    return SortDescriptor;
}(ChildProperty));
/**
 * Configures the sorting behavior of Grid.
 */
var SortSettings = /** @class */ (function (_super) {
    __extends(SortSettings, _super);
    function SortSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Collection([], SortDescriptor)
    ], SortSettings.prototype, "columns", void 0);
    __decorate([
        Property(true)
    ], SortSettings.prototype, "allowUnsort", void 0);
    return SortSettings;
}(ChildProperty));
/**
 * Represents the predicate for filter column.
 */
var Predicate$1 = /** @class */ (function (_super) {
    __extends(Predicate$$1, _super);
    function Predicate$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], Predicate$$1.prototype, "field", void 0);
    __decorate([
        Property()
    ], Predicate$$1.prototype, "operator", void 0);
    __decorate([
        Property()
    ], Predicate$$1.prototype, "value", void 0);
    __decorate([
        Property()
    ], Predicate$$1.prototype, "matchCase", void 0);
    __decorate([
        Property()
    ], Predicate$$1.prototype, "predicate", void 0);
    __decorate([
        Property({})
    ], Predicate$$1.prototype, "actualFilterValue", void 0);
    __decorate([
        Property({})
    ], Predicate$$1.prototype, "actualOperator", void 0);
    __decorate([
        Property()
    ], Predicate$$1.prototype, "type", void 0);
    __decorate([
        Property()
    ], Predicate$$1.prototype, "ejpredicate", void 0);
    __decorate([
        Property()
    ], Predicate$$1.prototype, "matchcase", void 0);
    __decorate([
        Property()
    ], Predicate$$1.prototype, "ignoreCase", void 0);
    return Predicate$$1;
}(ChildProperty));
/**
 * Configures the filtering behavior of Grid..
 */
var FilterSettings = /** @class */ (function (_super) {
    __extends(FilterSettings, _super);
    function FilterSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Collection([], Predicate$1)
    ], FilterSettings.prototype, "columns", void 0);
    __decorate([
        Property('filterbar')
    ], FilterSettings.prototype, "type", void 0);
    __decorate([
        Property()
    ], FilterSettings.prototype, "mode", void 0);
    __decorate([
        Property(true)
    ], FilterSettings.prototype, "showFilterBarStatus", void 0);
    __decorate([
        Property(1500)
    ], FilterSettings.prototype, "immediateModeDelay", void 0);
    __decorate([
        Property()
    ], FilterSettings.prototype, "operators", void 0);
    return FilterSettings;
}(ChildProperty));
/**
 * Configures the selection behavior of Grid.
 */
var SelectionSettings = /** @class */ (function (_super) {
    __extends(SelectionSettings, _super);
    function SelectionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('row')
    ], SelectionSettings.prototype, "mode", void 0);
    __decorate([
        Property('flow')
    ], SelectionSettings.prototype, "cellSelectionMode", void 0);
    __decorate([
        Property('single')
    ], SelectionSettings.prototype, "type", void 0);
    __decorate([
        Property(false)
    ], SelectionSettings.prototype, "checkboxOnly", void 0);
    __decorate([
        Property(false)
    ], SelectionSettings.prototype, "persistSelection", void 0);
    return SelectionSettings;
}(ChildProperty));
/**
 * Configures the search behavior of Grid.
 */
var SearchSettings = /** @class */ (function (_super) {
    __extends(SearchSettings, _super);
    function SearchSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property([])
    ], SearchSettings.prototype, "fields", void 0);
    __decorate([
        Property('')
    ], SearchSettings.prototype, "key", void 0);
    __decorate([
        Property('contains')
    ], SearchSettings.prototype, "operator", void 0);
    __decorate([
        Property(true)
    ], SearchSettings.prototype, "ignoreCase", void 0);
    return SearchSettings;
}(ChildProperty));
/**
 * Configures the row drop settings of the Grid.
 */
var RowDropSettings = /** @class */ (function (_super) {
    __extends(RowDropSettings, _super);
    function RowDropSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], RowDropSettings.prototype, "targetID", void 0);
    return RowDropSettings;
}(ChildProperty));
/**
 * Configures the text wrap settings of the Grid.
 */
var TextWrapSettings = /** @class */ (function (_super) {
    __extends(TextWrapSettings, _super);
    function TextWrapSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('both')
    ], TextWrapSettings.prototype, "wrapMode", void 0);
    return TextWrapSettings;
}(ChildProperty));
/**
 * Configures the group behavior of the Grid.
 */
var GroupSettings = /** @class */ (function (_super) {
    __extends(GroupSettings, _super);
    function GroupSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], GroupSettings.prototype, "showDropArea", void 0);
    __decorate([
        Property(false)
    ], GroupSettings.prototype, "showToggleButton", void 0);
    __decorate([
        Property(false)
    ], GroupSettings.prototype, "showGroupedColumn", void 0);
    __decorate([
        Property(true)
    ], GroupSettings.prototype, "showUngroupButton", void 0);
    __decorate([
        Property(false)
    ], GroupSettings.prototype, "disablePageWiseAggregates", void 0);
    __decorate([
        Property([])
    ], GroupSettings.prototype, "columns", void 0);
    __decorate([
        Property()
    ], GroupSettings.prototype, "captionTemplate", void 0);
    return GroupSettings;
}(ChildProperty));
/**
 * Configures the edit behavior of the Grid.
 */
var EditSettings = /** @class */ (function (_super) {
    __extends(EditSettings, _super);
    function EditSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], EditSettings.prototype, "allowAdding", void 0);
    __decorate([
        Property(false)
    ], EditSettings.prototype, "allowEditing", void 0);
    __decorate([
        Property(false)
    ], EditSettings.prototype, "allowDeleting", void 0);
    __decorate([
        Property('normal')
    ], EditSettings.prototype, "mode", void 0);
    __decorate([
        Property(true)
    ], EditSettings.prototype, "allowEditOnDblClick", void 0);
    __decorate([
        Property(true)
    ], EditSettings.prototype, "showConfirmDialog", void 0);
    __decorate([
        Property(false)
    ], EditSettings.prototype, "showDeleteConfirmDialog", void 0);
    return EditSettings;
}(ChildProperty));
/**
 * Represents the Grid component.
 * ```html
 * <div id="grid"></div>
 * <script>
 *  var gridObj = new Grid({ allowPaging: true });
 *  gridObj.appendTo("#grid");
 * </script>
 * ```
 */
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    /**
     * Constructor for creating the component
     * @hidden
     */
    function Grid(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isInitial = true;
        _this.sortedColumns = [];
        _this.inViewIndexes = [];
        _this.mediaCol = [];
        _this.isMediaQuery = false;
        _this.isInitialLoad = false;
        _this.freezeRefresh = Component.prototype.refresh;
        /**
         * @hidden
         */
        _this.mergeCells = {};
        /** @hidden */
        _this.isEdit = false;
        /** @hidden */
        _this.filterOperators = {
            contains: 'contains', endsWith: 'endswith', equal: 'equal', greaterThan: 'greaterthan', greaterThanOrEqual: 'greaterthanorequal',
            lessThan: 'lessthan', lessThanOrEqual: 'lessthanorequal', notEqual: 'notequal', startsWith: 'startswith'
        };
        _this.defaultLocale = {
            EmptyRecord: 'No records to display',
            True: 'true',
            False: 'false',
            InvalidFilterMessage: 'Invalid Filter Data',
            GroupDropArea: 'Drag a column header here to group its column',
            UnGroup: 'Click here to ungroup',
            GroupDisable: 'Grouping is disabled for this column',
            FilterbarTitle: '\'s filter bar cell',
            EmptyDataSourceError: 'DataSource must not be empty at initial load since columns are generated from dataSource in AutoGenerate Column Grid',
            // Toolbar Items
            Add: 'Add',
            Edit: 'Edit',
            Cancel: 'Cancel',
            Update: 'Update',
            Delete: 'Delete',
            Print: 'Print',
            Pdfexport: 'PDF Export',
            Excelexport: 'Excel Export',
            Wordexport: 'Word Export',
            Csvexport: 'CSV Export',
            Search: 'Search',
            Save: 'Save',
            Item: 'item',
            Items: 'items',
            EditOperationAlert: 'No records selected for edit operation',
            DeleteOperationAlert: 'No records selected for delete operation',
            SaveButton: 'Save',
            OKButton: 'OK',
            CancelButton: 'Cancel',
            EditFormTitle: 'Details of ',
            AddFormTitle: 'Add New Record',
            BatchSaveConfirm: 'Are you sure you want to save changes?',
            BatchSaveLostChanges: 'Unsaved changes will be lost. Are you sure you want to continue?',
            ConfirmDelete: 'Are you sure you want to Delete Record?',
            CancelEdit: 'Are you sure you want to Cancel the changes?',
            ChooseColumns: 'Choose Column',
            SearchColumns: 'search columns',
            Matchs: 'No Matches Found',
            FilterButton: 'Filter',
            ClearButton: 'Clear',
            StartsWith: 'Starts With',
            EndsWith: 'Ends With',
            Contains: 'Contains',
            Equal: 'Equal',
            NotEqual: 'Not Equal',
            LessThan: 'Less Than',
            LessThanOrEqual: 'Less Than Or Equal',
            GreaterThan: 'Greater Than',
            GreaterThanOrEqual: 'Greater Than Or Equal',
            ChooseDate: 'Choose a Date',
            EnterValue: 'Enter the value',
            Copy: 'Copy',
            Group: 'Group by this column',
            Ungroup: 'Ungroup by this column',
            autoFitAll: 'Auto Fit all columns',
            autoFit: 'Auto Fit this column',
            Export: 'Export',
            FirstPage: 'First Page',
            LastPage: 'Last Page',
            PreviousPage: 'Previous Page',
            NextPage: 'Next Page',
            SortAscending: 'Sort Ascending',
            SortDescending: 'Sort Descending',
            EditRecord: 'Edit Record',
            DeleteRecord: 'Delete Record',
            FilterMenu: 'Filter',
            Columnchooser: 'Columns'
        };
        _this.keyConfigs = {
            downArrow: 'downarrow',
            upArrow: 'uparrow',
            rightArrow: 'rightarrow',
            leftArrow: 'leftarrow',
            shiftDown: 'shift+downarrow',
            shiftUp: 'shift+uparrow',
            shiftRight: 'shift+rightarrow',
            shiftLeft: 'shift+leftarrow',
            home: 'home',
            end: 'end',
            escape: 'escape',
            ctrlHome: 'ctrl+home',
            ctrlEnd: 'ctrl+end',
            pageUp: 'pageup',
            pageDown: 'pagedown',
            ctrlAltPageUp: 'ctrl+alt+pageup',
            ctrlAltPageDown: 'ctrl+alt+pagedown',
            altPageUp: 'alt+pageup',
            altPageDown: 'alt+pagedown',
            altDownArrow: 'alt+downarrow',
            altUpArrow: 'alt+uparrow',
            ctrlDownArrow: 'ctrl+downarrow',
            ctrlUpArrow: 'ctrl+uparrow',
            ctrlPlusA: 'ctrl+A',
            ctrlPlusP: 'ctrl+P',
            insert: 'insert',
            delete: 'delete',
            f2: 'f2',
            enter: 'enter',
            ctrlEnter: 'ctrl+enter',
            shiftEnter: 'shift+enter',
            tab: 'tab',
            shiftTab: 'shift+tab',
            space: 'space',
            ctrlPlusC: 'ctrl+C',
            ctrlShiftPlusH: 'ctrl+shift+H'
        };
        setValue('mergePersistData', _this.mergePersistGridData, _this);
        return _this;
    }
    /**
     * Get the properties to be maintained in the persisted state.
     * @return {string}
     * @hidden
     */
    Grid.prototype.getPersistData = function () {
        var _this = this;
        var keyEntity = ['pageSettings', 'sortSettings',
            'filterSettings', 'groupSettings', 'columns', 'searchSettings', 'selectedRowIndex'];
        var ignoreOnPersist = {
            pageSettings: ['template', 'pageSizes', 'enableQueryString', 'totalRecordsCount', 'pageCount'],
            filterSettings: ['type', 'mode', 'showFilterBarStatus', 'immediateModeDelay'],
            groupSettings: ['showDropArea', 'showToggleButton', 'showGroupedColumn', 'showUngroupButton',
                'disablePageWiseAggregates', 'hideCaptionCount'],
            searchSettings: ['fields', 'operator', 'ignoreCase'],
            sortSettings: [], columns: [], selectedRowIndex: []
        };
        var ignoreOnColumn = ['filter', 'edit', 'filterBarTemplate', 'headerTemplate', 'template',
            'commandTemplate', 'commands'];
        keyEntity.forEach(function (value) {
            var currentObject = _this[value];
            for (var _i = 0, _a = ignoreOnPersist[value]; _i < _a.length; _i++) {
                var val = _a[_i];
                delete currentObject[val];
            }
        });
        this.ignoreInArrays(ignoreOnColumn, this.columns);
        return this.addOnPersist(keyEntity);
    };
    Grid.prototype.ignoreInArrays = function (ignoreOnColumn, columns) {
        var _this = this;
        columns.forEach(function (column) {
            if (column.columns) {
                _this.ignoreInColumn(ignoreOnColumn, column);
                _this.ignoreInArrays(ignoreOnColumn, column.columns);
            }
            else {
                _this.ignoreInColumn(ignoreOnColumn, column);
            }
        });
    };
    Grid.prototype.ignoreInColumn = function (ignoreOnColumn, column) {
        ignoreOnColumn.forEach(function (val) {
            delete column[val];
        });
    };
    /**
     * To provide the array of modules needed for component rendering
     * @return {ModuleDeclaration[]}
     * @hidden
     */
    Grid.prototype.requiredModules = function () {
        var modules = [];
        if (this.allowFiltering) {
            modules.push({
                member: 'filter',
                args: [this, this.filterSettings, this.serviceLocator]
            });
        }
        if (this.allowExcelExport) {
            modules.push({
                member: 'ExcelExport',
                args: [this]
            });
        }
        if (this.allowPdfExport) {
            modules.push({
                member: 'PdfExport',
                args: [this]
            });
        }
        if (this.allowSorting) {
            modules.push({
                member: 'sort',
                args: [this, this.sortSettings, this.sortedColumns, this.serviceLocator]
            });
        }
        if (this.allowPaging) {
            modules.push({
                member: 'pager',
                args: [this, this.pageSettings]
            });
        }
        if (this.allowSelection) {
            modules.push({
                member: 'selection',
                args: [this, this.selectionSettings, this.serviceLocator]
            });
        }
        modules.push({
            member: 'resize',
            args: [this]
        });
        if (this.allowReordering) {
            modules.push({
                member: 'reorder',
                args: [this]
            });
        }
        if (this.allowRowDragAndDrop) {
            modules.push({
                member: 'rowDragAndDrop',
                args: [this]
            });
        }
        if (this.allowGrouping) {
            modules.push({
                member: 'group',
                args: [this, this.groupSettings, this.sortedColumns, this.serviceLocator]
            });
        }
        if (this.aggregates.length) {
            modules.push({ member: 'aggregate', args: [this, this.serviceLocator] });
        }
        if (this.isDetail()) {
            modules.push({
                member: 'detailRow',
                args: [this, this.serviceLocator]
            });
        }
        if (this.toolbar || this.toolbarTemplate) {
            modules.push({
                member: 'toolbar',
                args: [this, this.serviceLocator]
            });
        }
        if (this.enableVirtualization || this.enableColumnVirtualization) {
            modules.push({
                member: 'virtualscroll',
                args: [this, this.serviceLocator]
            });
        }
        if (this.frozenColumns || this.frozenRows) {
            modules.push({ member: 'freeze', args: [this, this.serviceLocator] });
        }
        if (this.editSettings.allowAdding || this.editSettings.allowDeleting || this.editSettings.allowEditing) {
            modules.push({
                member: 'edit',
                args: [this, this.serviceLocator]
            });
        }
        this.extendRequiredModules(modules);
        return modules;
    };
    Grid.prototype.extendRequiredModules = function (modules) {
        if (this.isCommandColumn(this.columns)) {
            modules.push({
                member: 'commandColumn',
                args: [this, this.serviceLocator]
            });
        }
        if (this.contextMenuItems) {
            modules.push({
                member: 'contextMenu',
                args: [this, this.serviceLocator]
            });
        }
        if (this.showColumnMenu) {
            modules.push({
                member: 'columnMenu',
                args: [this, this.serviceLocator]
            });
        }
        if (this.showColumnChooser) {
            modules.push({
                member: 'columnChooser',
                args: [this, this.serviceLocator]
            });
        }
    };
    /**
     * For internal use only - Initialize the event handler;
     * @private
     */
    Grid.prototype.preRender = function () {
        this.serviceLocator = new ServiceLocator;
        this.initializeServices();
    };
    /**
     * For internal use only - To Initialize the component rendering.
     * @private
     */
    Grid.prototype.render = function () {
        this.ariaService.setOptions(this.element, { role: 'grid' });
        createSpinner({ target: this.element });
        this.renderModule = new Render(this, this.serviceLocator);
        this.getMediaColumns();
        this.searchModule = new Search(this);
        this.scrollModule = new Scroll(this);
        this.notify(initialLoad, {});
        this.trigger(load);
        prepareColumns(this.columns, this.enableColumnVirtualization);
        this.getColumns();
        this.processModel();
        this.gridRender();
        this.wireEvents();
        this.addListener();
        this.updateDefaultCursor();
        this.showSpinner();
        this.notify(initialEnd, {});
    };
    /**
     * Method used to show the spinner.
     */
    Grid.prototype.showSpinner = function () {
        showSpinner(this.element);
    };
    /**
     * Method used to hide the spinner.
     */
    Grid.prototype.hideSpinner = function () {
        hideSpinner(this.element);
    };
    Grid.prototype.getMediaColumns = function () {
        if (!this.enableColumnVirtualization) {
            var gcol = this.getColumns();
            this.getShowHideService = this.serviceLocator.getService('showHideService');
            if (!isNullOrUndefined(gcol)) {
                for (var index = 0; index < gcol.length; index++) {
                    if (!isNullOrUndefined(gcol[index].hideAtMedia)) {
                        this.mediaCol.push(gcol[index]);
                        var media = window.matchMedia(gcol[index].hideAtMedia);
                        this.mediaQueryUpdate(index, media);
                        media.addListener(this.mediaQueryUpdate.bind(this, index));
                    }
                }
            }
        }
    };
    /**
     * @hidden
     */
    Grid.prototype.mediaQueryUpdate = function (columnIndex, e) {
        this.isMediaQuery = true;
        var col = this.getColumns()[columnIndex];
        col.visible = e.matches;
        if (this.isInitialLoad) {
            if (col.visible) {
                this.showHider.show(col.headerText, 'headerText');
            }
            else {
                this.showHider.hide(col.headerText, 'headerText');
            }
        }
    };
    Grid.prototype.refreshMediaCol = function () {
        if (this.isMediaQuery) {
            this.refresh();
            this.isMediaQuery = false;
        }
        this.isInitialLoad = true;
    };
    /**
     * For internal use only - Initialize the event handler
     * @private
     */
    Grid.prototype.eventInitializer = function () {
        //eventInitializer
    };
    /**
     * To destroy the component(Detaches/removes all event handlers, attributes, classes and empty the component element).
     * @method destroy
     * @return {void}
     */
    Grid.prototype.destroy = function () {
        this.unwireEvents();
        this.removeListener();
        this.notify(destroy, {});
        this.destroyDependentModules();
        _super.prototype.destroy.call(this);
        this.element.innerHTML = '';
        classList(this.element, [], ['e-rtl', 'e-gridhover', 'e-responsive', 'e-default', 'e-device']);
    };
    Grid.prototype.destroyDependentModules = function () {
        this.scrollModule.destroy();
        this.keyboardModule.destroy();
        this.focusModule.destroy();
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Grid.prototype.getModuleName = function () {
        return 'grid';
    };
    /**
     * Called internally if any of the property value changed.
     * @hidden
     */
    Grid.prototype.onPropertyChanged = function (newProp, oldProp) {
        var requireRefresh = false;
        var requireGridRefresh = false;
        var checkCursor;
        var args = { requestType: 'refresh' };
        if (this.isDestroyed) {
            return;
        }
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'allowPaging':
                    this.notify(uiUpdate, { module: 'pager', enable: this.allowPaging });
                    requireRefresh = true;
                    break;
                case 'pageSettings':
                    this.notify(inBoundModelChanged, { module: 'pager', properties: newProp.pageSettings });
                    if (isNullOrUndefined(newProp.pageSettings.currentPage) && isNullOrUndefined(newProp.pageSettings.totalRecordsCount)) {
                        requireRefresh = true;
                    }
                    break;
                case 'currencyCode':
                case 'locale':
                    _super.prototype.refresh.call(this);
                    break;
                case 'allowSorting':
                    this.notify(uiUpdate, { module: 'sort', enable: this.allowSorting });
                    requireRefresh = true;
                    checkCursor = true;
                    break;
                case 'allowFiltering':
                    this.notify(uiUpdate, { module: 'filter', enable: this.allowFiltering });
                    requireRefresh = true;
                    break;
                case 'height':
                case 'width':
                    this.notify(uiUpdate, { module: 'scroll', properties: { width: newProp.width, height: newProp.height } });
                    break;
                case 'allowReordering':
                    this.notify(uiUpdate, { module: 'reorder', enable: this.allowReordering });
                    checkCursor = true;
                    break;
                case 'allowRowDragAndDrop':
                    this.notify(uiUpdate, { module: 'rowDragAndDrop', enable: this.allowRowDragAndDrop });
                    break;
                case 'rowTemplate':
                    this.rowTemplateFn = templateCompiler(this.rowTemplate);
                    requireRefresh = true;
                    break;
                case 'detailTemplate':
                    this.detailTemplateFn = templateCompiler(this.detailTemplate);
                    requireRefresh = true;
                    break;
                case 'allowGrouping':
                    this.notify(uiUpdate, { module: 'group', enable: this.allowGrouping });
                    this.headerModule.refreshUI();
                    requireRefresh = true;
                    checkCursor = true;
                    break;
                case 'childGrid':
                    requireRefresh = true;
                    break;
                case 'toolbar':
                    this.notify(uiUpdate, { module: 'toolbar' });
                    break;
                case 'groupSettings':
                    if (!(isNullOrUndefined(newProp.groupSettings.showDropArea))) {
                        this.headerModule.refreshUI();
                        requireRefresh = true;
                        checkCursor = true;
                    }
                    this.notify(inBoundModelChanged, { module: 'group', properties: newProp.groupSettings });
                    break;
                case 'aggregates':
                    this.notify(uiUpdate, { module: 'aggregate', properties: newProp });
                    break;
                case 'columns':
                    this.updateColumnObject();
                    requireGridRefresh = true;
                    break;
                case 'frozenColumns':
                case 'frozenRows':
                    this.freezeRefresh();
                    break;
                default:
                    this.extendedPropertyChange(prop, newProp);
            }
        }
        if (checkCursor) {
            this.updateDefaultCursor();
        }
        if (requireGridRefresh) {
            this.refresh();
        }
        else if (requireRefresh) {
            this.notify(modelChanged, args);
            requireRefresh = false;
        }
    };
    Grid.prototype.extendedPropertyChange = function (prop, newProp) {
        switch (prop) {
            case 'enableRtl':
                this.updateRTL();
                if (this.allowPaging) {
                    this.element.querySelector('.e-gridpager').ej2_instances[0].enableRtl = newProp.enableRtl;
                    this.element.querySelector('.e-gridpager').ej2_instances[0].dataBind();
                }
                if (this.height !== 'auto') {
                    this.scrollModule.removePadding(!newProp.enableRtl);
                    this.scrollModule.setPadding();
                }
                if (this.toolbar) {
                    this.toolbarModule.getToolbar().ej2_instances[0].enableRtl = newProp.enableRtl;
                    this.toolbarModule.getToolbar().ej2_instances[0].dataBind();
                }
                if (this.contextMenuItems) {
                    this.contextMenuModule.getContextMenu().ej2_instances[0].enableRtl = newProp.enableRtl;
                    this.contextMenuModule.getContextMenu().ej2_instances[0].dataBind();
                }
                if (this.showColumnMenu) {
                    this.columnMenuModule.getColumnMenu().ej2_instances[0].enableRtl = newProp.enableRtl;
                    this.columnMenuModule.getColumnMenu().ej2_instances[0].dataBind();
                }
                break;
            case 'enableAltRow':
                this.renderModule.refresh();
                break;
            case 'allowResizing':
                this.headerModule.refreshUI();
                break;
            case 'gridLines':
                this.updateGridLines();
                break;
            case 'filterSettings':
                this.notify(inBoundModelChanged, { module: 'filter', properties: newProp.filterSettings });
                break;
            case 'searchSettings':
                this.notify(inBoundModelChanged, { module: 'search', properties: newProp.searchSettings });
                break;
            case 'sortSettings':
                this.notify(inBoundModelChanged, { module: 'sort' });
                break;
            case 'selectionSettings':
                this.notify(inBoundModelChanged, { module: 'selection', properties: newProp.selectionSettings });
                break;
            case 'editSettings':
                this.notify(inBoundModelChanged, { module: 'edit', properties: newProp.editSettings });
                break;
            case 'allowTextWrap':
            case 'textWrapSettings':
                if (this.allowTextWrap) {
                    this.applyTextWrap();
                }
                else {
                    this.removeTextWrap();
                }
                this.notify(freezeRender, { case: 'textwrap', isModeChg: (prop === 'textWrapSettings') });
                break;
            case 'dataSource':
                this.notify(dataSourceModified, {});
                this.renderModule.refresh();
                break;
            case 'enableHover':
                var action = newProp.enableHover ? addClass : removeClass;
                action([this.element], 'e-gridhover');
                break;
        }
    };
    Grid.prototype.updateDefaultCursor = function () {
        var headerRows = [].slice.call(this.element.querySelectorAll('.e-columnheader'));
        for (var _i = 0, headerRows_1 = headerRows; _i < headerRows_1.length; _i++) {
            var row = headerRows_1[_i];
            if (this.allowSorting || this.allowGrouping || this.allowReordering) {
                row.classList.remove('e-defaultcursor');
            }
            else {
                row.classList.add('e-defaultcursor');
            }
        }
    };
    Grid.prototype.updateColumnModel = function (columns) {
        for (var i = 0, len = columns.length; i < len; i++) {
            if (columns[i].columns) {
                this.updateColumnModel(columns[i].columns);
            }
            else {
                this.columnModel.push(columns[i]);
            }
        }
    };
    /**
     * Gets the columns from Grid.
     * @return {Column[]}
     */
    Grid.prototype.getColumns = function () {
        var _this = this;
        var inview = this.inViewIndexes.map(function (v) { return v - _this.groupSettings.columns.length; }).filter(function (v) { return v > -1; });
        var vLen = inview.length;
        if (!this.enableColumnVirtualization || isNullOrUndefined(this.columnModel) || this.columnModel.length === 0) {
            this.columnModel = [];
            this.updateColumnModel(this.columns);
        }
        var columns = vLen === 0 ? this.columnModel :
            this.columnModel.slice(inview[0], inview[vLen - 1] + 1);
        return columns;
    };
    /**
     * @private
     */
    Grid.prototype.getColumnIndexesInView = function () {
        return this.inViewIndexes;
    };
    /**
     * @private
     */
    Grid.prototype.getLocaleConstants = function () {
        return this.defaultLocale;
    };
    /**
     * @private
     */
    Grid.prototype.setColumnIndexesInView = function (indexes) {
        this.inViewIndexes = indexes;
    };
    /**
     * Gets the visible columns from Grid.
     * @return {Column[]}
     */
    Grid.prototype.getVisibleColumns = function () {
        var cols = [];
        for (var _i = 0, _a = this.columnModel; _i < _a.length; _i++) {
            var col = _a[_i];
            if (col.visible) {
                cols.push(col);
            }
        }
        return cols;
    };
    /**
     * Gets the header div of Grid.
     * @return {Element}
     */
    Grid.prototype.getHeaderContent = function () {
        return this.headerModule.getPanel();
    };
    /**
     * Sets the header div of Grid to replace the old header.
     * @param  {Element} element - Specifies the Grid header.
     * @return {void}
     */
    Grid.prototype.setGridHeaderContent = function (element) {
        this.headerModule.setPanel(element);
    };
    /**
     * Gets the content table of Grid.
     * @return {Element}
     */
    Grid.prototype.getContentTable = function () {
        return this.contentModule.getTable();
    };
    /**
     * Sets the content table of Grid to replace old content table.
     * @param  {Element} element - Specifies the Grid content table.
     * @return {void}
     */
    Grid.prototype.setGridContentTable = function (element) {
        this.contentModule.setTable(element);
    };
    /**
     * Gets the content div of Grid.
     * @return {Element}
     */
    Grid.prototype.getContent = function () {
        return this.contentModule.getPanel();
    };
    /**
     * Sets the content div of Grid to replace the old Grid content.
     * @param  {Element} element - Specifies the Grid content.
     * @return {void}
     */
    Grid.prototype.setGridContent = function (element) {
        this.contentModule.setPanel(element);
    };
    /**
     * Gets the header table element of Grid.
     * @return {Element}
     */
    Grid.prototype.getHeaderTable = function () {
        return this.headerModule.getTable();
    };
    /**
     * Sets the header table of Grid to replace old header table.
     * @param  {Element} element - Specifies the Grid header table.
     * @return {void}
     */
    Grid.prototype.setGridHeaderTable = function (element) {
        this.headerModule.setTable(element);
    };
    /**
     * Gets the footer div of Grid.
     * @return {Element}
     */
    Grid.prototype.getFooterContent = function () {
        if (isNullOrUndefined(this.footerElement)) {
            this.footerElement = this.element.getElementsByClassName('e-gridfooter')[0];
        }
        return this.footerElement;
    };
    /**
     * Gets the footer table element of Grid.
     * @return {Element}
     */
    Grid.prototype.getFooterContentTable = function () {
        if (isNullOrUndefined(this.footerElement)) {
            this.footerElement = this.element.getElementsByClassName('e-gridfooter')[0];
        }
        return this.footerElement.firstChild.firstChild;
    };
    /**
     * Gets the pager of Grid.
     * @return {Element}
     */
    Grid.prototype.getPager = function () {
        return this.gridPager; //get element from pager
    };
    /**
     * Sets the pager of Grid to replace old pager.
     * @param  {Element} element - Specifies the Grid pager.
     * @return {void}
     */
    Grid.prototype.setGridPager = function (element) {
        this.gridPager = element;
    };
    /**
     * Gets a row by index.
     * @param  {number} index - Specifies the row index.
     * @return {Element}
     */
    Grid.prototype.getRowByIndex = function (index) {
        return this.contentModule.getRowByIndex(index);
    };
    /**
     * Gets all the Grid's content rows.
     * @return {Element[]}
     */
    Grid.prototype.getRows = function () {
        return this.contentModule.getRowElements();
    };
    /**
     * Get a row information based on cell
     * @param {Element}
     * @return RowInfo
     */
    Grid.prototype.getRowInfo = function (target) {
        var ele = target;
        var args = {};
        if (!isNullOrUndefined(target) && isNullOrUndefined(parentsUntil(ele, 'e-detailrowcollapse')
            && isNullOrUndefined(parentsUntil(ele, 'e-recordplusexpand')))) {
            var cell = closest(ele, '.e-rowcell');
            if (!isNullOrUndefined(cell)) {
                var cellIndex = parseInt(cell.getAttribute('aria-colindex'), 10);
                var row_1 = closest(cell, '.e-row');
                var rowIndex = parseInt(row_1.getAttribute('aria-rowindex'), 10);
                var rowsObject = this.contentModule.getRows().filter(function (r) {
                    return r.uid === row_1.getAttribute('data-uid');
                });
                var rowData = rowsObject[0].data;
                var column = rowsObject[0].cells[cellIndex].column;
                args = { cell: cell, cellIndex: cellIndex, row: row_1, rowIndex: rowIndex, rowData: rowData, column: column };
            }
        }
        return args;
    };
    /**
     * Gets all the Grid's data rows.
     * @return {Element[]}
     */
    Grid.prototype.getDataRows = function () {
        var rows = [].slice.call(this.getContentTable().querySelector('tbody').children);
        var dataRows = [];
        for (var i = 0, len = rows.length; i < len; i++) {
            if (rows[i].classList.contains('e-row') && !rows[i].classList.contains('e-hiddenrow')) {
                dataRows.push(rows[i]);
            }
        }
        return dataRows;
    };
    /**
     * Gets a cell by row and column index.
     * @param  {number} rowIndex - Specifies the row index.
     * @param  {number} columnIndex - Specifies the column index.
     * @return {Element}
     */
    Grid.prototype.getCellFromIndex = function (rowIndex, columnIndex) {
        return this.getDataRows()[rowIndex].querySelectorAll('.e-rowcell')[columnIndex];
    };
    /**
     * Gets a column header by column index.
     * @param  {number} index - Specifies the column index.
     * @return {Element}
     */
    Grid.prototype.getColumnHeaderByIndex = function (index) {
        return this.getHeaderTable().querySelectorAll('.e-headercell')[index];
    };
    /**
     * @hidden
     */
    Grid.prototype.getRowObjectFromUID = function (uid) {
        for (var _i = 0, _a = this.contentModule.getRows(); _i < _a.length; _i++) {
            var row = _a[_i];
            if (row.uid === uid) {
                return row;
            }
        }
        return null;
    };
    /**
     * @hidden
     */
    Grid.prototype.getRowsObject = function () {
        return this.contentModule.getRows();
    };
    /**
     * Gets a column header by column name.
     * @param  {string} field - Specifies the column name.
     * @return {Element}
     */
    Grid.prototype.getColumnHeaderByField = function (field) {
        return this.getColumnHeaderByUid(this.getColumnByField(field).uid);
    };
    /**
     * Gets a column header by uid.
     * @param  {string} field - Specifies the column uid.
     * @return {Element}
     */
    Grid.prototype.getColumnHeaderByUid = function (uid) {
        return this.getHeaderContent().querySelector('[e-mappinguid=' + uid + ']').parentElement;
    };
    /**
     * Gets a Column by column name.
     * @param  {string} field - Specifies the column name.
     * @return {Column}
     */
    Grid.prototype.getColumnByField = function (field) {
        return iterateArrayOrObject(this.getColumns(), function (item, index) {
            if (item.field === field) {
                return item;
            }
            return undefined;
        })[0];
    };
    /**
     * Gets a column index by column name.
     * @param  {string} field - Specifies the column name.
     * @return {number}
     */
    Grid.prototype.getColumnIndexByField = function (field) {
        var index = iterateArrayOrObject(this.getColumns(), function (item, index) {
            if (item.field === field) {
                return index;
            }
            return undefined;
        })[0];
        return !isNullOrUndefined(index) ? index : -1;
    };
    /**
     * Gets a column by uid.
     * @param  {string} uid - Specifies the column uid.
     * @return {Column}
     */
    Grid.prototype.getColumnByUid = function (uid) {
        return iterateArrayOrObject(this.getColumns(), function (item, index) {
            if (item.uid === uid) {
                return item;
            }
            return undefined;
        })[0];
    };
    /**
     * Gets a column index by uid.
     * @param  {string} uid - Specifies the column uid.
     * @return {number}
     */
    Grid.prototype.getColumnIndexByUid = function (uid) {
        var index = iterateArrayOrObject(this.getColumns(), function (item, index) {
            if (item.uid === uid) {
                return index;
            }
            return undefined;
        })[0];
        return !isNullOrUndefined(index) ? index : -1;
    };
    /**
     * Gets uid by column name.
     * @param  {string} field - Specifies the column name.
     * @return {string}
     */
    Grid.prototype.getUidByColumnField = function (field) {
        return iterateArrayOrObject(this.getColumns(), function (item, index) {
            if (item.field === field) {
                return item.uid;
            }
            return undefined;
        })[0];
    };
    /**
     * Gets TH index by column uid value.
     * @private
     * @param  {string} uid - Specifies the column uid.
     * @return {number}
     */
    Grid.prototype.getNormalizedColumnIndex = function (uid) {
        var index = this.getColumnIndexByUid(uid);
        if (this.allowGrouping) {
            index += this.groupSettings.columns.length;
        }
        if (this.isDetail()) {
            index++;
        }
        /**
         * TODO: index normalization based on the stacked header, grouping and detailTemplate
         * and frozen should be handled here
         */
        return index;
    };
    /**
     * Gets the collection of column fields.
     * @return {string[]}
     */
    Grid.prototype.getColumnFieldNames = function () {
        var columnNames = [];
        var column;
        for (var i = 0, len = this.getColumns().length; i < len; i++) {
            column = this.getColumns()[i];
            if (column.visible) {
                columnNames.push(column.field);
            }
        }
        return columnNames;
    };
    /**
     * Gets a compiled row template.
     * @return {Function}
     * @private
     */
    Grid.prototype.getRowTemplate = function () {
        return this.rowTemplateFn;
    };
    /**
     * Gets a compiled detail row template.
     * @private
     * @return {Function}
     */
    Grid.prototype.getDetailTemplate = function () {
        return this.detailTemplateFn;
    };
    /**
     * Get the names of primary key columns in Grid.
     * @return {string[]}
     */
    Grid.prototype.getPrimaryKeyFieldNames = function () {
        var keys = [];
        for (var key = 0, col = this.columns, cLen = col.length; key < cLen; key++) {
            if (col[key].isPrimaryKey) {
                keys.push(col[key].field);
            }
        }
        return keys;
    };
    /**
     * Refreshes the Grid header and content.
     */
    Grid.prototype.refresh = function () {
        this.headerModule.refreshUI();
        this.renderModule.refresh();
    };
    /**
     * Refreshes the Grid header.
     */
    Grid.prototype.refreshHeader = function () {
        this.headerModule.refreshUI();
    };
    /**
     * Gets the collection of selected rows.
     * @return {Element[]}
     */
    Grid.prototype.getSelectedRows = function () {
        return this.selectionModule ? this.selectionModule.selectedRecords : [];
    };
    /**
     * Gets the collection of selected row indexes.
     * @return {number[]}
     */
    Grid.prototype.getSelectedRowIndexes = function () {
        return this.selectionModule ? this.selectionModule.selectedRowIndexes : [];
    };
    /**
     * Gets the collection of selected row and cell indexes.
     * @return {number[]}
     */
    Grid.prototype.getSelectedRowCellIndexes = function () {
        return this.selectionModule.selectedRowCellIndexes;
    };
    /**
     * Gets the collection of selected records.
     * @return {Object[]}
     */
    Grid.prototype.getSelectedRecords = function () {
        return this.selectionModule.getSelectedRecords();
    };
    /**
     * Gets the Grid's data.
     * @return {Data}
     */
    Grid.prototype.getDataModule = function () {
        return this.renderModule.data;
    };
    /**
     * Shows a column by column name.
     * @param  {string|string[]} keys - Defines a single or collection of column names.
     * @param  {string} showBy - Defines the column key either as field name or header text.
     * @return {void}
     */
    Grid.prototype.showColumns = function (keys, showBy) {
        showBy = showBy ? showBy : 'headerText';
        this.showHider.show(keys, showBy);
    };
    /**
     * Hides a column by column name.
     * @param  {string|string[]} keys - Defines a single or collection of column names.
     * @param  {string} hideBy - Defines the column key either as field name or header text.
     * @return {void}
     */
    Grid.prototype.hideColumns = function (keys, hideBy) {
        hideBy = hideBy ? hideBy : 'headerText';
        this.showHider.hide(keys, hideBy);
    };
    /**
     * Navigate to target page by given number.
     * @param  {number} pageNo - Defines the page number to navigate.
     * @return {void}
     */
    Grid.prototype.goToPage = function (pageNo) {
        this.pagerModule.goToPage(pageNo);
    };
    /**
     * Defines the text of external message.
     * @param  {string} message - Defines the message to update.
     * @return {void}
     */
    Grid.prototype.updateExternalMessage = function (message) {
        this.pagerModule.updateExternalMessage(message);
    };
    /**
     * Sorts a column with given options.
     * @param {string} columnName - Defines the column name to sort.
     * @param {SortDirection} direction - Defines the direction of sorting for field.
     * @param {boolean} isMultiSort - Specifies whether the previous sorted columns to be maintained.
     * @return {void}
     */
    Grid.prototype.sortColumn = function (columnName, direction, isMultiSort) {
        this.sortModule.sortColumn(columnName, direction, isMultiSort);
    };
    /**
     * Clears all the sorted columns of Grid.
     * @return {void}
     */
    Grid.prototype.clearSorting = function () {
        this.sortModule.clearSorting();
    };
    /**
     * Remove sorted column by field name.
     * @param {string} field - Defines the column field name to remove sort.
     * @return {void}
     * @hidden
     */
    Grid.prototype.removeSortColumn = function (field) {
        this.sortModule.removeSortColumn(field);
    };
    /**
     * Filters grid row by column name with given options.
     * @param  {string} fieldName - Defines the field name of the filter column.
     * @param  {string} filterOperator - Defines the operator by how to filter records.
     * @param  {string | number | Date | boolean} filterValue - Defines the value which is used to filter records.
     * @param  {string} predicate - Defines the relationship between one filter query with another by using AND or OR predicate.
     * @param  {boolean} matchCase - If match case set to true, then filter records with exact match or else
     * filter records with case insensitive(uppercase and lowercase letters treated as same).
     * @param  {string} actualFilterValue - Defines the actual filter value for the filter column.
     * @param  {string} actualOperator - Defines the actual filter operator for the filter column.
     * @return {void}
     */
    Grid.prototype.filterByColumn = function (fieldName, filterOperator, filterValue, predicate, matchCase, actualFilterValue, actualOperator) {
        this.filterModule.filterByColumn(fieldName, filterOperator, filterValue, predicate, matchCase, actualFilterValue, actualOperator);
    };
    /**
     * Clears all the filtered rows of Grid.
     * @return {void}
     */
    Grid.prototype.clearFiltering = function () {
        this.filterModule.clearFiltering();
    };
    /**
     * Removes filtered column by field name.
     * @param  {string} field - Defines column field name to remove filter.
     * @param  {boolean} isClearFilterBar -  Specifies whether the filter bar value needs to be cleared.
     * @return {void}
     * @hidden
     */
    Grid.prototype.removeFilteredColsByField = function (field, isClearFilterBar) {
        this.filterModule.removeFilteredColsByField(field, isClearFilterBar);
    };
    /**
     * Selects a row by given index.
     * @param  {number} index - Defines the row index.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @return {void}
     */
    Grid.prototype.selectRow = function (index, isToggle) {
        this.selectionModule.selectRow(index, isToggle);
    };
    /**
     * Selects a collection of rows by indexes.
     * @param  {number[]} rowIndexes - Specifies the row indexes.
     * @return {void}
     */
    Grid.prototype.selectRows = function (rowIndexes) {
        this.selectionModule.selectRows(rowIndexes);
    };
    /**
     * Deselects the current selected rows and cells.
     * @return {void}
     */
    Grid.prototype.clearSelection = function () {
        this.selectionModule.clearSelection();
    };
    /**
     * Selects a cell by given index.
     * @param  {IIndex} cellIndex - Defines the row and column index.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @return {void}
     */
    Grid.prototype.selectCell = function (cellIndex, isToggle) {
        this.selectionModule.selectCell(cellIndex, isToggle);
    };
    /**
     * Searches Grid records by given key.
     * @param  {string} searchString - Defines the key.
     * @return {void}
     */
    Grid.prototype.search = function (searchString) {
        this.searchModule.search(searchString);
    };
    /**
     * By default, it prints all the pages of Grid and hides pager.
     * > Customize print options using [`printMode`](http://ej2.syncfusion.com/documentation/grid/api-grid.html#printmode-string).
     * @return {void}
     */
    Grid.prototype.print = function () {
        this.printModule.print();
    };
    /**
     * Delete a record with Given options. If fieldname and data is not given then grid will delete the selected record.
     * > `editSettings.allowDeleting` should be true.
     * @param {string} fieldname - Defines the primary key field Name of the column.
     * @param {Object} data - Defines the JSON data of record need to be delete.
     */
    Grid.prototype.deleteRecord = function (fieldname, data) {
        this.editModule.deleteRecord(fieldname, data);
    };
    /**
     * To edit any particular row by TR element.
     * @param {HTMLTableRowElement} tr - Defines the table row to be edited.
     */
    Grid.prototype.startEdit = function () {
        this.editModule.startEdit();
    };
    /**
     * If Grid is in editable state, then you can save a record by invoking endEdit.
     */
    Grid.prototype.endEdit = function () {
        this.editModule.endEdit();
    };
    /**
     * Cancel edited state.
     */
    Grid.prototype.closeEdit = function () {
        this.editModule.closeEdit();
    };
    /**
     * To add a new row at top of rows with given data. If data is not passed then it will render empty row.
     * > `editSettings.allowEditing` should be true.
     * @param {Object} data - Defines the new add record data.
     */
    Grid.prototype.addRecord = function (data) {
        this.editModule.addRecord(data);
    };
    /**
     * Delete any visible row by TR element.
     * @param {HTMLTableRowElement} tr - Defines the table row element.
     */
    Grid.prototype.deleteRow = function (tr) {
        this.editModule.deleteRow(tr);
    };
    /**
     * Copy selected rows or cells data into clipboard.
     * @param {boolean} withHeader - Specifies whether the column header data need to be copied or not.
     */
    Grid.prototype.copy = function (withHeader) {
        this.clipboardModule.copy(withHeader);
    };
    /**
     * @hidden
     */
    Grid.prototype.recalcIndentWidth = function () {
        if (!this.getHeaderTable().querySelector('.e-emptycell')) {
            return;
        }
        if ((!this.groupSettings.columns.length && !this.isDetail()) ||
            this.getHeaderTable().querySelector('.e-emptycell').getAttribute('indentRefreshed') ||
            !this.getContentTable()) {
            return;
        }
        var indentWidth = this.getHeaderTable().querySelector('.e-emptycell').parentElement.offsetWidth;
        var headerCol = [].slice.call(this.getHeaderTable().querySelector('colgroup').childNodes);
        var contentCol = [].slice.call(this.getContentTable().querySelector('colgroup').childNodes);
        var perPixel = indentWidth / 30;
        var i = 0;
        if (perPixel >= 1) {
            indentWidth = (30 / perPixel);
        }
        if (this.enableColumnVirtualization) {
            indentWidth = 30;
        }
        while (i < this.groupSettings.columns.length) {
            headerCol[i].style.width = indentWidth + 'px';
            contentCol[i].style.width = indentWidth + 'px';
            this.notify(columnWidthChanged, { index: i, width: indentWidth });
            i++;
        }
        if (this.isDetail()) {
            headerCol[i].style.width = indentWidth + 'px';
            contentCol[i].style.width = indentWidth + 'px';
            this.notify(columnWidthChanged, { index: i, width: indentWidth });
        }
        this.getHeaderTable().querySelector('.e-emptycell').setAttribute('indentRefreshed', 'true');
    };
    /**
     * Changes the Grid column positions by field names.
     * @param  {string} fromFName - Defines the origin field name.
     * @param  {string} toFName - Defines the destination field name.
     * @return {void}
     */
    Grid.prototype.reorderColumns = function (fromFName, toFName) {
        this.reorderModule.reorderColumns(fromFName, toFName);
    };
    /**
     * Change the column width to automatically fit its content
     * which ensures that the width is wide enough to show the content without wrapping/hiding.
     * > * This method ignores the hidden columns.
     * > * Use the `autoFitColumns` method in the `dataBound` event to resize at the initial rendering
     * @param  {string |string[]} fieldNames - Defines the column names.
     * @return {void}
     *
     *
     * ```typescript
     * <div id="Grid"></div>
     * <script>
     * let gridObj: Grid = new Grid({
     *     dataSource: employeeData,
     *     columns: [
     *         { field: 'OrderID', headerText: 'Order ID', width:100 },
     *         { field: 'EmployeeID', headerText: 'Employee ID' }],
     *     dataBound: () => gridObj.autoFitColumns('EmployeeID')
     * });
     * gridObj.appendTo('#Grid');
     * </script>
     * ```
     *
     */
    Grid.prototype.autoFitColumns = function (fieldNames) {
        this.resizeModule.autoFitColumns(fieldNames);
    };
    /**
     * @hidden
     */
    Grid.prototype.createColumnchooser = function (x, y, target) {
        this.columnChooserModule.renderColumnChooser(x, y, target);
    };
    Grid.prototype.initializeServices = function () {
        this.serviceLocator.register('widthService', this.widthService = new ColumnWidthService(this));
        this.serviceLocator.register('cellRendererFactory', new CellRendererFactory);
        this.serviceLocator.register('rendererFactory', new RendererFactory);
        this.serviceLocator.register('localization', this.localeObj = new L10n(this.getModuleName(), this.defaultLocale, this.locale));
        this.serviceLocator.register('valueFormatter', this.valueFormatterService = new ValueFormatter(this.locale));
        this.serviceLocator.register('showHideService', this.showHider = new ShowHide(this));
        this.serviceLocator.register('ariaService', this.ariaService = new AriaService());
        this.serviceLocator.register('focus', this.focusModule = new FocusStrategy(this));
    };
    Grid.prototype.processModel = function () {
        var gCols = this.groupSettings.columns;
        var sCols = this.sortSettings.columns;
        var flag;
        var j;
        if (this.allowGrouping) {
            var _loop_1 = function (i, len) {
                j = 0;
                for (var sLen = sCols.length; j < sLen; j++) {
                    if (sCols[j].field === gCols[i]) {
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    sCols.push({ field: gCols[i], direction: 'ascending' });
                }
                else {
                    if (this_1.allowSorting) {
                        this_1.sortedColumns.push(sCols[j].field);
                    }
                    else {
                        sCols[j].direction = 'ascending';
                    }
                }
                if (!this_1.groupSettings.showGroupedColumn) {
                    var column = this_1.enableColumnVirtualization ?
                        this_1.columns.filter(function (c) { return c.field === gCols[i]; })[0] : this_1.getColumnByField(gCols[i]);
                    column.visible = false;
                }
            };
            var this_1 = this;
            for (var i = 0, len = gCols.length; i < len; i++) {
                _loop_1(i, len);
            }
        }
        this.rowTemplateFn = templateCompiler(this.rowTemplate);
        this.detailTemplateFn = templateCompiler(this.detailTemplate);
        if (!isNullOrUndefined(this.parentDetails)) {
            var value = isNullOrUndefined(this.parentDetails.parentKeyFieldValue) ? 'undefined' :
                this.parentDetails.parentKeyFieldValue;
            this.query.where(this.queryString, 'equal', value, true);
        }
    };
    Grid.prototype.gridRender = function () {
        this.updateRTL();
        if (this.enableHover) {
            this.element.classList.add('e-gridhover');
        }
        if (Browser.isDevice) {
            this.element.classList.add('e-device');
        }
        classList(this.element, ['e-responsive', 'e-default'], []);
        var rendererFactory = this.serviceLocator.getService('rendererFactory');
        this.headerModule = rendererFactory.getRenderer(RenderType.Header);
        this.contentModule = rendererFactory.getRenderer(RenderType.Content);
        this.printModule = new Print(this, this.scrollModule);
        this.clipboardModule = new Clipboard(this);
        this.renderModule.render();
        this.eventInitializer();
        this.createGridPopUpElement();
        this.widthService.setWidthToColumns();
        this.updateGridLines();
        this.applyTextWrap();
    };
    Grid.prototype.dataReady = function () {
        this.scrollModule.setWidth();
        this.scrollModule.setHeight();
        if (this.height !== 'auto') {
            this.scrollModule.setPadding();
        }
    };
    Grid.prototype.updateRTL = function () {
        if (this.enableRtl) {
            this.element.classList.add('e-rtl');
        }
        else {
            this.element.classList.remove('e-rtl');
        }
    };
    Grid.prototype.createGridPopUpElement = function () {
        var popup = createElement('div', { className: 'e-gridpopup', styles: 'display:none;' });
        var content = createElement('div', { className: 'e-content', attrs: { tabIndex: '-1' } });
        append([content, createElement('div', { className: 'e-uptail e-tail' })], popup);
        content.appendChild(createElement('span'));
        append([content, createElement('div', { className: 'e-downtail e-tail' })], popup);
        this.element.appendChild(popup);
    };
    Grid.prototype.updateGridLines = function () {
        classList(this.element, [], ['e-verticallines', 'e-horizontallines', 'e-hidelines', 'e-bothlines']);
        switch (this.gridLines) {
            case 'horizontal':
                this.element.classList.add('e-horizontallines');
                break;
            case 'vertical':
                this.element.classList.add('e-verticallines');
                break;
            case 'none':
                this.element.classList.add('e-hidelines');
                break;
            case 'both':
                this.element.classList.add('e-bothlines');
                break;
        }
        this.updateResizeLines();
    };
    Grid.prototype.updateResizeLines = function () {
        if (this.allowResizing &&
            !(this.gridLines === 'vertical' || this.gridLines === 'both')) {
            this.element.classList.add('e-resize-lines');
        }
        else {
            this.element.classList.remove('e-resize-lines');
        }
    };
    /**
     * The function is used to apply text wrap
     * @return {void}
     * @hidden
     */
    Grid.prototype.applyTextWrap = function () {
        if (this.allowTextWrap) {
            var headerRows = [].slice.call(this.element.querySelectorAll('.e-columnheader'));
            switch (this.textWrapSettings.wrapMode) {
                case 'header':
                    wrap(this.element, false);
                    wrap(this.getContent(), false);
                    wrap(headerRows, true);
                    break;
                case 'content':
                    wrap(this.getContent(), true);
                    wrap(this.element, false);
                    wrap(headerRows, false);
                    break;
                default:
                    wrap(this.element, true);
                    wrap(this.getContent(), false);
                    wrap(headerRows, false);
            }
        }
    };
    /**
     * The function is used to remove text wrap
     * @return {void}
     * @hidden
     */
    Grid.prototype.removeTextWrap = function () {
        wrap(this.element, false);
        var headerRows = [].slice.call(this.element.querySelectorAll('.e-columnheader'));
        wrap(headerRows, false);
        wrap(this.getContent(), false);
    };
    /**
     * The function is used to add Tooltip to the grid cell that has ellipsiswithtooltip clip mode.
     * @return {void}
     * @hidden
     */
    Grid.prototype.refreshTooltip = function () {
        var width;
        var headerTable = this.getHeaderTable();
        var contentTable = this.getContentTable();
        var headerDivTag = 'e-gridheader';
        var htable = this.createTable(headerTable, headerDivTag, 'header');
        var ctable = this.createTable(headerTable, headerDivTag, 'content');
        var all = this.element.querySelectorAll('.e-ellipsistooltip');
        var allele = [];
        for (var i = 0; i < all.length; i++) {
            allele[i] = all[i];
        }
        allele.forEach(function (element) {
            var table = headerTable.contains(element) ? htable : ctable;
            var ele = headerTable.contains(element) ? 'th' : 'tr';
            table.querySelector(ele).className = element.className;
            table.querySelector(ele).innerHTML = element.innerHTML;
            width = table.querySelector(ele).getBoundingClientRect().width;
            if (width > element.getBoundingClientRect().width && !element.classList.contains('e-tooltip')) {
                var tooltip = new Tooltip({ content: element.innerHTML }, element);
            }
            else if (width < element.getBoundingClientRect().width && element.classList.contains('e-tooltip')) {
                element.ej2_instances[0].destroy();
            }
        });
        document.body.removeChild(htable);
        document.body.removeChild(ctable);
    };
    /**
     * To create table for ellipsiswithtooltip
     * @hidden
     */
    Grid.prototype.createTable = function (table, tag, type) {
        var myTableDiv = createElement('div');
        myTableDiv.className = this.element.className;
        myTableDiv.style.cssText = 'display: inline-block;visibility:hidden;position:absolute';
        var mySubDiv = createElement('div');
        mySubDiv.className = tag;
        var myTable = createElement('table');
        myTable.className = table.className;
        myTable.style.cssText = 'table-layout: auto;width: auto';
        var ele = (type === 'header') ? 'th' : 'td';
        var myTr = createElement('tr');
        var mytd = createElement(ele);
        myTr.appendChild(mytd);
        myTable.appendChild(myTr);
        mySubDiv.appendChild(myTable);
        myTableDiv.appendChild(mySubDiv);
        document.body.appendChild(myTableDiv);
        return myTableDiv;
    };
    /**
     * Binding events to the element while component creation.
     * @hidden
     */
    Grid.prototype.wireEvents = function () {
        EventHandler.add(this.element, 'click', this.mouseClickHandler, this);
        EventHandler.add(this.element, 'touchend', this.mouseClickHandler, this);
        EventHandler.add(this.element, 'focusout', this.focusOutHandler, this);
        EventHandler.add(this.getContent(), 'dblclick', this.dblClickHandler, this);
        if (this.allowKeyboard) {
            this.element.tabIndex = this.element.tabIndex === -1 ? 0 : this.element.tabIndex;
        }
        this.keyboardModule = new KeyboardEvents(this.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    };
    /**
     * Unbinding events from the element while component destroy.
     * @hidden
     */
    Grid.prototype.unwireEvents = function () {
        EventHandler.remove(this.element, 'click', this.mouseClickHandler);
        EventHandler.remove(this.element, 'touchend', this.mouseClickHandler);
        EventHandler.remove(this.element, 'focusout', this.focusOutHandler);
    };
    /**
     * @hidden
     */
    Grid.prototype.addListener = function () {
        var _this = this;
        if (this.isDestroyed) {
            return;
        }
        this.on(dataReady, this.dataReady, this);
        this.on(contentReady, this.recalcIndentWidth, this);
        [updateData, modelChanged, contentReady, columnWidthChanged].forEach(function (event) {
            return _this.on(event, _this.refreshTooltip, _this);
        });
        this.on(headerRefreshed, this.recalcIndentWidth, this);
        this.dataBoundFunction = this.refreshMediaCol.bind(this);
        this.addEventListener(dataBound, this.dataBoundFunction);
    };
    /**
     * @hidden
     */
    Grid.prototype.removeListener = function () {
        var _this = this;
        if (this.isDestroyed) {
            return;
        }
        this.off(dataReady, this.dataReady);
        this.off(contentReady, this.recalcIndentWidth);
        [updateData, modelChanged, contentReady, columnWidthChanged].forEach(function (event) {
            return _this.off(event, _this.refreshTooltip);
        });
        this.off(headerRefreshed, this.recalcIndentWidth);
        this.removeEventListener(dataBound, this.dataBoundFunction);
    };
    /**
     * Get current visible data of grid.
     * @return {Object[]}
     * @hidden
     */
    Grid.prototype.getCurrentViewRecords = function () {
        return (this.allowGrouping && this.groupSettings.columns.length) ?
            this.currentViewData.records : this.currentViewData;
    };
    Grid.prototype.mouseClickHandler = function (e) {
        if (this.isChildGrid(e) || (parentsUntil(e.target, 'e-gridpopup') && e.touches) ||
            this.element.querySelectorAll('.e-cloneproperties').length || this.checkEdit(e)) {
            return;
        }
        if (((!this.allowRowDragAndDrop && parentsUntil(e.target, 'e-gridcontent')) ||
            (!(this.allowGrouping || this.allowReordering) && parentsUntil(e.target, 'e-gridheader'))) && e.touches) {
            return;
        }
        if (parentsUntil(e.target, 'e-gridheader') && this.allowRowDragAndDrop) {
            e.preventDefault();
        }
        this.notify(click, e);
    };
    Grid.prototype.checkEdit = function (e) {
        var tr = parentsUntil(e.target, 'e-row');
        var isEdit = this.editSettings.mode !== 'batch' &&
            this.isEdit && tr && (tr.classList.contains('e-editedrow') || tr.classList.contains('e-addedrow'));
        return !parentsUntil(e.target, 'e-unboundcelldiv') && (isEdit || (parentsUntil(e.target, 'e-rowcell') &&
            parentsUntil(e.target, 'e-rowcell').classList.contains('e-editedbatchcell')));
    };
    Grid.prototype.dblClickHandler = function (e) {
        if (parentsUntil(e.target, 'e-grid').id !== this.element.id || closest(e.target, '.e-unboundcelldiv')) {
            return;
        }
        var args = this.getRowInfo(e.target);
        args.target = e.target;
        this.trigger(recordDoubleClick, args);
        this.notify(dblclick, e);
    };
    Grid.prototype.focusOutHandler = function (e) {
        if (this.isChildGrid(e)) {
            return;
        }
        if (!parentsUntil(e.target, 'e-grid')) {
            this.element.querySelector('.e-gridpopup').style.display = 'none';
        }
        var filterClear = this.element.querySelector('.e-cancel:not(.e-hide)');
        if (filterClear) {
            filterClear.classList.add('e-hide');
        }
    };
    Grid.prototype.isChildGrid = function (e) {
        var gridElement = parentsUntil(e.target, 'e-grid');
        if (gridElement && gridElement.id !== this.element.id) {
            return true;
        }
        return false;
    };
    Grid.prototype.mergePersistGridData = function () {
        var data = window.localStorage.getItem(this.getModuleName() + this.element.id);
        if (!(isNullOrUndefined(data) || (data === ''))) {
            var dataObj_1 = JSON.parse(data);
            var keys = Object.keys(dataObj_1);
            this.isProtectedOnChange = true;
            var _loop_2 = function (key) {
                if ((typeof this_2[key] === 'object') && !isNullOrUndefined(this_2[key])) {
                    if (Array.isArray(this_2[key])) {
                        this_2[key].forEach(function (element, index) {
                            extend(element, dataObj_1[key][index]);
                        });
                    }
                    else {
                        extend(this_2[key], dataObj_1[key]);
                    }
                }
                else {
                    this_2[key] = dataObj_1[key];
                }
            };
            var this_2 = this;
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                _loop_2(key);
            }
            this.isProtectedOnChange = false;
        }
    };
    Grid.prototype.isDetail = function () {
        return !isNullOrUndefined(this.detailTemplate) || !isNullOrUndefined(this.childGrid);
    };
    Grid.prototype.keyActionHandler = function (e) {
        if (this.isChildGrid(e) ||
            (this.isEdit && e.action !== 'escape' && e.action !== 'enter' && e.action !== 'shiftEnter'
                && e.action !== 'tab' && e.action !== 'shiftTab')) {
            return;
        }
        if (this.allowKeyboard) {
            if (e.action === 'ctrlPlusP') {
                e.preventDefault();
                this.print();
            }
            this.notify(keyPressed, e);
        }
    };
    /**
     * @hidden
     */
    Grid.prototype.setInjectedModules = function (modules) {
        this.injectedModules = modules;
    };
    Grid.prototype.updateColumnObject = function () {
        prepareColumns(this.columns, this.enableColumnVirtualization);
        if (this.editSettings.allowEditing || this.editSettings.allowAdding || this.editSettings.allowDeleting) {
            this.notify(autoCol, {});
        }
    };
    /**
     * Refreshes the Grid column changes
     */
    Grid.prototype.refreshColumns = function () {
        this.updateColumnObject();
        this.refresh();
    };
    /**
     * Export Grid data to Excel file(.xlsx).
     * @param  {exportProperties} exportProperties - Defines the export properties of the Grid.
     * @param  {isMultipleExport} isMultipleExport - Define to enable multiple export.
     * @param  {workbook} workbook - Defines the Workbook if multiple export is enabled.
     * @return {Promise<any>}
     */
    /* tslint:disable-next-line:no-any */
    Grid.prototype.excelExport = function (exportProperties, isMultipleExport, workbook) {
        return this.excelExportModule.Map(this, exportProperties, isMultipleExport, workbook, false);
    };
    /**
     * Export Grid data to CSV file.
     * @param  {exportProperties} exportProperties - Defines the export properties of the Grid.
     * @param  {isMultipleExport} isMultipleExport - Define to enable multiple export.
     * @param  {workbook} workbook - Defines the Workbook if multiple export is enabled.
     * @return {Promise<any>}
     */
    /* tslint:disable-next-line:no-any */
    Grid.prototype.csvExport = function (exportProperties, isMultipleExport, workbook) {
        return this.excelExportModule.Map(this, exportProperties, isMultipleExport, workbook, true);
    };
    /**
     * Export Grid data to PDF document.
     * @param  {exportProperties} exportProperties - Defines the export properties of the Grid.
     * @param  {isMultipleExport} isMultipleExport - Define to enable multiple export.
     * @param  {pdfDoc} pdfDoc - Defined the Pdf Document if multiple export is enabled.
     * @return {Promise<any>}
     */
    /* tslint:disable-next-line:no-any */
    Grid.prototype.pdfExport = function (exportProperties, isMultipleExport, pdfDoc) {
        return this.pdfExportModule.Map(this, exportProperties, isMultipleExport, pdfDoc);
    };
    Grid.prototype.isCommandColumn = function (columns) {
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var column = columns_1[_i];
            if (column.columns) {
                if (this.isCommandColumn(column.columns)) {
                    return true;
                }
            }
            else if (column.commands || column.commandsTemplate) {
                return true;
            }
        }
        return false;
    };
    /**
     * Groups a column by column name.
     * @param  {string} columnName - Defines the column name to group.
     * @return {void}
     */
    Grid.prototype.groupColumn = function (columnName) {
        this.groupModule.groupColumn(columnName);
    };
    /**
     * Ungroups a column by column name.
     * @param  {string} columnName - Defines the column name to ungroup.
     * @return {void}
     */
    Grid.prototype.ungroupColumn = function (columnName) {
        this.groupModule.ungroupColumn(columnName);
    };
    /**
     * @hidden
     */
    Grid.prototype.isContextMenuOpen = function () {
        return this.contextMenuModule && this.contextMenuModule.isOpen;
    };
    /**
     * @hidden
     */
    Grid.prototype.ensureModuleInjected = function (module) {
        return this.getInjectedModules().indexOf(module) >= 0;
    };
    /**
     * Shows a column by column name.
     * @param  {string|string[]} columnName - Defines a single or collection of column names to show.
     * @param  {string} showBy - Defines the column key either as field name or header text.
     * @return {void}
     */
    Grid.prototype.showColumn = function (columnName, showBy) {
        this.showHider.show(columnName, showBy);
    };
    /**
     * Hides a column by column name.
     * @param  {string|string[]} columnName - Defines a single or collection of column names to hide.
     * @param  {string} hideBy - Defines the column key either as field name or header text.
     * @return {void}
     */
    Grid.prototype.hideColumn = function (columnName, hideBy) {
        this.showHider.hide(columnName, hideBy);
    };
    __decorate([
        Property([])
    ], Grid.prototype, "columns", void 0);
    __decorate([
        Property(true)
    ], Grid.prototype, "enableAltRow", void 0);
    __decorate([
        Property(true)
    ], Grid.prototype, "enableHover", void 0);
    __decorate([
        Property(true)
    ], Grid.prototype, "allowKeyboard", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "allowTextWrap", void 0);
    __decorate([
        Complex({}, TextWrapSettings)
    ], Grid.prototype, "textWrapSettings", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "allowPaging", void 0);
    __decorate([
        Complex({}, PageSettings)
    ], Grid.prototype, "pageSettings", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "enableVirtualization", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "enableColumnVirtualization", void 0);
    __decorate([
        Complex({}, SearchSettings)
    ], Grid.prototype, "searchSettings", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "allowSorting", void 0);
    __decorate([
        Property(true)
    ], Grid.prototype, "allowMultiSorting", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "allowExcelExport", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "allowPdfExport", void 0);
    __decorate([
        Complex({}, SortSettings)
    ], Grid.prototype, "sortSettings", void 0);
    __decorate([
        Property(true)
    ], Grid.prototype, "allowSelection", void 0);
    __decorate([
        Property(-1)
    ], Grid.prototype, "selectedRowIndex", void 0);
    __decorate([
        Complex({}, SelectionSettings)
    ], Grid.prototype, "selectionSettings", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "allowFiltering", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "allowReordering", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "allowResizing", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "allowRowDragAndDrop", void 0);
    __decorate([
        Complex({}, RowDropSettings)
    ], Grid.prototype, "rowDropSettings", void 0);
    __decorate([
        Complex({}, FilterSettings)
    ], Grid.prototype, "filterSettings", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "allowGrouping", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "showColumnMenu", void 0);
    __decorate([
        Complex({}, GroupSettings)
    ], Grid.prototype, "groupSettings", void 0);
    __decorate([
        Complex({}, EditSettings)
    ], Grid.prototype, "editSettings", void 0);
    __decorate([
        Collection([], AggregateRow)
    ], Grid.prototype, "aggregates", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "showColumnChooser", void 0);
    __decorate([
        Property('auto')
    ], Grid.prototype, "height", void 0);
    __decorate([
        Property('auto')
    ], Grid.prototype, "width", void 0);
    __decorate([
        Property('default')
    ], Grid.prototype, "gridLines", void 0);
    __decorate([
        Property()
    ], Grid.prototype, "rowTemplate", void 0);
    __decorate([
        Property()
    ], Grid.prototype, "detailTemplate", void 0);
    __decorate([
        Property()
    ], Grid.prototype, "childGrid", void 0);
    __decorate([
        Property()
    ], Grid.prototype, "queryString", void 0);
    __decorate([
        Property('allpages')
    ], Grid.prototype, "printMode", void 0);
    __decorate([
        Property([])
    ], Grid.prototype, "dataSource", void 0);
    __decorate([
        Property()
    ], Grid.prototype, "query", void 0);
    __decorate([
        Property('USD')
    ], Grid.prototype, "currencyCode", void 0);
    __decorate([
        Property()
    ], Grid.prototype, "toolbar", void 0);
    __decorate([
        Property()
    ], Grid.prototype, "contextMenuItems", void 0);
    __decorate([
        Property()
    ], Grid.prototype, "columnMenuItems", void 0);
    __decorate([
        Property()
    ], Grid.prototype, "toolbarTemplate", void 0);
    __decorate([
        Property()
    ], Grid.prototype, "pagerTemplate", void 0);
    __decorate([
        Property(0)
    ], Grid.prototype, "frozenRows", void 0);
    __decorate([
        Property(0)
    ], Grid.prototype, "frozenColumns", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "created", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "destroyed", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "load", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "rowDataBound", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "queryCellInfo", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "actionBegin", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "actionComplete", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "actionFailure", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "dataBound", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "recordDoubleClick", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "rowSelecting", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "rowSelected", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "rowDeselecting", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "rowDeselected", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "cellSelecting", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "cellSelected", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "cellDeselecting", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "cellDeselected", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "columnDragStart", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "columnDrag", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "columnDrop", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "printComplete", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "beforePrint", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "pdfQueryCellInfo", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "excelQueryCellInfo", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "beforeExcelExport", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "excelExportComplete", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "beforePdfExport", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "pdfExportComplete", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "detailDataBound", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "rowDragStart", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "rowDrag", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "rowDrop", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "toolbarClick", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "beforeOpenColumnChooser", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "batchAdd", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "batchDelete", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "beforeBatchAdd", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "beforeBatchDelete", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "beforeBatchSave", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "beginEdit", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "cellEdit", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "cellSave", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "resizeStart", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "onResize", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "resizeStop", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "beforeDataBound", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "contextMenuOpen", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "contextMenuClick", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "columnMenuOpen", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "columnMenuClick", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "checkBoxChange", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "beforeCopy", void 0);
    Grid = __decorate([
        NotifyPropertyChanges
    ], Grid);
    return Grid;
}(Component));
Grid.Inject(Selection);

/**
 * Base export
 */

/**
 *
 * `Sort` module is used to handle sorting action.
 */
var Sort = /** @class */ (function () {
    /**
     * Constructor for Grid sorting module
     * @hidden
     */
    function Sort(parent, sortSettings, sortedColumns, locator) {
        this.contentRefresh = true;
        this.isModelChanged = true;
        this.aria = new AriaService();
        this.parent = parent;
        this.sortSettings = sortSettings;
        this.sortedColumns = sortedColumns;
        this.focus = locator.getService('focus');
        this.addEventListener();
    }
    /**
     * The function used to update sortSettings
     * @return {void}
     * @hidden
     */
    Sort.prototype.updateModel = function () {
        var sortedColumn = { field: this.columnName, direction: this.direction };
        var index;
        var gCols = this.parent.groupSettings.columns;
        var flag = false;
        if (!this.isMultiSort) {
            if (!gCols.length) {
                this.sortSettings.columns = [sortedColumn];
            }
            else {
                var sortedCols = [];
                for (var i = 0, len = gCols.length; i < len; i++) {
                    index = this.getSortedColsIndexByField(gCols[i], sortedCols);
                    if (this.columnName === gCols[i]) {
                        flag = true;
                        sortedCols.push(sortedColumn);
                    }
                    else {
                        var sCol = this.getSortColumnFromField(gCols[i]);
                        sortedCols.push({ field: sCol.field, direction: sCol.direction });
                    }
                }
                if (!flag) {
                    sortedCols.push(sortedColumn);
                }
                this.sortSettings.columns = sortedCols;
            }
        }
        else {
            index = this.getSortedColsIndexByField(this.columnName);
            if (index > -1) {
                this.sortSettings.columns.splice(index, 1);
            }
            this.sortSettings.columns.push(sortedColumn);
            this.sortSettings.columns = this.sortSettings.columns;
        }
        this.parent.dataBind();
        this.lastSortedCol = this.columnName;
    };
    /**
     * The function used to trigger onActionComplete
     * @return {void}
     * @hidden
     */
    Sort.prototype.onActionComplete = function (e) {
        var args = !this.isRemove ? {
            columnName: this.columnName, direction: this.direction, requestType: 'sorting', type: actionComplete
        } : { requestType: 'sorting', type: actionComplete };
        this.isRemove = false;
        this.parent.trigger(actionComplete, extend(e, args));
    };
    /**
     * Sorts a column with given options.
     * @param {string} columnName - Defines the column name to sort.
     * @param {SortDirection} direction - Defines the direction of sorting for field.
     * @param {boolean} isMultiSort - Specifies whether the previous sorted columns to be maintained.
     * @return {void}
     */
    Sort.prototype.sortColumn = function (columnName, direction, isMultiSort) {
        var gObj = this.parent;
        if (this.parent.getColumnByField(columnName).allowSorting === false || this.parent.isContextMenuOpen()) {
            return;
        }
        if (!gObj.allowMultiSorting) {
            isMultiSort = gObj.allowMultiSorting;
        }
        if (this.isActionPrevent()) {
            gObj.notify(preventBatch, {
                instance: this, handler: this.sortColumn,
                arg1: columnName, arg2: direction, arg3: isMultiSort
            });
            return;
        }
        this.columnName = columnName;
        this.direction = direction;
        this.isMultiSort = isMultiSort;
        this.removeSortIcons();
        var column = gObj.getColumnHeaderByField(columnName);
        this.updateSortedCols(columnName, isMultiSort);
        this.updateModel();
    };
    Sort.prototype.updateSortedCols = function (columnName, isMultiSort) {
        if (!isMultiSort) {
            if (this.parent.allowGrouping) {
                for (var i = 0, len = this.sortedColumns.length; i < len; i++) {
                    if (this.parent.groupSettings.columns.indexOf(this.sortedColumns[i]) < 0) {
                        this.sortedColumns.splice(i, 1);
                        len--;
                        i--;
                    }
                }
            }
            else {
                this.sortedColumns.splice(0, this.sortedColumns.length);
            }
        }
        if (this.sortedColumns.indexOf(columnName) < 0) {
            this.sortedColumns.push(columnName);
        }
    };
    /**
     * @hidden
     */
    Sort.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        if (this.contentRefresh) {
            var args = this.sortSettings.columns.length ? {
                columnName: this.columnName, direction: this.direction, requestType: 'sorting', type: actionBegin
            } : { requestType: 'sorting', type: actionBegin };
            this.parent.notify(modelChanged, args);
        }
        this.removeSortIcons();
        this.addSortIcons();
    };
    /**
     * Clears all the sorted columns of Grid.
     * @return {void}
     */
    Sort.prototype.clearSorting = function () {
        var cols = getActualPropFromColl(this.sortSettings.columns);
        if (this.isActionPrevent()) {
            this.parent.notify(preventBatch, { instance: this, handler: this.clearSorting });
            return;
        }
        for (var i = 0, len = cols.length; i < len; i++) {
            this.removeSortColumn(cols[i].field);
        }
    };
    Sort.prototype.isActionPrevent = function () {
        return isActionPrevent(this.parent);
    };
    /**
     * Remove sorted column by field name.
     * @param {string} field - Defines the column field name to remove sort.
     * @return {void}
     * @hidden
     */
    Sort.prototype.removeSortColumn = function (field) {
        var gObj = this.parent;
        var cols = this.sortSettings.columns;
        if (this.isActionPrevent()) {
            this.parent.notify(preventBatch, { instance: this, handler: this.removeSortColumn, arg1: field });
            return;
        }
        this.removeSortIcons();
        for (var i = 0, len = cols.length; i < len; i++) {
            if (cols[i].field === field) {
                if (gObj.allowGrouping && gObj.groupSettings.columns.indexOf(cols[i].field) > -1) {
                    continue;
                }
                this.sortedColumns.splice(this.sortedColumns.indexOf(cols[i].field), 1);
                cols.splice(i, 1);
                this.isRemove = true;
                if (this.isModelChanged) {
                    this.parent.notify(modelChanged, {
                        requestType: 'sorting', type: actionBegin
                    });
                }
                break;
            }
        }
        this.addSortIcons();
    };
    Sort.prototype.getSortedColsIndexByField = function (field, sortedColumns) {
        var cols = sortedColumns ? sortedColumns : this.sortSettings.columns;
        for (var i = 0, len = cols.length; i < len; i++) {
            if (cols[i].field === field) {
                return i;
            }
        }
        return -1;
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Sort.prototype.getModuleName = function () {
        return 'sort';
    };
    Sort.prototype.initialEnd = function () {
        this.parent.off(contentReady, this.initialEnd);
        if (this.parent.getColumns().length && this.sortSettings.columns.length) {
            var gObj = this.parent;
            this.contentRefresh = false;
            this.isMultiSort = this.sortSettings.columns.length > 1;
            for (var _i = 0, _a = gObj.sortSettings.columns; _i < _a.length; _i++) {
                var col = _a[_i];
                if (this.sortedColumns.indexOf(col.field) > -1) {
                    this.sortColumn(col.field, col.direction, true);
                }
            }
            this.isMultiSort = false;
            this.contentRefresh = true;
        }
    };
    /**
     * @hidden
     */
    Sort.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(contentReady, this.initialEnd, this);
        this.parent.on(sortComplete, this.onActionComplete, this);
        this.parent.on(inBoundModelChanged, this.onPropertyChanged, this);
        this.parent.on(click, this.clickHandler, this);
        this.parent.on(headerRefreshed, this.refreshSortIcons, this);
        this.parent.on(keyPressed, this.keyPressed, this);
    };
    /**
     * @hidden
     */
    Sort.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(sortComplete, this.onActionComplete);
        this.parent.off(inBoundModelChanged, this.onPropertyChanged);
        this.parent.off(click, this.clickHandler);
        this.parent.off(headerRefreshed, this.refreshSortIcons);
        this.parent.off(keyPressed, this.keyPressed);
    };
    /**
     * To destroy the sorting
     * @return {void}
     * @hidden
     */
    Sort.prototype.destroy = function () {
        this.isModelChanged = false;
        if (this.parent.element.querySelector('.e-gridpopup').querySelectorAll('.e-sortdirect').length) {
            this.parent.element.querySelector('.e-gridpopup').style.display = 'none';
        }
        this.clearSorting();
        this.isModelChanged = true;
        this.removeEventListener();
    };
    Sort.prototype.clickHandler = function (e) {
        this.popUpClickHandler(e);
        var target = closest(e.target, '.e-headercell');
        if (target && !e.target.classList.contains('e-grptogglebtn') &&
            !e.target.classList.contains('e-stackedheadercell') &&
            !e.target.classList.contains('e-stackedheadercelldiv') &&
            !(target.classList.contains('e-resized')) &&
            !e.target.classList.contains('e-columnmenu') &&
            !e.target.classList.contains('e-filtermenudiv')) {
            var gObj = this.parent;
            var colObj = gObj.getColumnByUid(target.querySelector('.e-headercelldiv').getAttribute('e-mappinguid'));
            var direction = !target.querySelectorAll('.e-ascending').length ? 'ascending' :
                'descending';
            if (colObj.type !== 'checkbox') {
                this.initiateSort(target, e, colObj);
                if (Browser.isDevice) {
                    this.showPopUp(e);
                }
            }
        }
        if (target) {
            target.classList.remove('e-resized');
        }
    };
    Sort.prototype.keyPressed = function (e) {
        if (!this.parent.isEdit && (e.action === 'enter' || e.action === 'ctrlEnter' || e.action === 'shiftEnter')) {
            var target = this.focus.getFocusedElement();
            if (!target || !target.classList.contains('e-headercell') || (this.parent.frozenColumns || this.parent.frozenRows)) {
                return;
            }
            var col = this.parent.getColumnByUid(target.querySelector('.e-headercelldiv').getAttribute('e-mappinguid'));
            this.initiateSort(target, e, col);
        }
    };
    Sort.prototype.initiateSort = function (target, e, column) {
        var gObj = this.parent;
        var field = column.field;
        var direction = !target.querySelectorAll('.e-ascending').length ? 'ascending' :
            'descending';
        if (e.shiftKey || (this.sortSettings.allowUnsort && target.querySelectorAll('.e-descending').length)
            && !(gObj.groupSettings.columns.indexOf(field) > -1)) {
            this.removeSortColumn(field);
        }
        else {
            this.sortColumn(field, direction, e.ctrlKey || this.enableSortMultiTouch);
        }
    };
    Sort.prototype.showPopUp = function (e) {
        var target = closest(e.target, '.e-headercell');
        if (!isNullOrUndefined(target) || this.parent.isContextMenuOpen()) {
            setCssInGridPopUp(this.parent.element.querySelector('.e-gridpopup'), e, 'e-sortdirect e-icons e-icon-sortdirect' + (this.sortedColumns.length > 1 ? ' e-spanclicked' : ''));
        }
    };
    Sort.prototype.popUpClickHandler = function (e) {
        var target = e.target;
        if (closest(target, '.e-headercell') || e.target.classList.contains('e-rowcell') ||
            closest(target, '.e-gridpopup')) {
            if (target.classList.contains('e-sortdirect')) {
                if (!target.classList.contains('e-spanclicked')) {
                    target.classList.add('e-spanclicked');
                    this.enableSortMultiTouch = true;
                }
                else {
                    target.classList.remove('e-spanclicked');
                    this.enableSortMultiTouch = false;
                    this.parent.element.querySelector('.e-gridpopup').style.display = 'none';
                }
            }
        }
        else {
            this.parent.element.querySelector('.e-gridpopup').style.display = 'none';
        }
    };
    Sort.prototype.addSortIcons = function () {
        var gObj = this.parent;
        var header;
        var filterElement;
        var cols = this.sortSettings.columns;
        var fieldNames = this.parent.getColumns().map(function (c) { return c.field; });
        for (var i = 0, len = cols.length; i < len; i++) {
            if (fieldNames.indexOf(cols[i].field) === -1) {
                continue;
            }
            header = gObj.getColumnHeaderByField(cols[i].field);
            this.aria.setSort(header, cols[i].direction);
            if (this.isMultiSort && cols.length > 1) {
                header.querySelector('.e-headercelldiv').insertBefore(createElement('span', { className: 'e-sortnumber', innerHTML: (i + 1).toString() }), header.querySelector('.e-headertext'));
            }
            filterElement = header.querySelector('.e-sortfilterdiv');
            if (cols[i].direction === 'ascending') {
                classList(filterElement, ['e-ascending', 'e-icon-ascending'], []);
            }
            else {
                classList(filterElement, ['e-descending', 'e-icon-descending'], []);
            }
        }
    };
    Sort.prototype.removeSortIcons = function (position) {
        var gObj = this.parent;
        var header;
        var cols = this.sortSettings.columns;
        var fieldNames = this.parent.getColumns().map(function (c) { return c.field; });
        for (var i = position ? position : 0, len = !isNullOrUndefined(position) ? position + 1 : cols.length; i < len; i++) {
            if (gObj.allowGrouping && gObj.groupSettings.columns.indexOf(cols[i].field) > -1) {
                continue;
            }
            if (fieldNames.indexOf(cols[i].field) === -1) {
                continue;
            }
            header = gObj.getColumnHeaderByField(cols[i].field);
            this.aria.setSort(header, 'none');
            classList(header.querySelector('.e-sortfilterdiv'), [], ['e-descending', 'e-icon-descending', 'e-ascending', 'e-icon-ascending']);
            if (header.querySelector('.e-sortnumber')) {
                header.querySelector('.e-headercelldiv').removeChild(header.querySelector('.e-sortnumber'));
            }
        }
    };
    Sort.prototype.getSortColumnFromField = function (field) {
        for (var i = 0, len = this.sortSettings.columns.length; i < len; i++) {
            if (this.sortSettings.columns[i].field === field) {
                return this.sortSettings.columns[i];
            }
        }
        return false;
    };
    Sort.prototype.updateAriaAttr = function () {
        var fieldNames = this.parent.getColumns().map(function (c) { return c.field; });
        for (var _i = 0, _a = this.sortedColumns; _i < _a.length; _i++) {
            var col = _a[_i];
            if (fieldNames.indexOf(col) === -1) {
                continue;
            }
            var header = this.parent.getColumnHeaderByField(col);
            this.aria.setSort(header, this.getSortColumnFromField(col).direction);
        }
    };
    Sort.prototype.refreshSortIcons = function () {
        this.removeSortIcons();
        this.isMultiSort = true;
        this.removeSortIcons();
        this.addSortIcons();
        this.isMultiSort = false;
        this.updateAriaAttr();
    };
    return Sort;
}());

/**
 * `NumericContainer` module handles rendering and refreshing numeric container.
 */
var NumericContainer = /** @class */ (function () {
    /**
     * Constructor for numericContainer module
     * @hidden
     */
    function NumericContainer(pagerModule) {
        this.pagerModule = pagerModule;
    }
    /**
     * The function is used to render numericContainer
     * @hidden
     */
    NumericContainer.prototype.render = function () {
        this.pagerElement = this.pagerModule.element;
        this.renderNumericContainer();
        this.refreshNumericLinks();
        this.wireEvents();
    };
    /**
     * Refreshes the numeric container of Pager.
     */
    NumericContainer.prototype.refresh = function () {
        this.pagerModule.updateTotalPages();
        if (this.links.length) {
            this.updateLinksHtml();
        }
        this.updateStyles();
    };
    /**
     * The function is used to refresh refreshNumericLinks
     * @hidden
     */
    NumericContainer.prototype.refreshNumericLinks = function () {
        var link;
        var pagerObj = this.pagerModule;
        var div = pagerObj.element.querySelector('.e-numericcontainer');
        var frag = document.createDocumentFragment();
        div.innerHTML = '';
        for (var i = 1; i <= pagerObj.pageCount; i++) {
            link = createElement('a', {
                className: 'e-link e-numericitem e-spacing e-pager-default',
                attrs: { role: 'link', tabindex: '-1', 'aria-label': 'Goto Page ' + i }
            });
            if (pagerObj.currentPage === i) {
                classList(link, ['e-currentitem', 'e-active'], ['e-pager-default']);
            }
            frag.appendChild(link);
        }
        div.appendChild(frag);
        this.links = [].slice.call(div.childNodes);
    };
    /**
     * Binding events to the element while component creation
     * @hidden
     */
    NumericContainer.prototype.wireEvents = function () {
        EventHandler.add(this.pagerElement, 'click', this.clickHandler, this);
    };
    /**
     * Unbinding events from the element while component destroy
     * @hidden
     */
    NumericContainer.prototype.unwireEvents = function () {
        EventHandler.remove(this.pagerElement, 'click', this.clickHandler);
    };
    /**
     * To destroy the PagerMessage
     * @method destroy
     * @return {void}
     * @hidden
     */
    NumericContainer.prototype.destroy = function () {
        this.unwireEvents();
    };
    NumericContainer.prototype.renderNumericContainer = function () {
        this.element = createElement('div', {
            className: 'e-pagercontainer', attrs: { 'role': 'navigation' }
        });
        this.renderFirstNPrev(this.element);
        this.renderPrevPagerSet(this.element);
        this.element.appendChild(createElement('div', { className: 'e-numericcontainer' }));
        this.renderNextPagerSet(this.element);
        this.renderNextNLast(this.element);
        this.pagerModule.element.appendChild(this.element);
    };
    NumericContainer.prototype.renderFirstNPrev = function (pagerContainer) {
        this.first = createElement('div', {
            className: 'e-first e-icons e-icon-first',
            attrs: {
                title: this.pagerModule.getLocalizedLabel('firstPageTooltip'),
                'aria-label': this.pagerModule.getLocalizedLabel('firstPageTooltip'),
                tabindex: '-1'
            }
        });
        this.prev = createElement('div', {
            className: 'e-prev e-icons e-icon-prev',
            attrs: {
                title: this.pagerModule.getLocalizedLabel('previousPageTooltip'),
                'aria-label': this.pagerModule.getLocalizedLabel('previousPageTooltip'),
                tabindex: '-1'
            }
        });
        append([this.first, this.prev], pagerContainer);
    };
    NumericContainer.prototype.renderPrevPagerSet = function (pagerContainer) {
        this.PP = createElement('a', {
            className: 'e-link e-pp e-spacing', innerHTML: '...',
            attrs: {
                title: this.pagerModule.getLocalizedLabel('previousPagerTooltip'), role: 'link',
                'aria-label': this.pagerModule.getLocalizedLabel('previousPagerTooltip'),
                tabindex: '-1'
            }
        });
        pagerContainer.appendChild(this.PP);
    };
    NumericContainer.prototype.renderNextPagerSet = function (pagerContainer) {
        this.NP = createElement('a', {
            className: 'e-link e-np e-spacing',
            innerHTML: '...', attrs: {
                title: this.pagerModule.getLocalizedLabel('nextPagerTooltip'), role: 'link',
                'aria-label': this.pagerModule.getLocalizedLabel('nextPagerTooltip'),
                tabindex: '-1'
            }
        });
        pagerContainer.appendChild(this.NP);
    };
    NumericContainer.prototype.renderNextNLast = function (pagerContainer) {
        this.next = createElement('div', {
            className: 'e-next e-icons e-icon-next',
            attrs: {
                title: this.pagerModule.getLocalizedLabel('nextPageTooltip'),
                'aria-label': this.pagerModule.getLocalizedLabel('nextPageTooltip'),
                tabindex: '-1'
            }
        });
        this.last = createElement('div', {
            className: 'e-last e-icons e-icon-last',
            attrs: {
                title: this.pagerModule.getLocalizedLabel('lastPageTooltip'),
                'aria-label': this.pagerModule.getLocalizedLabel('lastPageTooltip'),
                tabindex: '-1'
            }
        });
        append([this.next, this.last], pagerContainer);
    };
    NumericContainer.prototype.clickHandler = function (e) {
        var pagerObj = this.pagerModule;
        var target = e.target;
        pagerObj.previousPageNo = pagerObj.currentPage;
        if (!target.classList.contains('e-disable') && !isNullOrUndefined(target.getAttribute('index'))) {
            pagerObj.currentPage = parseInt(target.getAttribute('index'), 10);
            pagerObj.dataBind();
        }
        return false;
    };
    NumericContainer.prototype.updateLinksHtml = function () {
        var pagerObj = this.pagerModule;
        var currentPageSet;
        var pageNo;
        pagerObj.currentPage = pagerObj.totalPages === 1 ? 1 : pagerObj.currentPage;
        if (pagerObj.currentPage > pagerObj.totalPages && pagerObj.totalPages) {
            pagerObj.currentPage = pagerObj.totalPages;
        }
        currentPageSet = parseInt((pagerObj.currentPage / pagerObj.pageCount).toString(), 10);
        if (pagerObj.currentPage % pagerObj.pageCount === 0 && currentPageSet > 0) {
            currentPageSet = currentPageSet - 1;
        }
        for (var i = 0; i < pagerObj.pageCount; i++) {
            pageNo = (currentPageSet * pagerObj.pageCount) + 1 + i;
            if (pageNo <= pagerObj.totalPages) {
                this.links[i].style.display = '';
                this.links[i].setAttribute('index', pageNo.toString());
                this.links[i].innerHTML = !pagerObj.customText ? pageNo.toString() : pagerObj.customText + pageNo;
                if (pagerObj.currentPage !== pageNo) {
                    this.links[i].classList.add('e-pager-default');
                }
                else {
                    this.links[i].classList.remove('e-pager-default');
                }
            }
            else {
                this.links[i].style.display = 'none';
            }
            classList(this.links[i], [], ['e-currentitem', 'e-active']);
        }
        this.first.setAttribute('index', '1');
        this.last.setAttribute('index', pagerObj.totalPages.toString());
        this.prev.setAttribute('index', (pagerObj.currentPage - 1).toString());
        this.next.setAttribute('index', (pagerObj.currentPage + 1).toString());
        this.pagerElement.querySelector('.e-mfirst').setAttribute('index', '1');
        this.pagerElement.querySelector('.e-mlast').setAttribute('index', pagerObj.totalPages.toString());
        this.pagerElement.querySelector('.e-mprev').setAttribute('index', (pagerObj.currentPage - 1).toString());
        this.pagerElement.querySelector('.e-mnext').setAttribute('index', (pagerObj.currentPage + 1).toString());
        this.PP.setAttribute('index', (parseInt(this.links[0].getAttribute('index'), 10) - pagerObj.pageCount).toString());
        this.NP.setAttribute('index', (parseInt(this.links[this.links.length - 1].getAttribute('index'), 10) + 1).toString());
    };
    NumericContainer.prototype.updateStyles = function () {
        this.updateFirstNPrevStyles();
        this.updatePrevPagerSetStyles();
        this.updateNextPagerSetStyles();
        this.updateNextNLastStyles();
        if (this.links.length) {
            classList(this.links[(this.pagerModule.currentPage - 1) % this.pagerModule.pageCount], ['e-currentitem', 'e-active'], []);
        }
    };
    NumericContainer.prototype.updateFirstNPrevStyles = function () {
        var firstPage = ['e-firstpage', 'e-pager-default'];
        var firstPageDisabled = ['e-firstpagedisabled', 'e-disable'];
        var prevPage = ['e-prevpage', 'e-pager-default'];
        var prevPageDisabled = ['e-prevpagedisabled', 'e-disable'];
        if (this.pagerModule.currentPage > 1) {
            classList(this.prev, prevPage, prevPageDisabled);
            classList(this.first, firstPage, firstPageDisabled);
            classList(this.pagerElement.querySelector('.e-mfirst'), firstPage, firstPageDisabled);
            classList(this.pagerElement.querySelector('.e-mprev'), prevPage, prevPageDisabled);
        }
        else {
            classList(this.prev, prevPageDisabled, prevPage);
            classList(this.first, firstPageDisabled, firstPage);
            classList(this.pagerElement.querySelector('.e-mprev'), prevPageDisabled, prevPage);
            classList(this.pagerElement.querySelector('.e-mfirst'), firstPageDisabled, firstPage);
        }
    };
    NumericContainer.prototype.updatePrevPagerSetStyles = function () {
        if (this.pagerModule.currentPage > this.pagerModule.pageCount) {
            classList(this.PP, ['e-numericitem', 'e-pager-default'], ['e-nextprevitemdisabled', 'e-disable']);
        }
        else {
            classList(this.PP, ['e-nextprevitemdisabled', 'e-disable'], ['e-numericitem', 'e-pager-default']);
        }
    };
    NumericContainer.prototype.updateNextPagerSetStyles = function () {
        var pagerObj = this.pagerModule;
        var firstPage = this.links[0].innerHTML.replace(pagerObj.customText, '');
        if (!firstPage.length || !this.links.length || (parseInt(firstPage, 10) + pagerObj.pageCount > pagerObj.totalPages)) {
            classList(this.NP, ['e-nextprevitemdisabled', 'e-disable'], ['e-numericitem', 'e-pager-default']);
        }
        else {
            classList(this.NP, ['e-numericitem', 'e-pager-default'], ['e-nextprevitemdisabled', 'e-disable']);
        }
    };
    NumericContainer.prototype.updateNextNLastStyles = function () {
        var lastPage = ['e-lastpage', 'e-pager-default'];
        var lastPageDisabled = ['e-lastpagedisabled', 'e-disable'];
        var nextPage = ['e-nextpage', 'e-pager-default'];
        var nextPageDisabled = ['e-nextpagedisabled', 'e-disable'];
        var pagerObj = this.pagerModule;
        if (pagerObj.currentPage === pagerObj.totalPages || pagerObj.totalRecordsCount === 0) {
            classList(this.last, lastPageDisabled, lastPage);
            classList(this.next, nextPageDisabled, nextPage);
            classList(this.pagerElement.querySelector('.e-mlast'), lastPageDisabled, lastPage);
            classList(this.pagerElement.querySelector('.e-mnext'), nextPageDisabled, nextPage);
        }
        else {
            classList(this.last, lastPage, lastPageDisabled);
            classList(this.next, nextPage, nextPageDisabled);
            classList(this.pagerElement.querySelector('.e-mlast'), lastPage, lastPageDisabled);
            classList(this.pagerElement.querySelector('.e-mnext'), nextPage, nextPageDisabled);
        }
    };
    return NumericContainer;
}());

/**
 * `PagerMessage` module is used to display pager information.
 */
var PagerMessage = /** @class */ (function () {
    /**
     * Constructor for externalMessage module
     * @hidden
     */
    function PagerMessage(pagerModule) {
        this.pagerModule = pagerModule;
    }
    /**
     * The function is used to render pager message
     * @hidden
     */
    PagerMessage.prototype.render = function () {
        var div = createElement('div', { className: 'e-parentmsgbar', attrs: { 'aria-label': 'Pager Information' } });
        this.pageNoMsgElem = createElement('span', { className: 'e-pagenomsg', styles: 'textalign:right' });
        this.pageCountMsgElem = createElement('span', { className: 'e-pagecountmsg', styles: 'textalign:right' });
        append([this.pageNoMsgElem, this.pageCountMsgElem], div);
        this.pagerModule.element.appendChild(div);
        this.refresh();
    };
    /**
     * Refreshes the pager information.
     */
    PagerMessage.prototype.refresh = function () {
        var pagerObj = this.pagerModule;
        this.pageNoMsgElem.textContent = this.format(pagerObj.getLocalizedLabel('currentPageInfo'), [pagerObj.totalRecordsCount === 0 ? 0 :
                pagerObj.currentPage, pagerObj.totalPages || 0]) + ' ';
        this.pageCountMsgElem.textContent = this.format(pagerObj.getLocalizedLabel('totalItemsInfo'), [pagerObj.totalRecordsCount || 0]);
        this.pageNoMsgElem.parentElement.setAttribute('aria-label', this.pageNoMsgElem.textContent + this.pageCountMsgElem.textContent);
    };
    /**
     * Hides the Pager information.
     */
    PagerMessage.prototype.hideMessage = function () {
        if (this.pageNoMsgElem) {
            this.pageNoMsgElem.style.display = 'none';
        }
        if (this.pageCountMsgElem) {
            this.pageCountMsgElem.style.display = 'none';
        }
    };
    /**
     * Shows the Pager information.
     */
    PagerMessage.prototype.showMessage = function () {
        if (!this.pageNoMsgElem) {
            this.render();
        }
        this.pageNoMsgElem.style.display = '';
        this.pageCountMsgElem.style.display = '';
    };
    /**
     * To destroy the PagerMessage
     * @method destroy
     * @return {void}
     * @hidden
     */
    PagerMessage.prototype.destroy = function () {
        //destroy
    };
    PagerMessage.prototype.format = function (str, args) {
        var regx;
        for (var i = 0; i < args.length; i++) {
            regx = new RegExp('\\{' + (i) + '\\}', 'gm');
            str = str.replace(regx, args[i].toString());
        }
        return str;
    };
    return PagerMessage;
}());

var __extends$14 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Represents the `Pager` component.
 * ```html
 * <div id="pager"/>
 * ```
 * ```typescript
 * <script>
 *   var pagerObj = new Pager({ totalRecordsCount: 50, pageSize:10 });
 *   pagerObj.appendTo("#pager");
 * </script>
 * ```
 */
var Pager = /** @class */ (function (_super) {
    __extends$14(Pager, _super);
    /**
     * Constructor for creating the component.
     * @hidden
     */
    function Pager(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.defaultConstants = {
            currentPageInfo: '{0} of {1} pages',
            totalItemsInfo: '({0} items)',
            firstPageTooltip: 'Go to first page',
            lastPageTooltip: 'Go to last page',
            nextPageTooltip: 'Go to next page',
            previousPageTooltip: 'Go to previous page',
            nextPagerTooltip: 'Go to next pager',
            previousPagerTooltip: 'Go to previous pager',
            pagerDropDown: 'Items per page'
        };
        /**
         * `containerModule` is used to manipulate numeric container behavior of Pager.
         */
        _this.containerModule = new NumericContainer(_this);
        /**
         * `pagerMessageModule` is used to manipulate pager message of Pager.
         */
        _this.pagerMessageModule = new PagerMessage(_this);
        return _this;
    }
    /**
     * To provide the array of modules needed for component rendering
     * @hidden
     */
    Pager.prototype.requiredModules = function () {
        var modules = [];
        if (this.enableExternalMessage) {
            modules.push({
                member: 'externalMessage',
                args: [this]
            });
        }
        if (this.checkpagesizes()) {
            modules.push({
                member: 'pagerdropdown',
                args: [this]
            });
        }
        return modules;
    };
    /**
     * Initialize the event handler
     * @hidden
     */
    Pager.prototype.preRender = function () {
        //preRender
    };
    /**
     * To Initialize the component rendering
     */
    Pager.prototype.render = function () {
        if (this.template) {
            this.pagerTemplate();
        }
        else {
            this.initLocalization();
            this.updateRTL();
            this.totalRecordsCount = this.totalRecordsCount || 0;
            this.renderFirstPrevDivForDevice();
            this.containerModule.render();
            if (this.enablePagerMessage) {
                this.pagerMessageModule.render();
            }
            this.renderNextLastDivForDevice();
            if (this.checkpagesizes()) {
                this.pagerdropdownModule.render();
            }
            this.addAriaLabel();
            if (this.enableExternalMessage && this.externalMessageModule) {
                this.externalMessageModule.render();
            }
            this.refresh();
            this.trigger('created', { 'currentPage': this.currentPage, 'totalRecordsCount': this.totalRecordsCount });
        }
    };
    /**
     * Get the properties to be maintained in the persisted state.
     * @hidden
     */
    Pager.prototype.getPersistData = function () {
        var keyEntity = ['currentPage', 'pageSize'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * To destroy the Pager component.
     * @method destroy
     * @return {void}
     */
    Pager.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.containerModule.destroy();
        this.pagerMessageModule.destroy();
        this.element.innerHTML = '';
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Pager.prototype.getModuleName = function () {
        return 'pager';
    };
    /**
     * Called internally if any of the property value changed.
     * @hidden
     */
    Pager.prototype.onPropertyChanged = function (newProp, oldProp) {
        if (this.isDestroyed) {
            return;
        }
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'pageCount':
                    this.containerModule.refreshNumericLinks();
                    this.containerModule.refresh();
                    break;
                case 'currentPage':
                    if (this.checkGoToPage(newProp.currentPage, oldProp.currentPage)) {
                        this.currentPageChanged();
                    }
                    break;
                case 'pageSize':
                case 'totalRecordsCount':
                case 'customText':
                    this.refresh();
                    break;
                case 'pageSizes':
                    if (this.checkpagesizes()) {
                        this.pagerdropdownModule.destroy();
                        this.pagerdropdownModule.render();
                    }
                    this.refresh();
                    break;
                case 'template':
                    this.templateFn = this.compile(this.template);
                    this.refresh();
                    break;
                case 'locale':
                    this.initLocalization();
                    this.refresh();
                    break;
                case 'enableExternalMessage':
                    if (this.enableExternalMessage) {
                        this.externalMessageModule.render();
                    }
                    break;
                case 'externalMessage':
                    if (this.externalMessageModule) {
                        this.externalMessageModule.refresh();
                    }
                    break;
                case 'enableRtl':
                    this.updateRTL();
                    break;
                case 'enablePagerMessage':
                    if (this.enablePagerMessage) {
                        this.pagerMessageModule.showMessage();
                    }
                    else {
                        this.pagerMessageModule.hideMessage();
                    }
                    break;
            }
        }
    };
    /**
     * Gets the localized label by locale keyword.
     * @param  {string} key
     * @return {string}
     */
    Pager.prototype.getLocalizedLabel = function (key) {
        return this.localeObj.getConstant(key);
    };
    /**
     * Navigate to target page by given number.
     * @param  {number} pageNo - Defines page number.
     * @return {void}
     */
    Pager.prototype.goToPage = function (pageNo) {
        if (this.checkGoToPage(pageNo)) {
            this.currentPage = pageNo;
            this.dataBind();
        }
    };
    Pager.prototype.checkpagesizes = function () {
        if (this.pageSizes === true || this.pageSizes.length) {
            return true;
        }
        return false;
    };
    Pager.prototype.checkGoToPage = function (newPageNo, oldPageNo) {
        if (newPageNo !== this.currentPage) {
            this.previousPageNo = this.currentPage;
        }
        if (!isNullOrUndefined(oldPageNo)) {
            this.previousPageNo = oldPageNo;
        }
        if (this.previousPageNo !== newPageNo && (newPageNo >= 1 && newPageNo <= this.totalPages)) {
            return true;
        }
        return false;
    };
    Pager.prototype.currentPageChanged = function () {
        if (this.enableQueryString) {
            this.updateQueryString(this.currentPage);
        }
        var args = { currentPage: this.currentPage, cancel: false };
        this.trigger('click', args);
        if (!args.cancel) {
            this.refresh();
        }
    };
    Pager.prototype.pagerTemplate = function () {
        var result;
        this.element.classList.add('e-pagertemplate');
        this.compile(this.template);
        var data = {
            currentPage: this.currentPage, pageSize: this.pageSize, pageCount: this.pageCount,
            totalRecordsCount: this.totalRecordsCount, totalPages: this.totalPages
        };
        result = this.getPagerTemplate()(data);
        appendChildren(this.element, result);
    };
    /** @hidden */
    Pager.prototype.updateTotalPages = function () {
        this.totalPages = (this.totalRecordsCount % this.pageSize === 0) ? (this.totalRecordsCount / this.pageSize) :
            (parseInt((this.totalRecordsCount / this.pageSize).toString(), 10) + 1);
    };
    /** @hidden */
    Pager.prototype.getPagerTemplate = function () {
        return this.templateFn;
    };
    Pager.prototype.compile = function (template) {
        if (template) {
            try {
                if (document.querySelectorAll(template).length) {
                    this.templateFn = compile(document.querySelector(template).innerHTML.trim());
                }
            }
            catch (e) {
                this.templateFn = compile(template);
            }
        }
        return undefined;
    };
    /**
     * Refreshes page count, pager information and external message.
     * @return {void}
     */
    Pager.prototype.refresh = function () {
        if (this.template) {
            this.element.innerHTML = '';
            this.updateTotalPages();
            this.pagerTemplate();
        }
        else {
            this.updateRTL();
            this.containerModule.refresh();
            if (this.enablePagerMessage) {
                this.pagerMessageModule.refresh();
            }
            if (this.enableExternalMessage && this.externalMessageModule) {
                this.externalMessageModule.refresh();
            }
        }
    };
    Pager.prototype.updateRTL = function () {
        if (this.enableRtl) {
            this.element.classList.add('e-rtl');
        }
        else {
            this.element.classList.remove('e-rtl');
        }
    };
    Pager.prototype.initLocalization = function () {
        this.localeObj = new L10n(this.getModuleName(), this.defaultConstants, this.locale);
    };
    Pager.prototype.updateQueryString = function (value) {
        var updatedUrl = this.getUpdatedURL(window.location.href, 'page', value.toString());
        window.history.pushState({ path: updatedUrl }, '', updatedUrl);
    };
    Pager.prototype.getUpdatedURL = function (uri, key, value) {
        var regx = new RegExp('([?|&])' + key + '=.*?(&|#|$)', 'i');
        if (uri.match(regx)) {
            return uri.replace(regx, '$1' + key + '=' + value + '$2');
        }
        else {
            var hash = '';
            if (uri.indexOf('#') !== -1) {
                hash = uri.replace(/.*#/, '#');
                uri = uri.replace(/#.*/, '');
            }
            return uri + (uri.indexOf('?') !== -1 ? '&' : '?') + key + '=' + value + hash;
        }
    };
    Pager.prototype.renderFirstPrevDivForDevice = function () {
        this.element.appendChild(createElement('div', {
            className: 'e-mfirst e-icons e-icon-first',
            attrs: { title: this.getLocalizedLabel('firstPageTooltip'), tabindex: '-1' }
        }));
        this.element.appendChild(createElement('div', {
            className: 'e-mprev e-icons e-icon-prev',
            attrs: { title: this.getLocalizedLabel('previousPageTooltip'), tabindex: '-1' }
        }));
    };
    Pager.prototype.renderNextLastDivForDevice = function () {
        this.element.appendChild(createElement('div', {
            className: 'e-mnext e-icons e-icon-next',
            attrs: { title: this.getLocalizedLabel('nextPageTooltip'), tabindex: '-1' }
        }));
        this.element.appendChild(createElement('div', {
            className: 'e-mlast e-icons e-icon-last',
            attrs: { title: this.getLocalizedLabel('lastPageTooltip'), tabindex: '-1' }
        }));
    };
    Pager.prototype.addAriaLabel = function () {
        var _this = this;
        var classList$$1 = ['.e-mfirst', '.e-mprev', '.e-mnext', '.e-mlast'];
        if (!Browser.isDevice) {
            classList$$1.forEach(function (value) {
                var element = _this.element.querySelector(value);
                element.setAttribute('aria-label', element.getAttribute('title'));
            });
        }
    };
    __decorate$3([
        Property(false)
    ], Pager.prototype, "enableQueryString", void 0);
    __decorate$3([
        Property(false)
    ], Pager.prototype, "enableExternalMessage", void 0);
    __decorate$3([
        Property(true)
    ], Pager.prototype, "enablePagerMessage", void 0);
    __decorate$3([
        Property(12)
    ], Pager.prototype, "pageSize", void 0);
    __decorate$3([
        Property(10)
    ], Pager.prototype, "pageCount", void 0);
    __decorate$3([
        Property(1)
    ], Pager.prototype, "currentPage", void 0);
    __decorate$3([
        Property()
    ], Pager.prototype, "totalRecordsCount", void 0);
    __decorate$3([
        Property()
    ], Pager.prototype, "externalMessage", void 0);
    __decorate$3([
        Property(false)
    ], Pager.prototype, "pageSizes", void 0);
    __decorate$3([
        Property()
    ], Pager.prototype, "template", void 0);
    __decorate$3([
        Property('')
    ], Pager.prototype, "customText", void 0);
    __decorate$3([
        Event()
    ], Pager.prototype, "click", void 0);
    __decorate$3([
        Event()
    ], Pager.prototype, "dropDownChanged", void 0);
    __decorate$3([
        Event()
    ], Pager.prototype, "created", void 0);
    Pager = __decorate$3([
        NotifyPropertyChanges
    ], Pager);
    return Pager;
}(Component));

/**
 * `PagerDropDown` module handles selected pageSize from DropDownList.
 */
var PagerDropDown = /** @class */ (function () {
    /**
     * Constructor for pager module
     * @hidden
     */
    function PagerDropDown(pagerModule) {
        this.pagerModule = pagerModule;
    }
    /**
     * For internal use only - Get the module name.
     * @private
     * @hidden
     */
    PagerDropDown.prototype.getModuleName = function () {
        return 'pagerdropdown';
    };
    /**
     * The function is used to render pager dropdown
     * @hidden
     */
    PagerDropDown.prototype.render = function () {
        var pagerObj = this.pagerModule;
        this.pagerDropDownDiv = createElement('div', { className: 'e-pagesizes' });
        var dropDownDiv = createElement('div', { className: 'e-pagerdropdown' });
        var defaultTextDiv = createElement('div', { className: 'e-pagerconstant' });
        var input = createElement('input', { attrs: { type: 'text', tabindex: '1' } });
        this.pagerCons = createElement('span', { className: 'e-constant', innerHTML: this.pagerModule.getLocalizedLabel('pagerDropDown') });
        dropDownDiv.appendChild(input);
        defaultTextDiv.appendChild(this.pagerCons);
        this.pagerDropDownDiv.appendChild(dropDownDiv);
        this.pagerDropDownDiv.appendChild(defaultTextDiv);
        this.pagerModule.element.appendChild(this.pagerDropDownDiv);
        var pageSizesModule = this.pagerModule.pageSizes;
        var pageSizesArray = (pageSizesModule.length ? pageSizesModule : [5, 10, 12, 20]);
        var defaultValue = (pageSizesArray).indexOf(this.pagerModule.pageSize) > -1 ? this.pagerModule.pageSize : pageSizesArray[0];
        this.dropDownListObject = new DropDownList({
            dataSource: pageSizesArray,
            value: defaultValue,
            change: this.onChange.bind(this)
        });
        this.dropDownListObject.appendTo(input);
        pagerObj.pageSize = defaultValue;
        pagerObj.dataBind();
        pagerObj.trigger('dropDownChanged', { pageSize: defaultValue });
    };
    /**
     * For internal use only - Get the pagesize.
     * @private
     * @hidden
     */
    PagerDropDown.prototype.onChange = function (e) {
        this.pagerModule.pageSize = this.dropDownListObject.value;
        this.pagerModule.dataBind();
        this.pagerModule.trigger('dropDownChanged', { pageSize: this.dropDownListObject.value });
    };
    /**
     * To destroy the Pagerdropdown
     * @method destroy
     * @return {void}
     * @hidden
     */
    PagerDropDown.prototype.destroy = function (args) {
        if (this.dropDownListObject && !this.dropDownListObject.isDestroyed) {
            this.dropDownListObject.destroy();
            remove(this.pagerDropDownDiv);
        }
    };
    return PagerDropDown;
}());

/**
 * `ExternalMessage` module is used to display user provided message.
 */
var ExternalMessage = /** @class */ (function () {
    /**
     * Constructor for externalMessage module
     * @param  {Pager} pagerModule?
     * @returns defaultType
     * @hidden
     */
    function ExternalMessage(pagerModule) {
        this.pagerModule = pagerModule;
    }
    /**
     * For internal use only - Get the module name.
     * @private
     */
    ExternalMessage.prototype.getModuleName = function () {
        return 'externalMessage';
    };
    /**
     * The function is used to render pager externalMessage
     * @hidden
     */
    ExternalMessage.prototype.render = function () {
        this.element = createElement('div', { className: 'e-pagerexternalmsg', attrs: { 'aria-label': 'Pager external message' } });
        this.pagerModule.element.appendChild(this.element);
        this.refresh();
    };
    /**
     * Refreshes the external message of Pager.
     */
    ExternalMessage.prototype.refresh = function () {
        if (this.pagerModule.externalMessage && this.pagerModule.externalMessage.toString().length) {
            this.showMessage();
            this.element.innerHTML = this.pagerModule.externalMessage;
        }
        else {
            this.hideMessage();
        }
    };
    /**
     * Hides the external message of Pager.
     */
    ExternalMessage.prototype.hideMessage = function () {
        this.element.style.display = 'none';
    };
    /**
     * Shows the external message of the Pager.
     */
    ExternalMessage.prototype.showMessage = function () {
        this.element.style.display = '';
    };
    /**
     * To destroy the PagerMessage
     * @method destroy
     * @return {void}
     * @hidden
     */
    ExternalMessage.prototype.destroy = function () {
        remove(this.element);
    };
    return ExternalMessage;
}());

Pager.Inject(ExternalMessage, PagerDropDown);
/**
 * `Page` module is used to render pager and handle paging action.
 */
var Page = /** @class */ (function () {
    /**
     * Constructor for the Grid paging module
     * @hidden
     */
    function Page(parent, pageSettings) {
        this.parent = parent;
        this.pageSettings = pageSettings;
        this.addEventListener();
    }
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Page.prototype.getModuleName = function () {
        return 'pager';
    };
    /**
     * The function used to render pager from grid pageSettings
     * @return {void}
     * @hidden
     */
    Page.prototype.render = function () {
        var gObj = this.parent;
        var pagerObj;
        this.pagerDestroy();
        if (!isNullOrUndefined(this.parent.pagerTemplate)) {
            this.pageSettings.template = this.parent.pagerTemplate;
        }
        this.element = createElement('div', { className: 'e-gridpager' });
        pagerObj = extend$1({}, extend({}, getActualProperties(this.pageSettings)), {
            click: this.clickHandler.bind(this),
            dropDownChanged: this.onSelect.bind(this),
            enableRtl: gObj.enableRtl, locale: gObj.locale,
            created: this.addAriaAttr.bind(this)
        }, ['parentObj', 'propName']);
        this.pagerObj = new Pager(pagerObj);
    };
    Page.prototype.onSelect = function (e) {
        this.pageSettings.pageSize = e.pageSize;
        this.pageSettings.currentPage = 1;
    };
    Page.prototype.addAriaAttr = function () {
        var _this = this;
        if (!(this.pageSettings.template)) {
            var numericContainer = this.element.querySelector('.e-numericcontainer');
            var links = numericContainer.querySelectorAll('a');
            for (var i = 0; i < links.length; i++) {
                if (this.parent.getContentTable()) {
                    links[i].setAttribute('aria-owns', this.parent.getContentTable().id);
                }
            }
            var classList$$1 = ['.e-mfirst', '.e-mprev', '.e-first', '.e-prev', '.e-next', '.e-last', '.e-mnext', '.e-mlast'];
            classList$$1.forEach(function (value) {
                var element = _this.element.querySelector(value);
                if (_this.parent.getContentTable()) {
                    element.setAttribute('aria-owns', _this.parent.getContentTable().id);
                }
            });
        }
    };
    Page.prototype.dataReady = function (e) {
        this.updateModel(e);
    };
    /**
     * Refreshes the page count, pager information and external message.
     * @return {void}
     */
    Page.prototype.refresh = function () {
        this.pagerObj.refresh();
    };
    /**
     * Navigate to target page by given number.
     * @param  {number} pageNo - Defines the page number to navigate.
     * @return {void}
     */
    Page.prototype.goToPage = function (pageNo) {
        this.pagerObj.goToPage(pageNo);
    };
    /**
     * The function used to update pageSettings model
     * @return {void}
     * @hidden
     */
    Page.prototype.updateModel = function (e) {
        this.parent.pageSettings.totalRecordsCount = e.count;
        this.parent.dataBind();
    };
    /**
     * The function used to trigger onActionComplete
     * @return {void}
     * @hidden
     */
    Page.prototype.onActionComplete = function (e) {
        this.parent.trigger(actionComplete, extend(e, {
            currentPage: this.parent.pageSettings.currentPage, requestType: 'paging',
            type: actionComplete
        }));
    };
    /**
     * @hidden
     */
    Page.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        var newProp = e.properties;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            this.pagerObj[prop] = newProp[prop];
        }
        this.pagerObj.dataBind();
    };
    Page.prototype.clickHandler = function (e) {
        var gObj = this.parent;
        if (this.isForceCancel || isActionPrevent(gObj)) {
            if (!this.isForceCancel) {
                gObj.notify(preventBatch, { instance: this, handler: this.goToPage, arg1: e.currentPage });
                this.isForceCancel = true;
                this.pagerObj.currentPage = gObj.pageSettings.currentPage;
                this.pagerObj.dataBind();
            }
            else {
                this.isForceCancel = false;
            }
            e.cancel = true;
            return;
        }
        var prevPage = this.pageSettings.currentPage;
        this.pageSettings.currentPage = e.currentPage;
        this.parent.notify(modelChanged, {
            requestType: 'paging',
            previousPage: prevPage,
            currentPage: e.currentPage,
            type: actionBegin
        });
    };
    Page.prototype.keyPressHandler = function (e) {
        if (this.canSkipAction(e.action)) {
            return;
        }
        if (e.action in keyActions) {
            e.preventDefault();
            this.element.querySelector(keyActions[e.action]).click();
        }
    };
    Page.prototype.canSkipAction = function (action) {
        var page = {
            pageUp: function (el) { return el.scrollTop !== 0; },
            pageDown: function (el) { return !(el.scrollTop >= el.scrollHeight - el.clientHeight); }
        };
        var activeElement = document.activeElement;
        if (activeElement.classList.contains('e-content') &&
            activeElement.isEqualNode(this.parent.getContent().firstElementChild) && ['pageUp', 'pageDown'].indexOf(action) !== -1) {
            return page[action](this.parent.getContent().firstChild);
        }
        return false;
    };
    /**
     * Defines the text of external message.
     * @param  {string} message - Defines the message to update.
     * @return {void}
     */
    Page.prototype.updateExternalMessage = function (message) {
        if (!this.pagerObj.enableExternalMessage) {
            this.pagerObj.enableExternalMessage = true;
            this.pagerObj.dataBind();
        }
        this.pagerObj.externalMessage = message;
        this.pagerObj.dataBind();
    };
    Page.prototype.appendToElement = function (e) {
        this.parent.element.appendChild(this.element);
        this.parent.setGridPager(this.element);
        this.pagerObj.appendTo(this.element);
    };
    Page.prototype.enableAfterRender = function (e) {
        if (e.module === this.getModuleName() && e.enable) {
            this.render();
            this.appendToElement();
        }
    };
    /**
     * @hidden
     */
    Page.prototype.addEventListener = function () {
        this.handlers = {
            load: this.render,
            end: this.appendToElement,
            ready: this.dataReady,
            complete: this.onActionComplete,
            updateLayout: this.enableAfterRender,
            inboundChange: this.onPropertyChanged,
            keyPress: this.keyPressHandler
        };
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(initialLoad, this.handlers.load, this);
        this.parent.on(initialEnd, this.handlers.end, this); //For initial rendering
        this.parent.on(dataReady, this.handlers.ready, this);
        this.parent.on(pageComplete, this.handlers.complete, this);
        this.parent.on(uiUpdate, this.handlers.updateLayout, this);
        this.parent.on(inBoundModelChanged, this.handlers.inboundChange, this);
        this.parent.on(keyPressed, this.handlers.keyPress, this);
    };
    /**
     * @hidden
     */
    Page.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(initialLoad, this.handlers.load);
        this.parent.off(initialEnd, this.handlers.end); //For initial rendering
        this.parent.off(dataReady, this.handlers.ready);
        this.parent.off(pageComplete, this.handlers.complete);
        this.parent.off(uiUpdate, this.handlers.updateLayout);
        this.parent.off(inBoundModelChanged, this.handlers.inboundChange);
        this.parent.off(keyPressed, this.handlers.keyPress);
    };
    /**
     * To destroy the pager
     * @return {void}
     * @hidden
     */
    Page.prototype.destroy = function () {
        this.removeEventListener();
        this.pagerDestroy();
    };
    Page.prototype.pagerDestroy = function () {
        if (this.pagerObj && !this.pagerObj.isDestroyed) {
            this.pagerObj.destroy();
            remove(this.element);
        }
    };
    return Page;
}());
/**
 * @hidden
 */
var keyActions = {
    pageUp: '.e-prev',
    pageDown: '.e-next',
    ctrlAltPageDown: '.e-last',
    ctrlAltPageUp: '.e-first',
    altPageUp: '.e-pp',
    altPageDown: '.e-np'
};

var __extends$15 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * FilterCellRenderer class which responsible for building filter cell.
 * @hidden
 */
var FilterCellRenderer = /** @class */ (function (_super) {
    __extends$15(FilterCellRenderer, _super);
    function FilterCellRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.element = createElement('TH', { className: 'e-filterbarcell' });
        return _this;
    }
    /**
     * Function to return the wrapper for the TH content.
     * @returns string
     */
    FilterCellRenderer.prototype.getGui = function () {
        return createElement('div');
    };
    /**
     * Function to render the cell content based on Column object.
     * @param  {Cell} cell
     * @param  {Object} data
     */
    FilterCellRenderer.prototype.render = function (cell, data) {
        var tr = this.parent.element.querySelector('.e-filterbar');
        var node = this.element.cloneNode();
        var innerDIV = this.getGui();
        var input;
        var column = cell.column;
        if (column.type !== 'checkbox') {
            tr.appendChild(node);
            if ((isNullOrUndefined(column.allowFiltering) || column.allowFiltering) && !isNullOrUndefined(column.filterBarTemplate)) {
                node.classList.add('e-fltrtemp');
                attributes(innerDIV, {
                    'class': 'e-fltrtempdiv'
                });
                if (isNullOrUndefined(column.filterBarTemplate.create)) {
                    input = createElement('input', {
                        id: column.field + '_filterBarcell', className: 'e-filterUi_input e-filtertext e-fltrTemp',
                        attrs: { type: 'search', title: column.headerText }
                    });
                    innerDIV.appendChild(input);
                }
                else {
                    var args = { column: column, node: Element };
                    var temp = column.filterBarTemplate.create;
                    if (typeof temp === 'string') {
                        temp = getValue(temp, window);
                    }
                    input = temp(args);
                    if (typeof input === 'string') {
                        var div = createElement('div');
                        div.innerHTML = input;
                        input = div.firstChild;
                    }
                    attributes(innerDIV, {
                        class: 'e-filterUi_input e-filtertext e-fltrTemp',
                        title: column.headerText,
                        id: column.field + '_filterBarcell',
                    });
                    innerDIV.appendChild(input);
                }
            }
            else {
                attributes(innerDIV, {
                    'class': 'e-filterdiv e-fltrinputdiv'
                });
                input = createElement('input', {
                    id: column.field + '_filterBarcell', className: 'e-filtertext',
                    attrs: {
                        type: 'search', title: column.headerText + cell.attributes.title,
                        value: data[cell.column.field] ? data[cell.column.field] : '', role: 'search'
                    }
                });
                innerDIV.appendChild(input);
                innerDIV.appendChild(createElement('span', {
                    className: 'e-cancel e-hide e-icons e-icon-hide',
                    attrs: { 'aria-label': 'clear filter cell', tabindex: '-1' }
                }));
            }
            //TODO: apply intial filtering
            if (column.allowFiltering === false || column.field === '' || isNullOrUndefined(column.field)) {
                input.setAttribute('disabled', 'true');
                input.classList.add('e-disable');
            }
            if (!column.visible) {
                node.classList.add('e-hide');
            }
            this.appendHtml(node, innerDIV);
            if ((isNullOrUndefined(column.allowFiltering) || column.allowFiltering) && !isNullOrUndefined(column.filterBarTemplate)) {
                var templateWrite = column.filterBarTemplate.write;
                var args = { element: input, column: column };
                if (typeof templateWrite === 'string') {
                    templateWrite = getValue(templateWrite, window);
                }
                templateWrite.call(this, args);
            }
        }
        return node;
    };
    /**
     * Function to specifies how the result content to be placed in the cell.
     * @param  {Element} node
     * @param  {string|Element} innerHTML
     * @returns Element
     */
    FilterCellRenderer.prototype.appendHtml = function (node, innerHtml) {
        node.appendChild(innerHtml);
        return node;
    };
    return FilterCellRenderer;
}(CellRenderer));

/**
 * `filter operators` render boolean column.
 * @hidden
 */
var FlMenuOptrUI = /** @class */ (function () {
    function FlMenuOptrUI(parent, customFltrOperators, serviceLocator, filterSettings) {
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.filterSettings = filterSettings;
        this.customFilterOperators = customFltrOperators;
    }
    /**
     * @hidden
     */
    FlMenuOptrUI.prototype.renderOperatorUI = function (dlgConetntEle, target, column, dlgObj) {
        this.dialogObj = dlgObj;
        var optr = column.type + 'Operator';
        this.optrData = this.customOptr = (!isNullOrUndefined(this.parent.filterSettings.operators) &&
            !isNullOrUndefined(this.parent.filterSettings.operators[optr])) ?
            this.parent.filterSettings.operators[optr] : this.customFilterOperators[optr];
        var dropDatasource = this.customOptr;
        var selectedValue = this.dropSelectedVal(column, optr);
        var optrDiv = createElement('div', { className: 'e-flm_optrdiv' });
        dlgConetntEle.appendChild(optrDiv);
        var optrInput = createElement('input', { id: column.uid + '-floptr' });
        optrDiv.appendChild(optrInput);
        this.dropOptr = new DropDownList({
            dataSource: dropDatasource,
            fields: { text: 'text', value: 'value' },
            open: this.dropDownOpen.bind(this),
            text: selectedValue
        });
        this.dropOptr.appendTo('#' + column.uid + '-floptr');
    };
    FlMenuOptrUI.prototype.dropDownOpen = function (args) {
        args.popup.element.style.zIndex = (this.dialogObj.zIndex + 1).toString();
    };
    FlMenuOptrUI.prototype.dropSelectedVal = function (col, optr) {
        var selValue = '';
        var columns = this.parent.filterSettings.columns;
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var column = columns_1[_i];
            if (col.field === column.field) {
                var selectedField = new DataManager(this.optrData).executeLocal(new Query().where('value', 'equal', column.operator));
                selValue = !isNullOrUndefined(selectedField[0]) ? selectedField[0].text : '';
            }
        }
        if (selValue === '') {
            selValue = this.optrData[0].text;
        }
        return selValue;
    };
    /**
     * @hidden
     */
    FlMenuOptrUI.prototype.getFlOperator = function () {
        return this.dropOptr.value;
    };
    return FlMenuOptrUI;
}());

/**
 * `string filterui` render string column.
 * @hidden
 */
var StringFilterUI = /** @class */ (function () {
    function StringFilterUI(parent, serviceLocator, filterSettings) {
        this.parent = parent;
        this.serLocator = serviceLocator;
        this.filterSettings = filterSettings;
    }
    StringFilterUI.prototype.create = function (args) {
        var _this = this;
        this.instance = createElement('input', { className: 'e-flmenu-input', id: 'strui-' + args.column.uid });
        args.target.appendChild(this.instance);
        this.dialogObj = args.dialogObj;
        this.actObj = new AutoComplete({
            dataSource: this.parent.dataSource instanceof DataManager ?
                this.parent.dataSource : new DataManager(this.parent.dataSource),
            fields: { value: args.column.field },
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            sortOrder: 'Ascending',
            open: this.openPopup.bind(this),
            cssClass: 'e-popup-flmenu',
            focus: function () {
                _this.actObj.filterType = args.getOptrInstance.getFlOperator();
            },
            autofill: true,
            placeholder: args.localizeText.getConstant('EnterValue'),
            actionComplete: function (e) {
                e.result = e.result.filter(function (obj, index, arr) {
                    return arr.map(function (mapObj) {
                        return mapObj[_this.actObj.fields.value];
                    }).indexOf(obj[_this.actObj.fields.value]) === index;
                });
            }
        });
        this.actObj.appendTo(this.instance);
    };
    StringFilterUI.prototype.write = function (args) {
        var columns = this.filterSettings.columns;
        if (args.filteredValue !== '') {
            var struiObj = document.querySelector('#strui-' + args.column.uid).ej2_instances[0];
            struiObj.value = args.filteredValue;
        }
    };
    StringFilterUI.prototype.read = function (element, column, filterOptr, filterObj) {
        var actuiObj = document.querySelector('#strui-' + column.uid).ej2_instances[0];
        var filterValue = actuiObj.value;
        filterObj.filterByColumn(column.field, filterOptr, filterValue, 'and', false);
    };
    StringFilterUI.prototype.openPopup = function (args) {
        getZIndexCalcualtion(args, this.dialogObj);
    };
    return StringFilterUI;
}());

/**
 * `numberfilterui` render number column.
 * @hidden
 */
var NumberFilterUI = /** @class */ (function () {
    function NumberFilterUI(parent, serviceLocator, filterSettings) {
        this.filterSettings = filterSettings;
        this.parent = parent;
        this.serviceLocator = serviceLocator;
    }
    NumberFilterUI.prototype.create = function (args) {
        this.instance = createElement('input', { className: 'e-flmenu-input', id: 'numberui-' + args.column.uid });
        args.target.appendChild(this.instance);
        this.numericTxtObj = new NumericTextBox({
            format: args.column.format,
            locale: this.parent.locale,
            cssClass: 'e-popup-flmenu',
            placeholder: args.localizeText.getConstant('EnterValue'),
            enableRtl: this.parent.enableRtl,
        });
        this.numericTxtObj.appendTo(this.instance);
    };
    NumberFilterUI.prototype.write = function (args) {
        var numberuiObj = document.querySelector('#numberui-' + args.column.uid).ej2_instances[0];
        numberuiObj.value = args.filteredValue;
    };
    NumberFilterUI.prototype.read = function (element, column, filterOptr, filterObj) {
        var numberuiObj = document.querySelector('#numberui-' + column.uid).ej2_instances[0];
        var filterValue = numberuiObj.value;
        filterObj.filterByColumn(column.field, filterOptr, filterValue, 'and', true);
    };
    return NumberFilterUI;
}());

/**
 * `boolfilterui` render boolean column.
 * @hidden
 */
var BooleanFilterUI = /** @class */ (function () {
    function BooleanFilterUI(parent, serviceLocator, filterSettings) {
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.filterSettings = filterSettings;
    }
    BooleanFilterUI.prototype.create = function (args) {
        this.elem = createElement('input', { className: 'e-flmenu-input', id: 'bool-ui-' + args.column.uid });
        args.target.appendChild(this.elem);
        this.dialogObj = args.dialogObj;
        this.dropInstance = new DropDownList({
            dataSource: this.parent.dataSource instanceof DataManager ?
                this.parent.dataSource : new DataManager(this.parent.dataSource),
            query: new Query().select(args.column.field),
            fields: { text: args.column.field, value: args.column.field },
            placeholder: args.localizeText.getConstant('SelectValue'),
            cssClass: 'e-popup-flmenu',
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            open: this.openPopup.bind(this),
            actionComplete: this.ddActionComplete
        });
        this.dropInstance.appendTo(this.elem);
    };
    BooleanFilterUI.prototype.write = function (args) {
        var drpuiObj = document.querySelector('#bool-ui-' + args.column.uid).ej2_instances[0];
        drpuiObj.text = !isNullOrUndefined(args.filteredValue) ? args.filteredValue : '';
    };
    BooleanFilterUI.prototype.read = function (element, column, filterOptr, filterObj) {
        var drpuiObj = document.querySelector('#bool-ui-' + column.uid).ej2_instances[0];
        var filterValue = drpuiObj.value;
        filterObj.filterByColumn(column.field, filterOptr, filterValue, 'and', false);
    };
    BooleanFilterUI.prototype.ddActionComplete = function (e) {
        e.result = distinctStringValues(e.result);
    };
    BooleanFilterUI.prototype.openPopup = function (args) {
        getZIndexCalcualtion(args, this.dialogObj);
    };
    return BooleanFilterUI;
}());

/**
 * `datefilterui` render date column.
 * @hidden
 */
var DateFilterUI = /** @class */ (function () {
    function DateFilterUI(parent, serviceLocator, filterSettings) {
        this.parent = parent;
        this.locator = serviceLocator;
        this.fltrSettings = filterSettings;
    }
    DateFilterUI.prototype.create = function (args) {
        var intl = new Internationalization();
        var colFormat = args.column.format;
        var format = intl.getDatePattern({ type: 'date', skeleton: colFormat }, false);
        this.dialogObj = args.dialogObj;
        this.inputElem = createElement('input', { className: 'e-flmenu-input', id: 'dateui-' + args.column.uid });
        args.target.appendChild(this.inputElem);
        this.datePickerObj = new DatePicker({
            format: format,
            cssClass: 'e-popup-flmenu',
            placeholder: args.localizeText.getConstant('ChooseDate'),
            width: '100%',
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            open: this.openPopup.bind(this),
        });
        this.datePickerObj.appendTo(this.inputElem);
    };
    DateFilterUI.prototype.write = function (args) {
        var columns = this.fltrSettings.columns;
        var dateuiObj = document.querySelector('#dateui-' + args.column.uid).ej2_instances[0];
        dateuiObj.value = !isNullOrUndefined(args.filteredValue) ? new Date(args.filteredValue) : null;
    };
    DateFilterUI.prototype.read = function (element, column, filterOptr, filterObj) {
        var dateuiObj = document.querySelector('#dateui-' + column.uid).ej2_instances[0];
        var filterValue = dateuiObj.value;
        filterObj.filterByColumn(column.field, filterOptr, filterValue, 'and', true);
    };
    DateFilterUI.prototype.openPopup = function (args) {
        args.popupElement.element.style.zIndex = (this.dialogObj.zIndex + 1).toString();
    };
    return DateFilterUI;
}());

/**
 * `filter menu` render boolean column.
 * @hidden
 */
var FilterMenuRenderer = /** @class */ (function () {
    function FilterMenuRenderer(parent, filterSettings, serviceLocator, customFltrOperators, fltrObj) {
        this.colTypes = {
            'string': StringFilterUI, 'number': NumberFilterUI, 'date': DateFilterUI, 'boolean': BooleanFilterUI, 'datetime': DateFilterUI
        };
        this.parent = parent;
        this.filterSettings = filterSettings;
        this.serviceLocator = serviceLocator;
        this.customFilterOperators = customFltrOperators;
        this.filterObj = fltrObj;
        this.flMuiObj = new FlMenuOptrUI(this.parent, this.customFilterOperators, this.serviceLocator);
        this.l10n = this.serviceLocator.getService('localization');
    }
    FilterMenuRenderer.prototype.openDialog = function (args) {
        this.col = this.parent.getColumnByField(args.field);
        if (isNullOrUndefined(this.col.filter) || (isNullOrUndefined(this.col.filter.type) || this.col.filter.type === 'menu')) {
            this.renderDlgContent(args.target, this.col);
        }
    };
    FilterMenuRenderer.prototype.closeDialog = function () {
        var elem = document.getElementById(this.dlgObj.element.id);
        if (this.dlgObj && !this.dlgObj.isDestroyed && elem) {
            this.parent.notify(filterMenuClose, { field: this.col.field });
            this.dlgObj.destroy();
            remove(elem);
        }
    };
    FilterMenuRenderer.prototype.renderDlgContent = function (target, column) {
        var mainDiv = createElement('div', { className: 'e-flmenu-maindiv', id: column.uid + '-flmenu' });
        this.dlgDiv = createElement('div', { className: 'e-flmenu', id: column.uid + '-flmdlg' });
        this.parent.element.appendChild(this.dlgDiv);
        this.dlgObj = new Dialog({
            showCloseIcon: false,
            closeOnEscape: false,
            locale: this.parent.locale,
            visible: false,
            enableRtl: this.parent.enableRtl,
            created: this.dialogCreated.bind(this, target, column),
            position: this.parent.element.classList.contains('e-device') ? { X: 'center', Y: 'center' } : { X: '', Y: '' },
            target: this.parent.element.classList.contains('e-device') ? document.body : this.parent.element,
            buttons: [{
                    click: this.filterBtnClick.bind(this, column),
                    buttonModel: {
                        content: this.l10n.getConstant('FilterButton'), isPrimary: true, cssClass: 'e-flmenu-okbtn'
                    }
                },
                {
                    click: this.clearBtnClick.bind(this, column),
                    buttonModel: { content: this.l10n.getConstant('ClearButton'), cssClass: 'e-flmenu-cancelbtn' }
                }],
            content: mainDiv,
            width: (!isNullOrUndefined(parentsUntil(target, 'e-bigger'))) || this.parent.element.classList.contains('e-device') ? 260 : 250,
            animationSettings: { effect: 'None' },
            cssClass: 'e-filter-popup'
        });
        this.dlgObj.appendTo(this.dlgDiv);
    };
    FilterMenuRenderer.prototype.dialogCreated = function (target, column) {
        if (!Browser.isDevice) {
            getFilterMenuPostion(target, this.dlgObj);
        }
        this.renderFilterUI(target, column);
        this.parent.notify(filterDialogCreated, {});
        this.dlgObj.element.style.maxHeight = '350px';
        this.dlgObj.show();
        this.writeMethod(column, this.dlgObj.element.querySelector('#' + column.uid + '-flmenu'));
    };
    FilterMenuRenderer.prototype.renderFilterUI = function (target, col) {
        var dlgConetntEle = this.dlgObj.element.querySelector('.e-flmenu-maindiv');
        this.renderOperatorUI(dlgConetntEle, target, col);
        this.renderFlValueUI(dlgConetntEle, target, col);
    };
    FilterMenuRenderer.prototype.renderOperatorUI = function (dlgConetntEle, target, column) {
        this.flMuiObj.renderOperatorUI(dlgConetntEle, target, column, this.dlgObj);
    };
    FilterMenuRenderer.prototype.renderFlValueUI = function (dlgConetntEle, target, column) {
        var valueDiv = createElement('div', { className: 'e-flmenu-valuediv' });
        dlgConetntEle.appendChild(valueDiv);
        var args = { target: valueDiv, column: column, getOptrInstance: this.flMuiObj, dialogObj: this.dlgObj };
        var instanceofFilterUI = new this.colTypes[column.type](this.parent, this.serviceLocator, this.parent.filterSettings);
        if (!isNullOrUndefined(column.filter) && !isNullOrUndefined(column.filter.ui)
            && !isNullOrUndefined(column.filter.ui.create)) {
            var temp = column.filter.ui.create;
            if (typeof temp === 'string') {
                temp = getValue(temp, window);
            }
            column.filter.ui.create({
                column: column, target: valueDiv,
                getOptrInstance: this.flMuiObj, dialogObj: this.dlgObj
            });
        }
        else {
            instanceofFilterUI.create({
                column: column, target: valueDiv,
                getOptrInstance: this.flMuiObj, localizeText: this.l10n, dialogObj: this.dlgObj
            });
        }
    };
    FilterMenuRenderer.prototype.writeMethod = function (col, dlgContentEle) {
        var flValue;
        var target = dlgContentEle.querySelector('.e-flmenu-valinput');
        var instanceofFilterUI = new this.colTypes[col.type](this.parent, this.serviceLocator, this.parent.filterSettings);
        var columns = this.filterSettings.columns;
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var column = columns_1[_i];
            if (col.field === column.field) {
                flValue = column.value;
            }
        }
        if (!isNullOrUndefined(col.filter) && !isNullOrUndefined(col.filter.ui)
            && !isNullOrUndefined(col.filter.ui.write)) {
            var temp = col.filter.ui.write;
            if (typeof temp === 'string') {
                temp = getValue(temp, window);
            }
            col.filter.ui.write({ column: col, target: target, parent: this.parent, filteredValue: flValue });
        }
        else {
            instanceofFilterUI.write({ column: col, target: target, parent: this.parent, filteredValue: flValue });
        }
    };
    FilterMenuRenderer.prototype.filterBtnClick = function (col) {
        var flValue;
        var flOptrValue;
        var targ = this.dlgObj.element.querySelector('.e-flmenu-valuediv input');
        flOptrValue = this.flMuiObj.getFlOperator();
        var instanceofFilterUI = new this.colTypes[col.type](this.parent, this.serviceLocator, this.parent.filterSettings);
        if (!isNullOrUndefined(col.filter) &&
            !isNullOrUndefined(col.filter.ui) && !isNullOrUndefined(col.filter.ui.read)) {
            var temp = col.filter.ui.read;
            if (typeof temp === 'string') {
                temp = getValue(temp, window);
            }
            flValue = col.filter.ui.read({ element: targ, column: col, operator: flOptrValue, fltrObj: this.filterObj });
        }
        else {
            instanceofFilterUI.read(targ, col, flOptrValue, this.filterObj);
        }
        var iconClass = this.parent.showColumnMenu ? '.e-columnmenu' : '.e-icon-filter';
        var column = this.parent.element.querySelector('[e-mappinguid="' + col.uid + '"]').parentElement;
        var flIcon = column.querySelector(iconClass);
        if (flIcon) {
            flIcon.classList.add('e-filtered');
        }
        this.closeDialog();
    };
    FilterMenuRenderer.prototype.clearBtnClick = function (column) {
        this.filterObj.removeFilteredColsByField(column.field);
        this.closeDialog();
        var iconClass = this.parent.showColumnMenu ? '.e-columnmenu' : '.e-icon-filter';
        var col = this.parent.element.querySelector('[e-mappinguid="' + column.uid + '"]').parentElement;
        var flIcon = col.querySelector(iconClass);
        if (flIcon) {
            flIcon.classList.remove('e-filtered');
        }
    };
    FilterMenuRenderer.prototype.destroy = function () {
        //destroy
    };
    return FilterMenuRenderer;
}());

var __extends$16 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @hidden
 * `ExcelFilter` module is used to handle filtering action.
 */
var ExcelFilter = /** @class */ (function (_super) {
    __extends$16(ExcelFilter, _super);
    /**
     * Constructor for excel filtering module
     * @hidden
     */
    function ExcelFilter(parent, filterSettings, serviceLocator, customFltrOperators) {
        var _this = _super.call(this, parent, filterSettings, serviceLocator) || this;
        _this.localeConstants = {
            ClearFilter: 'Clear Filter',
            NumberFilter: 'Number Filters',
            TextFilter: 'Text Filters',
            DateFilter: 'Date Filters',
            MatchCase: 'Match Case',
            Equal: 'Equal',
            NotEqual: 'Not Equal',
            LessThan: 'Less Than',
            LessThanOrEqual: 'Less Than Or Equal',
            GreaterThan: 'Greater Than',
            GreaterThanOrEqual: 'Greater Than Or Equal',
            Between: 'Between',
            CustomFilter: 'Custom Filter',
            StartsWith: 'Starts With',
            EndsWith: 'Ends With',
            Contains: 'Contains',
            OK: 'OK',
            Cancel: 'Cancel',
            CustomFilterPlaceHolder: 'Enter the value',
            CustomFilterDatePlaceHolder: 'Choose a date',
            AND: 'AND',
            OR: 'OR',
            ShowRowsWhere: 'Show rows where:'
        };
        _this.customFilterOperators = customFltrOperators;
        extend(_this.defaultConstants, _this.localeConstants);
        _this.isExcel = true;
        _this.initLocale(_this.defaultConstants);
        return _this;
    }
    ExcelFilter.prototype.getCMenuDS = function (type, operator) {
        var options = {
            number: ['Equal', 'NotEqual', '', 'LessThan', 'LessThanOrEqual', 'GreaterThan',
                'GreaterThanOrEqual', 'Between', '', 'CustomFilter'],
            string: ['Equal', 'NotEqual', '', 'StartsWith', 'EndsWith', '', 'Contains', '', 'CustomFilter'],
        };
        options.date = options.number;
        options.datetime = options.number;
        var model = [];
        for (var i = 0; i < options[type].length; i++) {
            if (options[type][i].length) {
                if (operator) {
                    model.push({
                        text: this.getLocalizedLabel(options[type][i]) + '...',
                        iconCss: 'e-icons e-icon-check ' + (operator === options[type][i] ? '' : 'e-emptyicon')
                    });
                }
                else {
                    model.push({
                        text: this.getLocalizedLabel(options[type][i]) + '...'
                    });
                }
            }
            else {
                model.push({ separator: true });
            }
        }
        return model;
    };
    /**
     * To destroy the filter bar.
     * @return {void}
     * @hidden
     */
    ExcelFilter.prototype.destroy = function () {
        if (this.dlg) {
            _super.prototype.destroy.call(this);
            this.unwireExEvents();
        }
        remove(this.cmenu);
    };
    ExcelFilter.prototype.createMenu = function (type, isFiltered, isCheckIcon) {
        var options = { string: 'TextFilter', date: 'DateFilter', datetime: 'DateFilter', number: 'NumberFilter' };
        this.menu = createElement('div', { className: 'e-contextmenu-wrapper' });
        var ul = createElement('ul');
        var icon = isFiltered ? 'e-icon-filter e-filtered' : 'e-icon-filter';
        ul.appendChild(this.createMenuElem(this.getLocalizedLabel('ClearFilter'), isFiltered ? '' : 'e-disabled', icon));
        if (type !== 'boolean') {
            ul.appendChild(this.createMenuElem(this.getLocalizedLabel(options[type]), 'e-submenu', isCheckIcon ? 'e-icon-check' : icon + ' e-emptyicon', true));
        }
        this.menu.appendChild(ul);
    };
    ExcelFilter.prototype.createMenuElem = function (val, className, iconName, isSubMenu) {
        var li = createElement('li', { className: className + ' e-menu-item' });
        li.innerHTML = val;
        li.insertBefore(createElement('span', { className: 'e-menu-icon e-icons ' + iconName }), li.firstChild);
        if (isSubMenu) {
            li.appendChild(createElement('span', { className: 'e-icons e-caret' }));
        }
        return li;
    };
    ExcelFilter.prototype.wireExEvents = function () {
        EventHandler.add(this.dlg, 'mouseover', this.hoverHandler, this);
        EventHandler.add(this.dlg, 'click', this.clickExHandler, this);
    };
    ExcelFilter.prototype.unwireExEvents = function () {
        EventHandler.remove(this.dlg, 'mouseover', this.hoverHandler);
        EventHandler.remove(this.dlg, 'click', this.clickExHandler);
    };
    ExcelFilter.prototype.clickExHandler = function (e) {
        var menuItem = parentsUntil(e.target, 'e-menu-item');
        if (menuItem && this.getLocalizedLabel('ClearFilter') === menuItem.innerText) {
            this.clearFilter();
            this.closeDialog();
        }
    };
    ExcelFilter.prototype.destroyCMenu = function () {
        if (this.menuObj && !this.menuObj.isDestroyed) {
            this.menuObj.destroy();
        }
    };
    ExcelFilter.prototype.hoverHandler = function (e) {
        var target = e.target.querySelector('.e-contextmenu');
        var li = parentsUntil(e.target, 'e-menu-item');
        var focused = this.menu.querySelector('.e-focused');
        var isSubMenu;
        if (focused) {
            focused.classList.remove('e-focused');
        }
        if (li) {
            li.classList.add('e-focused');
            isSubMenu = li.classList.contains('e-submenu');
        }
        if (target) {
            return;
        }
        if (!isSubMenu) {
            var submenu = this.menu.querySelector('.e-submenu');
            submenu.classList.remove('e-selected');
            this.isCMenuOpen = false;
            this.destroyCMenu();
        }
        var selectedMenu;
        var predicates = this.getExistingPredicate(this.options.field);
        if (predicates.length === 2) {
            if (predicates[0].operator === 'greaterThanOrEqual' && predicates[1].operator === 'lessThanOrEqual') {
                selectedMenu = 'Between';
            }
            else {
                selectedMenu = 'CustomFilter';
            }
        }
        else {
            if (predicates.length === 1) {
                this.optrData = this.customFilterOperators[this.options.type + 'Operator'];
                selectedMenu = this.getSelectedText(predicates[0].operator);
            }
        }
        if (!this.isCMenuOpen && isSubMenu) {
            li.classList.add('e-selected');
            this.isCMenuOpen = true;
            var menuOptions = {
                items: this.getCMenuDS(this.options.type, selectedMenu ? selectedMenu.replace(/\s/g, '') : undefined),
                select: this.selectHandler.bind(this),
                onClose: this.destroyCMenu.bind(this)
            };
            this.parent.element.appendChild(this.cmenu);
            this.menuObj = new ContextMenu(menuOptions, this.cmenu);
            var client = this.menu.querySelector('.e-submenu').getBoundingClientRect();
            var pos = { top: 0, left: 0 };
            if (Browser.isDevice) {
                var contextRect = this.getContextBounds(this.menuObj);
                pos.top = (window.innerHeight - contextRect.height) / 2;
                pos.left = (window.innerWidth - contextRect.width) / 2;
                this.closeDialog();
            }
            else {
                pos.top = client.top;
                pos.left = this.getCMenuYPosition(this.dlg, this.menuObj);
            }
            this.menuObj.open(pos.top, pos.left);
        }
    };
    ExcelFilter.prototype.getContextBounds = function (context) {
        var elementVisible = this.menuObj.element.style.display;
        this.menuObj.element.style.display = 'block';
        return this.menuObj.element.getBoundingClientRect();
    };
    ExcelFilter.prototype.getCMenuYPosition = function (target, context) {
        var contextWidth = this.getContextBounds(context).width;
        var targetPosition = target.getBoundingClientRect();
        var leftPos = targetPosition.right + contextWidth - this.parent.element.clientWidth;
        return (leftPos < 1) ? (targetPosition.right + 1) : (targetPosition.left - contextWidth - 1);
    };
    ExcelFilter.prototype.openDialog = function (options) {
        this.updateModel(options);
        this.getAndSetChkElem(options);
        this.showDialog(options);
        this.dialogObj.dataBind();
        var filterLength = this.getExistingPredicate(options.field).length;
        this.createMenu(options.type, filterLength > 0, (filterLength === 1 || filterLength === 2));
        this.dlg.insertBefore(this.menu, this.dlg.firstChild);
        this.dlg.classList.add('e-excelfilter');
        this.dlg.classList.remove('e-checkboxfilter');
        this.cmenu = createElement('ul', { className: 'e-excel-menu' });
        this.wireExEvents();
    };
    ExcelFilter.prototype.closeDialog = function () {
        _super.prototype.closeDialog.call(this);
    };
    ExcelFilter.prototype.selectHandler = function (e) {
        if (e.item) {
            this.menuItem = e.item;
            this.renderDialogue(e);
        }
    };
    ExcelFilter.prototype.renderDialogue = function (e) {
        var target = e.element;
        var column = this.options.field;
        var mainDiv = createElement('div', { className: 'e-xlfl-maindiv', id: column + '-xlflmenu' });
        this.dlgDiv = createElement('div', { className: 'e-xlflmenu', id: column + '-xlfldlg' });
        this.parent.element.appendChild(this.dlgDiv);
        this.dlgObj = new Dialog({
            header: 'Custom Filter',
            isModal: true,
            overlayClick: this.removeDialog.bind(this),
            showCloseIcon: true,
            closeOnEscape: false,
            target: document.body,
            // target: this.parent.element,
            visible: false,
            enableRtl: this.parent.enableRtl,
            close: this.removeDialog.bind(this),
            created: this.createdDialog.bind(this, target, column),
            buttons: [{
                    click: this.filterBtnClick.bind(this, column),
                    buttonModel: {
                        content: this.getLocalizedLabel('OK'), isPrimary: true, cssClass: 'e-xlfl-okbtn'
                    }
                },
                {
                    click: this.removeDialog.bind(this),
                    buttonModel: { content: this.getLocalizedLabel('Cancel'), cssClass: 'e-xlfl-cancelbtn' }
                }],
            content: mainDiv,
            width: 370,
            animationSettings: { effect: 'None' },
        });
        this.dlgObj.appendTo(this.dlgDiv);
    };
    ExcelFilter.prototype.removeDialog = function () {
        this.removeObjects([this.dropOptr, this.datePicker, this.actObj, this.numericTxtObj, this.dlgObj]);
        remove(this.dlgDiv);
    };
    ExcelFilter.prototype.clearBtnClick = function (field) {
        this.clearFilter();
        this.removeDialog();
    };
    ExcelFilter.prototype.createdDialog = function (target, column) {
        this.renderCustomFilter(target, column);
        this.dlgObj.element.style.left = '0px';
        this.dlgObj.element.style.top = '0px';
        this.dlgObj.show();
    };
    ExcelFilter.prototype.renderCustomFilter = function (target, column) {
        var dlgConetntEle = this.dlgObj.element.querySelector('.e-xlfl-maindiv');
        /* tslint:disable-next-line:max-line-length */
        var dlgFields = createElement('div', { innerHTML: this.getLocalizedLabel('ShowRowsWhere'), className: 'e-xlfl-dlgfields' });
        dlgConetntEle.appendChild(dlgFields);
        //column name
        var fieldSet = createElement('div', { innerHTML: column, className: 'e-xlfl-fieldset' });
        dlgConetntEle.appendChild(fieldSet);
        this.renderFilterUI(column, dlgConetntEle);
    };
    ExcelFilter.prototype.filterBtnClick = function (col) {
        var fValue = this.dlgDiv.querySelector('#' + col + '-xlfl-frstvalue').ej2_instances[0];
        var fOperator = this.dlgDiv.querySelector('#' + col + '-xlfl-frstoptr').ej2_instances[0];
        var sValue = this.dlgDiv.querySelector('#' + col + '-xlfl-secndvalue').ej2_instances[0];
        var sOperator = this.dlgDiv.querySelector('#' + col + '-xlfl-secndoptr').ej2_instances[0];
        var checkBoxValue;
        if (this.options.type === 'string') {
            var checkBox = this.dlgDiv.querySelector('#' + col + '-xlflmtcase').ej2_instances[0];
            checkBoxValue = checkBox.checked;
        }
        var andRadio = this.dlgDiv.querySelector('#' + col + 'e-xlfl-frstpredicate').ej2_instances[0];
        var orRadio = this.dlgDiv.querySelector('#' + col + 'e-xlfl-secndpredicate').ej2_instances[0];
        var predicate = (andRadio.checked ? 'and' : 'or');
        if (sValue.value === null) {
            predicate = 'or';
        }
        this.filterByColumn(this.options.field, fOperator.value, fValue.value ? fValue.value : fValue.getText(), predicate, checkBoxValue, sOperator.value, sValue.value);
        this.removeDialog();
    };
    /**
     * Filters grid row by column name with given options.
     * @param {string} fieldName - Defines the field name of the filter column.
     * @param {string} firstOperator - Defines the first operator by how to filter records.
     * @param {string | number | Date | boolean} firstValue - Defines the first value which is used to filter records.
     * @param  {string} predicate - Defines the relationship between one filter query with another by using AND or OR predicate.
     * @param {boolean} ignoreCase - If ignore case set to true, then filter records with exact match or else
     * filter records with case insensitive(uppercase and lowercase letters treated as same).
     * @param {string} secondOperator - Defines the second operator by how to filter records.
     * @param {string | number | Date | boolean} secondValue - Defines the first value which is used to filter records.
     */
    ExcelFilter.prototype.filterByColumn = function (fieldName, firstOperator, firstValue, predicate, ignoreCase, secondOperator, secondValue) {
        var fColl = [];
        var mPredicate;
        if (firstValue) {
            fColl.push({
                field: this.options.field,
                predicate: 'or',
                matchcase: ignoreCase,
                operator: firstOperator,
                value: firstValue,
                type: this.options.type
            });
            mPredicate = new Predicate(this.options.field, firstOperator.toLowerCase(), firstValue, ignoreCase);
        }
        if (secondValue) {
            fColl.push({
                field: this.options.field,
                predicate: predicate,
                matchcase: ignoreCase,
                operator: secondOperator,
                value: secondValue,
                type: this.options.type
            });
            /* tslint:disable-next-line:max-line-length */
            mPredicate = mPredicate[predicate](this.options.field, secondOperator.toLowerCase(), secondValue, ignoreCase);
        }
        var args = {
            action: 'filtering', filterCollection: fColl, field: this.options.field,
            ejpredicate: mPredicate
        };
        this.options.handler(args);
    };
    /* tslint:disable-next-line:max-line-length */
    ExcelFilter.prototype.renderOperatorUI = function (column, table, elementID, predicates, isFirst) {
        var fieldElement = createElement('tr', { className: 'e-xlfl-fields' });
        table.appendChild(fieldElement);
        var xlfloptr = createElement('td', { className: 'e-xlfl-optr' });
        fieldElement.appendChild(xlfloptr);
        var optrDiv = createElement('div', { className: 'e-xlfl-optrdiv' });
        var optrInput = createElement('input', { id: column + elementID });
        optrDiv.appendChild(optrInput);
        xlfloptr.appendChild(optrDiv);
        var optr = this.options.type + 'Operator';
        var dropDatasource = this.customFilterOperators[optr];
        this.optrData = dropDatasource;
        var selectedValue = this.dropSelectedVal(column, predicates, isFirst);
        //Trailing three dots are sliced.
        var menuText = '';
        if (this.menuItem) {
            menuText = this.menuItem.text.slice(0, -3);
            if (menuText !== this.getLocalizedLabel('CustomFilter')) {
                selectedValue = isFirst ? menuText : undefined;
            }
            if (menuText === this.getLocalizedLabel('Between')) {
                selectedValue = this.getLocalizedLabel(isFirst ? 'GreaterThanOrEqual' : 'LessThanOrEqual');
            }
        }
        this.dropOptr = new DropDownList({
            dataSource: dropDatasource,
            fields: { text: 'text', value: 'value' },
            text: selectedValue,
            open: this.dropDownOpen.bind(this),
            enableRtl: this.parent.enableRtl
        });
        this.dropOptr.appendTo(optrInput);
        var operator = this.getSelectedValue(selectedValue);
        return { fieldElement: fieldElement, operator: operator };
    };
    ExcelFilter.prototype.dropDownOpen = function (args) {
        args.popup.element.style.zIndex = (this.dialogObj.zIndex + 1).toString();
    };
    ExcelFilter.prototype.getSelectedValue = function (text) {
        var selectedField = new DataManager(this.optrData).executeLocal(new Query().where('text', 'equal', text));
        return !isNullOrUndefined(selectedField[0]) ? selectedField[0].value : '';
    };
    ExcelFilter.prototype.dropSelectedVal = function (col, predicates, isFirst) {
        var operator;
        if (predicates.length > 0) {
            operator = predicates.length === 2 ?
                (isFirst ? predicates[0].operator : predicates[1].operator) :
                (isFirst ? predicates[0].operator : undefined);
        }
        else {
            operator = isFirst ? 'equal' : undefined;
        }
        return this.getSelectedText(operator);
    };
    ExcelFilter.prototype.getSelectedText = function (operator) {
        var selectedField = new DataManager(this.optrData).executeLocal(new Query().where('value', 'equal', operator));
        return !isNullOrUndefined(selectedField[0]) ? selectedField[0].text : '';
    };
    ExcelFilter.prototype.getExistingPredicate = function (column) {
        var cols = CheckBoxFilter.getDistinct(this.options.filteredColumns, 'field').records;
        return new DataManager(this.options.filteredColumns).executeLocal(new Query().where('field', 'equal', column));
    };
    ExcelFilter.prototype.renderFilterUI = function (column, dlgConetntEle) {
        var predicates = this.getExistingPredicate(column);
        var table = createElement('table', { className: 'e-xlfl-tabel' });
        dlgConetntEle.appendChild(table);
        //Renders first dropdown
        /* tslint:disable-next-line:max-line-length */
        var optr = this.renderOperatorUI(column, table, '-xlfl-frstoptr', predicates, true);
        //Renders first value
        this.renderFlValueUI(column, optr, '-xlfl-frstvalue', predicates, true);
        var predicate = createElement('tr', { className: 'e-xlfl-predicate' });
        table.appendChild(predicate);
        //Renders first radion button
        this.renderRadioButton(column, predicate, predicates);
        if (this.options.type === 'string') {
            this.renderMatchCase(column, predicate, '-xlflmtcase', predicates);
        }
        //Renders second dropdown
        optr = this.renderOperatorUI(column, table, '-xlfl-secndoptr', predicates, false);
        //Renders second text box
        this.renderFlValueUI(column, optr, '-xlfl-secndvalue', predicates, false);
    };
    ExcelFilter.prototype.renderRadioButton = function (column, tr, predicates) {
        var td = createElement('td', { className: 'e-xlfl-radio' });
        tr.appendChild(td);
        var radioDiv = createElement('div', { className: 'e-xlfl-radiodiv' });
        /* tslint:disable-next-line:max-line-length */
        var frstpredicate = createElement('input', { id: column + 'e-xlfl-frstpredicate', attrs: { 'type': 'radio' } });
        /* tslint:disable-next-line:max-line-length */
        var secndpredicate = createElement('input', { id: column + 'e-xlfl-secndpredicate', attrs: { 'type': 'radio' } });
        //appends into div
        radioDiv.appendChild(frstpredicate);
        radioDiv.appendChild(secndpredicate);
        td.appendChild(radioDiv);
        // Initialize AND RadioButton component.
        /* tslint:disable-next-line:max-line-length */
        var andRadio = new RadioButton({ label: this.getLocalizedLabel('AND'), name: 'default', cssClass: 'e-xlfl-radio-and', checked: true, enableRtl: this.parent.enableRtl });
        // Initialize OR RadioButton component.
        /* tslint:disable-next-line:max-line-length */
        var orRadio = new RadioButton({ label: this.getLocalizedLabel('OR'), name: 'default', cssClass: 'e-xlfl-radio-or', enableRtl: this.parent.enableRtl });
        var flValue = predicates.length === 2 ? predicates[1].predicate : 'and';
        if (flValue === 'and') {
            andRadio.checked = true;
            orRadio.checked = false;
        }
        else {
            orRadio.checked = true;
            andRadio.checked = false;
        }
        // Render initialized RadioButton.
        andRadio.appendTo(frstpredicate);
        orRadio.appendTo(secndpredicate);
    };
    /* tslint:disable-next-line:no-any */
    ExcelFilter.prototype.removeObjects = function (elements) {
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var obj = elements_1[_i];
            if (obj && !obj.isDestroyed) {
                obj.destroy();
            }
        }
    };
    /* tslint:disable-next-line:max-line-length */
    ExcelFilter.prototype.renderFlValueUI = function (column, optr, elementId, predicates, isFirst) {
        var value = createElement('td', { className: 'e-xlfl-value' });
        optr.fieldElement.appendChild(value);
        var valueDiv = createElement('div', { className: 'e-xlfl-valuediv' });
        var valueInput = createElement('input', { id: column + elementId });
        valueDiv.appendChild(valueInput);
        value.appendChild(valueDiv);
        var flValue;
        var predicate;
        if (predicates.length > 0) {
            predicate = predicates.length === 2 ?
                (isFirst ? predicates[0] : predicates[1]) :
                (isFirst ? predicates[0] : undefined);
            flValue = (predicate && predicate.operator === optr.operator) ? predicate.value : undefined;
        }
        var types = {
            'string': this.renderAutoComplete.bind(this),
            'number': this.renderNumericTextBox.bind(this),
            'date': this.renderDate.bind(this),
            'datetime': this.renderDate.bind(this)
        };
        types[this.options.type](this.options, column, valueInput, flValue, this.parent.enableRtl);
    };
    ExcelFilter.prototype.renderMatchCase = function (column, tr, elementId, predicates) {
        var matchCase = createElement('td', { className: 'e-xlfl-mtcase' });
        tr.appendChild(matchCase);
        var matchCaseDiv = createElement('div', { className: 'e-xlfl-matchcasediv' });
        var matchCaseInput = createElement('input', { id: column + elementId, attrs: { 'type': 'checkbox' } });
        matchCaseDiv.appendChild(matchCaseInput);
        matchCase.appendChild(matchCaseDiv);
        var flValue = predicates.length > 0 ?
            (predicates.length === 2 ? predicates[1].matchcase : predicates[0].matchcase) :
            false;
        // Initialize Match Case check box.
        var checkbox = new CheckBox({ label: 'Match Case', enableRtl: this.parent.enableRtl, checked: flValue });
        // Render initialized CheckBox.
        checkbox.appendTo(matchCaseInput);
    };
    /* tslint:disable-next-line:max-line-length */
    ExcelFilter.prototype.renderDate = function (options, column, inputValue, fValue, isRtl) {
        var intl = new Internationalization();
        var format = intl.getDatePattern({ type: 'date', skeleton: options.format }, false);
        this.datePicker = new DatePicker({
            format: format,
            cssClass: 'e-popup-flmenu',
            placeholder: this.getLocalizedLabel('CustomFilterDatePlaceHolder'),
            width: '100%',
            enableRtl: isRtl,
            value: new Date(fValue),
        });
        this.datePicker.appendTo(inputValue);
    };
    ExcelFilter.prototype.completeAction = function (e) {
        e.result = distinctStringValues(e.result);
    };
    /* tslint:disable-next-line:max-line-length */
    ExcelFilter.prototype.renderNumericTextBox = function (options, column, inputValue, fValue, isRtl) {
        this.numericTxtObj = new NumericTextBox({
            format: options.format,
            placeholder: this.getLocalizedLabel('CustomFilterPlaceHolder'),
            enableRtl: isRtl,
            value: fValue
        });
        this.numericTxtObj.appendTo(inputValue);
    };
    /* tslint:disable-next-line:max-line-length */
    ExcelFilter.prototype.renderAutoComplete = function (options, column, inputValue, fValue, isRtl) {
        var _this = this;
        var actObj = new AutoComplete({
            dataSource: options.dataSource instanceof DataManager ?
                options.dataSource : new DataManager(options.dataSource),
            fields: { value: column },
            sortOrder: 'Ascending',
            autofill: true,
            focus: function () {
                actObj.filterType = _this.dlgDiv.querySelector('#' + column +
                    (inputValue.id === (column + '-xlfl-frstvalue') ?
                        '-xlfl-frstoptr' :
                        '-xlfl-secndoptr')).ej2_instances[0].value;
                actObj.ignoreCase = options.type === 'string' ?
                    !_this.dlgDiv.querySelector('#' + column + '-xlflmtcase').ej2_instances[0].checked :
                    true;
            },
            placeholder: this.getLocalizedLabel('CustomFilterPlaceHolder'),
            enableRtl: isRtl,
            actionComplete: function (e) {
                e.result = e.result.filter(function (obj, index, arr) {
                    return arr.map(function (mapObject) {
                        return mapObject[actObj.fields.value];
                    }).indexOf(obj[_this.actObj.fields.value]) === index;
                });
            },
            value: fValue
        });
        actObj.appendTo(inputValue);
        this.actObj = actObj;
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    ExcelFilter.prototype.getModuleName = function () {
        return 'excelFilter';
    };
    return ExcelFilter;
}(CheckBoxFilter));

/**
 *
 * `Filter` module is used to handle filtering action.
 */
var Filter = /** @class */ (function () {
    /**
     * Constructor for Grid filtering module
     * @hidden
     */
    function Filter(parent, filterSettings, serviceLocator) {
        this.predicate = 'and';
        this.contentRefresh = true;
        this.values = {};
        this.nextFlMenuOpen = '';
        this.type = { 'menu': FilterMenuRenderer, 'checkbox': CheckBoxFilter, 'excel': ExcelFilter };
        this.filterOperators = {
            contains: 'contains', endsWith: 'endswith', equal: 'equal', greaterThan: 'greaterthan', greaterThanOrEqual: 'greaterthanorequal',
            lessThan: 'lessthan', lessThanOrEqual: 'lessthanorequal', notEqual: 'notequal', startsWith: 'startswith'
        };
        this.fltrDlgDetails = { field: '', isOpen: false };
        this.parent = parent;
        this.filterSettings = filterSettings;
        this.serviceLocator = serviceLocator;
        this.addEventListener();
    }
    /**
     * To render filter bar when filtering enabled.
     * @return {void}
     * @hidden
     */
    Filter.prototype.render = function () {
        var gObj = this.parent;
        this.l10n = this.serviceLocator.getService('localization');
        this.getLocalizedCustomOperators();
        if (this.parent.filterSettings.type === 'filterbar') {
            if (gObj.columns.length) {
                var fltrElem = this.parent.element.querySelector('.e-filterbar');
                if (fltrElem) {
                    remove(fltrElem);
                }
                var rowRenderer = new RowRenderer(this.serviceLocator, CellType.Filter, gObj);
                var row = void 0;
                var cellrender = this.serviceLocator.getService('cellRendererFactory');
                cellrender.addCellRenderer(CellType.Filter, new FilterCellRenderer(this.parent, this.serviceLocator));
                this.valueFormatter = this.serviceLocator.getService('valueFormatter');
                rowRenderer.element = createElement('tr', { className: 'e-filterbar' });
                row = this.generateRow();
                row.data = this.values;
                this.parent.getHeaderContent().querySelector('thead').appendChild(rowRenderer.element);
                this.element = rowRenderer.render(row, gObj.getColumns(), null, null, rowRenderer.element);
                var detail = this.element.querySelector('.e-detailheadercell');
                if (detail) {
                    detail.className = 'e-filterbarcell e-mastercell';
                }
                var gCells = [].slice.call(this.element.querySelectorAll('.e-grouptopleftcell'));
                if (gCells.length) {
                    gCells[gCells.length - 1].classList.add('e-lastgrouptopleftcell');
                }
                this.wireEvents();
                this.parent.notify(freezeRender, { case: 'filter' });
            }
        }
    };
    /**
     * To destroy the filter bar.
     * @return {void}
     * @hidden
     */
    Filter.prototype.destroy = function () {
        if (this.filterModule) {
            this.filterModule.destroy();
        }
        this.filterSettings.columns = [];
        this.updateFilterMsg();
        this.removeEventListener();
        this.unWireEvents();
        if (this.element) {
            remove(this.element);
            if (this.parent.frozenColumns) {
                remove(this.parent.getHeaderContent().querySelector('.e-filterbar'));
            }
        }
    };
    Filter.prototype.generateRow = function (index) {
        var options = {};
        var row = new Row(options);
        row.cells = this.generateCells();
        return row;
    };
    Filter.prototype.generateCells = function () {
        //TODO: generate dummy column for group, detail, stacked row here for filtering;
        var cells = [];
        if (this.parent.allowGrouping) {
            for (var c = 0, len = this.parent.groupSettings.columns.length; c < len; c++) {
                cells.push(this.generateCell({}, CellType.HeaderIndent));
            }
        }
        if (this.parent.detailTemplate || this.parent.childGrid) {
            cells.push(this.generateCell({}, CellType.DetailHeader));
        }
        for (var _i = 0, _a = this.parent.getColumns(); _i < _a.length; _i++) {
            var dummy = _a[_i];
            cells.push(this.generateCell(dummy));
        }
        return cells;
    };
    Filter.prototype.generateCell = function (column, cellType) {
        var opt = {
            'visible': column.visible,
            'isDataCell': false,
            'rowId': '',
            'column': column,
            'cellType': cellType ? cellType : CellType.Filter,
            'attributes': { title: this.l10n.getConstant('FilterbarTitle') }
        };
        return new Cell(opt);
    };
    /**
     * To update filterSettings when applying filter.
     * @return {void}
     * @hidden
     */
    Filter.prototype.updateModel = function () {
        this.currentFilterObject = {
            field: this.fieldName, operator: this.operator, value: this.value, predicate: this.predicate,
            matchCase: this.matchCase, actualFilterValue: {}, actualOperator: {}
        };
        var index = this.getFilteredColsIndexByField(this.fieldName);
        if (index > -1) {
            this.filterSettings.columns[index] = this.currentFilterObject;
        }
        else {
            this.filterSettings.columns.push(this.currentFilterObject);
        }
        this.filterSettings.columns = this.filterSettings.columns;
        this.parent.dataBind();
    };
    Filter.prototype.getFilteredColsIndexByField = function (field) {
        var cols = this.filterSettings.columns;
        for (var i = 0, len = cols.length; i < len; i++) {
            if (cols[i].field === field) {
                return i;
            }
        }
        return -1;
    };
    /**
     * To trigger action complete event.
     * @return {void}
     * @hidden
     */
    Filter.prototype.onActionComplete = function (e) {
        var args = !this.isRemove ? {
            currentFilterObject: this.currentFilterObject, currentFilteringColumn: this.column.field,
            columns: this.filterSettings.columns, requestType: 'filtering', type: actionComplete
        } : {
            requestType: 'filtering', type: actionComplete
        };
        this.parent.trigger(actionComplete, extend(e, args));
        this.isRemove = false;
    };
    Filter.prototype.wireEvents = function () {
        EventHandler.add(this.parent.getHeaderContent(), 'mousedown', this.updateSpanClass, this);
        EventHandler.add(this.parent.element, 'focusin', this.updateSpanClass, this);
        EventHandler.add(this.parent.getHeaderContent(), 'keyup', this.keyUpHandler, this);
    };
    Filter.prototype.unWireEvents = function () {
        EventHandler.remove(this.parent.element, 'focusin', this.updateSpanClass);
        EventHandler.remove(this.parent.getHeaderContent(), 'mousedown', this.updateSpanClass);
        EventHandler.remove(this.parent.getHeaderContent(), 'keyup', this.keyUpHandler);
    };
    Filter.prototype.enableAfterRender = function (e) {
        if (e.module === this.getModuleName() && e.enable) {
            this.render();
        }
    };
    Filter.prototype.initialEnd = function () {
        this.parent.off(contentReady, this.initialEnd);
        if (this.parent.getColumns().length && this.filterSettings.columns.length) {
            var gObj = this.parent;
            this.contentRefresh = false;
            for (var _i = 0, _a = gObj.filterSettings.columns; _i < _a.length; _i++) {
                var col = _a[_i];
                this.filterByColumn(col.field, col.operator, col.value, col.predicate, col.matchCase, col.actualFilterValue, col.actualOperator);
            }
            this.updateFilterMsg();
            this.contentRefresh = true;
        }
    };
    /**
     * @hidden
     */
    Filter.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(uiUpdate, this.enableAfterRender, this);
        this.parent.on(filterComplete, this.onActionComplete, this);
        this.parent.on(inBoundModelChanged, this.onPropertyChanged, this);
        this.parent.on(keyPressed, this.keyUpHandler, this);
        this.parent.on(columnPositionChanged, this.columnPositionChanged, this);
        if (this.parent.frozenColumns) {
            this.parent.on(freezeRefresh, this.render, this);
        }
        else {
            this.parent.on(headerRefreshed, this.render, this);
        }
        this.parent.on(contentReady, this.initialEnd, this);
        this.parent.on(filterMenuClose, this.filterMenuClose, this);
        EventHandler.add(document, 'click', this.clickHandler, this);
        this.parent.on(filterOpen, this.columnMenuFilter, this);
        this.parent.on(click, this.filterIconClickHandler, this);
    };
    /**
     * @hidden
     */
    Filter.prototype.removeEventListener = function () {
        EventHandler.remove(document, 'click', this.clickHandler);
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(uiUpdate, this.enableAfterRender);
        this.parent.off(filterComplete, this.onActionComplete);
        this.parent.off(inBoundModelChanged, this.onPropertyChanged);
        this.parent.off(keyPressed, this.keyUpHandler);
        this.parent.off(columnPositionChanged, this.columnPositionChanged);
        this.parent.off(headerRefreshed, this.render);
        this.parent.off(filterOpen, this.columnMenuFilter);
        this.parent.off(filterMenuClose, this.filterMenuClose);
        this.parent.off(click, this.filterIconClickHandler);
    };
    Filter.prototype.filterMenuClose = function (args) {
        this.fltrDlgDetails.isOpen = false;
    };
    /**
     * Filters grid row by column name with given options.
     * @param  {string} fieldName - Defines the field name of the filter column.
     * @param  {string} filterOperator - Defines the operator by how to filter records.
     * @param  {string | number | Date | boolean} filterValue - Defines the value which is used to filter records.
     * @param  {string} predicate - Defines the relationship between one filter query with another by using AND or OR predicate.
     * @param  {boolean} matchCase - If match case set to true, then filter records with exact match or else
     * filter records with case insensitive(uppercase and lowercase letters treated as same).
     * @param  {string} actualFilterValue - Defines the actual filter value for the filter column.
     * @param  {string} actualOperator - Defines the actual filter operator for the filter column.
     * @return {void}
     */
    Filter.prototype.filterByColumn = function (fieldName, filterOperator, filterValue, predicate, matchCase, actualFilterValue, actualOperator) {
        var gObj = this.parent;
        var filterCell;
        this.column = gObj.getColumnByField(fieldName);
        if (this.filterSettings.type === 'filterbar') {
            filterCell = gObj.getHeaderContent().querySelector('#' + this.column.field + '_filterBarcell');
        }
        if (!isNullOrUndefined(this.column.allowFiltering) && !this.column.allowFiltering) {
            return;
        }
        if (isActionPrevent(gObj)) {
            gObj.notify(preventBatch, {
                instance: this, handler: this.filterByColumn, arg1: fieldName, arg2: filterOperator, arg3: filterValue, arg4: predicate,
                arg5: matchCase, arg6: actualFilterValue, arg7: actualOperator
            });
            return;
        }
        this.value = filterValue;
        this.matchCase = matchCase || false;
        this.fieldName = fieldName;
        this.predicate = predicate || 'and';
        this.operator = filterOperator;
        filterValue = !isNullOrUndefined(filterValue) && filterValue.toString();
        if (this.column.type === 'number' || this.column.type === 'date') {
            this.matchCase = true;
        }
        this.values[this.column.field] = filterValue;
        gObj.getColumnHeaderByField(fieldName).setAttribute('aria-filtered', 'true');
        if (filterValue.length < 1 || this.checkForSkipInput(this.column, filterValue)) {
            this.filterStatusMsg = filterValue.length < 1 ? '' : this.l10n.getConstant('InvalidFilterMessage');
            this.updateFilterMsg();
            return;
        }
        if (this.filterSettings.type === 'filterbar' && filterCell.value !== filterValue) {
            filterCell.value = filterValue;
        }
        if (this.checkAlreadyColFiltered(this.column.field)) {
            return;
        }
        this.updateModel();
    };
    Filter.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        for (var _i = 0, _a = Object.keys(e.properties); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'columns':
                    if (this.contentRefresh) {
                        this.parent.notify(modelChanged, {
                            currentFilterObject: this.currentFilterObject, currentFilteringColumn: this.column ?
                                this.column.field : undefined,
                            columns: this.filterSettings.columns, requestType: 'filtering', type: actionBegin
                        });
                        this.updateFilterMsg();
                    }
                    break;
                case 'showFilterBarStatus':
                    if (e.properties[prop]) {
                        this.updateFilterMsg();
                    }
                    else if (this.parent.allowPaging) {
                        this.parent.updateExternalMessage('');
                    }
                    break;
            }
        }
    };
    /**
     * Clears all the filtered rows of Grid.
     * @return {void}
     */
    Filter.prototype.clearFiltering = function () {
        var cols = getActualPropFromColl(this.filterSettings.columns);
        if (isActionPrevent(this.parent)) {
            this.parent.notify(preventBatch, { instance: this, handler: this.clearFiltering });
            return;
        }
        for (var i = 0, len = cols.length; i < len; i++) {
            this.removeFilteredColsByField(cols[i].field, true);
        }
        this.isRemove = true;
        this.filterStatusMsg = '';
        this.updateFilterMsg();
    };
    Filter.prototype.checkAlreadyColFiltered = function (field) {
        var columns = this.filterSettings.columns;
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var col = columns_1[_i];
            if (col.field === field && col.value === this.value &&
                col.operator === this.operator && col.predicate === this.predicate) {
                return true;
            }
        }
        return false;
    };
    Filter.prototype.columnMenuFilter = function (args) {
        this.column = args.col;
        var ele = closest(args.target, '#' + args.id);
        if (args.isClose && !ele) {
            this.filterModule.closeDialog();
        }
        else if (ele) {
            this.filterDialogOpen(this.column, args.target);
        }
    };
    Filter.prototype.filterDialogOpen = function (col, target, left, top) {
        var gObj = this.parent;
        if (this.filterModule) {
            this.filterModule.closeDialog();
        }
        this.filterModule = new this.type[col.filter.type || this.parent.filterSettings.type](this.parent, gObj.filterSettings, this.serviceLocator, this.customOperators, this);
        this.filterModule.openDialog({
            type: col.type, field: col.field, displayName: col.headerText,
            dataSource: col.filter.dataSource || gObj.dataSource, format: col.format,
            filteredColumns: gObj.filterSettings.columns, target: target,
            sortedColumns: gObj.sortSettings.columns, formatFn: col.getFormatter(),
            parserFn: col.getParser(), query: gObj.query, template: col.getFilterItemTemplate(),
            hideSearchbox: isNullOrUndefined(col.filter.hideSearchbox) ? false : col.filter.hideSearchbox,
            handler: this.filterHandler.bind(this), localizedStrings: gObj.getLocaleConstants(),
            position: { X: left, Y: top }
        });
    };
    /**
     * Removes filtered column by field name.
     * @param  {string} field - Defines column field name to remove filter.
     * @param  {boolean} isClearFilterBar -  Specifies whether the filter bar value needs to be cleared.
     * @return {void}
     * @hidden
     */
    Filter.prototype.removeFilteredColsByField = function (field, isClearFilterBar) {
        var fCell;
        var cols = this.filterSettings.columns;
        if (isActionPrevent(this.parent)) {
            this.parent.notify(preventBatch, {
                instance: this, handler: this.removeFilteredColsByField,
                arg1: field, arg2: isClearFilterBar
            });
            return;
        }
        for (var i = 0, len = cols.length; i < len; i++) {
            if (cols[i].field === field) {
                if (this.filterSettings.type === 'filterbar' && !isClearFilterBar) {
                    fCell = this.parent.getHeaderContent().querySelector('#' + cols[i].field + '_filterBarcell');
                    delete this.values[field];
                }
                cols.splice(i, 1);
                var fltrElement = this.parent.getColumnHeaderByField(field);
                fltrElement.removeAttribute('aria-filtered');
                if (this.filterSettings.type !== 'filterbar') {
                    fltrElement.querySelector('.e-icon-filter').classList.remove('e-filtered');
                }
                this.isRemove = true;
                this.parent.notify(modelChanged, {
                    requestType: 'filtering', type: actionBegin
                });
                break;
            }
        }
        this.updateFilterMsg();
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Filter.prototype.getModuleName = function () {
        return 'filter';
    };
    Filter.prototype.keyUpHandler = function (e) {
        var gObj = this.parent;
        var target = e.target;
        if (target && matches(target, '.e-filterbar input')) {
            this.column = gObj.getColumnByField(target.id.split('_')[0]);
            if (!this.column) {
                return;
            }
            this.updateCrossIcon(target);
            if ((this.filterSettings.mode === 'immediate' || e.keyCode === 13) && e.keyCode !== 9) {
                this.value = target.value.trim();
                this.processFilter(e);
            }
        }
    };
    Filter.prototype.updateSpanClass = function (e) {
        var target = e.target;
        if (e.type === 'mousedown' && target.classList.contains('e-cancel')) {
            var targetText = target.previousElementSibling;
            targetText.value = '';
            target.classList.add('e-hide');
            targetText.focus();
            e.preventDefault();
        }
        if (e.type === 'focusin' && target.classList.contains('e-filtertext') && !target.disabled) {
            if (this.lastFilterElement) {
                this.lastFilterElement.nextElementSibling.classList.add('e-hide');
            }
            this.updateCrossIcon(target);
            this.lastFilterElement = target;
        }
        if (e.type === 'focusin' && !target.classList.contains('e-filtertext') && this.lastFilterElement) {
            this.lastFilterElement.nextElementSibling.classList.add('e-hide');
        }
        return false;
    };
    Filter.prototype.updateCrossIcon = function (element) {
        if (element.value.length) {
            element.nextElementSibling.classList.remove('e-hide');
        }
    };
    Filter.prototype.updateFilterMsg = function () {
        if (this.filterSettings.type === 'filterbar') {
            var gObj = this.parent;
            var columns = this.filterSettings.columns;
            var formater = this.serviceLocator.getService('valueFormatter');
            var column = void 0;
            if (!this.filterSettings.showFilterBarStatus) {
                return;
            }
            if (columns.length > 0 && this.filterStatusMsg !== this.l10n.getConstant('InvalidFilterMessage')) {
                this.filterStatusMsg = '';
                for (var index = 0; index < columns.length; index++) {
                    column = gObj.getColumnByField(columns[index].field);
                    if (index) {
                        this.filterStatusMsg += ' && ';
                    }
                    this.filterStatusMsg += column.headerText + ': ' + this.values[column.field];
                }
            }
            if (gObj.allowPaging) {
                gObj.updateExternalMessage(this.filterStatusMsg);
            }
            //TODO: virtual paging       
            this.filterStatusMsg = '';
        }
    };
    Filter.prototype.checkForSkipInput = function (column, value) {
        var isSkip;
        var skipInput;
        if (column.type === 'number') {
            skipInput = ['=', ' ', '!'];
            if (DataUtil.operatorSymbols[value] || skipInput.indexOf(value) > -1) {
                isSkip = true;
            }
        }
        else if (column.type === 'string') {
            skipInput = ['>', '<', '=', '!'];
            for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                var val = value_1[_i];
                if (skipInput.indexOf(val) > -1) {
                    isSkip = true;
                }
            }
        }
        return isSkip;
    };
    Filter.prototype.processFilter = function (e) {
        this.stopTimer();
        this.startTimer(e);
    };
    Filter.prototype.startTimer = function (e) {
        var _this = this;
        this.timer = window.setInterval(function () { _this.onTimerTick(); }, e.keyCode === 13 ? 0 : this.filterSettings.immediateModeDelay);
    };
    Filter.prototype.stopTimer = function () {
        window.clearInterval(this.timer);
    };
    Filter.prototype.onTimerTick = function () {
        var filterElement = this.element.querySelector('#' + this.column.field + '_filterBarcell');
        if (!filterElement && this.parent.frozenColumns) {
            filterElement = this.parent.getHeaderContent().querySelector('#' + this.column.field + '_filterBarcell');
        }
        var filterValue = JSON.parse(JSON.stringify(filterElement.value));
        this.stopTimer();
        if (!isNullOrUndefined(this.column.filterBarTemplate)) {
            var templateRead = this.column.filterBarTemplate.read;
            if (typeof templateRead === 'string') {
                templateRead = getValue(templateRead, window);
            }
            this.value = templateRead.call(this, filterElement);
        }
        if (this.value === '') {
            this.removeFilteredColsByField(this.column.field);
            return;
        }
        this.validateFilterValue(this.value);
        this.filterByColumn(this.column.field, this.operator, this.value, this.predicate, this.matchCase);
        this.values[this.column.field] = filterValue;
        filterElement.value = filterValue;
        this.updateFilterMsg();
    };
    Filter.prototype.validateFilterValue = function (value) {
        var gObj = this.parent;
        var skipInput;
        var index;
        this.matchCase = true;
        switch (this.column.type) {
            case 'number':
                this.operator = this.filterOperators.equal;
                skipInput = ['>', '<', '=', '!'];
                for (var i = 0; i < value.length; i++) {
                    if (skipInput.indexOf(value[i]) > -1) {
                        index = i;
                        break;
                    }
                }
                this.getOperator(value.substring(index));
                if (index !== 0) {
                    this.value = value.substring(0, index);
                }
                if (this.value !== '' && value.length >= 1) {
                    this.value = this.valueFormatter.fromView(this.value, this.column.getParser(), this.column.type);
                }
                if (isNaN(this.value)) {
                    this.filterStatusMsg = this.l10n.getConstant('InvalidFilterMessage');
                }
                break;
            case 'date':
            case 'datetime':
                this.operator = this.filterOperators.equal;
                this.getOperator(value);
                if (this.value !== '') {
                    this.value = this.valueFormatter.fromView(this.value, this.column.getParser(), this.column.type);
                    if (isNullOrUndefined(this.value)) {
                        this.filterStatusMsg = this.l10n.getConstant('InvalidFilterMessage');
                    }
                }
                break;
            case 'string':
                this.matchCase = false;
                if (value.charAt(0) === '*') {
                    this.value = this.value.slice(1);
                    this.operator = this.filterOperators.startsWith;
                }
                else if (value.charAt(value.length - 1) === '%') {
                    this.value = this.value.slice(0, -1);
                    this.operator = this.filterOperators.startsWith;
                }
                else if (value.charAt(0) === '%') {
                    this.value = this.value.slice(1);
                    this.operator = this.filterOperators.endsWith;
                }
                else {
                    this.operator = this.filterOperators.startsWith;
                }
                break;
            case 'boolean':
                if (value.toLowerCase() === 'true' || value === '1') {
                    this.value = true;
                }
                else if (value.toLowerCase() === 'false' || value === '0') {
                    this.value = false;
                }
                else if (value.length) {
                    this.filterStatusMsg = this.l10n.getConstant('InvalidFilterMessage');
                }
                this.operator = this.filterOperators.equal;
                break;
            default:
                this.operator = this.filterOperators.equal;
        }
    };
    Filter.prototype.getOperator = function (value) {
        var singleOp = value.charAt(0);
        var multipleOp = value.slice(0, 2);
        var operators = extend({ '=': this.filterOperators.equal, '!': this.filterOperators.notEqual }, DataUtil.operatorSymbols);
        if (operators.hasOwnProperty(singleOp) || operators.hasOwnProperty(multipleOp)) {
            this.operator = operators[singleOp];
            this.value = value.substring(1);
            if (!this.operator) {
                this.operator = operators[multipleOp];
                this.value = value.substring(2);
            }
        }
        if (this.operator === this.filterOperators.lessThan || this.operator === this.filterOperators.greaterThan) {
            if (this.value.charAt(0) === '=') {
                this.operator = this.operator + 'orequal';
                this.value = this.value.substring(1);
            }
        }
    };
    Filter.prototype.columnPositionChanged = function (e) {
        if (this.parent.filterSettings.type !== 'filterbar') {
            return;
        }
        var filterCells = [].slice.call(this.element.querySelectorAll('.e-filterbarcell'));
        filterCells.splice(e.toIndex, 0, filterCells.splice(e.fromIndex, 1)[0]);
        this.element.innerHTML = '';
        for (var _i = 0, filterCells_1 = filterCells; _i < filterCells_1.length; _i++) {
            var cell = filterCells_1[_i];
            this.element.appendChild(cell);
        }
    };
    Filter.prototype.getLocalizedCustomOperators = function () {
        var numOptr = [
            { value: 'equal', text: this.l10n.getConstant('Equal') },
            { value: 'greaterThan', text: this.l10n.getConstant('GreaterThan') },
            { value: 'greaterThanOrEqual', text: this.l10n.getConstant('GreaterThanOrEqual') },
            { value: 'lessThan', text: this.l10n.getConstant('LessThan') },
            { value: 'lessThanOrEqual', text: this.l10n.getConstant('LessThanOrEqual') },
            { value: 'notEqual', text: this.l10n.getConstant('NotEqual') }
        ];
        this.customOperators = {
            stringOperator: [
                { value: 'startsWith', text: this.l10n.getConstant('StartsWith') },
                { value: 'endsWith', text: this.l10n.getConstant('EndsWith') },
                { value: 'contains', text: this.l10n.getConstant('Contains') },
                { value: 'equal', text: this.l10n.getConstant('Equal') }, { value: 'notEqual', text: this.l10n.getConstant('NotEqual') }
            ],
            numberOperator: numOptr,
            dateOperator: numOptr,
            datetimeOperator: numOptr,
            booleanOperator: [
                { value: 'equal', text: this.l10n.getConstant('Equal') }, { value: 'notEqual', text: this.l10n.getConstant('NotEqual') }
            ]
        };
    };
    
    Filter.prototype.filterIconClickHandler = function (e) {
        var target = e.target;
        if (target.classList.contains('e-filtermenudiv') && (this.parent.filterSettings.type === 'menu' ||
            this.parent.filterSettings.type === 'checkbox' || this.parent.filterSettings.type === 'excel')) {
            var gObj = this.parent;
            var col = gObj.getColumnByUid(parentsUntil(target, 'e-headercell').firstElementChild.getAttribute('e-mappinguid'));
            var gClient = gObj.element.getBoundingClientRect();
            var fClient = target.getBoundingClientRect();
            this.column = col;
            if (this.fltrDlgDetails.field === col.field && this.fltrDlgDetails.isOpen) {
                return;
            }
            if (this.filterModule) {
                this.filterModule.closeDialog();
            }
            this.fltrDlgDetails = { field: col.field, isOpen: true };
            this.filterDialogOpen(this.column, target, fClient.right - gClient.left, fClient.bottom - gClient.top);
        }
    };
    Filter.prototype.clickHandler = function (e) {
        if (this.parent.filterSettings.type === 'menu' ||
            this.parent.filterSettings.type === 'checkbox' || this.parent.filterSettings.type === 'excel') {
            var gObj = this.parent;
            var target = e.target;
            var datepickerEle = target.classList.contains('e-day'); // due to datepicker popup cause
            if (parentsUntil(target, 'e-filter-popup') || target.classList.contains('e-filtermenudiv')) {
                return;
            }
            else if (this.filterModule &&
                (!parentsUntil(target, 'e-popup-wrapper')
                    && (!closest(target, '.e-filter-item.e-menu-item'))
                    && (!parentsUntil(target, 'e-popup'))) && !datepickerEle) {
                this.filterModule.closeDialog(target);
            }
        }
    };
    Filter.prototype.filterHandler = function (args) {
        var filterIconElement;
        var dataManager = new DataManager(this.filterSettings.columns);
        var query = new Query().where('field', this.filterOperators.equal, args.field);
        var result = dataManager.executeLocal(query);
        for (var i = 0; i < result.length; i++) {
            var index = -1;
            for (var j = 0; j < this.filterSettings.columns.length; j++) {
                if (result[i].field === this.filterSettings.columns[j].field) {
                    index = j;
                    break;
                }
            }
            if (index !== -1) {
                this.filterSettings.columns.splice(index, 1);
            }
        }
        var iconClass = this.parent.showColumnMenu ? '.e-columnmenu' : '.e-icon-filter';
        filterIconElement = this.parent.getColumnHeaderByField(args.field).querySelector(iconClass);
        if (args.action === 'filtering') {
            this.filterSettings.columns = this.filterSettings.columns.concat(args.filterCollection);
            if (this.filterSettings.columns.length && filterIconElement) {
                filterIconElement.classList.add('e-filtered');
            }
        }
        else {
            if (filterIconElement) {
                filterIconElement.classList.remove('e-filtered');
            }
            this.parent.refresh(); //hot-fix onpropertychanged not working for object { array }           
        }
        this.parent.dataBind();
    };
    return Filter;
}());

var resizeClassList = {
    root: 'e-rhandler',
    suppress: 'e-rsuppress',
    icon: 'e-ricon',
    helper: 'e-rhelper',
    header: 'th.e-headercell',
    cursor: 'e-rcursor'
};
/**
 * `Resize` module is used to handle Resize to fit for columns.
 * @hidden
 * @private
 */
var Resize = /** @class */ (function () {
    /**
     * Constructor for the Grid resize module
     * @hidden
     */
    function Resize(parent) {
        this.tapped = false;
        this.isDblClk = true;
        this.parent = parent;
        if (this.parent.isDestroyed) {
            return;
        }
        this.widthService = new ColumnWidthService(parent);
        this.addEventListener();
    }
    /**
     * Resize by field names.
     * @param  {string|string[]} fName - Defines the field name.
     * @return {void}
     */
    Resize.prototype.autoFitColumns = function (fName) {
        var columnName = (fName === undefined || fName === null || fName.length <= 0) ?
            this.parent.getColumns().map(function (x) { return x.field; }) : (typeof fName === 'string') ? [fName] : fName;
        this.findColumn(columnName);
    };
    Resize.prototype.resizeColumn = function (fName, index, id) {
        var gObj = this.parent;
        var tWidth = 0;
        var headerTable = this.parent.getHeaderTable();
        var contentTable = this.parent.getContentTable();
        var headerDivTag = 'e-gridheader';
        var contentDivTag = 'e-gridcontent';
        var indentWidthClone = gObj.getHeaderTable().querySelector('tr').querySelectorAll('.e-grouptopleftcell');
        var indentWidth = 0;
        if (indentWidthClone.length > 0) {
            for (var i = 0; i < indentWidthClone.length; i++) {
                indentWidth += indentWidthClone[i].offsetWidth;
            }
        }
        var uid = id ? id : this.parent.getUidByColumnField(fName);
        var columnIndex = this.parent.getNormalizedColumnIndex(uid);
        var headerTextClone = headerTable.querySelectorAll('th')[columnIndex].cloneNode(true);
        var headerText = [headerTextClone];
        var contentTextClone = contentTable.querySelectorAll("td:nth-child(" + (columnIndex + 1) + ")");
        var contentText = [];
        for (var i = 0; i < contentTextClone.length; i++) {
            contentText[i] = contentTextClone[i].cloneNode(true);
        }
        var wHeader = this.createTable(headerTable, headerText, headerDivTag);
        var wContent = this.createTable(contentTable, contentText, contentDivTag);
        var columnbyindex = gObj.getColumns()[index];
        var result;
        var width = (wHeader > wContent) ? columnbyindex.width = formatUnit(wHeader) : columnbyindex.width = formatUnit(wContent);
        this.widthService.setColumnWidth(gObj.getColumns()[index]);
        if (!this.parent.allowResizing) {
            result = gObj.getColumns().some(function (x) { return x.width === null || x.width === undefined || x.width.length <= 0; });
            if (result === false) {
                gObj.getColumns().forEach(function (element) {
                    if (element.visible) {
                        tWidth = tWidth + parseInt(element.width, 10);
                    }
                });
            }
            var tableWidth_1 = tWidth + indentWidth;
            if (tWidth > 0) {
                headerTable.style.width = formatUnit(tableWidth_1);
                contentTable.style.width = formatUnit(tableWidth_1);
            }
        }
        var tableWidth = headerTable.offsetWidth;
        var contentwidth = (gObj.getContent().scrollWidth);
        if (contentwidth > tableWidth) {
            headerTable.classList.add('e-tableborder');
            contentTable.classList.add('e-tableborder');
        }
        else {
            headerTable.classList.remove('e-tableborder');
            contentTable.classList.remove('e-tableborder');
        }
    };
    /**
     * To destroy the resize
     * @return {void}
     * @hidden
     */
    Resize.prototype.destroy = function () {
        this.widthService = null;
        this.unwireEvents();
        this.removeEventListener();
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Resize.prototype.getModuleName = function () {
        return 'resize';
    };
    Resize.prototype.findColumn = function (fName) {
        var _this = this;
        fName.forEach(function (element) {
            var fieldName = element;
            var columnIndex = _this.parent.getColumnIndexByField(fieldName);
            if (_this.parent.getColumns()[columnIndex].visible === true) {
                _this.resizeColumn(fieldName, columnIndex);
            }
        });
    };
    /**
     * To create table for autofit
     * @hidden
     */
    Resize.prototype.createTable = function (table, text, tag) {
        var myTableDiv = createElement('div');
        myTableDiv.className = this.parent.element.className;
        myTableDiv.style.cssText = 'display: inline-block;visibility:hidden;position:absolute';
        var mySubDiv = createElement('div');
        mySubDiv.className = tag;
        var myTable = createElement('table');
        myTable.className = table.className;
        myTable.style.cssText = 'table-layout: auto;width: auto';
        var myTr = createElement('tr');
        text.forEach(function (element) {
            var tr = myTr.cloneNode();
            tr.className = table.querySelector('tr').className;
            tr.appendChild(element);
            myTable.appendChild(tr);
        });
        mySubDiv.appendChild(myTable);
        myTableDiv.appendChild(mySubDiv);
        document.body.appendChild(myTableDiv);
        var offsetWidthValue = myTable.getBoundingClientRect().width;
        document.body.removeChild(myTableDiv);
        return Math.ceil(offsetWidthValue);
    };
    /**
     * @hidden
     */
    Resize.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        if (this.parent.frozenColumns) {
            this.parent.on(freezeRefresh, this.render, this);
        }
        else {
            this.parent.on(headerRefreshed, this.render, this);
        }
    };
    /**
     * @hidden
     */
    Resize.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(headerRefreshed, this.render);
    };
    /**
     * @hidden
     */
    Resize.prototype.render = function () {
        this.wireEvents();
        this.setHandlerHeight();
    };
    Resize.prototype.wireEvents = function () {
        var _this = this;
        this.getResizeHandlers().forEach(function (ele) {
            ele.style.height = ele.parentElement.offsetHeight + 'px';
            EventHandler.add(ele, Browser.touchStartEvent, _this.resizeStart, _this);
            EventHandler.add(ele, dblclick, _this.callAutoFit, _this);
        });
    };
    Resize.prototype.unwireEvents = function () {
        var _this = this;
        this.getResizeHandlers().forEach(function (ele) {
            EventHandler.remove(ele, Browser.touchStartEvent, _this.resizeStart);
            EventHandler.remove(ele, dblclick, _this.callAutoFit);
        });
    };
    Resize.prototype.getResizeHandlers = function () {
        return this.parent.frozenColumns ?
            [].slice.call(this.parent.getHeaderContent().querySelectorAll('.' + resizeClassList.root))
            : [].slice.call(this.parent.getHeaderTable().querySelectorAll('.' + resizeClassList.root));
    };
    Resize.prototype.setHandlerHeight = function () {
        [].slice.call(this.parent.getHeaderTable().querySelectorAll('.' + resizeClassList.suppress)).forEach(function (ele) {
            ele.style.height = ele.parentElement.offsetHeight + 'px';
        });
    };
    Resize.prototype.callAutoFit = function (e) {
        var col = this.getTargetColumn(e);
        this.resizeColumn(col.field, this.parent.getNormalizedColumnIndex(col.uid), col.uid);
    };
    Resize.prototype.resizeStart = function (e) {
        if (!this.helper) {
            if (this.getScrollBarWidth() === 0) {
                for (var _i = 0, _a = this.refreshColumnWidth(); _i < _a.length; _i++) {
                    var col = _a[_i];
                    this.widthService.setColumnWidth(col);
                }
                this.widthService.setWidthToTable();
            }
            this.element = e.target;
            this.parentElementWidth = this.parent.element.getBoundingClientRect().width;
            this.appendHelper();
            this.column = this.getTargetColumn(e);
            this.pageX = this.getPointX(e);
            if (this.parent.enableRtl) {
                this.minMove = parseInt(this.column.width.toString(), 10)
                    - (this.column.minWidth ? parseInt(this.column.minWidth.toString(), 10) : 0);
            }
            else {
                this.minMove = (this.column.minWidth ? parseInt(this.column.minWidth.toString(), 10) : 0)
                    - parseInt(this.column.width.toString(), 10);
            }
            this.minMove += this.pageX;
        }
        if (Browser.isDevice && !this.helper.classList.contains(resizeClassList.icon)) {
            this.helper.classList.add(resizeClassList.icon);
            EventHandler.add(document, Browser.touchStartEvent, this.removeHelper, this);
            EventHandler.add(this.helper, Browser.touchStartEvent, this.resizeStart, this);
        }
        else {
            var args = {
                e: e,
                column: this.column
            };
            this.parent.trigger(resizeStart, args);
            if (args.cancel) {
                this.cancelResizeAction();
                return;
            }
            EventHandler.add(document, Browser.touchEndEvent, this.resizeEnd, this);
            EventHandler.add(this.parent.element, Browser.touchMoveEvent, this.resizing, this);
            this.updateCursor('add');
        }
    };
    Resize.prototype.cancelResizeAction = function (removeEvents) {
        if (removeEvents) {
            EventHandler.remove(this.parent.element, Browser.touchMoveEvent, this.resizing);
            EventHandler.remove(document, Browser.touchEndEvent, this.resizeEnd);
            this.updateCursor('remove');
        }
        if (Browser.isDevice) {
            EventHandler.remove(document, Browser.touchStartEvent, this.removeHelper);
            EventHandler.remove(this.helper, Browser.touchStartEvent, this.resizeStart);
        }
        detach(this.helper);
        this.refresh();
    };
    Resize.prototype.getWidth = function (width, minWidth, maxWidth) {
        if (minWidth && width < minWidth) {
            return minWidth;
        }
        else if ((maxWidth && width > maxWidth)) {
            return maxWidth;
        }
        else {
            return width;
        }
    };
    Resize.prototype.resizing = function (e) {
        var pageX = this.getPointX(e);
        var mousemove = this.parent.enableRtl ? -(pageX - this.pageX) : (pageX - this.pageX);
        var colData = {
            width: parseInt(this.widthService.getWidth(this.column).toString(), 10) + mousemove,
            minWidth: this.column.minWidth ? parseInt(this.column.minWidth.toString(), 10) : null,
            maxWidth: this.column.maxWidth ? parseInt(this.column.maxWidth.toString(), 10) : null
        };
        var width = this.getWidth(colData.width, colData.minWidth, colData.maxWidth);
        if ((!this.parent.enableRtl && this.minMove >= pageX) || (this.parent.enableRtl && this.minMove <= pageX)) {
            width = this.column.minWidth ? parseInt(this.column.minWidth.toString(), 10) : 0;
            this.pageX = pageX = this.minMove;
        }
        if (width !== parseInt(this.column.width.toString(), 10)) {
            this.pageX = pageX;
            this.column.width = formatUnit(width);
            var args = {
                e: e,
                column: this.column
            };
            this.parent.trigger(onResize, args);
            if (args.cancel) {
                this.cancelResizeAction(true);
                return;
            }
            this.widthService.setColumnWidth(this.column, null, 'resize');
            this.updateHelper();
        }
        this.isDblClk = false;
    };
    Resize.prototype.resizeEnd = function (e) {
        if (!this.helper || this.parent.isDestroyed) {
            return;
        }
        EventHandler.remove(this.parent.element, Browser.touchMoveEvent, this.resizing);
        EventHandler.remove(document, Browser.touchEndEvent, this.resizeEnd);
        this.updateCursor('remove');
        detach(this.helper);
        var args = {
            e: e,
            column: this.column
        };
        this.parent.trigger(resizeStop, args);
        closest(this.element, '.e-headercell').classList.add('e-resized');
        this.refresh();
        this.doubleTapEvent(e);
        this.isDblClk = true;
    };
    Resize.prototype.getPointX = function (e) {
        if (e.touches && e.touches.length) {
            return e.touches[0].pageX;
        }
        else {
            return e.pageX;
        }
    };
    Resize.prototype.refreshColumnWidth = function () {
        var columns = this.parent.getColumns();
        for (var _i = 0, _a = [].slice.apply(this.parent.getHeaderTable().querySelectorAll('th.e-headercell')); _i < _a.length; _i++) {
            var ele = _a[_i];
            for (var _b = 0, columns_1 = columns; _b < columns_1.length; _b++) {
                var column = columns_1[_b];
                if (ele.querySelector('[e-mappinguid]') &&
                    ele.querySelector('[e-mappinguid]').getAttribute('e-mappinguid') === column.uid && column.visible) {
                    column.width = ele.getBoundingClientRect().width;
                    break;
                }
            }
        }
        return columns;
    };
    Resize.prototype.getTargetColumn = function (e) {
        var cell = closest(e.target, resizeClassList.header);
        var uid = cell.querySelector('.e-headercelldiv').getAttribute('e-mappinguid');
        return this.parent.getColumnByUid(uid);
    };
    Resize.prototype.updateCursor = function (action) {
        var headerRows = [].slice.call(this.parent.getHeaderContent().querySelectorAll('th'));
        headerRows.push(this.parent.element);
        for (var _i = 0, headerRows_1 = headerRows; _i < headerRows_1.length; _i++) {
            var row = headerRows_1[_i];
            row.classList[action](resizeClassList.cursor);
        }
    };
    Resize.prototype.refresh = function () {
        this.column = null;
        this.pageX = null;
        this.element = null;
        this.helper = null;
    };
    Resize.prototype.appendHelper = function () {
        this.helper = createElement('div', {
            className: resizeClassList.helper
        });
        this.parent.element.appendChild(this.helper);
        var height = this.parent.getContent().offsetHeight - this.getScrollBarWidth();
        var rect = closest(this.element, resizeClassList.header);
        var tr = [].slice.call(this.parent.getHeaderContent().querySelectorAll('tr'));
        if (this.parent.frozenColumns) {
            if (rect.parentElement.children.length !== this.parent.frozenColumns) {
                tr.splice(0, tr.length / 2);
            }
            else {
                tr.splice(tr.length / 2, tr.length / 2);
            }
        }
        for (var i = tr.indexOf(rect.parentElement); i < tr.length; i++) {
            height += tr[i].offsetHeight;
        }
        var pos = this.calcPos(rect);
        pos.left += (this.parent.enableRtl ? 0 - 1 : rect.offsetWidth - 2);
        this.helper.style.cssText = 'height: ' + height + 'px; top: ' + pos.top + 'px; left:' + Math.floor(pos.left) + 'px;';
    };
    Resize.prototype.getScrollBarWidth = function (height) {
        var ele = this.parent.frozenColumns ? this.parent.getContent().querySelector('.e-movablecontent')
            : this.parent.getContent().firstChild;
        return (ele.scrollHeight > ele.clientHeight && height) ||
            ele.scrollWidth > ele.clientWidth ? getScrollBarWidth() : 0;
    };
    Resize.prototype.removeHelper = function (e) {
        var cls = e.target.classList;
        if (!(cls.contains(resizeClassList.root) || cls.contains(resizeClassList.icon)) && this.helper) {
            EventHandler.remove(document, Browser.touchStartEvent, this.removeHelper);
            EventHandler.remove(this.helper, Browser.touchStartEvent, this.resizeStart);
            detach(this.helper);
            this.refresh();
        }
    };
    Resize.prototype.updateHelper = function () {
        var rect = closest(this.element, resizeClassList.header);
        var left = Math.floor(this.calcPos(rect).left + (this.parent.enableRtl ? 0 - 1 : rect.offsetWidth - 2));
        var borderWidth = 2; // to maintain the helper inside of grid element.
        if (left > this.parentElementWidth) {
            this.helper.style.left = this.parentElementWidth - borderWidth + 'px';
        }
        else {
            this.helper.style.left = left + 'px';
        }
    };
    Resize.prototype.calcPos = function (elem) {
        var parentOffset = {
            top: 0,
            left: 0
        };
        var offset = elem.getBoundingClientRect();
        var doc = elem.ownerDocument;
        var offsetParent = elem.offsetParent || doc.documentElement;
        while (offsetParent &&
            (offsetParent === doc.body || offsetParent === doc.documentElement) &&
            offsetParent.style.position === 'static') {
            offsetParent = offsetParent.parentNode;
        }
        if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
            parentOffset = offsetParent.getBoundingClientRect();
        }
        return {
            top: offset.top - parentOffset.top,
            left: offset.left - parentOffset.left
        };
    };
    Resize.prototype.doubleTapEvent = function (e) {
        if (this.getUserAgent() && this.isDblClk) {
            if (!this.tapped) {
                this.tapped = setTimeout(this.timeoutHandler(), 300);
            }
            else {
                clearTimeout(this.tapped);
                this.callAutoFit(e);
                this.tapped = null;
            }
        }
    };
    Resize.prototype.getUserAgent = function () {
        var userAgent = Browser.userAgent.toLowerCase();
        return /iphone|ipod|ipad/.test(userAgent);
    };
    Resize.prototype.timeoutHandler = function () {
        this.tapped = null;
    };
    return Resize;
}());

/**
 *
 * `Reorder` module is used to handle columns reorder.
 */
var Reorder = /** @class */ (function () {
    /**
     * Constructor for the Grid reorder module
     * @hidden
     */
    function Reorder(parent) {
        this.parent = parent;
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(headerDrop, this.headerDrop, this);
        this.parent.on(uiUpdate, this.enableAfterRender, this);
        this.parent.on(reorderComplete, this.onActionComplete, this);
        this.parent.on(columnDrag, this.drag, this);
        this.parent.on(columnDragStart, this.dragStart, this);
        this.parent.on(columnDragStop, this.dragStop, this);
        this.parent.on(headerDrop, this.headerDrop, this);
        this.parent.on(headerRefreshed, this.createReorderElement, this);
    }
    Reorder.prototype.chkDropPosition = function (srcElem, destElem) {
        return srcElem.parentElement.isEqualNode(destElem.parentElement) && this.targetParentContainerIndex(srcElem, destElem) > -1;
    };
    Reorder.prototype.chkDropAllCols = function (srcElem, destElem) {
        var isFound;
        var headers = [].slice.call(this.parent.element.getElementsByClassName('e-headercell'));
        var header;
        while (!isFound && headers.length > 0) {
            header = headers.pop();
            isFound = srcElem !== header && this.targetParentContainerIndex(srcElem, destElem) > -1;
        }
        return isFound;
    };
    Reorder.prototype.findColParent = function (col, cols, parent) {
        parent = parent;
        for (var i = 0, len = cols.length; i < len; i++) {
            if (col === cols[i]) {
                return true;
            }
            else if (cols[i].columns) {
                var cnt = parent.length;
                parent.push(cols[i]);
                if (!this.findColParent(col, cols[i].columns, parent)) {
                    parent.splice(cnt, parent.length - cnt);
                }
                else {
                    return true;
                }
            }
        }
        return false;
    };
    Reorder.prototype.getColumnsModel = function (cols) {
        var columnModel = [];
        var subCols = [];
        for (var i = 0, len = cols.length; i < len; i++) {
            columnModel.push(cols[i]);
            if (cols[i].columns) {
                subCols = subCols.concat(cols[i].columns);
            }
        }
        if (subCols.length) {
            columnModel = columnModel.concat(this.getColumnsModel(subCols));
        }
        return columnModel;
    };
    Reorder.prototype.headerDrop = function (e) {
        var gObj = this.parent;
        if (!closest(e.target, 'th')) {
            return;
        }
        var destElem = closest(e.target, '.e-headercell');
        if (destElem && !(!this.chkDropPosition(this.element, destElem) || !this.chkDropAllCols(this.element, destElem))) {
            var headers = [].slice.call(this.parent.element.getElementsByClassName('e-headercell'));
            var oldIdx = getElementIndex(this.element, headers);
            var columns = this.getColumnsModel(this.parent.columns);
            var column = columns[oldIdx];
            var newIndex = this.targetParentContainerIndex(this.element, destElem);
            this.moveColumns(newIndex, column);
        }
    };
    Reorder.prototype.isActionPrevent = function (gObj) {
        return isActionPrevent(gObj);
    };
    Reorder.prototype.moveColumns = function (destIndex, column) {
        var gObj = this.parent;
        if (this.isActionPrevent(gObj)) {
            gObj.notify(preventBatch, { instance: this, handler: this.moveColumns, arg1: destIndex, arg2: column });
            return;
        }
        var parent = this.getColParent(column, this.parent.columns);
        var cols = parent ? parent.columns : this.parent.columns;
        var srcIdx = inArray(column, cols);
        if (!gObj.allowReordering || srcIdx === destIndex || srcIdx === -1 || destIndex === -1) {
            return;
        }
        cols.splice(destIndex, 0, cols.splice(srcIdx, 1)[0]);
        gObj.getColumns(true);
        gObj.notify(columnPositionChanged, { fromIndex: destIndex, toIndex: srcIdx });
        gObj.notify(modelChanged, {
            type: actionBegin, requestType: 'reorder'
        });
    };
    Reorder.prototype.targetParentContainerIndex = function (srcElem, destElem) {
        var headers = [].slice.call(this.parent.element.getElementsByClassName('e-headercell'));
        var cols = this.parent.columns;
        var flatColumns = this.getColumnsModel(cols);
        var parent = this.getColParent(flatColumns[getElementIndex(srcElem, headers)], cols);
        cols = parent ? parent.columns : cols;
        return inArray(flatColumns[getElementIndex(destElem, headers)], cols);
    };
    Reorder.prototype.getColParent = function (column, columns) {
        var parents$$1 = [];
        this.findColParent(column, columns, parents$$1);
        return parents$$1[parents$$1.length - 1];
    };
    /**
     * Changes the Grid column positions by field names.
     * @param  {string} fromFName - Defines the origin field name.
     * @param  {string} toFName - Defines the destination field name.
     * @return {void}
     */
    Reorder.prototype.reorderColumns = function (fromFName, toFName) {
        var column = this.parent.getColumnByField(toFName);
        var parent = this.getColParent(column, this.parent.columns);
        var columns = parent ? parent.columns : this.parent.columns;
        var destIndex = inArray(column, columns);
        if (destIndex > -1) {
            this.moveColumns(destIndex, this.parent.getColumnByField(fromFName));
        }
    };
    Reorder.prototype.enableAfterRender = function (e) {
        if (e.module === this.getModuleName() && e.enable) {
            this.createReorderElement();
        }
    };
    Reorder.prototype.createReorderElement = function () {
        var header = this.parent.element.querySelector('.e-headercontent');
        this.upArrow = header.appendChild(createElement('div', { className: 'e-icons e-icon-reorderuparrow e-reorderuparrow', attrs: { style: 'display:none' } }));
        this.downArrow = header.appendChild(createElement('div', { className: 'e-icons e-icon-reorderdownarrow e-reorderdownarrow', attrs: { style: 'display:none' } }));
    };
    /**
     * The function used to trigger onActionComplete
     * @return {void}
     * @hidden
     */
    Reorder.prototype.onActionComplete = function (e) {
        this.parent.trigger(actionComplete, extend(e, { type: actionComplete }));
    };
    /**
     * To destroy the reorder
     * @return {void}
     * @hidden
     */
    Reorder.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        remove(this.upArrow);
        remove(this.downArrow);
        this.parent.off(headerDrop, this.headerDrop);
        this.parent.off(uiUpdate, this.enableAfterRender);
        this.parent.off(reorderComplete, this.onActionComplete);
        this.parent.off(columnDrag, this.drag);
        this.parent.off(columnDragStart, this.dragStart);
        this.parent.off(columnDragStop, this.dragStop);
        this.parent.off(headerRefreshed, this.createReorderElement);
        //call ejdrag and drop destroy
    };
    Reorder.prototype.drag = function (e) {
        var gObj = this.parent;
        var target = e.target;
        var closest$$1 = closest(target, '.e-headercell:not(.e-stackedHeaderCell)');
        var cloneElement = gObj.element.querySelector('.e-cloneproperties');
        var isLeft = this.x > getPosition(e.event).x + gObj.getContent().firstElementChild.scrollLeft;
        removeClass(gObj.getHeaderTable().querySelectorAll('.e-reorderindicate'), ['e-reorderindicate']);
        this.setDisplay('none');
        this.stopTimer();
        classList(cloneElement, ['e-defaultcur'], ['e-notallowedcur']);
        this.updateScrollPostion(e.event);
        if (closest$$1 && !closest$$1.isEqualNode(this.element)) {
            target = closest$$1;
            //consider stacked, detail header cell 
            if (!(!this.chkDropPosition(this.element, target) || !this.chkDropAllCols(this.element, target))) {
                this.updateArrowPosition(target, isLeft);
                classList(target, ['e-allowDrop', 'e-reorderindicate'], []);
            }
            else if (!(gObj.allowGrouping && parentsUntil(e.target, 'e-groupdroparea'))) {
                classList(cloneElement, ['e-notallowedcur'], ['e-defaultcur']);
            }
        }
        gObj.trigger(columnDrag, { target: target, draggableType: 'headercell', column: e.column });
    };
    Reorder.prototype.updateScrollPostion = function (e) {
        var _this = this;
        var x = getPosition(e).x;
        var cliRectBase = this.parent.element.getBoundingClientRect();
        var scrollElem = this.parent.getContent().firstElementChild;
        if (x > cliRectBase.left && x < cliRectBase.left + 35) {
            this.timer = window.setInterval(function () { _this.setScrollLeft(scrollElem, true); }, 50);
        }
        else if (x < cliRectBase.right && x > cliRectBase.right - 35) {
            this.timer = window.setInterval(function () { _this.setScrollLeft(scrollElem, false); }, 50);
        }
    };
    Reorder.prototype.setScrollLeft = function (scrollElem, isLeft) {
        var scrollLeft = scrollElem.scrollLeft;
        scrollElem.scrollLeft = scrollElem.scrollLeft + (isLeft ? -5 : 5);
        if (scrollLeft !== scrollElem.scrollLeft) {
            this.setDisplay('none');
        }
    };
    Reorder.prototype.stopTimer = function () {
        window.clearInterval(this.timer);
    };
    Reorder.prototype.updateArrowPosition = function (target, isLeft) {
        var cliRect = target.getBoundingClientRect();
        var cliRectBase = this.parent.element.getBoundingClientRect();
        if ((isLeft && cliRect.left < cliRectBase.left) || (!isLeft && cliRect.right > cliRectBase.right)) {
            return;
        }
        this.upArrow.style.top = cliRect.top + cliRect.height - cliRectBase.top + 'px';
        this.downArrow.style.top = cliRect.top - cliRectBase.top - 4 + 'px';
        this.upArrow.style.left = this.downArrow.style.left = (isLeft ? cliRect.left : cliRect.right) - cliRectBase.left - 4 + 'px';
        this.setDisplay('');
    };
    Reorder.prototype.dragStart = function (e) {
        var gObj = this.parent;
        var target = e.target;
        this.element = target.classList.contains('e-headercell') ? target :
            parentsUntil(target, 'e-headercell');
        this.x = getPosition(e.event).x + gObj.getContent().firstElementChild.scrollLeft;
        gObj.trigger(columnDragStart, {
            target: target, draggableType: 'headercell', column: e.column
        });
    };
    Reorder.prototype.dragStop = function (e) {
        var gObj = this.parent;
        this.setDisplay('none');
        this.stopTimer();
        if (!e.cancel) {
            gObj.trigger(columnDrop, { target: e.target, draggableType: 'headercell', column: e.column });
        }
        removeClass(gObj.getHeaderTable().querySelectorAll('.e-reorderindicate'), ['e-reorderindicate']);
    };
    Reorder.prototype.setDisplay = function (display) {
        this.upArrow.style.display = display;
        this.downArrow.style.display = display;
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Reorder.prototype.getModuleName = function () {
        return 'reorder';
    };
    return Reorder;
}());

/**
 *
 * Reorder module is used to handle row reordering.
 * @hidden
 */
var RowDD = /** @class */ (function () {
    /**
     * Constructor for the Grid print module
     * @hidden
     */
    function RowDD(parent) {
        var _this = this;
        //Internal variables    
        this.selectedRows = [];
        this.helper = function (e) {
            var gObj = _this.parent;
            if (document.getElementsByClassName('e-griddragarea').length ||
                (!e.sender.target.classList.contains('e-selectionbackground') && gObj.selectionSettings.type !== 'single')) {
                return false;
            }
            var visualElement = createElement('div', {
                className: 'e-cloneproperties e-draganddrop e-grid e-dragclone',
                styles: 'height:"auto", z-index:2, width:' + gObj.element.offsetWidth
            });
            var table = createElement('table', { styles: 'width:' + gObj.element.offsetWidth });
            var tbody = createElement('tbody');
            if (gObj.selectionSettings.mode === 'row' && gObj.selectionSettings.type === 'single') {
                var index = parseInt(e.sender.target.parentElement.getAttribute('aria-rowindex'), 10);
                gObj.selectRow(index);
            }
            var selectedRows = gObj.getSelectedRows();
            for (var i = 0, len = selectedRows.length; i < len; i++) {
                var selectedRow = selectedRows[i].cloneNode(true);
                removeElement(selectedRow, '.e-indentcell');
                removeElement(selectedRow, '.e-detailrowcollapse');
                removeElement(selectedRow, '.e-detailrowexpand');
                tbody.appendChild(selectedRow);
            }
            table.appendChild(tbody);
            visualElement.appendChild(table);
            gObj.element.appendChild(visualElement);
            return visualElement;
        };
        this.dragStart = function (e) {
            var gObj = _this.parent;
            if (document.getElementsByClassName('e-griddragarea').length) {
                return;
            }
            gObj.trigger(rowDragStart, {
                rows: gObj.getSelectedRows(),
                target: e.target, draggableType: 'rows', data: gObj.getSelectedRecords()
            });
            var dropElem = document.getElementById(gObj.rowDropSettings.targetID);
            if (gObj.rowDropSettings.targetID && dropElem && dropElem.ej2_instances) {
                dropElem.ej2_instances[0].getContent().classList.add('e-allowRowDrop');
            }
            _this.isDragStop = false;
        };
        this.drag = function (e) {
            var gObj = _this.parent;
            var cloneElement = _this.parent.element.querySelector('.e-cloneproperties');
            var target = _this.getElementFromPosition(cloneElement, e.event);
            classList(cloneElement, ['e-defaultcur'], ['e-notallowedcur']);
            gObj.trigger(rowDrag, {
                rows: gObj.getSelectedRows(),
                target: target, draggableType: 'rows', data: gObj.getSelectedRecords()
            });
            gObj.element.classList.add('e-rowdrag');
            if (!parentsUntil(target, 'e-gridcontent') ||
                parentsUntil(cloneElement.parentElement, 'e-grid').id === parentsUntil(target, 'e-grid').id) {
                classList(cloneElement, ['e-notallowedcur'], ['e-defaultcur']);
            }
        };
        this.dragStop = function (e) {
            var gObj = _this.parent;
            if (_this.parent.isDestroyed) {
                return;
            }
            var target = _this.getElementFromPosition(e.helper, e.event);
            gObj.element.classList.remove('e-rowdrag');
            var dropElem = document.getElementById(gObj.rowDropSettings.targetID);
            if (gObj.rowDropSettings.targetID && dropElem && dropElem.ej2_instances) {
                dropElem.ej2_instances[0].getContent().classList.remove('e-allowRowDrop');
            }
            gObj.trigger(rowDrop, {
                target: target, draggableType: 'rows',
                rows: gObj.getSelectedRows(), data: gObj.getSelectedRecords()
            });
            if (!parentsUntil(target, 'e-gridcontent')) {
                remove(e.helper);
                return;
            }
        };
        this.parent = parent;
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(initialEnd, this.initializeDrag, this);
        this.parent.on(columnDrop, this.columnDrop, this);
        this.parent.on(rowDragAndDropComplete, this.onActionComplete, this);
        this.parent.on(uiUpdate, this.enableAfterRender, this);
    }
    RowDD.prototype.initializeDrag = function () {
        var gObj = this.parent;
        var drag;
        drag = new Draggable(gObj.getContent(), {
            dragTarget: '.e-rowcell',
            distance: 5,
            helper: this.helper,
            dragStart: this.dragStart,
            drag: this.drag,
            dragStop: this.dragStop
        });
    };
    RowDD.prototype.getElementFromPosition = function (element, event) {
        var target;
        var position = getPosition(event);
        element.style.display = 'none';
        target = document.elementFromPoint(position.x, position.y);
        element.style.display = '';
        return target;
    };
    /**
     * The function used to trigger onActionComplete
     * @return {void}
     * @hidden
     */
    RowDD.prototype.onActionComplete = function (e) {
        this.parent.trigger(actionComplete, extend(e, { type: actionComplete }));
    };
    RowDD.prototype.getTargetIdx = function (targetRow) {
        return targetRow ? parseInt(targetRow.getAttribute('aria-rowindex'), 10) : 0;
    };
    RowDD.prototype.columnDrop = function (e) {
        var gObj = this.parent;
        if (e.droppedElement.getAttribute('action') !== 'grouping') {
            var targetRow = closest(e.target, 'tr');
            var srcControl = void 0;
            var currentIndex = void 0;
            if (e.droppedElement.parentElement.id !== gObj.element.id) {
                srcControl = e.droppedElement.parentElement.ej2_instances[0];
            }
            else {
                return;
            }
            if (srcControl.element.id !== gObj.element.id && srcControl.rowDropSettings.targetID !== gObj.element.id) {
                return;
            }
            var records = srcControl.getSelectedRecords();
            var targetIndex = currentIndex = this.getTargetIdx(targetRow);
            if (isNaN(targetIndex)) {
                targetIndex = currentIndex = 0;
            }
            if (gObj.allowPaging) {
                targetIndex = targetIndex + (gObj.pageSettings.currentPage * gObj.pageSettings.pageSize) - gObj.pageSettings.pageSize;
            }
            //Todo: drag and drop mapper & BatchChanges                   
            gObj.notify(rowsAdded, { toIndex: targetIndex, records: records });
            gObj.notify(modelChanged, {
                type: actionBegin, requestType: 'rowdraganddrop'
            });
            var selectedRows = srcControl.getSelectedRowIndexes();
            var skip = srcControl.allowPaging ?
                (srcControl.pageSettings.currentPage * srcControl.pageSettings.pageSize) - srcControl.pageSettings.pageSize : 0;
            this.selectedRows = [];
            for (var i = 0, len = records.length; i < len; i++) {
                this.selectedRows.push(skip + selectedRows[i]);
            }
            srcControl.notify(rowsRemoved, { indexes: this.selectedRows, records: records });
            srcControl.notify(modelChanged, {
                type: actionBegin, requestType: 'rowdraganddrop'
            });
        }
    };
    RowDD.prototype.enableAfterRender = function (e) {
        if (e.module === this.getModuleName() && e.enable) {
            this.initializeDrag();
        }
    };
    /**
     * To destroy the print
     * @return {void}
     * @hidden
     */
    RowDD.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(initialEnd, this.initializeDrag);
        this.parent.off(columnDrop, this.columnDrop);
        this.parent.off(rowDragAndDropComplete, this.onActionComplete);
        this.parent.off(uiUpdate, this.enableAfterRender);
        //destory ejdrag and drop
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    RowDD.prototype.getModuleName = function () {
        return 'rowDragAndDrop';
    };
    return RowDD;
}());

/**
 *
 * `Group` module is used to handle group action.
 */
var Group = /** @class */ (function () {
    /**
     * Constructor for Grid group module
     * @hidden
     */
    function Group(parent, groupSettings, sortedColumns, serviceLocator) {
        var _this = this;
        this.visualElement = createElement('div', {
            className: 'e-cloneproperties e-dragclone e-gdclone',
            styles: 'line-height:23px', attrs: { action: 'grouping' }
        });
        this.helper = function (e) {
            var gObj = _this.parent;
            var target = e.sender.target;
            var element = target.classList.contains('e-groupheadercell') ? target :
                parentsUntil(target, 'e-groupheadercell');
            if (!element) {
                return false;
            }
            _this.column = gObj.getColumnByField(element.firstElementChild.getAttribute('ej-mappingname'));
            _this.visualElement.textContent = element.textContent;
            _this.visualElement.style.width = element.offsetWidth + 2 + 'px';
            _this.visualElement.style.height = element.offsetHeight + 2 + 'px';
            _this.visualElement.setAttribute('e-mappinguid', _this.column.uid);
            gObj.element.appendChild(_this.visualElement);
            return _this.visualElement;
        };
        this.dragStart = function () {
            _this.parent.element.classList.add('e-ungroupdrag');
        };
        this.drag = function (e) {
            var target = e.target;
            var cloneElement = _this.parent.element.querySelector('.e-cloneproperties');
            _this.parent.trigger(columnDrag, { target: target, draggableType: 'headercell', column: _this.column });
            classList(cloneElement, ['e-defaultcur'], ['e-notallowedcur']);
            if (!(parentsUntil(target, 'e-gridcontent') || parentsUntil(target, 'e-headercell'))) {
                classList(cloneElement, ['e-notallowedcur'], ['e-defaultcur']);
            }
        };
        this.dragStop = function (e) {
            _this.parent.element.classList.remove('e-ungroupdrag');
            if (!(parentsUntil(e.target, 'e-gridcontent') || parentsUntil(e.target, 'e-gridheader'))) {
                remove(e.helper);
                return;
            }
        };
        this.drop = function (e) {
            var gObj = _this.parent;
            var column = gObj.getColumnByUid(e.droppedElement.getAttribute('e-mappinguid'));
            _this.element.classList.remove('e-hover');
            remove(e.droppedElement);
            _this.aria.setDropTarget(_this.parent.element.querySelector('.e-groupdroparea'), false);
            _this.aria.setGrabbed(_this.parent.getHeaderTable().querySelector('[aria-grabbed=true]'), false);
            if (isNullOrUndefined(column) || column.allowGrouping === false ||
                parentsUntil(gObj.getColumnHeaderByUid(column.uid), 'e-grid').getAttribute('id') !==
                    gObj.element.getAttribute('id')) {
                return;
            }
            _this.groupColumn(column.field);
        };
        this.contentRefresh = true;
        this.aria = new AriaService();
        this.parent = parent;
        this.groupSettings = groupSettings;
        this.serviceLocator = serviceLocator;
        this.sortedColumns = sortedColumns;
        this.focus = serviceLocator.getService('focus');
        this.addEventListener();
    }
    Group.prototype.columnDrag = function (e) {
        var gObj = this.parent;
        var cloneElement = this.parent.element.querySelector('.e-cloneproperties');
        classList(cloneElement, ['e-defaultcur'], ['e-notallowedcur']);
        if (!parentsUntil(e.target, 'e-groupdroparea') &&
            !(this.parent.allowReordering && parentsUntil(e.target, 'e-headercell'))) {
            classList(cloneElement, ['e-notallowedcur'], ['e-defaultcur']);
        }
        e.target.classList.contains('e-groupdroparea') ? this.element.classList.add('e-hover') : this.element.classList.remove('e-hover');
    };
    Group.prototype.columnDragStart = function (e) {
        if (e.target.classList.contains('e-stackedheadercell')) {
            return;
        }
        var gObj = this.parent;
        var dropArea = this.parent.element.querySelector('.e-groupdroparea');
        this.aria.setDropTarget(dropArea, e.column.allowGrouping);
        var element = e.target.classList.contains('e-headercell') ? e.target : parentsUntil(e.target, 'e-headercell');
        this.aria.setGrabbed(element, true, !e.column.allowGrouping);
    };
    Group.prototype.columnDrop = function (e) {
        var gObj = this.parent;
        if (e.droppedElement.getAttribute('action') === 'grouping') {
            var column = gObj.getColumnByUid(e.droppedElement.getAttribute('e-mappinguid'));
            if (isNullOrUndefined(column) || column.allowGrouping === false ||
                parentsUntil(gObj.getColumnHeaderByUid(column.uid), 'e-grid').getAttribute('id') !==
                    gObj.element.getAttribute('id')) {
                return;
            }
            this.ungroupColumn(column.field);
        }
    };
    /**
     * @hidden
     */
    Group.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(uiUpdate, this.enableAfterRender, this);
        this.parent.on(groupComplete, this.onActionComplete, this);
        this.parent.on(ungroupComplete, this.onActionComplete, this);
        this.parent.on(inBoundModelChanged, this.onPropertyChanged, this);
        this.parent.on(click, this.clickHandler, this);
        this.parent.on(columnDrag, this.columnDrag, this);
        this.parent.on(columnDragStart, this.columnDragStart, this);
        this.parent.on(columnDrop, this.columnDrop, this);
        this.parent.on(headerRefreshed, this.refreshSortIcons, this);
        this.parent.on(sortComplete, this.refreshSortIcons, this);
        this.parent.on(keyPressed, this.keyPressHandler, this);
        this.parent.on(contentReady, this.initialEnd, this);
        this.parent.on(initialEnd, this.render, this);
    };
    /**
     * @hidden
     */
    Group.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(initialEnd, this.render);
        this.parent.off(uiUpdate, this.enableAfterRender);
        this.parent.off(groupComplete, this.onActionComplete);
        this.parent.off(ungroupComplete, this.onActionComplete);
        this.parent.off(inBoundModelChanged, this.onPropertyChanged);
        this.parent.off(click, this.clickHandler);
        this.parent.off(columnDrag, this.columnDrag);
        this.parent.off(columnDragStart, this.columnDragStart);
        this.parent.off(columnDrop, this.columnDrop);
        this.parent.off(headerRefreshed, this.refreshSortIcons);
        this.parent.off(sortComplete, this.refreshSortIcons);
        this.parent.off(keyPressed, this.keyPressHandler);
    };
    Group.prototype.initialEnd = function () {
        var gObj = this.parent;
        this.parent.off(contentReady, this.initialEnd);
        if (this.parent.getColumns().length && this.groupSettings.columns.length) {
            this.contentRefresh = false;
            for (var _i = 0, _a = gObj.groupSettings.columns; _i < _a.length; _i++) {
                var col = _a[_i];
                this.groupColumn(col);
            }
            this.contentRefresh = true;
        }
    };
    Group.prototype.keyPressHandler = function (e) {
        var gObj = this.parent;
        if (!this.groupSettings.columns.length) {
            return;
        }
        e.preventDefault();
        switch (e.action) {
            case 'altDownArrow':
            case 'altUpArrow':
                var selected = gObj.allowSelection ? gObj.getSelectedRowIndexes() : [];
                if (selected.length) {
                    var rows = gObj.getContentTable().querySelector('tbody').children;
                    var dataRow = gObj.getDataRows()[selected[selected.length - 1]];
                    var grpRow = void 0;
                    for (var i = dataRow.rowIndex; i >= 0; i--) {
                        if (!rows[i].classList.contains('e-row') && !rows[i].classList.contains('e-detailrow')) {
                            grpRow = rows[i];
                            break;
                        }
                    }
                    this.expandCollapseRows(grpRow.querySelector(e.action === 'altUpArrow' ?
                        '.e-recordplusexpand' : '.e-recordpluscollapse'));
                }
                break;
            case 'ctrlDownArrow':
                this.expandAll();
                break;
            case 'ctrlUpArrow':
                this.collapseAll();
                break;
            case 'enter':
                if (this.parent.isEdit) {
                    return;
                }
                var element = this.focus.getFocusedElement();
                var row = element.parentElement.querySelector('[class^="e-record"]');
                if (!row) {
                    break;
                }
                this.expandCollapseRows(row);
                break;
        }
    };
    Group.prototype.clickHandler = function (e) {
        this.expandCollapseRows(e.target);
        this.applySortFromTarget(e.target);
        this.unGroupFromTarget(e.target);
        this.toogleGroupFromHeader(e.target);
    };
    Group.prototype.unGroupFromTarget = function (target) {
        if (target.classList.contains('e-ungroupbutton')) {
            this.ungroupColumn(target.parentElement.getAttribute('ej-mappingname'));
        }
    };
    Group.prototype.toogleGroupFromHeader = function (target) {
        if (this.groupSettings.showToggleButton) {
            if (target.classList.contains('e-grptogglebtn')) {
                if (target.classList.contains('e-toggleungroup')) {
                    this.ungroupColumn(this.parent.getColumnByUid(target.parentElement.getAttribute('e-mappinguid')).field);
                }
                else {
                    this.groupColumn(this.parent.getColumnByUid(target.parentElement.getAttribute('e-mappinguid')).field);
                }
            }
            else {
                if (target.classList.contains('e-toggleungroup')) {
                    this.ungroupColumn(target.parentElement.getAttribute('ej-mappingname'));
                }
            }
        }
    };
    Group.prototype.applySortFromTarget = function (target) {
        var gObj = this.parent;
        var gHeader = closest(target, '.e-groupheadercell');
        if (gObj.allowSorting && gHeader && !target.classList.contains('e-ungroupbutton') &&
            !target.classList.contains('e-toggleungroup')) {
            var field = gHeader.firstElementChild.getAttribute('ej-mappingname');
            if (gObj.getColumnHeaderByField(field).querySelectorAll('.e-ascending').length) {
                gObj.sortColumn(field, 'descending', true);
            }
            else {
                gObj.sortColumn(field, 'ascending', true);
            }
        }
    };
    /**
     * Expand or collapse grouped rows by target element.
     * @param  {Element} target - Defines the target element of grouped row.
     * @return {void}
     */
    Group.prototype.expandCollapseRows = function (target) {
        var trgt = parentsUntil(target, 'e-recordplusexpand') ||
            parentsUntil(target, 'e-recordpluscollapse');
        if (trgt) {
            var cellIdx = trgt.cellIndex;
            var rowIdx = trgt.parentElement.rowIndex;
            var rowNodes = this.parent.getContentTable().querySelector('tbody').children;
            var rows = [].slice.call(rowNodes).slice(rowIdx + 1, rowNodes.length);
            var isHide = void 0;
            var expandElem = void 0;
            var toExpand = [];
            var indent = trgt.parentElement.querySelectorAll('.e-indentcell').length;
            var expand = false;
            if (trgt.classList.contains('e-recordpluscollapse')) {
                addClass([trgt], 'e-recordplusexpand');
                removeClass([trgt], 'e-recordpluscollapse');
                trgt.firstElementChild.className = 'e-icons e-gdiagonaldown e-icon-gdownarrow';
                expand = true;
            }
            else {
                isHide = true;
                removeClass([trgt], 'e-recordplusexpand');
                addClass([trgt], 'e-recordpluscollapse');
                trgt.firstElementChild.className = 'e-icons e-gnextforward e-icon-grightarrow';
            }
            this.aria.setExpand(trgt, expand);
            for (var i = 0, len = rows.length; i < len; i++) {
                if (rows[i].querySelectorAll('td')[cellIdx] &&
                    rows[i].querySelectorAll('td')[cellIdx].classList.contains('e-indentcell') && rows) {
                    if (isHide) {
                        rows[i].style.display = 'none';
                    }
                    else {
                        if (rows[i].querySelectorAll('.e-indentcell').length === indent + 1) {
                            rows[i].style.display = '';
                            expandElem = rows[i].querySelector('.e-recordplusexpand');
                            if (expandElem) {
                                toExpand.push(expandElem);
                            }
                            if (rows[i].classList.contains('e-detailrow')) {
                                if (rows[i - 1].querySelectorAll('.e-detailrowcollapse').length) {
                                    rows[i].style.display = 'none';
                                }
                            }
                        }
                    }
                }
                else {
                    break;
                }
            }
            for (var i = 0, len = toExpand.length; i < len; i++) {
                removeClass([toExpand[i]], 'e-recordplusexpand');
                addClass([toExpand[i]], 'e-recordpluscollapse');
                toExpand[i].firstElementChild.className = 'e-icons e-gnextforward e-icon-grightarrow';
                this.expandCollapseRows(toExpand[i]);
            }
        }
    };
    Group.prototype.expandCollapse = function (isExpand) {
        var rowNodes = this.parent.getContentTable().querySelector('tbody').children;
        var row;
        for (var i = 0, len = rowNodes.length; i < len; i++) {
            if (rowNodes[i].querySelectorAll('.e-recordplusexpand, .e-recordpluscollapse').length) {
                row = rowNodes[i].querySelector(isExpand ? '.e-recordpluscollapse' : '.e-recordplusexpand');
                if (row) {
                    row.className = isExpand ? 'e-recordplusexpand' : 'e-recordpluscollapse';
                    row.firstElementChild.className = isExpand ? 'e-icons e-gdiagonaldown e-icon-gdownarrow' :
                        'e-icons e-gnextforward e-icon-grightarrow';
                }
                if (!(rowNodes[i].firstElementChild.classList.contains('e-recordplusexpand') ||
                    rowNodes[i].firstElementChild.classList.contains('e-recordpluscollapse'))) {
                    rowNodes[i].style.display = isExpand ? '' : 'none';
                }
            }
            else {
                rowNodes[i].style.display = isExpand ? '' : 'none';
            }
        }
    };
    /**
     * Expands all the grouped rows of Grid.
     * @return {void}
     */
    Group.prototype.expandAll = function () {
        this.expandCollapse(true);
    };
    /**
     * Collapses all the grouped rows of Grid.
     * @return {void}
     */
    Group.prototype.collapseAll = function () {
        this.expandCollapse(false);
    };
    /**
     * The function is used to render grouping
     * @return {Element}
     * @hidden
     */
    Group.prototype.render = function () {
        this.l10n = this.serviceLocator.getService('localization');
        this.renderGroupDropArea();
        this.initDragAndDrop();
        this.refreshToggleBtn();
    };
    Group.prototype.renderGroupDropArea = function () {
        var groupElem = this.parent.element.querySelector('.e-groupdroparea');
        if (groupElem) {
            remove(groupElem);
        }
        this.element = createElement('div', { className: 'e-groupdroparea', attrs: { 'tabindex': '-1' } });
        this.updateGroupDropArea();
        this.parent.element.insertBefore(this.element, this.parent.element.firstChild);
        if (!this.groupSettings.showDropArea) {
            this.element.style.display = 'none';
        }
    };
    Group.prototype.updateGroupDropArea = function () {
        if (this.groupSettings.showDropArea && !this.groupSettings.columns.length) {
            var dragLabel = this.l10n.getConstant('GroupDropArea');
            this.element.innerHTML = dragLabel;
            this.element.classList.remove('e-grouped');
        }
        else {
            if (this.element.innerHTML === this.l10n.getConstant('GroupDropArea') && this.groupSettings.columns.length === 1) {
                this.element.innerHTML = '';
            }
            this.element.classList.add('e-grouped');
        }
    };
    Group.prototype.initDragAndDrop = function () {
        this.initializeGHeaderDrop();
        this.initializeGHeaderDrag();
    };
    Group.prototype.initializeGHeaderDrag = function () {
        var drag = new Draggable(this.element, {
            dragTarget: '.e-groupheadercell',
            distance: 5,
            helper: this.helper,
            dragStart: this.dragStart,
            drag: this.drag,
            dragStop: this.dragStop
        });
    };
    Group.prototype.initializeGHeaderDrop = function () {
        var gObj = this.parent;
        var drop = new Droppable(this.element, {
            accept: '.e-dragclone',
            drop: this.drop
        });
    };
    /**
     * Groups a column by column name.
     * @param  {string} columnName - Defines the column name to group.
     * @return {void}
     */
    Group.prototype.groupColumn = function (columnName) {
        var gObj = this.parent;
        var column = gObj.getColumnByField(columnName);
        if (isNullOrUndefined(column) || column.allowGrouping === false ||
            (this.contentRefresh && this.groupSettings.columns.indexOf(columnName) > -1)) {
            return;
        }
        if (isActionPrevent(gObj)) {
            gObj.notify(preventBatch, { instance: this, handler: this.groupColumn, arg1: columnName });
            return;
        }
        column.visible = gObj.groupSettings.showGroupedColumn;
        this.colName = columnName;
        if (this.contentRefresh) {
            this.updateModel();
        }
        else {
            this.addColToGroupDrop(columnName);
        }
        this.updateGroupDropArea();
    };
    /**
     * Ungroups a column by column name.
     * @param  {string} columnName - Defines the column name to ungroup.
     * @return {void}
     */
    Group.prototype.ungroupColumn = function (columnName) {
        var gObj = this.parent;
        var column = this.parent.enableColumnVirtualization ?
            this.parent.columns.filter(function (c) { return c.field === columnName; })[0] : gObj.getColumnByField(columnName);
        if (isNullOrUndefined(column) || column.allowGrouping === false || this.groupSettings.columns.indexOf(columnName) < 0) {
            return;
        }
        if (isActionPrevent(gObj)) {
            gObj.notify(preventBatch, { instance: this, handler: this.ungroupColumn, arg1: columnName });
            return;
        }
        column.visible = true;
        this.colName = column.field;
        var columns = JSON.parse(JSON.stringify(this.groupSettings.columns));
        columns.splice(columns.indexOf(this.colName), 1);
        if (this.sortedColumns.indexOf(columnName) < 0) {
            for (var i = 0, len = gObj.sortSettings.columns.length; i < len; i++) {
                if (columnName === gObj.sortSettings.columns[i].field) {
                    gObj.sortSettings.columns.splice(i, 1);
                    break;
                }
            }
        }
        this.groupSettings.columns = columns;
        if (gObj.allowGrouping) {
            this.parent.dataBind();
        }
    };
    /**
     * The function used to update groupSettings
     * @return {void}
     * @hidden
     */
    Group.prototype.updateModel = function () {
        var gObj = this.parent;
        var i = 0;
        var columns = JSON.parse(JSON.stringify(this.groupSettings.columns));
        columns.push(this.colName);
        this.groupSettings.columns = columns;
        while (i < gObj.sortSettings.columns.length) {
            if (gObj.sortSettings.columns[i].field === this.colName) {
                break;
            }
            i++;
        }
        if (gObj.sortSettings.columns.length === i) {
            gObj.sortSettings.columns.push({ field: this.colName, direction: 'ascending' });
        }
        else if (!gObj.allowSorting) {
            gObj.sortSettings.columns[i].direction = 'ascending';
        }
        this.parent.dataBind();
    };
    /**
     * The function used to trigger onActionComplete
     * @return {void}
     * @hidden
     */
    Group.prototype.onActionComplete = function (e) {
        var gObj = this.parent;
        if (e.requestType === 'grouping') {
            this.addColToGroupDrop(this.colName);
        }
        else {
            this.removeColFromGroupDrop(this.colName);
        }
        var args = this.groupSettings.columns.indexOf(this.colName) > -1 ? {
            columnName: this.colName, requestType: 'grouping', type: actionComplete
        } : { requestType: 'ungrouping', type: actionComplete };
        this.parent.trigger(actionComplete, extend(e, args));
    };
    Group.prototype.addColToGroupDrop = function (field) {
        var gObj = this.parent;
        var direction = 'ascending';
        var groupedColumn = createElement('div', { className: 'e-grid-icon e-groupheadercell' });
        var childDiv = createElement('div', { attrs: { 'ej-mappingname': field } });
        var column = this.parent.getColumnByField(field);
        //Todo headerTemplateID for grouped column, disableHtmlEncode                          
        var headerCell = gObj.getColumnHeaderByUid(column.uid);
        if (!isNullOrUndefined(column.headerTemplate)) {
            if (column.headerTemplate.indexOf('#') !== -1) {
                childDiv.innerHTML = document.querySelector(column.headerTemplate).innerHTML.trim();
            }
            else {
                childDiv.innerHTML = column.headerTemplate;
            }
            childDiv.firstElementChild.classList.add('e-grouptext');
        }
        else {
            childDiv.appendChild(createElement('span', {
                className: 'e-grouptext', innerHTML: column.headerText,
                attrs: { tabindex: '-1', 'aria-label': 'sort the grouped column' }
            }));
        }
        if (this.groupSettings.showToggleButton) {
            childDiv.appendChild(createElement('span', {
                className: 'e-togglegroupbutton e-icons e-icon-ungroup e-toggleungroup', innerHTML: '&nbsp;',
                attrs: { tabindex: '-1', 'aria-label': 'ungroup button' }
            }));
        }
        if (headerCell.querySelectorAll('.e-ascending,.e-descending').length) {
            direction = headerCell.querySelector('.e-ascending') ? 'ascending' : 'descending';
        }
        childDiv.appendChild(createElement('span', {
            className: 'e-groupsort e-icons ' + ('e-' + direction + ' e-icon-' + direction), innerHTML: '&nbsp;',
            attrs: { tabindex: '-1', 'aria-label': 'sort the grouped column' }
        }));
        childDiv.appendChild(createElement('span', {
            className: 'e-ungroupbutton e-icons e-icon-hide', innerHTML: '&nbsp;',
            attrs: { title: this.l10n.getConstant('UnGroup'), tabindex: '-1', 'aria-label': 'ungroup the grouped column' },
            styles: this.groupSettings.showUngroupButton ? '' : 'display:none'
        }));
        groupedColumn.appendChild(childDiv);
        this.element.appendChild(groupedColumn);
        //Todo:  rtl 
    };
    Group.prototype.refreshToggleBtn = function (isRemove) {
        if (this.groupSettings.showToggleButton) {
            var headers = [].slice.call(this.parent.element.getElementsByClassName('e-headercelldiv'));
            for (var i = 0, len = headers.length; i < len; i++) {
                if (!(headers[i].classList.contains('e-emptycell'))) {
                    var column = this.parent.getColumnByUid(headers[i].getAttribute('e-mappinguid'));
                    if (!this.parent.showColumnMenu || (this.parent.showColumnMenu && !column.showColumnMenu)) {
                        if (headers[i].querySelectorAll('.e-grptogglebtn').length) {
                            remove(headers[i].querySelectorAll('.e-grptogglebtn')[0]);
                        }
                        if (!isRemove) {
                            headers[i].appendChild(createElement('span', {
                                className: 'e-grptogglebtn e-icons ' +
                                    (this.groupSettings.columns.indexOf(column.field) > -1 ? 'e-toggleungroup e-icon-ungroup'
                                        : 'e-togglegroup e-icon-group'), attrs: { tabindex: '-1', 'aria-label': 'Group button' }
                            }));
                        }
                    }
                }
            }
        }
    };
    Group.prototype.removeColFromGroupDrop = function (field) {
        remove(this.getGHeaderCell(field));
        this.updateGroupDropArea();
    };
    Group.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        for (var _i = 0, _a = Object.keys(e.properties); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'columns':
                    if (this.contentRefresh) {
                        var args = this.groupSettings.columns.indexOf(this.colName) > -1 ? {
                            columnName: this.colName, requestType: 'grouping', type: actionBegin
                        } : { requestType: 'ungrouping', type: actionBegin };
                        this.parent.notify(modelChanged, args);
                    }
                    break;
                case 'showDropArea':
                    this.updateGroupDropArea();
                    this.groupSettings.showDropArea ? this.element.style.display = '' : this.element.style.display = 'none';
                    break;
                case 'showGroupedColumn':
                    this.updateGroupedColumn(this.groupSettings.showGroupedColumn);
                    this.parent.notify(modelChanged, { requestType: 'refresh' });
                    break;
                case 'showUngroupButton':
                    this.updateButtonVisibility(this.groupSettings.showUngroupButton, 'e-ungroupbutton');
                    break;
                case 'showToggleButton':
                    this.updateButtonVisibility(this.groupSettings.showToggleButton, 'e-togglegroupbutton ');
                    this.parent.refreshHeader();
                    break;
            }
        }
    };
    Group.prototype.updateGroupedColumn = function (isVisible) {
        for (var i = 0; i < this.groupSettings.columns.length; i++) {
            this.parent.getColumnByField(this.groupSettings.columns[i]).visible = isVisible;
        }
    };
    Group.prototype.updateButtonVisibility = function (isVisible, className) {
        var gHeader = [].slice.call(this.element.querySelectorAll('.' + className));
        for (var i = 0; i < gHeader.length; i++) {
            gHeader[i].style.display = isVisible ? '' : 'none';
        }
    };
    Group.prototype.enableAfterRender = function (e) {
        if (e.module === this.getModuleName() && e.enable) {
            this.render();
        }
    };
    /**
     * To destroy the reorder
     * @return {void}
     * @hidden
     */
    Group.prototype.destroy = function () {
        this.clearGrouping();
        this.removeEventListener();
        this.refreshToggleBtn(true);
        remove(this.element);
        //call ejdrag and drop destroy
    };
    /**
     * Clears all the grouped columns of Grid.
     * @return {void}
     */
    Group.prototype.clearGrouping = function () {
        var cols = JSON.parse(JSON.stringify(this.groupSettings.columns));
        this.contentRefresh = false;
        for (var i = 0, len = cols.length; i < len; i++) {
            this.ungroupColumn(cols[i]);
        }
        this.contentRefresh = true;
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Group.prototype.getModuleName = function () {
        return 'group';
    };
    Group.prototype.refreshSortIcons = function (e) {
        var gObj = this.parent;
        var header;
        var cols = gObj.sortSettings.columns;
        var gCols = gObj.groupSettings.columns;
        var fieldNames = this.parent.getColumns().map(function (c) { return c.field; });
        this.refreshToggleBtn();
        for (var i = 0, len = cols.length; i < len; i++) {
            if (fieldNames.indexOf(cols[i].field) === -1) {
                continue;
            }
            header = gObj.getColumnHeaderByField(cols[i].field);
            if (!gObj.allowSorting && (this.sortedColumns.indexOf(cols[i].field) > -1 ||
                this.groupSettings.columns.indexOf(cols[i].field) > -1)) {
                classList(header.querySelector('.e-sortfilterdiv'), ['e-ascending', 'e-icon-ascending'], []);
                if (cols.length > 1) {
                    header.querySelector('.e-headercelldiv').appendChild(createElement('span', { className: 'e-sortnumber', innerHTML: (i + 1).toString() }));
                }
            }
            else if (this.getGHeaderCell(cols[i].field) && this.getGHeaderCell(cols[i].field).querySelectorAll('.e-groupsort').length) {
                if (cols[i].direction === 'ascending') {
                    classList(this.getGHeaderCell(cols[i].field).querySelector('.e-groupsort'), ['e-ascending', 'e-icon-ascending'], ['e-descending', 'e-icon-descending']);
                }
                else {
                    classList(this.getGHeaderCell(cols[i].field).querySelector('.e-groupsort'), ['e-descending', 'e-icon-descending'], ['e-ascending', 'e-icon-ascending']);
                }
            }
        }
        for (var i = 0, len = gCols.length; i < len; i++) {
            if (fieldNames.indexOf(gCols[i]) === -1) {
                continue;
            }
            gObj.getColumnHeaderByField(gCols[i]).setAttribute('aria-grouped', 'true');
        }
    };
    Group.prototype.getGHeaderCell = function (field) {
        if (this.element && this.element.querySelector('[ej-mappingname=' + field + ']')) {
            return this.element.querySelector('[ej-mappingname=' + field + ']').parentElement;
        }
        return null;
    };
    return Group;
}());

/**
 * `DetailRow` module is used to handle Detail Template and Hierarchy Grid operations.
 */
var DetailRow = /** @class */ (function () {
    /**
     * Constructor for the Grid detail template module
     * @hidden
     */
    function DetailRow(parent, locator) {
        //Internal variables
        this.aria = new AriaService();
        this.parent = parent;
        if (this.parent.isDestroyed) {
            return;
        }
        this.focus = locator.getService('focus');
        this.parent.on(click, this.clickHandler, this);
        this.parent.on(destroy, this.destroy, this);
        this.parent.on(keyPressed, this.keyPressHandler, this);
    }
    DetailRow.prototype.clickHandler = function (e) {
        this.toogleExpandcollapse(closest(e.target, 'td'));
    };
    DetailRow.prototype.toogleExpandcollapse = function (target) {
        var gObj = this.parent;
        var parent = 'parentDetails';
        if (target && (target.classList.contains('e-detailrowcollapse') || target.classList.contains('e-detailrowexpand'))) {
            var tr = target.parentElement;
            var uid_1 = tr.getAttribute('data-uid');
            var nextRow = this.parent.getContentTable().querySelector('tbody').children[tr.rowIndex + 1];
            if (target.classList.contains('e-detailrowcollapse')) {
                var key = 'records';
                var currentViewData = gObj.allowGrouping && gObj.groupSettings.columns.length ?
                    gObj.currentViewData[key] : gObj.currentViewData;
                var data = currentViewData[tr.getAttribute('aria-rowindex')];
                if (this.isDetailRow(nextRow)) {
                    nextRow.style.display = '';
                }
                else if (gObj.getDetailTemplate() || gObj.childGrid) {
                    var detailRow = createElement('tr', { className: 'e-detailrow' });
                    var detailCell = createElement('td', { className: 'e-detailcell' });
                    detailCell.setAttribute('colspan', this.parent.getVisibleColumns().length.toString());
                    var row = new Row({
                        isDataRow: true,
                        cells: [new Cell({ cellType: CellType.Indent }), new Cell({ isDataCell: true, visible: true })]
                    });
                    for (var i = 0, len = gObj.groupSettings.columns.length; i < len; i++) {
                        detailRow.appendChild(createElement('td', { className: 'e-indentcell' }));
                        row.cells.unshift(new Cell({ cellType: CellType.Indent }));
                    }
                    detailRow.appendChild(createElement('td', { className: 'e-detailindentcell' }));
                    detailRow.appendChild(detailCell);
                    tr.parentNode.insertBefore(detailRow, tr.nextSibling);
                    if (gObj.detailTemplate) {
                        appendChildren(detailCell, gObj.getDetailTemplate()(data, gObj, 'detailTemplate'));
                    }
                    else {
                        gObj.childGrid[parent] = {
                            parentID: gObj.element.id,
                            parentPrimaryKeys: gObj.getPrimaryKeyFieldNames(),
                            parentKeyField: gObj.childGrid.queryString,
                            parentKeyFieldValue: data[gObj.childGrid.queryString],
                            parentRowData: data
                        };
                        var grid = new Grid(gObj.childGrid);
                        var modules = grid.getInjectedModules();
                        var injectedModues = gObj.getInjectedModules();
                        if (!modules || modules.length !== injectedModues.length) {
                            grid.setInjectedModules(injectedModues);
                        }
                        var gridElem = createElement('div', {
                            id: 'child' + parents(tr, 'e-grid').length +
                                '_grid' + tr.rowIndex + getUid('')
                        });
                        detailCell.appendChild(gridElem);
                        grid.appendTo(gridElem);
                    }
                    detailRow.appendChild(detailCell);
                    tr.parentNode.insertBefore(detailRow, tr.nextSibling);
                    var idx_1;
                    this.parent.getRowsObject().some(function (r, rIndex) { idx_1 = rIndex; return r.uid === uid_1; });
                    gObj.getRows().splice(tr.rowIndex + 1, 0, detailRow);
                    this.parent.getRowsObject().splice(idx_1 + 1, 0, row);
                    gObj.trigger(detailDataBound, { detailElement: detailCell, data: data });
                    gObj.notify(detailDataBound, { rows: this.parent.getRowsObject() });
                }
                classList(target, ['e-detailrowexpand'], ['e-detailrowcollapse']);
                classList(target.firstElementChild, ['e-dtdiagonaldown', 'e-icon-gdownarrow'], ['e-dtdiagonalright', 'e-icon-grightarrow']);
                this.aria.setExpand(target, true);
            }
            else {
                if (this.isDetailRow(nextRow)) {
                    nextRow.style.display = 'none';
                }
                classList(target, ['e-detailrowcollapse'], ['e-detailrowexpand']);
                classList(target.firstElementChild, ['e-dtdiagonalright', 'e-icon-grightarrow'], ['e-dtdiagonaldown', 'e-icon-gdownarrow']);
                this.aria.setExpand(target, false);
            }
        }
    };
    DetailRow.prototype.isDetailRow = function (row) {
        return row && row.classList.contains('e-detailrow');
    };
    DetailRow.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(click, this.clickHandler);
        this.parent.off(destroy, this.destroy);
        this.parent.off(keyPressed, this.keyPressHandler);
    };
    DetailRow.prototype.getTDfromIndex = function (index, className) {
        var tr = this.parent.getDataRows()[index];
        if (tr && tr.querySelector(className)) {
            return tr.querySelector(className);
        }
        return null;
    };
    /**
     * Expands a detail row with the given target.
     * @param  {Element} target - Defines the collapsed element to expand.
     * @return {void}
     */
    DetailRow.prototype.expand = function (target) {
        if (!isNaN(target)) {
            target = this.getTDfromIndex(target, '.e-detailrowcollapse');
        }
        if (target && target.classList.contains('e-detailrowcollapse')) {
            this.toogleExpandcollapse(target);
        }
    };
    /**
     * Collapses a detail row with the given target.
     * @param  {Element} target - Defines the expanded element to collapse.
     * @return {void}
     */
    DetailRow.prototype.collapse = function (target) {
        if (!isNaN(target)) {
            target = this.getTDfromIndex(target, '.e-detailrowexpand');
        }
        if (target && target.classList.contains('e-detailrowexpand')) {
            this.toogleExpandcollapse(target);
        }
    };
    /**
     * Expands all the detail rows of Grid.
     * @return {void}
     */
    DetailRow.prototype.expandAll = function () {
        this.expandCollapse(true);
    };
    /**
     * Collapses all the detail rows of Grid.
     * @return {void}
     */
    DetailRow.prototype.collapseAll = function () {
        this.expandCollapse(false);
    };
    DetailRow.prototype.expandCollapse = function (isExpand) {
        var td;
        var rows = this.parent.getDataRows();
        for (var i = 0, len = rows.length; i < len; i++) {
            td = rows[i].querySelector('.e-detailrowcollapse, .e-detailrowexpand');
            isExpand ? this.expand(td) : this.collapse(td);
        }
    };
    DetailRow.prototype.keyPressHandler = function (e) {
        var gObj = this.parent;
        switch (e.action) {
            case 'ctrlDownArrow':
                this.expandAll();
                break;
            case 'ctrlUpArrow':
                this.collapseAll();
                break;
            case 'altUpArrow':
            case 'altDownArrow':
                var selected = gObj.allowSelection ? gObj.getSelectedRowIndexes() : [];
                if (selected.length) {
                    var dataRow = gObj.getDataRows()[selected[selected.length - 1]];
                    var td = dataRow.querySelector('.e-detailrowcollapse, .e-detailrowexpand');
                    e.action === 'altDownArrow' ? this.expand(td) : this.collapse(td);
                }
                break;
            case 'enter':
                if (this.parent.isEdit) {
                    return;
                }
                var element = this.focus.getFocusedElement();
                if (!element.classList.contains('e-detailrowcollapse') && !element.classList.contains('e-detailrowexpand')) {
                    break;
                }
                this.toogleExpandcollapse(element);
                break;
        }
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    DetailRow.prototype.getModuleName = function () {
        return 'detailRow';
    };
    return DetailRow;
}());

/**
 * `Toolbar` module used to handle toolbar actions.
 * @hidden
 */
var Toolbar$1 = /** @class */ (function () {
    function Toolbar$$1(parent, serviceLocator) {
        this.predefinedItems = {};
        this.items = ['add', 'edit', 'update', 'delete', 'cancel', 'print', 'search',
            'columnchooser', 'pdfexport', 'excelexport', 'csvexport', 'wordexport'];
        this.parent = parent;
        this.gridID = parent.element.id;
        this.serviceLocator = serviceLocator;
        this.addEventListener();
    }
    Toolbar$$1.prototype.render = function () {
        this.l10n = this.serviceLocator.getService('localization');
        var preItems = ['add', 'edit', 'update', 'delete', 'cancel', 'print',
            'pdfexport', 'excelexport', 'wordexport', 'csvexport'];
        for (var _i = 0, preItems_1 = preItems; _i < preItems_1.length; _i++) {
            var item = preItems_1[_i];
            var localeName = item[0].toUpperCase() + item.slice(1);
            this.predefinedItems[item] = {
                id: this.gridID + '_' + item, prefixIcon: 'e-' + item,
                text: this.l10n.getConstant(localeName), tooltipText: this.l10n.getConstant(localeName)
            };
        }
        this.predefinedItems.search = {
            id: this.gridID + '_search', template: '<div class="e-search" role="search" >\
                         <span id="' + this.gridID + '_searchbutton" class="e-searchfind e-icons" tabindex="-1"\
                         role="button" aria-label= "search"></span>\
                         <input id="' + this.gridID + '_searchbar" aria-multiline= "false" type="search"\
                         placeholder=' + this.l10n.getConstant('Search') + '>\
                         </input></div>', tooltipText: this.l10n.getConstant('Search'), align: 'right'
        };
        this.predefinedItems.columnchooser = {
            id: this.gridID + '_' + 'columnchooser', cssClass: 'e-cc e-ccdiv e-cc-toolbar', suffixIcon: 'e-' + 'columnchooser-btn',
            text: 'Columns', tooltipText: 'columns', align: 'right',
        };
        this.createToolbar();
    };
    /**
     * Gets the toolbar element of grid.
     * @return {Element}
     * @hidden
     */
    Toolbar$$1.prototype.getToolbar = function () {
        return this.toolbar.element;
    };
    /**
     * To destroy the toolbar widget of the grid.
     * @method destroy
     * @return {void}
     */
    Toolbar$$1.prototype.destroy = function () {
        if (!this.toolbar.isDestroyed) {
            this.unWireEvent();
            this.toolbar.destroy();
            this.removeEventListener();
            remove(this.element);
        }
    };
    Toolbar$$1.prototype.createToolbar = function () {
        var items = this.getItems();
        this.toolbar = new Toolbar({
            items: items,
            clicked: this.toolbarClickHandler.bind(this),
            enablePersistence: this.parent.enablePersistence,
            enableRtl: this.parent.enableRtl
        });
        var viewStr = 'viewContainerRef';
        var registerTemp = 'registeredTemplate';
        if (this.parent[viewStr]) {
            this.toolbar[registerTemp] = {};
            this.toolbar[viewStr] = this.parent[viewStr];
        }
        this.element = createElement('div', { id: this.gridID + '_toolbarItems' });
        if (this.parent.toolbarTemplate) {
            if (typeof (this.parent.toolbarTemplate) === 'string') {
                this.toolbar.appendTo(this.parent.toolbarTemplate);
                this.element = this.toolbar.element;
            }
            else {
                appendChildren(this.element, templateCompiler(this.parent.toolbarTemplate)({}, this.parent, 'toolbarTemplate'));
            }
        }
        else {
            this.toolbar.appendTo(this.element);
        }
        this.parent.element.insertBefore(this.element, this.parent.getHeaderContent());
        this.searchElement = this.element.querySelector('#' + this.gridID + '_searchbar');
        this.wireEvent();
        this.refreshToolbarItems();
        if (this.parent.searchSettings) {
            this.updateSearchBox();
        }
    };
    Toolbar$$1.prototype.refreshToolbarItems = function (args) {
        var gObj = this.parent;
        var enableItems = [];
        var disableItems = [];
        var edit = gObj.editSettings;
        edit.allowAdding ? enableItems.push(this.gridID + '_add') : disableItems.push(this.gridID + '_add');
        edit.allowEditing ? enableItems.push(this.gridID + '_edit') : disableItems.push(this.gridID + '_edit');
        edit.allowDeleting ? enableItems.push(this.gridID + '_delete') : disableItems.push(this.gridID + '_delete');
        if (gObj.editSettings.mode === 'batch') {
            if (gObj.element.querySelectorAll('.e-updatedtd').length && (edit.allowAdding || edit.allowEditing)) {
                enableItems.push(this.gridID + '_update');
                enableItems.push(this.gridID + '_cancel');
            }
            else {
                disableItems.push(this.gridID + '_update');
                disableItems.push(this.gridID + '_cancel');
            }
        }
        else {
            if (gObj.isEdit && (edit.allowAdding || edit.allowEditing)) {
                enableItems = [this.gridID + '_update', this.gridID + '_cancel'];
                disableItems = [this.gridID + '_add', this.gridID + '_edit', this.gridID + '_delete'];
            }
            else {
                disableItems.push(this.gridID + '_update');
                disableItems.push(this.gridID + '_cancel');
            }
        }
        this.enableItems(enableItems, true);
        this.enableItems(disableItems, false);
    };
    Toolbar$$1.prototype.getItems = function () {
        var items = [];
        var toolbarItems = this.parent.toolbar || [];
        if (typeof (this.parent.toolbar) === 'string') {
            return [];
        }
        for (var _i = 0, toolbarItems_1 = toolbarItems; _i < toolbarItems_1.length; _i++) {
            var item = toolbarItems_1[_i];
            switch (typeof item) {
                case 'number':
                    items.push(this.getItemObject(this.items[item]));
                    break;
                case 'string':
                    items.push(this.getItemObject(item));
                    break;
                default:
                    items.push(this.getItem(item));
            }
        }
        return items;
    };
    Toolbar$$1.prototype.getItem = function (itemObject) {
        var item = this.predefinedItems[itemObject.text];
        return item ? extend(item, item, itemObject) : itemObject;
    };
    Toolbar$$1.prototype.getItemObject = function (itemName) {
        return this.predefinedItems[itemName] || { text: itemName, id: this.gridID + '_' + itemName };
    };
    /**
     * Enable or disable toolbar items.
     * @param {string[]} items - Define the collection of itemID of toolbar items.
     * @param {boolean} isEnable - Define the items to be enable or disable.
     * @return {void}
     * @hidden
     */
    Toolbar$$1.prototype.enableItems = function (items, isEnable) {
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var element = this.element.querySelector('#' + item);
            if (element) {
                this.toolbar.enableItems(element.parentElement, isEnable);
            }
        }
    };
    Toolbar$$1.prototype.toolbarClickHandler = function (args) {
        var gObj = this.parent;
        var gID = this.gridID;
        if (!args.item) {
            gObj.trigger(toolbarClick, args);
            return;
        }
        switch (args.item.id) {
            case gID + '_print':
                gObj.print();
                break;
            case gID + '_edit':
                gObj.startEdit();
                break;
            case gID + '_update':
                gObj.endEdit();
                break;
            case gID + '_cancel':
                gObj.closeEdit();
                break;
            case gID + '_add':
                gObj.addRecord();
                break;
            case gID + '_delete':
                gObj.deleteRecord();
                break;
            // case gID + '_pdfexport':
            //     break;
            // case gID + '_wordexport':
            //     break;
            // case gID + '_excelexport':
            //     break;
            // case gID + '_csvexport':
            //     break;
            case gID + '_search':
                if (args.originalEvent.target.id === gID + '_searchbutton') {
                    this.search();
                }
                break;
            case gID + '_columnchooser':
                var tarElement = this.parent.element.querySelector('.e-ccdiv');
                var y = tarElement.getBoundingClientRect().top;
                var x = tarElement.getBoundingClientRect().left;
                var targetEle = args.originalEvent.target;
                y = tarElement.getBoundingClientRect().top + tarElement.offsetTop;
                gObj.createColumnchooser(x, y, targetEle);
                break;
            default:
                gObj.trigger(toolbarClick, args);
        }
    };
    Toolbar$$1.prototype.modelChanged = function (e) {
        if (e.module === 'edit') {
            this.refreshToolbarItems();
        }
    };
    Toolbar$$1.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName() || !this.parent.toolbar) {
            return;
        }
        if (this.element) {
            remove(this.element);
        }
        this.render();
    };
    Toolbar$$1.prototype.keyUpHandler = function (e) {
        if (e.keyCode === 13) {
            this.search();
        }
    };
    Toolbar$$1.prototype.search = function () {
        this.parent.search(this.searchElement.value);
    };
    Toolbar$$1.prototype.updateSearchBox = function () {
        if (this.searchElement) {
            this.searchElement.value = this.parent.searchSettings.key;
        }
    };
    Toolbar$$1.prototype.wireEvent = function () {
        if (this.searchElement) {
            EventHandler.add(this.searchElement, 'keyup', this.keyUpHandler, this);
        }
    };
    Toolbar$$1.prototype.unWireEvent = function () {
        if (this.searchElement) {
            EventHandler.remove(this.searchElement, 'keyup', this.keyUpHandler);
        }
    };
    Toolbar$$1.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(initialEnd, this.render, this);
        this.parent.on(uiUpdate, this.onPropertyChanged, this);
        this.parent.on(inBoundModelChanged, this.updateSearchBox.bind(this));
        this.parent.on(modelChanged, this.refreshToolbarItems, this);
        this.parent.on(toolbarRefresh, this.refreshToolbarItems, this);
        this.parent.on(inBoundModelChanged, this.modelChanged, this);
        this.parent.on(dataBound, this.refreshToolbarItems, this);
    };
    Toolbar$$1.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(initialEnd, this.render);
        this.parent.off(uiUpdate, this.onPropertyChanged);
        this.parent.off(inBoundModelChanged, this.updateSearchBox);
        this.parent.off(modelChanged, this.refreshToolbarItems);
        this.parent.off(toolbarRefresh, this.refreshToolbarItems);
        this.parent.off(inBoundModelChanged, this.modelChanged);
        this.parent.off(dataBound, this.refreshToolbarItems);
    };
    /**
     * For internal use only - Get the module name.
     */
    Toolbar$$1.prototype.getModuleName = function () {
        return 'toolbar';
    };
    return Toolbar$$1;
}());

var __extends$17 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Footer module is used to render grid content
 * @hidden
 */
var FooterRenderer = /** @class */ (function (_super) {
    __extends$17(FooterRenderer, _super);
    function FooterRenderer(gridModule, serviceLocator) {
        var _this = _super.call(this, gridModule, serviceLocator) || this;
        _this.aggregates = {};
        _this.parent = gridModule;
        _this.locator = serviceLocator;
        _this.modelGenerator = new SummaryModelGenerator(_this.parent);
        _this.addEventListener();
        return _this;
    }
    /**
     * The function is used to render grid footer div
     */
    FooterRenderer.prototype.renderPanel = function () {
        var div = createElement('div', { className: 'e-gridfooter' });
        var innerDiv = createElement('div', { className: 'e-summarycontent' });
        if (Browser.isDevice) {
            innerDiv.style.overflowX = 'scroll';
        }
        div.appendChild(innerDiv);
        this.setPanel(div);
        if (this.parent.getPager() != null) {
            this.parent.element.insertBefore(div, this.parent.getPager());
        }
        else {
            this.parent.element.appendChild(div);
        }
    };
    /**
     * The function is used to render grid footer table
     */
    FooterRenderer.prototype.renderTable = function () {
        var contentDiv = this.getPanel();
        var innerDiv = this.createContentTable();
        var table = innerDiv.querySelector('.e-table');
        var tFoot = createElement('tfoot');
        table.appendChild(tFoot);
        this.setTable(table);
    };
    FooterRenderer.prototype.renderSummaryContent = function (e) {
        var input = this.parent.dataSource instanceof Array ? this.parent.dataSource : this.parent.currentViewData;
        var summaries = this.modelGenerator.getData();
        var dummies = this.modelGenerator.getColumns();
        var rows = this.modelGenerator.generateRows(input, e || this.aggregates);
        var fragment = document.createDocumentFragment();
        var rowrenderer = new RowRenderer(this.locator, null, this.parent);
        rowrenderer.element = createElement('TR', { className: 'e-summaryrow' });
        for (var srow = 0, len = summaries.length; srow < len; srow++) {
            var row = rows[srow];
            if (!row) {
                continue;
            }
            var tr = rowrenderer.render(row, dummies);
            fragment.appendChild(tr);
        }
        this.getTable().tFoot.appendChild(fragment);
        this.aggregates = e;
    };
    FooterRenderer.prototype.refresh = function (e) {
        this.getTable().tFoot.innerHTML = '';
        this.renderSummaryContent(e);
        this.onScroll();
    };
    FooterRenderer.prototype.refreshCol = function () {
        var headerCol = this.parent.element.querySelector('.e-gridheader').querySelector('colgroup').cloneNode(true);
        this.getTable().replaceChild(headerCol, this.getColGroup());
        this.setColGroup(headerCol);
    };
    FooterRenderer.prototype.onWidthChange = function (args) {
        this.getColGroup().children[args.index].style.width = formatUnit(args.width);
        if (this.parent.allowResizing && args.module === 'resize') {
            this.updateFooterTableWidth(this.getTable());
        }
    };
    FooterRenderer.prototype.onScroll = function (e) {
        if (e === void 0) { e = { left: this.parent.getContent().firstChild.scrollLeft }; }
        this.getPanel().firstChild.scrollLeft = e.left;
    };
    FooterRenderer.prototype.columnVisibilityChanged = function () {
        this.refresh();
    };
    FooterRenderer.prototype.addEventListener = function () {
        this.parent.on(colGroupRefresh, this.refreshCol, this);
        this.parent.on(columnWidthChanged, this.onWidthChange, this);
        this.parent.on(scroll, this.onScroll, this);
        this.parent.on(columnVisibilityChanged, this.columnVisibilityChanged, this);
    };
    FooterRenderer.prototype.removeEventListener = function () {
        this.parent.off(colGroupRefresh, this.refreshCol);
        this.parent.off(columnWidthChanged, this.onWidthChange);
        this.parent.off(scroll, this.onScroll);
        this.parent.off(columnVisibilityChanged, this.columnVisibilityChanged);
    };
    FooterRenderer.prototype.updateFooterTableWidth = function (tFoot) {
        var tHead = this.parent.getHeaderTable();
        if (tHead && tFoot) {
            tFoot.style.width = tHead.style.width;
        }
    };
    return FooterRenderer;
}(ContentRender));

var __extends$18 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * SummaryCellRenderer class which responsible for building summary cell content.
 * @hidden
 */
var SummaryCellRenderer = /** @class */ (function (_super) {
    __extends$18(SummaryCellRenderer, _super);
    function SummaryCellRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.element = createElement('TD', { className: 'e-summarycell', attrs: { role: 'gridcell', tabindex: '-1' } });
        return _this;
    }
    SummaryCellRenderer.prototype.getValue = function (field, data, column) {
        var key;
        key = !isNullOrUndefined(column.type) ? column.field + ' - ' + (column.type) : column.columnName;
        return data[column.columnName] ? data[column.columnName][key] : '';
    };
    SummaryCellRenderer.prototype.evaluate = function (node, cell, data, attributes$$1) {
        var column = cell.column;
        if (!(column.footerTemplate || column.groupFooterTemplate || column.groupCaptionTemplate)) {
            return true;
        }
        var tempObj = column.getTemplate(cell.cellType);
        appendChildren(node, tempObj.fn(data[column.columnName], this.parent, tempObj.property));
        return false;
    };
    return SummaryCellRenderer;
}(CellRenderer));

/**
 * Summary Action controller.
 */
var Aggregate = /** @class */ (function () {
    function Aggregate(parent, locator) {
        this.parent = parent;
        this.locator = locator;
        this.addEventListener();
    }
    Aggregate.prototype.getModuleName = function () {
        return 'aggregate';
    };
    Aggregate.prototype.initiateRender = function () {
        var _this = this;
        var cellFac = this.locator.getService('cellRendererFactory');
        var instance = new SummaryCellRenderer(this.parent, this.locator);
        [CellType.Summary, CellType.CaptionSummary, CellType.GroupSummary].forEach(function (type) {
            return cellFac.addCellRenderer(type, instance);
        });
        this.footerRenderer = new FooterRenderer(this.parent, this.locator);
        this.footerRenderer.renderPanel();
        this.footerRenderer.renderTable();
        this.locator.register('footerRenderer', this.footerRenderer);
        var fn = function () {
            _this.prepareSummaryInfo();
            _this.parent.off(dataReady, fn);
        };
        this.parent.on(dataReady, fn, this);
        this.parent.on(dataReady, this.footerRenderer.refresh, this.footerRenderer);
    };
    Aggregate.prototype.prepareSummaryInfo = function () {
        var _this = this;
        summaryIterator(this.parent.aggregates, function (column) {
            var dataColumn = _this.parent.getColumnByField(column.field) || {};
            var type = dataColumn.type;
            column.format = _this.getFormatFromType(column.format, type);
            column.setFormatter();
            column.columnName = column.columnName || column.field;
        });
    };
    Aggregate.prototype.getFormatFromType = function (format, type) {
        if (isNullOrUndefined(type) || typeof format !== 'string') {
            return format;
        }
        var obj;
        switch (type) {
            case 'number':
                obj = { format: format };
                break;
            case 'date':
                obj = { type: type, skeleton: format };
                break;
            case 'datetime':
                obj = { type: 'dateTime', skeleton: format };
                break;
        }
        return obj;
    };
    Aggregate.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        if (isNullOrUndefined(this.footerRenderer)) {
            this.initiateRender();
        }
        this.prepareSummaryInfo();
        this.footerRenderer.refresh();
        var cModel = new CaptionSummaryModelGenerator(this.parent);
        var gModel = new GroupSummaryModelGenerator(this.parent);
        if (gModel.getData().length !== 0 || !cModel.isEmpty()) {
            this.parent.notify(modelChanged, {});
        }
    };
    Aggregate.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(initialEnd, this.initiateRender, this);
        this.parent.on(uiUpdate, this.onPropertyChanged, this);
    };
    Aggregate.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.footerRenderer.removeEventListener();
        this.parent.off(initialEnd, this.initiateRender);
        this.parent.off(dataReady, this.footerRenderer.refresh);
        this.parent.off(uiUpdate, this.onPropertyChanged);
    };
    Aggregate.prototype.destroy = function () {
        this.removeEventListener();
        remove(this.parent.element.querySelector('.e-gridfooter'));
    };
    return Aggregate;
}());
/**
 * @private
 */
function summaryIterator(aggregates, callback) {
    aggregates.forEach(function (row) {
        row.columns.forEach(function (column) {
            callback(column, row);
        });
    });
}

/**
 * InterSectionObserver - class watch whether it enters the viewport.
 * @hidden
 */
var InterSectionObserver = /** @class */ (function () {
    function InterSectionObserver(element, options) {
        var _this = this;
        this.fromWheel = false;
        this.touchMove = false;
        this.options = {};
        this.sentinelInfo = {
            'up': {
                check: function (rect, info) {
                    var top = rect.top - _this.containerRect.top;
                    info.entered = top >= 0;
                    return top + (_this.options.pageHeight / 2) >= 0;
                },
                axis: 'Y'
            },
            'down': {
                check: function (rect, info) {
                    var cHeight = _this.options.container.clientHeight;
                    var top = rect.bottom;
                    info.entered = rect.bottom <= _this.containerRect.bottom;
                    return top - (_this.options.pageHeight / 2) <= _this.options.pageHeight / 2;
                }, axis: 'Y'
            },
            'right': {
                check: function (rect, info) {
                    var right = rect.right;
                    info.entered = right < _this.containerRect.right;
                    return right - _this.containerRect.width <= _this.containerRect.right;
                }, axis: 'X'
            },
            'left': {
                check: function (rect, info) {
                    var left = rect.left;
                    info.entered = left > 0;
                    return left + _this.containerRect.width >= _this.containerRect.left;
                }, axis: 'X'
            }
        };
        this.element = element;
        this.options = options;
    }
    InterSectionObserver.prototype.observe = function (callback, onEnterCallback) {
        var _this = this;
        this.containerRect = this.options.container.getBoundingClientRect();
        EventHandler.add(this.options.container, 'wheel', function () { return _this.fromWheel = true; }, this);
        EventHandler.add(this.options.container, 'scroll', this.virtualScrollHandler(callback, onEnterCallback), this);
    };
    InterSectionObserver.prototype.check = function (direction) {
        var info = this.sentinelInfo[direction];
        return info.check(this.element.getBoundingClientRect(), info);
    };
    InterSectionObserver.prototype.virtualScrollHandler = function (callback, onEnterCallback) {
        var _this = this;
        var prevTop = 0;
        var prevLeft = 0;
        var debounced100 = debounce(callback, 100);
        var debounced50 = debounce(callback, 50);
        return function (e) {
            var top = e.target.scrollTop;
            var left = e.target.scrollLeft;
            var direction = prevTop < top ? 'down' : 'up';
            direction = prevLeft === left ? direction : prevLeft < left ? 'right' : 'left';
            prevTop = top;
            prevLeft = left;
            var current = _this.sentinelInfo[direction];
            if (_this.options.axes.indexOf(current.axis) === -1) {
                return;
            }
            var check = _this.check(direction);
            if (current.entered) {
                onEnterCallback(_this.element, current, direction, { top: top, left: left });
            }
            if (check) {
                var fn = _this.fromWheel ? _this.options.debounceEvent ? debounced100 : callback : debounced100;
                if (current.axis === 'X') {
                    fn = debounced50;
                }
                fn({ direction: direction, sentinel: current, offset: { top: top, left: left } });
            }
            _this.fromWheel = false;
        };
    };
    InterSectionObserver.prototype.setPageHeight = function (value) {
        this.options.pageHeight = value;
    };
    return InterSectionObserver;
}());

/**
 * Content module is used to render grid content
 */
var VirtualRowModelGenerator = /** @class */ (function () {
    function VirtualRowModelGenerator(parent) {
        this.cOffsets = {};
        this.cache = {};
        this.data = {};
        this.groups = {};
        this.parent = parent;
        this.model = this.parent.pageSettings;
        this.rowModelGenerator = this.parent.allowGrouping ? new GroupModelGenerator(this.parent) : new RowModelGenerator(this.parent);
    }
    VirtualRowModelGenerator.prototype.generateRows = function (data, notifyArgs) {
        var _this = this;
        var info = notifyArgs.virtualInfo = notifyArgs.virtualInfo || this.getData();
        var xAxis = info.sentinelInfo && info.sentinelInfo.axis === 'X';
        var page = !xAxis && info.loadNext && !info.loadSelf ? info.nextInfo.page : info.page;
        var result = [];
        var center = ~~(this.model.pageSize / 2);
        var indexes = this.getBlockIndexes(page);
        var loadedBlocks = [];
        this.checkAndResetCache(notifyArgs.requestType);
        if (this.parent.enableColumnVirtualization) {
            info.blockIndexes.forEach(function (value) {
                if (_this.isBlockAvailable(value)) {
                    _this.cache[value] = _this.rowModelGenerator.refreshRows(_this.cache[value]);
                }
            });
        }
        info.blockIndexes.forEach(function (value) {
            if (!_this.isBlockAvailable(value)) {
                var rows = _this.rowModelGenerator.generateRows(data, {
                    virtualInfo: info, startIndex: _this.getStartIndex(value, data)
                });
                var median = ~~Math.max(rows.length, _this.model.pageSize) / 2;
                if (!_this.isBlockAvailable(indexes[0])) {
                    _this.cache[indexes[0]] = rows.slice(0, median);
                }
                if (!_this.isBlockAvailable(indexes[1])) {
                    _this.cache[indexes[1]] = rows.slice(median);
                }
            }
            if (_this.parent.groupSettings.columns.length && !xAxis && _this.cache[value]) {
                _this.cache[value] = _this.updateGroupRow(_this.cache[value], value);
            }
            result.push.apply(result, _this.cache[value]);
            if (_this.isBlockAvailable(value)) {
                loadedBlocks.push(value);
            }
        });
        info.blockIndexes = loadedBlocks;
        return result;
    };
    VirtualRowModelGenerator.prototype.getBlockIndexes = function (page) {
        return [page + (page - 1), page * 2];
    };
    VirtualRowModelGenerator.prototype.getPage = function (block) {
        return block % 2 === 0 ? block / 2 : (block + 1) / 2;
    };
    VirtualRowModelGenerator.prototype.isBlockAvailable = function (value) {
        return value in this.cache;
    };
    VirtualRowModelGenerator.prototype.getData = function () {
        return {
            page: this.model.currentPage,
            blockIndexes: this.getBlockIndexes(this.model.currentPage),
            direction: 'down',
            columnIndexes: this.parent.getColumnIndexesInView()
        };
    };
    VirtualRowModelGenerator.prototype.getStartIndex = function (blk, data, full) {
        if (full === void 0) { full = true; }
        var page = this.getPage(blk);
        var even = blk % 2 === 0;
        var index = (page - 1) * this.model.pageSize;
        return full || !even ? index : index + ~~(this.model.pageSize / 2);
    };
    VirtualRowModelGenerator.prototype.getColumnIndexes = function (content) {
        var _this = this;
        if (content === void 0) { content = this.parent.getHeaderContent().firstChild; }
        var indexes = [];
        var sLeft = content.scrollLeft | 0;
        var keys = Object.keys(this.cOffsets);
        var cWidth = content.getBoundingClientRect().width;
        sLeft = Math.min(this.cOffsets[keys.length - 1] - cWidth, sLeft);
        var calWidth = Browser.isDevice ? 2 * cWidth : cWidth / 2;
        var left = sLeft + cWidth + (sLeft === 0 ? calWidth : 0);
        keys.some(function (offset, indx, input) {
            var iOffset = Number(offset);
            var offsetVal = _this.cOffsets[offset];
            var border = sLeft - calWidth <= offsetVal && left + calWidth >= offsetVal;
            if (border) {
                indexes.push(iOffset);
            }
            return left + calWidth < offsetVal;
        });
        return indexes;
    };
    VirtualRowModelGenerator.prototype.checkAndResetCache = function (action) {
        var clear = ['paging', 'refresh', 'sorting', 'filtering', 'searching', 'grouping', 'ungrouping']
            .some(function (value) { return action === value; });
        if (clear) {
            this.cache = {};
            this.data = {};
            this.groups = {};
        }
        return clear;
    };
    VirtualRowModelGenerator.prototype.refreshColOffsets = function () {
        var _this = this;
        var col = 0;
        this.cOffsets = {};
        var gLen = this.parent.groupSettings.columns.length;
        var cols = this.parent.columns;
        var cLen = cols.length;
        var isVisible = function (column) { return column.visible &&
            (!_this.parent.groupSettings.showGroupedColumn ? _this.parent.groupSettings.columns.indexOf(column.field) < 0 : column.visible); };
        this.parent.groupSettings.columns.forEach(function (c, n) { return _this.cOffsets[n] = (_this.cOffsets[n - 1] | 0) + 30; });
        Array.apply(null, Array(cLen)).map(function () { return col++; }).forEach(function (block, i) {
            block = block + gLen;
            _this.cOffsets[block] = (_this.cOffsets[block - 1] | 0) + (isVisible(cols[i]) ? parseInt(cols[i].width, 10) : 0);
        });
    };
    VirtualRowModelGenerator.prototype.updateGroupRow = function (current, block) {
        var _this = this;
        var currentFirst = current[0];
        var rows = [];
        Object.keys(this.cache).forEach(function (key) {
            if (Number(key) < block) {
                rows = rows.concat(_this.cache[key]);
            }
        });
        if ((currentFirst && currentFirst.isDataRow) || block % 2 === 0) {
            return current;
        }
        return this.iterateGroup(current, rows);
    };
    VirtualRowModelGenerator.prototype.iterateGroup = function (current, rows) {
        var currentFirst = current[0];
        var offset = 0;
        if (currentFirst && currentFirst.isDataRow) {
            return current;
        }
        var isPresent = current.some(function (row) {
            return rows.some(function (oRow, index) {
                var res = oRow && oRow.data.field !== undefined && oRow.data.field === row.data.field &&
                    oRow.data.key === row.data.key;
                if (res) {
                    offset = index;
                }
                return res;
            });
        });
        if (isPresent) {
            current.shift();
            current = this.iterateGroup(current, rows.slice(offset));
        }
        return current;
    };
    VirtualRowModelGenerator.prototype.getRows = function () {
        var _this = this;
        var rows = [];
        Object.keys(this.cache).forEach(function (key) { return rows = rows.concat(_this.cache[key]); });
        return rows;
    };
    return VirtualRowModelGenerator;
}());

var __extends$19 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * VirtualContentRenderer
 * @hidden
 */
var VirtualContentRenderer = /** @class */ (function (_super) {
    __extends$19(VirtualContentRenderer, _super);
    function VirtualContentRenderer(parent, locator) {
        var _this = _super.call(this, parent, locator) || this;
        _this.prevHeight = 0;
        _this.preventEvent = false;
        _this.actions = ['filtering', 'searching', 'grouping', 'ungrouping'];
        _this.offsets = {};
        _this.tmpOffsets = {};
        _this.virtualEle = new VirtualElementHandler();
        _this.offsetKeys = [];
        _this.isFocused = false;
        _this.locator = locator;
        _this.eventListener('on');
        _this.vgenerator = _this.generator;
        return _this;
    }
    VirtualContentRenderer.prototype.renderTable = function () {
        this.header = this.locator.getService('rendererFactory').getRenderer(RenderType.Header);
        _super.prototype.renderTable.call(this);
        this.virtualEle.table = this.getTable();
        this.virtualEle.content = this.content = this.getPanel().firstChild;
        this.virtualEle.renderWrapper();
        this.virtualEle.renderPlaceHolder();
        this.virtualEle.wrapper.style.position = 'absolute';
        var debounceEvent = (this.parent.dataSource instanceof DataManager && !this.parent.dataSource.dataSource.offline);
        var opt = {
            container: this.content, pageHeight: this.getBlockHeight() * 2, debounceEvent: debounceEvent,
            axes: this.parent.enableColumnVirtualization ? ['X', 'Y'] : ['Y']
        };
        this.observer = new InterSectionObserver(this.virtualEle.wrapper, opt);
    };
    VirtualContentRenderer.prototype.renderEmpty = function (tbody) {
        this.getTable().appendChild(tbody);
        this.virtualEle.adjustTable(0, 0);
    };
    VirtualContentRenderer.prototype.scrollListener = function (scrollArgs) {
        if (this.preventEvent || this.parent.isDestroyed) {
            this.preventEvent = false;
            return;
        }
        this.isFocused = this.content === closest(document.activeElement, '.e-content') || this.content === document.activeElement;
        var info = scrollArgs.sentinel;
        var viewInfo = this.getInfoFromView(scrollArgs.direction, info, scrollArgs.offset);
        if (this.prevInfo && ((info.axis === 'Y' && this.prevInfo.blockIndexes.toString() === viewInfo.blockIndexes.toString())
            || (info.axis === 'X' && this.prevInfo.columnIndexes.toString() === viewInfo.columnIndexes.toString()))) {
            return;
        }
        this.parent.setColumnIndexesInView(this.parent.enableColumnVirtualization ? viewInfo.columnIndexes : []);
        this.parent.pageSettings.currentPage = viewInfo.loadNext && !viewInfo.loadSelf ? viewInfo.nextInfo.page : viewInfo.page;
        this.parent.notify(viewInfo.event, { requestType: 'virtualscroll', virtualInfo: viewInfo });
    };
    VirtualContentRenderer.prototype.block = function (blk) {
        return this.vgenerator.isBlockAvailable(blk);
    };
    VirtualContentRenderer.prototype.getInfoFromView = function (direction, info, e) {
        var tempBlocks = [];
        var infoType = { direction: direction, sentinelInfo: info, offsets: e };
        infoType.page = this.getPageFromTop(e.top, infoType);
        infoType.blockIndexes = tempBlocks = this.vgenerator.getBlockIndexes(infoType.page);
        infoType.loadSelf = !this.vgenerator.isBlockAvailable(tempBlocks[infoType.block]);
        var blocks = this.ensureBlocks(infoType);
        infoType.blockIndexes = blocks;
        infoType.loadNext = !blocks.filter(function (val) { return tempBlocks.indexOf(val) === -1; })
            .every(this.block.bind(this));
        infoType.event = (infoType.loadNext || infoType.loadSelf) ? modelChanged : refreshVirtualBlock;
        infoType.nextInfo = infoType.loadNext ? { page: Math.max(1, infoType.page + (direction === 'down' ? 1 : -1)) } : {};
        infoType.columnIndexes = info.axis === 'X' ? this.vgenerator.getColumnIndexes() : this.parent.getColumnIndexesInView();
        if (this.parent.enableColumnVirtualization && info.axis === 'X') {
            infoType.event = refreshVirtualBlock;
        }
        return infoType;
    };
    VirtualContentRenderer.prototype.ensureBlocks = function (info) {
        var _this = this;
        var index = info.blockIndexes[info.block];
        var mIdx;
        var old = index;
        var max = Math.max;
        var indexes = info.direction === 'down' ? [max(index, 1), ++index, ++index] : [max(index - 1, 1), index, index + 1];
        indexes = indexes.filter(function (val, ind) { return indexes.indexOf(val) === ind; });
        if (this.prevInfo.blockIndexes.toString() === indexes.toString()) {
            return indexes;
        }
        if (info.loadSelf || (info.direction === 'down' && this.isEndBlock(old))) {
            indexes = this.vgenerator.getBlockIndexes(info.page);
        }
        indexes.some(function (val, ind) {
            var result = val === _this.getTotalBlocks();
            if (result) {
                mIdx = ind;
            }
            return result;
        });
        if (mIdx !== undefined) {
            indexes = indexes.slice(0, mIdx + 1);
            if (info.block === 0 && indexes.length === 1 && this.vgenerator.isBlockAvailable(indexes[0] - 1)) {
                indexes = [indexes[0] - 1, indexes[0]];
            }
        }
        return indexes;
    };
    VirtualContentRenderer.prototype.appendContent = function (target, newChild, e) {
        var info = e.virtualInfo;
        this.prevInfo = this.prevInfo || e.virtualInfo;
        var cBlock = (info.columnIndexes[0]) - 1;
        var cOffset = this.getColumnOffset(cBlock);
        var width;
        var blocks = info.blockIndexes;
        if (this.parent.groupSettings.columns.length) {
            this.refreshOffsets();
        }
        var translate = this.getTranslateY(this.content.scrollTop, this.content.getBoundingClientRect().height, info);
        this.virtualEle.adjustTable(cOffset, translate);
        if (this.parent.enableColumnVirtualization) {
            this.header.virtualEle.adjustTable(cOffset, 0);
        }
        if (this.parent.enableColumnVirtualization) {
            var cIndex = info.columnIndexes;
            width = this.getColumnOffset(cIndex[cIndex.length - 1]) - this.getColumnOffset(cIndex[0] - 1) + '';
            this.header.virtualEle.setWrapperWidth(width);
        }
        this.virtualEle.setWrapperWidth(width, this.parent.enableColumnVirtualization || Browser.isIE);
        target.appendChild(newChild);
        this.getTable().appendChild(target);
        if (this.parent.groupSettings.columns.length) {
            if (info.direction === 'up') {
                var blk = this.offsets[this.getTotalBlocks()] - this.prevHeight;
                this.preventEvent = true;
                var sTop = this.content.scrollTop;
                this.content.scrollTop = sTop + blk;
            }
            this.setVirtualHeight();
            this.observer.setPageHeight(this.getOffset(blocks[blocks.length - 1]) - this.getOffset(blocks[0] - 1));
        }
        this.prevInfo = info;
        if (this.isFocused) {
            this.content.focus();
        }
    };
    VirtualContentRenderer.prototype.onDataReady = function (e) {
        if (!isNullOrUndefined(e.count)) {
            this.count = e.count;
            this.maxPage = Math.ceil(e.count / this.parent.pageSettings.pageSize);
        }
        this.refreshOffsets();
        this.setVirtualHeight();
        this.resetScrollPosition(e.requestType);
    };
    VirtualContentRenderer.prototype.setVirtualHeight = function () {
        var width = this.parent.enableColumnVirtualization ?
            this.getColumnOffset(this.parent.columns.length + this.parent.groupSettings.columns.length - 1) + 'px' : '100%';
        this.virtualEle.setVirtualHeight(this.offsets[this.getTotalBlocks()], width);
        if (this.parent.enableColumnVirtualization) {
            this.header.virtualEle.setVirtualHeight(1, width);
        }
    };
    VirtualContentRenderer.prototype.getPageFromTop = function (sTop, info) {
        var _this = this;
        var total = this.getTotalBlocks();
        var page = 0;
        var extra = this.offsets[total] - this.prevHeight;
        this.offsetKeys.some(function (offset) {
            var iOffset = Number(offset);
            var border = sTop < _this.offsets[offset] || (iOffset === total && sTop > _this.offsets[offset]);
            if (border) {
                info.block = iOffset % 2 === 0 ? 1 : 0;
                page = Math.max(1, Math.min(_this.vgenerator.getPage(iOffset), _this.maxPage));
            }
            return border;
        });
        return page;
    };
    VirtualContentRenderer.prototype.getTranslateY = function (sTop, cHeight, info) {
        if (info === undefined) {
            info = { page: this.getPageFromTop(sTop, {}) };
            info.blockIndexes = this.vgenerator.getBlockIndexes(info.page);
        }
        var block = (info.blockIndexes[0] || 1) - 1;
        var translate = this.getOffset(block);
        var endTranslate = this.getOffset(info.blockIndexes[info.blockIndexes.length - 1]);
        return translate > sTop ? this.getOffset(block - 1) : endTranslate < (sTop + cHeight) ? this.getOffset(block + 1) : translate;
    };
    VirtualContentRenderer.prototype.getOffset = function (block) {
        return Math.min(this.offsets[block] | 0, this.offsets[this.maxBlock]);
    };
    VirtualContentRenderer.prototype.onEntered = function () {
        var _this = this;
        return function (element, current, direction, e) {
            var xAxis = current.axis === 'X';
            var top = _this.prevInfo.offsets ? _this.prevInfo.offsets.top : null;
            var height = _this.content.getBoundingClientRect().height;
            var x = _this.getColumnOffset(xAxis ? _this.vgenerator.getColumnIndexes()[0] - 1 : _this.prevInfo.columnIndexes[0] - 1);
            var y = _this.getTranslateY(e.top, height, xAxis && top === e.top ? _this.prevInfo : undefined);
            _this.virtualEle.adjustTable(x, Math.min(y, _this.offsets[_this.maxBlock]));
            if (_this.parent.enableColumnVirtualization) {
                _this.header.virtualEle.adjustTable(x, 0);
            }
        };
    };
    VirtualContentRenderer.prototype.eventListener = function (action) {
        var _this = this;
        this.parent[action](dataReady, this.onDataReady, this);
        this.parent[action](refreshVirtualBlock, this.refreshContentRows, this);
        this.actions.forEach(function (event) { return _this.parent[action](event + "-begin", _this.onActionBegin, _this); });
        var fn = function () {
            _this.observer.observe(function (scrollArgs) { return _this.scrollListener(scrollArgs); }, _this.onEntered());
            _this.parent.off(contentReady, fn);
        };
        this.parent.on(contentReady, fn, this);
    };
    VirtualContentRenderer.prototype.getBlockSize = function () {
        return this.parent.pageSettings.pageSize >> 1;
    };
    VirtualContentRenderer.prototype.getBlockHeight = function () {
        return this.getBlockSize() * getRowHeight();
    };
    VirtualContentRenderer.prototype.isEndBlock = function (index) {
        var totalBlocks = this.getTotalBlocks();
        return index >= totalBlocks || index === totalBlocks - 1;
    };
    VirtualContentRenderer.prototype.getTotalBlocks = function () {
        return Math.ceil(this.count / this.getBlockSize());
    };
    VirtualContentRenderer.prototype.getColumnOffset = function (block) {
        return this.vgenerator.cOffsets[block] | 0;
    };
    VirtualContentRenderer.prototype.getModelGenerator = function () {
        return new VirtualRowModelGenerator(this.parent);
    };
    VirtualContentRenderer.prototype.resetScrollPosition = function (action) {
        if (this.actions.some(function (value) { return value === action; })) {
            this.preventEvent = this.content.scrollTop !== 0;
            this.content.scrollTop = 0;
        }
    };
    VirtualContentRenderer.prototype.onActionBegin = function (e) {
        //Update property silently..
        this.parent.setProperties({ pageSettings: { currentPage: 1 } }, true);
    };
    VirtualContentRenderer.prototype.getRows = function () {
        return this.vgenerator.getRows();
    };
    VirtualContentRenderer.prototype.getRowByIndex = function (index) {
        var prev = this.prevInfo.blockIndexes;
        var startIdx = (prev[0] - 1) * this.getBlockSize();
        return this.parent.getDataRows()[index - startIdx];
    };
    VirtualContentRenderer.prototype.refreshOffsets = function () {
        var _this = this;
        var row = 0;
        var bSize = this.getBlockSize();
        var total = this.getTotalBlocks();
        this.prevHeight = this.offsets[total];
        this.maxBlock = total % 2 === 0 ? total - 2 : total - 1;
        this.offsets = {};
        //Row offset update
        Array.apply(null, Array(total)).map(function () { return ++row; })
            .forEach(function (block) {
            var tmp = (_this.vgenerator.cache[block] || []).length;
            var rem = _this.count % bSize;
            var size = block in _this.vgenerator.cache ?
                tmp * getRowHeight() : rem && block === total ? rem * getRowHeight() : _this.getBlockHeight();
            // let size: number = this.parent.groupSettings.columns.length && block in this.vgenerator.cache ?
            // tmp * getRowHeight() : this.getBlockHeight();
            _this.offsets[block] = (_this.offsets[block - 1] | 0) + size;
            _this.tmpOffsets[block] = _this.offsets[block - 1] | 0;
        });
        this.offsetKeys = Object.keys(this.offsets);
        //Column offset update
        if (this.parent.enableColumnVirtualization) {
            this.vgenerator.refreshColOffsets();
        }
    };
    VirtualContentRenderer.prototype.refreshVirtualElement = function () {
        this.vgenerator.refreshColOffsets();
        this.setVirtualHeight();
    };
    return VirtualContentRenderer;
}(ContentRender));
/**
 * @hidden
 */
var VirtualHeaderRenderer = /** @class */ (function (_super) {
    __extends$19(VirtualHeaderRenderer, _super);
    function VirtualHeaderRenderer(parent, locator) {
        var _this = _super.call(this, parent, locator) || this;
        _this.virtualEle = new VirtualElementHandler();
        _this.gen = new VirtualRowModelGenerator(_this.parent);
        _this.parent.on(refreshVirtualBlock, function (e) { return e.virtualInfo.sentinelInfo.axis === 'X' ? _this.refreshUI() : null; }, _this);
        return _this;
    }
    VirtualHeaderRenderer.prototype.renderTable = function () {
        this.gen.refreshColOffsets();
        this.parent.setColumnIndexesInView(this.gen.getColumnIndexes(this.getPanel().firstChild));
        _super.prototype.renderTable.call(this);
        this.virtualEle.table = this.getTable();
        this.virtualEle.content = this.getPanel().firstChild;
        this.virtualEle.content.style.position = 'relative';
        this.virtualEle.renderWrapper();
        this.virtualEle.renderPlaceHolder('absolute');
    };
    VirtualHeaderRenderer.prototype.appendContent = function (table) {
        this.virtualEle.wrapper.appendChild(table);
    };
    VirtualHeaderRenderer.prototype.refreshUI = function () {
        this.gen.refreshColOffsets();
        this.parent.setColumnIndexesInView(this.gen.getColumnIndexes(this.getPanel().firstChild));
        _super.prototype.refreshUI.call(this);
    };
    return VirtualHeaderRenderer;
}(HeaderRender));
/**
 * @hidden
 */
var VirtualElementHandler = /** @class */ (function () {
    function VirtualElementHandler() {
    }
    VirtualElementHandler.prototype.renderWrapper = function () {
        this.wrapper = createElement('div', { className: 'e-virtualtable' });
        this.wrapper.appendChild(this.table);
        this.content.appendChild(this.wrapper);
    };
    VirtualElementHandler.prototype.renderPlaceHolder = function (position) {
        if (position === void 0) { position = 'relative'; }
        this.placeholder = createElement('div', { className: 'e-virtualtrack', styles: "position:" + position });
        this.content.appendChild(this.placeholder);
    };
    VirtualElementHandler.prototype.adjustTable = function (xValue, yValue) {
        this.wrapper.style.transform = "translate(" + xValue + "px, " + yValue + "px)";
    };
    VirtualElementHandler.prototype.setWrapperWidth = function (width, full) {
        this.wrapper.style.width = width ? width + "px" : full ? '100%' : '';
    };
    VirtualElementHandler.prototype.setVirtualHeight = function (height, width) {
        this.placeholder.style.height = height + "px";
        this.placeholder.style.width = width;
    };
    return VirtualElementHandler;
}());

/**
 * Virtual Scrolling class
 */
var VirtualScroll = /** @class */ (function () {
    function VirtualScroll(parent, locator) {
        this.parent = parent;
        this.locator = locator;
        this.addEventListener();
    }
    VirtualScroll.prototype.getModuleName = function () {
        return 'virtualscroll';
    };
    VirtualScroll.prototype.instantiateRenderer = function () {
        var renderer = this.locator.getService('rendererFactory');
        if (this.parent.enableColumnVirtualization) {
            renderer.addRenderer(RenderType.Header, new VirtualHeaderRenderer(this.parent, this.locator));
        }
        renderer.addRenderer(RenderType.Content, new VirtualContentRenderer(this.parent, this.locator));
        this.ensurePageSize();
    };
    VirtualScroll.prototype.ensurePageSize = function () {
        var rowHeight = getRowHeight(this.parent.element);
        this.blockSize = ~~(this.parent.height / rowHeight);
        var height = this.blockSize * 2;
        var size = this.parent.pageSettings.pageSize;
        this.parent.setProperties({ pageSettings: { pageSize: size < height ? height : size } }, true);
    };
    VirtualScroll.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(initialLoad, this.instantiateRenderer, this);
        this.parent.on(columnWidthChanged, this.refreshVirtualElement, this);
    };
    VirtualScroll.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(initialLoad, this.instantiateRenderer);
        this.parent.off(columnWidthChanged, this.refreshVirtualElement);
    };
    VirtualScroll.prototype.refreshVirtualElement = function (args) {
        if (this.parent.enableColumnVirtualization && args.module === 'resize') {
            var renderer = this.locator.getService('rendererFactory');
            renderer.getRenderer(RenderType.Content).refreshVirtualElement();
        }
    };
    VirtualScroll.prototype.destroy = function () {
        this.removeEventListener();
    };
    return VirtualScroll;
}());

/**
 * Edit render module is used to render grid edit row.
 * @hidden
 */
var InlineEditRender = /** @class */ (function () {
    /**
     * Constructor for render module
     */
    function InlineEditRender(parent) {
        this.parent = parent;
    }
    InlineEditRender.prototype.addNew = function (elements, args) {
        var tbody = this.parent.getContentTable().querySelector('tbody');
        args.row = createElement('tr', { className: 'e-row e-addedrow' });
        tbody.insertBefore(args.row, tbody.firstChild);
        args.row.appendChild(this.getEditElement(elements, false));
    };
    InlineEditRender.prototype.update = function (elements, args) {
        var tdElement = [].slice.call(args.row.querySelectorAll('td.e-rowcell'));
        args.row.innerHTML = '';
        args.row.appendChild(this.getEditElement(elements, true, tdElement));
        args.row.classList.add('e-editedrow');
    };
    InlineEditRender.prototype.getEditElement = function (elements, isEdit, tdElement) {
        var gObj = this.parent;
        var gLen = 0;
        var isDetail = !isNullOrUndefined(gObj.detailTemplate) || !isNullOrUndefined(gObj.childGrid) ? 1 : 0;
        if (gObj.allowGrouping) {
            gLen = gObj.groupSettings.columns.length;
        }
        var td = createElement('td', {
            className: 'e-editcell e-normaledit',
            attrs: { colspan: (gObj.getVisibleColumns().length + gLen + isDetail).toString() }
        });
        var form = createElement('form', { id: gObj.element.id + 'EditForm', className: 'e-gridform' });
        var table = createElement('table', { className: 'e-table e-inline-edit', attrs: { cellspacing: '0.25' } });
        table.appendChild(gObj.getContentTable().querySelector('colgroup').cloneNode(true));
        var tbody = createElement('tbody');
        var tr = createElement('tr');
        var i = 0;
        if (isDetail) {
            tr.insertBefore(createElement('td', { className: 'e-detailrowcollapse' }), tr.firstChild);
        }
        while (i < gLen) {
            tr.appendChild(createElement('td', { className: 'e-indentcell' }));
            i++;
        }
        var m = 0;
        i = 0;
        while ((isEdit && m < tdElement.length && i < gObj.getColumns().length) || i < gObj.getColumns().length) {
            var span = isEdit ? tdElement[m].getAttribute('colspan') : null;
            var col = gObj.getColumns()[i];
            if (col.visible) {
                var td_1 = createElement('td', {
                    className: 'e-rowcell', attrs: { style: 'text-align:' + (col.textAlign ? col.textAlign : ''), 'colspan': span ? span : '' }
                });
                td_1.appendChild(elements[col.uid]);
                if (col.editType === 'booleanedit') {
                    td_1.classList.add('e-boolcell');
                }
                else if (col.commands || col.commandsTemplate) {
                    addClass([td_1], 'e-unboundcell');
                }
                tr.appendChild(td_1);
            }
            i = span ? i + parseInt(span, 10) : i + 1;
            m++;
        }
        tbody.appendChild(tr);
        table.appendChild(tbody);
        form.appendChild(table);
        td.appendChild(form);
        return td;
    };
    return InlineEditRender;
}());

/**
 * Edit render module is used to render grid edit row.
 * @hidden
 */
var BatchEditRender = /** @class */ (function () {
    /**
     * Constructor for render module
     */
    function BatchEditRender(parent) {
        this.parent = parent;
    }
    BatchEditRender.prototype.update = function (elements, args) {
        args.cell.innerHTML = '';
        args.cell.appendChild(this.getEditElement(elements, args));
        args.cell.classList.add('e-editedbatchcell');
        classList(args.row, ['e-editedrow', 'e-batchrow'], []);
    };
    BatchEditRender.prototype.getEditElement = function (elements, args) {
        var gObj = this.parent;
        var form = createElement('form', { id: gObj.element.id + 'EditForm', className: 'e-gridform' });
        form.appendChild(elements[args.columnObject.uid]);
        if (args.columnObject.editType === 'booleanedit') {
            args.cell.classList.add('e-boolcell');
        }
        if (!args.columnObject.editType) {
            args.cell.classList.add('e-inputbox');
        }
        return form;
    };
    return BatchEditRender;
}());

/**
 * Edit render module is used to render grid edit row.
 * @hidden
 */
var DialogEditRender = /** @class */ (function () {
    /**
     * Constructor for render module
     */
    function DialogEditRender(parent, serviceLocator) {
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(dialogDestroy, this.destroy, this);
        this.parent.on(destroy, this.destroy, this);
    }
    DialogEditRender.prototype.setLocaleObj = function () {
        this.l10n = this.serviceLocator.getService('localization');
    };
    DialogEditRender.prototype.addNew = function (elements, args) {
        this.isEdit = false;
        this.createDialog(elements, args);
    };
    DialogEditRender.prototype.update = function (elements, args) {
        this.isEdit = true;
        this.createDialog(elements, args);
    };
    DialogEditRender.prototype.createDialog = function (elements, args) {
        var gObj = this.parent;
        this.dialog = createElement('div', { id: gObj.element.id + '_dialogEdit_wrapper' });
        gObj.element.appendChild(this.dialog);
        this.setLocaleObj();
        this.dialogObj = new Dialog({
            header: this.isEdit ? this.l10n.getConstant('EditFormTitle') + args.primaryKeyValue[0] :
                this.l10n.getConstant('AddFormTitle'), isModal: true, visible: true, cssClass: 'e-edit-dialog',
            content: this.getEditElement(elements), showCloseIcon: true, allowDragging: true, close: this.destroy.bind(this),
            closeOnEscape: true, width: '330px', target: gObj.element, animationSettings: { effect: 'None' },
            buttons: [{
                    click: this.btnClick.bind(this),
                    buttonModel: { content: this.l10n.getConstant('SaveButton'), cssClass: 'e-primary', isPrimary: true }
                },
                { click: this.btnClick.bind(this), buttonModel: { cssClass: 'e-flat', content: this.l10n.getConstant('CancelButton') } }]
        });
        this.dialogObj.appendTo(this.dialog);
        changeButtonType(this.dialogObj.element);
    };
    DialogEditRender.prototype.btnClick = function (e) {
        if (this.l10n.getConstant('CancelButton').toLowerCase() === e.target.innerText.toLowerCase()) {
            this.parent.closeEdit();
            this.destroy();
        }
        else {
            this.parent.endEdit();
        }
    };
    DialogEditRender.prototype.destroy = function (args) {
        this.parent.notify(destroyForm, {});
        this.parent.isEdit = false;
        this.parent.notify(toolbarRefresh, {});
        if (this.dialog && !this.dialogObj.isDestroyed) {
            this.dialogObj.destroy();
            remove(this.dialog);
        }
    };
    DialogEditRender.prototype.getEditElement = function (elements) {
        var gObj = this.parent;
        var div = createElement('div', { className: this.isEdit ? 'e-editedrow' : 'e-insertedrow' });
        var form = createElement('form', { id: gObj.element.id + 'EditForm', className: 'e-gridform' });
        var table = createElement('table', { className: 'e-table', attrs: { cellspacing: '6px' } });
        var tbody = createElement('tbody');
        var cols = gObj.getColumns();
        for (var i = 0; i < cols.length; i++) {
            if (!cols[i].visible || cols[i].commands || cols[i].commandsTemplate) {
                continue;
            }
            var tr = createElement('tr');
            var dataCell = createElement('td', { className: 'e-rowcell', attrs: { style: 'text-align:left;width:190px' } });
            var label = createElement('label', { innerHTML: cols[i].field });
            elements[cols[i].uid].classList.remove('e-input');
            dataCell.appendChild(elements[cols[i].uid]);
            tr.appendChild(dataCell);
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        form.appendChild(table);
        div.appendChild(form);
        return div;
    };
    return DialogEditRender;
}());

/**
 * Edit render module is used to render grid edit row.
 * @hidden
 */
var EditRender = /** @class */ (function () {
    /**
     * Constructor for render module
     */
    function EditRender(parent, serviceLocator) {
        //Internal variables               
        this.editType = {
            'inline': InlineEditRender,
            'normal': InlineEditRender, 'batch': BatchEditRender, 'dialog': DialogEditRender
        };
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.renderer = new this.editType[this.parent.editSettings.mode](parent, serviceLocator);
        this.focus = serviceLocator.getService('focus');
    }
    EditRender.prototype.addNew = function (args) {
        this.renderer.addNew(this.getEditElements(args), args);
        this.convertWidget(args);
    };
    EditRender.prototype.update = function (args) {
        this.renderer.update(this.getEditElements(args), args);
        this.convertWidget(args);
    };
    EditRender.prototype.convertWidget = function (args) {
        var gObj = this.parent;
        var isFocused;
        var cell;
        var value;
        var form = gObj.element.querySelector('.e-gridform');
        var cols = gObj.editSettings.mode !== 'batch' ? gObj.getColumns() : [gObj.getColumnByField(args.columnName)];
        for (var _i = 0, cols_1 = cols; _i < cols_1.length; _i++) {
            var col = cols_1[_i];
            if (!col.visible || col.commands) {
                continue;
            }
            value = col.valueAccessor(col.field, args.rowData, col);
            cell = form.querySelector('[e-mappinguid=' + col.uid + ']');
            var temp = col.edit.write;
            col.edit.write({
                rowData: args.rowData, element: cell, column: col, requestType: args.requestType, row: args.row
            });
            if (!isFocused && !cell.getAttribute('disabled')) {
                this.focusElement(cell, args.type);
                isFocused = true;
            }
        }
    };
    EditRender.prototype.focusElement = function (elem, type) {
        var chkBox = this.parent.element.querySelector('.e-edit-checkselect');
        if (!isNullOrUndefined(chkBox)) {
            chkBox.nextElementSibling.classList.add('e-focus');
        }
        if (this.parent.editSettings.mode === 'batch') {
            this.focus.onClick({ target: closest(elem, 'td') }, true);
        }
        else {
            elem.focus();
        }
        if (elem.classList.contains('e-defaultcell')) {
            elem.setSelectionRange(elem.value.length, elem.value.length);
        }
    };
    EditRender.prototype.getEditElements = function (args) {
        var gObj = this.parent;
        var elements = {};
        var cols = gObj.editSettings.mode !== 'batch' ? gObj.getColumns() : [gObj.getColumnByField(args.columnName)];
        for (var i = 0, len = cols.length; i < len; i++) {
            var col = cols[i];
            if (!col.visible) {
                continue;
            }
            if (col.commands || col.commandsTemplate) {
                var cellRendererFact = this.serviceLocator.getService('cellRendererFactory');
                var model = new RowModelGenerator(this.parent);
                var cellRenderer = cellRendererFact.getCellRenderer(CellType.CommandColumn);
                var cells = model.generateRows(args.rowData)[0].cells;
                var td = cellRenderer.render(cells[i], args.rowData, { 'index': args.row ? args.row.getAttribute('aria-rowindex') : 0 });
                var div = td.firstElementChild;
                div.setAttribute('textAlign', td.getAttribute('textAlign'));
                elements[col.uid] = div;
                continue;
            }
            var value = col.valueAccessor(col.field, args.rowData, col);
            var tArgs = { column: col, value: value, type: args.requestType, data: args.rowData };
            var temp = col.edit.create;
            var input = void 0;
            input = col.edit.create(tArgs);
            if (typeof input === 'string') {
                var div = createElement('div');
                div.innerHTML = input;
                input = div.firstChild;
            }
            var isInput = input.tagName !== 'input' && input.querySelectorAll('input').length;
            attributes(isInput ? input.querySelector('input') : input, {
                name: col.field, 'e-mappinguid': col.uid,
                id: gObj.element.id + col.field,
            });
            classList(input, ['e-input', 'e-field'], []);
            if (col.textAlign === 'right') {
                input.classList.add('e-ralign');
            }
            if ((col.isPrimaryKey || col.isIdentity) && args.requestType === 'beginEdit') {
                input.setAttribute('disabled', 'true');
            }
            elements[col.uid] = input;
        }
        return elements;
    };
    return EditRender;
}());

/**
 * `BooleanEditCell` is used to handle boolean cell type editing.
 * @hidden
 */
var BooleanEditCell = /** @class */ (function () {
    function BooleanEditCell(parent) {
        this.activeClasses = ['e-selectionbackground', 'e-active'];
        this.parent = parent;
    }
    BooleanEditCell.prototype.create = function (args) {
        var col = args.column;
        var classNames = 'e-field e-boolcell';
        if (col.type === 'checkbox') {
            classNames = 'e-field e-boolcell e-edit-checkselect';
        }
        return createElement('input', {
            className: classNames, attrs: {
                type: 'checkbox', value: args.value, 'e-mappinguid': col.uid,
                id: this.parent.element.id + col.field, name: col.field
            }
        });
    };
    BooleanEditCell.prototype.read = function (element) {
        return element.checked;
    };
    BooleanEditCell.prototype.write = function (args) {
        var selectChkBox;
        var chkState;
        if (!isNullOrUndefined(args.row)) {
            selectChkBox = args.row.querySelector('.e-edit-checkselect');
        }
        if (args.rowData[args.column.field]) {
            chkState = JSON.parse(args.rowData[args.column.field].toString().toLowerCase());
        }
        if (!isNullOrUndefined(selectChkBox)) {
            this.editType = this.parent.editSettings.mode;
            this.editRow = args.row;
            if (args.requestType !== 'add') {
                var row = this.parent.getRowObjectFromUID(args.row.getAttribute('data-uid'));
                chkState = row ? row.isSelected : false;
            }
            addRemoveActiveClasses.apply(void 0, [[].slice.call(args.row.querySelectorAll('.e-rowcell')), chkState].concat(this.activeClasses));
        }
        this.obj = new CheckBox(extend({
            label: this.parent.editSettings.mode !== 'dialog' ? '' : args.column.headerText,
            checked: chkState,
            disabled: !isEditable(args.column, args.requestType, args.element), enableRtl: this.parent.enableRtl,
            change: this.checkBoxChange.bind(this)
        }, args.column.edit.params));
        this.obj.appendTo(args.element);
    };
    BooleanEditCell.prototype.checkBoxChange = function (args) {
        if (this.editRow && this.editType !== 'dialog') {
            var add = false;
            if (!args.checked) {
                this.editRow.removeAttribute('aria-selected');
            }
            else {
                add = true;
                this.editRow.setAttribute('aria-selected', add.toString());
            }
            addRemoveActiveClasses.apply(void 0, [[].slice.call(this.editRow.querySelectorAll('.e-rowcell')), add].concat(this.activeClasses));
        }
    };
    BooleanEditCell.prototype.destroy = function () {
        if (this.obj) {
            this.obj.destroy();
        }
    };
    return BooleanEditCell;
}());

/**
 * `DropDownEditCell` is used to handle dropdown cell type editing.
 * @hidden
 */
var DropDownEditCell = /** @class */ (function () {
    function DropDownEditCell(parent) {
        //constructor
        this.parent = parent;
    }
    DropDownEditCell.prototype.create = function (args) {
        //create
        return createElement('input', {
            className: 'e-field', attrs: {
                id: this.parent.element.id + args.column.field, name: args.column.field, type: 'text', 'e-mappinguid': args.column.uid,
            }
        });
    };
    DropDownEditCell.prototype.write = function (args) {
        var col = args.column;
        var isInline = this.parent.editSettings.mode !== 'dialog';
        this.obj = new DropDownList(extend({
            dataSource: this.parent.dataSource instanceof DataManager ?
                this.parent.dataSource : new DataManager(this.parent.dataSource),
            query: new Query().select(args.column.field), enabled: isEditable(args.column, args.requestType, args.element),
            fields: { value: args.column.field }, value: args.rowData[args.column.field],
            enableRtl: this.parent.enableRtl, actionComplete: this.ddActionComplete,
            placeholder: isInline ? '' : args.column.headerText, popupHeight: '200px',
            floatLabelType: isInline ? 'Never' : 'Always', open: this.dropDownOpen.bind(this),
        }, args.column.edit.params));
        this.obj.appendTo(args.element);
        args.element.setAttribute('name', args.column.field);
    };
    DropDownEditCell.prototype.read = function (element) {
        return element.ej2_instances[0].value;
    };
    DropDownEditCell.prototype.ddActionComplete = function (e) {
        e.result = e.result.filter(function (val, i, values) { return values.indexOf(val) === i; });
        e.result.sort();
    };
    DropDownEditCell.prototype.dropDownOpen = function (args) {
        var dlgElement = parentsUntil(this.obj.element, 'e-dialog');
        if (!isNullOrUndefined(dlgElement)) {
            var dlgObj = this.parent.element.querySelector('#' + dlgElement.id).ej2_instances[0];
            args.popup.element.style.zIndex = (dlgObj.zIndex + 1).toString();
        }
    };
    DropDownEditCell.prototype.destroy = function () {
        if (this.obj) {
            this.obj.destroy();
        }
    };
    return DropDownEditCell;
}());

/**
 * `NumericEditCell` is used to handle numeric cell type editing.
 * @hidden
 */
var NumericEditCell = /** @class */ (function () {
    function NumericEditCell(parent) {
        this.parent = parent;
    }
    NumericEditCell.prototype.create = function (args) {
        return createElement('input', {
            className: 'e-field', attrs: {
                id: this.parent.element.id + args.column.field, name: args.column.field, 'e-mappinguid': args.column.uid
            }
        });
    };
    NumericEditCell.prototype.read = function (element) {
        element.ej2_instances[0].focusOut();
        return element.ej2_instances[0].value;
    };
    NumericEditCell.prototype.write = function (args) {
        var col = args.column;
        var isInline = this.parent.editSettings.mode !== 'dialog';
        this.obj = new NumericTextBox(extend({
            value: parseFloat(args.rowData[col.field]), enableRtl: this.parent.enableRtl,
            placeholder: isInline ? '' : args.column.headerText,
            enabled: isEditable(args.column, args.requestType, args.element),
            floatLabelType: this.parent.editSettings.mode !== 'dialog' ? 'Never' : 'Always',
        }, col.edit.params));
        this.obj.appendTo(args.element);
        args.element.setAttribute('name', col.field);
    };
    NumericEditCell.prototype.destroy = function () {
        if (this.obj && !this.obj.isDestroyed) {
            this.obj.destroy();
        }
    };
    return NumericEditCell;
}());

/**
 * `DefaultEditCell` is used to handle default cell type editing.
 * @hidden
 */
var DefaultEditCell = /** @class */ (function () {
    function DefaultEditCell(parent) {
        this.parent = parent;
    }
    DefaultEditCell.prototype.create = function (args) {
        var col = args.column;
        var input = createElement('input', {
            className: 'e-field e-input e-defaultcell', attrs: {
                type: 'text', value: !isNullOrUndefined(args.value) ? args.value : '', 'e-mappinguid': col.uid,
                id: this.parent.element.id + col.field, name: col.field, style: 'text-align:' + col.textAlign,
            }
        });
        return input;
    };
    DefaultEditCell.prototype.read = function (element) {
        return element.value;
    };
    DefaultEditCell.prototype.write = function (args) {
        var col = args.column;
        var isInline = this.parent.editSettings.mode !== 'dialog';
        Input.createInput({
            element: args.element, floatLabelType: this.parent.editSettings.mode !== 'dialog' ? 'Never' : 'Always',
            properties: {
                enableRtl: this.parent.enableRtl, enabled: isEditable(args.column, args.requestType, args.element),
                placeholder: isInline ? '' : args.column.headerText
            }
        });
    };
    return DefaultEditCell;
}());

/**
 * `NormalEdit` module is used to handle normal('inline, dialog, external') editing actions.
 * @hidden
 */
var NormalEdit = /** @class */ (function () {
    function NormalEdit(parent, serviceLocator, renderer) {
        this.parent = parent;
        this.renderer = renderer;
        this.serviceLocator = serviceLocator;
        this.addEventListener();
    }
    NormalEdit.prototype.clickHandler = function (e) {
        var target = e.target;
        var gObj = this.parent;
        if (parentsUntil(target, 'e-gridcontent') && !parentsUntil(target, 'e-unboundcelldiv')) {
            this.rowIndex = parentsUntil(target, 'e-rowcell') ? parseInt(target.parentElement.getAttribute('aria-rowindex'), 10) : -1;
            if (gObj.isEdit) {
                gObj.editModule.endEdit();
            }
        }
    };
    NormalEdit.prototype.dblClickHandler = function (e) {
        if (parentsUntil(e.target, 'e-rowcell') && this.parent.editSettings.allowEditOnDblClick) {
            this.parent.editModule.startEdit(parentsUntil(e.target, 'e-row'));
        }
    };
    /**
     * The function used to trigger editComplete
     * @return {void}
     * @hidden
     */
    NormalEdit.prototype.editComplete = function (e) {
        this.parent.isEdit = false;
        switch (e.requestType) {
            case 'save':
                if (!this.parent.element.classList.contains('e-checkboxselection')
                    || !this.parent.element.classList.contains('e-persistselection')) {
                    this.parent.selectRow(0);
                }
                this.parent.trigger(actionComplete, extend(e, {
                    requestType: 'save',
                    type: actionComplete
                }));
                break;
            case 'delete':
                this.parent.selectRow(this.editRowIndex);
                this.parent.trigger(actionComplete, extend(e, {
                    requestType: 'delete',
                    type: actionComplete
                }));
                break;
        }
    };
    NormalEdit.prototype.startEdit = function (tr) {
        var gObj = this.parent;
        var primaryKeys = gObj.getPrimaryKeyFieldNames();
        var primaryKeyValues = [];
        this.rowIndex = this.editRowIndex = parseInt(tr.getAttribute('aria-rowindex'), 10);
        this.previousData = gObj.getCurrentViewRecords()[this.rowIndex];
        for (var i = 0; i < primaryKeys.length; i++) {
            primaryKeyValues.push(this.previousData[primaryKeys[i]]);
        }
        var args = {
            row: tr, primaryKey: primaryKeys, primaryKeyValue: primaryKeyValues, requestType: 'beginEdit',
            rowData: this.previousData, rowIndex: this.rowIndex, type: 'edit', cancel: false
        };
        gObj.trigger(beginEdit, args);
        args.type = 'actionBegin';
        gObj.trigger(actionBegin, args);
        if (args.cancel) {
            return;
        }
        gObj.isEdit = true;
        gObj.clearSelection();
        if (gObj.editSettings.mode === 'dialog') {
            args.row.classList.add('e-dlgeditrow');
        }
        this.renderer.update(args);
        this.uid = tr.getAttribute('data-uid');
        gObj.editModule.applyFormValidation();
        args.type = 'actionComplete';
        gObj.trigger(actionComplete, args);
    };
    NormalEdit.prototype.endEdit = function () {
        var gObj = this.parent;
        if (!this.parent.isEdit || !gObj.editModule.formObj.validate()) {
            return;
        }
        var editedData = extend({}, this.previousData);
        var args = {
            requestType: 'save', type: actionBegin, data: editedData, cancel: false,
            previousData: this.previousData, selectedRow: gObj.selectedRowIndex, foreignKeyData: {}
        };
        editedData = gObj.editModule.getCurrentEditedData(gObj.element.querySelector('.e-gridform'), editedData);
        if (gObj.element.querySelectorAll('.e-editedrow').length) {
            args.action = 'edit';
            gObj.trigger(actionBegin, args);
            if (args.cancel) {
                return;
            }
            gObj.showSpinner();
            this.destroyElements();
            gObj.notify(updateData, args);
        }
        else {
            args.action = 'add';
            args.selectedRow = 0;
            gObj.notify(modelChanged, args);
            if (args.cancel) {
                return;
            }
            this.destroyElements();
        }
        this.stopEditStatus();
        if (gObj.editSettings.mode === 'dialog' && args.action !== 'add') {
            gObj.element.querySelector('.e-dlgeditrow').classList.remove('e-dlgeditrow');
        }
    };
    NormalEdit.prototype.destroyElements = function () {
        var gObj = this.parent;
        gObj.editModule.destroyWidgets();
        gObj.editModule.destroyForm();
        gObj.notify(dialogDestroy, {});
    };
    NormalEdit.prototype.editHandler = function (args) {
        var _this = this;
        if (args.promise) {
            args.promise.then(function (e) { return _this.edSucc(e, args); }).catch(function (e) { return _this.edFail(e); });
        }
        else {
            this.editSuccess({}, args);
        }
    };
    NormalEdit.prototype.edSucc = function (e, args) {
        this.editSuccess(e, args);
    };
    NormalEdit.prototype.edFail = function (e) {
        this.editFailure(e);
    };
    NormalEdit.prototype.editSuccess = function (e, args) {
        if (e.result) {
            this.parent.trigger(beforeDataBound, e);
            args.data = e.result;
        }
        else {
            this.parent.trigger(beforeDataBound, args);
        }
        args.type = actionComplete;
        this.parent.isEdit = false;
        this.refreshRow(args.data);
        this.parent.trigger(actionComplete, args);
        if (!this.parent.element.classList.contains('e-checkboxselection')
            || !this.parent.element.classList.contains('e-persistselection')) {
            this.parent.selectRow(this.rowIndex > -1 ? this.rowIndex : this.editRowIndex);
        }
        this.parent.element.focus();
        this.parent.hideSpinner();
    };
    NormalEdit.prototype.editFailure = function (e) {
        this.parent.trigger(actionFailure, e);
    };
    NormalEdit.prototype.refreshRow = function (data) {
        var row = new RowRenderer(this.serviceLocator, null, this.parent);
        var rowObj = this.parent.getRowObjectFromUID(this.uid);
        if (rowObj) {
            rowObj.changes = data;
            row.refresh(rowObj, this.parent.getColumns(), true);
        }
    };
    NormalEdit.prototype.closeEdit = function () {
        if (!this.parent.isEdit) {
            return;
        }
        var gObj = this.parent;
        var args = {
            requestType: 'cancel', type: actionBegin, data: this.previousData, selectedRow: gObj.selectedRowIndex
        };
        gObj.trigger(actionBegin, args);
        gObj.isEdit = false;
        this.stopEditStatus();
        args.type = actionComplete;
        if (gObj.editSettings.mode !== 'dialog') {
            this.refreshRow(args.data);
        }
        gObj.selectRow(this.rowIndex);
        gObj.trigger(actionComplete, args);
    };
    NormalEdit.prototype.addRecord = function (data) {
        var gObj = this.parent;
        if (data) {
            gObj.notify(modelChanged, {
                requestType: 'save', type: actionBegin, data: data, selectedRow: 0, action: 'add'
            });
            return;
        }
        if (gObj.isEdit) {
            return;
        }
        this.previousData = {};
        this.uid = '';
        for (var _i = 0, _a = gObj.getColumns(); _i < _a.length; _i++) {
            var col = _a[_i];
            this.previousData[col.field] = data && data[col.field] ? data[col.field] : col.defaultValue;
        }
        var args = {
            cancel: false, foreignKeyData: {},
            requestType: 'add', data: this.previousData, type: actionBegin
        };
        gObj.trigger(actionBegin, args);
        if (args.cancel) {
            return;
        }
        gObj.isEdit = true;
        gObj.clearSelection();
        this.renderer.addNew({ rowData: args.data, requestType: 'add' });
        gObj.editModule.applyFormValidation();
        args.type = actionComplete;
        args.row = gObj.element.querySelector('.e-addedrow');
        gObj.trigger(actionComplete, args);
    };
    NormalEdit.prototype.deleteRecord = function (fieldname, data) {
        this.editRowIndex = this.parent.selectedRowIndex;
        this.parent.notify(modelChanged, {
            requestType: 'delete', type: actionBegin, foreignKeyData: {},
            data: data ? [data] : this.parent.getSelectedRecords(), tr: this.parent.getSelectedRows(), cancel: false
        });
    };
    NormalEdit.prototype.stopEditStatus = function () {
        var gObj = this.parent;
        var elem = gObj.element.querySelector('.e-addedrow');
        if (elem) {
            remove(elem);
        }
        elem = gObj.element.querySelector('.e-editedrow');
        if (elem) {
            elem.classList.remove('e-editedrow');
        }
    };
    /**
     * @hidden
     */
    NormalEdit.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(crudAction, this.editHandler, this);
        this.parent.on(doubleTap, this.dblClickHandler, this);
        this.parent.on(click, this.clickHandler, this);
        this.parent.on(dblclick, this.dblClickHandler, this);
        this.parent.on(deleteComplete, this.editComplete, this);
        this.parent.on(saveComplete, this.editComplete, this);
    };
    /**
     * @hidden
     */
    NormalEdit.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(crudAction, this.editHandler);
        this.parent.off(doubleTap, this.dblClickHandler);
        this.parent.off(click, this.clickHandler);
        this.parent.off(dblclick, this.dblClickHandler);
        this.parent.off(deleteComplete, this.editComplete);
        this.parent.off(saveComplete, this.editComplete);
    };
    /**
     * @hidden
     */
    NormalEdit.prototype.destroy = function () {
        this.removeEventListener();
    };
    return NormalEdit;
}());

var __extends$20 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `InlineEdit` module is used to handle inline editing actions.
 * @hidden
 */
var InlineEdit = /** @class */ (function (_super) {
    __extends$20(InlineEdit, _super);
    function InlineEdit(parent, serviceLocator, renderer) {
        var _this = _super.call(this, parent, serviceLocator) || this;
        _this.parent = parent;
        _this.serviceLocator = serviceLocator;
        _this.renderer = renderer;
        return _this;
    }
    InlineEdit.prototype.closeEdit = function () {
        _super.prototype.closeEdit.call(this);
    };
    InlineEdit.prototype.addRecord = function (data) {
        _super.prototype.addRecord.call(this, data);
    };
    InlineEdit.prototype.endEdit = function () {
        _super.prototype.endEdit.call(this);
    };
    InlineEdit.prototype.deleteRecord = function (fieldname, data) {
        _super.prototype.deleteRecord.call(this, fieldname, data);
    };
    InlineEdit.prototype.startEdit = function (tr) {
        _super.prototype.startEdit.call(this, tr);
    };
    return InlineEdit;
}(NormalEdit));

/**
 * `BatchEdit` module is used to handle batch editing actions.
 * @hidden
 */
var BatchEdit = /** @class */ (function () {
    function BatchEdit(parent, serviceLocator, renderer) {
        this.cellDetails = {};
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.renderer = renderer;
        this.focus = serviceLocator.getService('focus');
        this.addEventListener();
    }
    /**
     * @hidden
     */
    BatchEdit.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(click, this.clickHandler, this);
        this.parent.on(dblclick, this.dblClickHandler, this);
        this.parent.on(beforeCellFocused, this.onBeforeCellFocused, this);
        this.parent.on(cellFocused, this.onCellFocused, this);
        this.dataBoundFunction = this.dataBound.bind(this);
        this.parent.addEventListener(dataBound, this.dataBoundFunction);
        this.parent.on(doubleTap, this.dblClickHandler, this);
    };
    /**
     * @hidden
     */
    BatchEdit.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(click, this.clickHandler);
        this.parent.off(dblclick, this.dblClickHandler);
        this.parent.off(beforeCellFocused, this.onBeforeCellFocused);
        this.parent.on(cellFocused, this.onCellFocused);
        this.parent.removeEventListener(dataBound, this.dataBoundFunction);
        this.parent.off(doubleTap, this.dblClickHandler);
    };
    BatchEdit.prototype.dataBound = function () {
        this.parent.notify(toolbarRefresh, {});
    };
    /**
     * @hidden
     */
    BatchEdit.prototype.destroy = function () {
        this.removeEventListener();
    };
    BatchEdit.prototype.clickHandler = function (e) {
        if (!parentsUntil(e.target, this.parent.element.id + '_add', true)) {
            this.saveCell();
            if (parentsUntil(e.target, 'e-rowcell') && !this.parent.isEdit) {
                this.setCellIdx(e.target);
            }
        }
    };
    BatchEdit.prototype.dblClickHandler = function (e) {
        var target = parentsUntil(e.target, 'e-rowcell');
        var tr = parentsUntil(e.target, 'e-row');
        if (target && tr && !isNaN(parseInt(target.getAttribute('aria-colindex'), 10))) {
            this.editCell(parseInt(tr.getAttribute('aria-rowindex'), 10), this.parent.getColumns()[parseInt(target.getAttribute('aria-colindex'), 10)].field);
        }
    };
    BatchEdit.prototype.onBeforeCellFocused = function (e) {
        if (this.parent.isEdit && this.validateFormObj() &&
            (e.byClick || (['tab', 'shiftTab', 'enter', 'shiftEnter'].indexOf(e.keyArgs.action) > -1))) {
            e.cancel = true;
            if (e.byClick) {
                e.clickArgs.preventDefault();
            }
            else {
                e.keyArgs.preventDefault();
            }
        }
    };
    BatchEdit.prototype.onCellFocused = function (e) {
        var clear = !e.container.isContent || !e.container.isDataCell;
        if (!e.byKey || clear) {
            return;
        }
        var _a = e.container.indexes, rowIndex = _a[0], cellIndex = _a[1];
        var isEdit = this.parent.isEdit;
        if (!document.querySelectorAll('.e-popup-open').length) {
            isEdit = isEdit && !this.validateFormObj();
            switch (e.keyArgs.action) {
                case 'tab':
                case 'shiftTab':
                    if (isEdit) {
                        this.editCellFromIndex(rowIndex, cellIndex);
                    }
                    break;
                case 'enter':
                case 'shiftEnter':
                    e.keyArgs.preventDefault();
                    if (isEdit) {
                        this.editCell(rowIndex, this.cellDetails.column.field);
                    }
                    break;
                case 'f2':
                    this.editCellFromIndex(rowIndex, cellIndex);
                    this.focus.focus();
                    break;
            }
        }
    };
    BatchEdit.prototype.isAddRow = function (index) {
        return this.parent.getDataRows()[index].classList.contains('e-insertedrow');
    };
    BatchEdit.prototype.editCellFromIndex = function (rowIdx, cellIdx) {
        this.cellDetails.rowIndex = rowIdx;
        this.cellDetails.cellIndex = cellIdx;
        this.editCell(rowIdx, this.parent.getColumns()[cellIdx].field);
    };
    BatchEdit.prototype.closeEdit = function () {
        var gObj = this.parent;
        var rows = this.parent.getRowsObject();
        var rowRenderer = new RowRenderer(this.serviceLocator, null, this.parent);
        var tr;
        if (gObj.isEdit) {
            this.saveCell(true);
        }
        gObj.clearSelection();
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].isDirty) {
                tr = gObj.getContentTable().querySelector('[data-uid=' + rows[i].uid + ']');
                if (tr) {
                    if (tr.classList.contains('e-insertedrow')) {
                        remove(tr);
                        this.removeRowObjectFromUID(rows[i].uid);
                        i--;
                    }
                    else {
                        delete rows[i].changes;
                        rows[i].isDirty = false;
                        classList(tr, [], ['e-hiddenrow', 'e-updatedtd']);
                        rowRenderer.refresh(rows[i], gObj.getColumns(), false);
                    }
                }
            }
        }
        gObj.selectRow(this.cellDetails.rowIndex);
        this.refreshRowIdx();
        gObj.notify(toolbarRefresh, {});
        this.parent.notify(tooltipDestroy, {});
    };
    BatchEdit.prototype.deleteRecord = function (fieldname, data) {
        this.saveCell();
        if (!this.validateFormObj()) {
            this.bulkDelete(fieldname, data);
        }
    };
    BatchEdit.prototype.addRecord = function (data) {
        this.bulkAddRow(data);
    };
    BatchEdit.prototype.endEdit = function (data) {
        if (this.parent.isEdit && this.validateFormObj()) {
            return;
        }
        this.batchSave();
    };
    BatchEdit.prototype.validateFormObj = function () {
        return this.parent.editModule.formObj && !this.parent.editModule.formObj.validate();
    };
    BatchEdit.prototype.batchSave = function () {
        var gObj = this.parent;
        this.saveCell();
        if (gObj.isEdit) {
            return;
        }
        var changes = this.getBatchChanges();
        var args = { batchChanges: changes, cancel: false };
        gObj.trigger(beforeBatchSave, args);
        if (args.cancel) {
            return;
        }
        gObj.showSpinner();
        gObj.notify(bulkSave, { changes: changes });
    };
    BatchEdit.prototype.getBatchChanges = function () {
        var changes = {
            addedRecords: [],
            deletedRecords: [],
            changedRecords: []
        };
        var rows = this.parent.getRowsObject();
        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
            var row = rows_1[_i];
            if (row.isDirty) {
                switch (row.edit) {
                    case 'add':
                        changes.addedRecords.push(row.changes);
                        break;
                    case 'delete':
                        changes.deletedRecords.push(row.data);
                        break;
                    default:
                        changes.changedRecords.push(row.changes);
                }
            }
        }
        return changes;
    };
    /**
     * @hidden
     */
    BatchEdit.prototype.removeRowObjectFromUID = function (uid) {
        var rows = this.parent.getRowsObject();
        var i = 0;
        for (var len = rows.length; i < len; i++) {
            if (rows[i].uid === uid) {
                break;
            }
        }
        rows.splice(i, 1);
    };
    /**
     * @hidden
     */
    BatchEdit.prototype.addRowObject = function (row) {
        this.parent.getRowsObject().unshift(row);
    };
    BatchEdit.prototype.bulkDelete = function (fieldname, data) {
        var gObj = this.parent;
        var index = data ? this.getIndexFromData(data) : gObj.selectedRowIndex;
        var args = {
            primaryKey: this.parent.getPrimaryKeyFieldNames(),
            rowIndex: index,
            rowData: data ? data : gObj.getSelectedRecords()[0],
            row: data ? gObj.getRows()[index] : gObj.getSelectedRows()[0], cancel: false
        };
        if (!args.row) {
            return;
        }
        gObj.trigger(beforeBatchDelete, args);
        if (args.cancel) {
            return;
        }
        gObj.clearSelection();
        var uid = args.row.getAttribute('data-uid');
        if (args.row.classList.contains('e-insertedrow')) {
            this.removeRowObjectFromUID(uid);
            remove(args.row);
        }
        else {
            var rowObj = gObj.getRowObjectFromUID(uid);
            rowObj.isDirty = true;
            rowObj.edit = 'delete';
            classList(args.row, ['e-hiddenrow', 'e-updatedtd'], []);
        }
        this.refreshRowIdx();
        gObj.selectRow(index);
        delete args.row;
        gObj.trigger(batchDelete, args);
        gObj.notify(batchDelete, { rows: this.parent.getRowsObject() });
        gObj.notify(toolbarRefresh, {});
    };
    BatchEdit.prototype.refreshRowIdx = function () {
        var rows = [].slice.call(this.parent.getContentTable().querySelector('tbody').children);
        for (var i = 0, j = 0, len = rows.length; i < len; i++) {
            if (rows[i].classList.contains('e-row') && !rows[i].classList.contains('e-hiddenrow')) {
                rows[i].setAttribute('aria-rowindex', j.toString());
                j++;
            }
            else {
                rows[i].removeAttribute('aria-rowindex');
            }
        }
    };
    BatchEdit.prototype.getIndexFromData = function (data) {
        return inArray(data, this.parent.getCurrentViewRecords());
    };
    BatchEdit.prototype.bulkAddRow = function (data) {
        var gObj = this.parent;
        if (!gObj.editSettings.allowAdding) {
            return;
        }
        if (gObj.isEdit) {
            this.saveCell();
        }
        if (gObj.isEdit) {
            return;
        }
        var defaultData = data ? data : this.getDefaultData();
        var args = {
            defaultData: defaultData,
            primaryKey: gObj.getPrimaryKeyFieldNames(),
            cancel: false
        };
        gObj.trigger(beforeBatchAdd, args);
        if (args.cancel) {
            return;
        }
        gObj.clearSelection();
        var row = new RowRenderer(this.serviceLocator, null, this.parent);
        var model = new RowModelGenerator(this.parent);
        var modelData = model.generateRows([args.defaultData]);
        var tr = row.render(modelData[0], gObj.getColumns());
        var col;
        var index;
        for (var i = 0; i < this.parent.groupSettings.columns.length; i++) {
            tr.insertBefore(createElement('td', { className: 'e-indentcell' }), tr.firstChild);
            modelData[0].cells.unshift(new Cell({ cellType: CellType.Indent }));
        }
        var tbody = gObj.getContentTable().querySelector('tbody');
        tr.classList.add('e-insertedrow');
        tbody.insertBefore(tr, tbody.firstChild);
        addClass(tr.querySelectorAll('.e-rowcell'), ['e-updatedtd']);
        modelData[0].isDirty = true;
        modelData[0].changes = extend({}, modelData[0].data);
        modelData[0].edit = 'add';
        this.addRowObject(modelData[0]);
        this.refreshRowIdx();
        this.focus.forgetPrevious();
        gObj.selectRow(0);
        if (!data) {
            index = this.findNextEditableCell(0, true);
            col = gObj.getColumns()[index];
            this.editCell(0, col.field, true);
        }
        var args1 = {
            defaultData: args.defaultData, row: tr,
            columnObject: col, columnIndex: index, primaryKey: args.primaryKey, cell: tr.cells[index]
        };
        gObj.trigger(batchAdd, args1);
        gObj.notify(batchAdd, { rows: this.parent.getRowsObject() });
    };
    BatchEdit.prototype.findNextEditableCell = function (columnIndex, isAdd) {
        var cols = this.parent.getColumns();
        var endIndex = cols.length;
        for (var i = columnIndex; i < endIndex; i++) {
            if (!isAdd && this.checkNPCell(cols[i])) {
                return i;
            }
            else if (isAdd && !cols[i].template && cols[i].visible && cols[i].allowEditing) {
                return i;
            }
        }
        return -1;
    };
    BatchEdit.prototype.checkNPCell = function (col) {
        return !col.template && col.visible && !col.isPrimaryKey && !col.isIdentity && col.allowEditing;
    };
    BatchEdit.prototype.getDefaultData = function () {
        var gObj = this.parent;
        var data = {};
        var dValues = { 'number': 0, 'string': null, 'boolean': false, 'date': null, 'datetime': null };
        for (var _i = 0, _a = gObj.getColumns(); _i < _a.length; _i++) {
            var col = _a[_i];
            data[col.field] = col.defaultValue ? col.defaultValue : dValues[col.type];
        }
        return data;
    };
    BatchEdit.prototype.setCellIdx = function (target) {
        var gLen = 0;
        if (this.parent.allowGrouping) {
            gLen = this.parent.groupSettings.columns.length;
        }
        this.cellDetails.cellIndex = target.cellIndex - gLen;
        this.cellDetails.rowIndex = parseInt(target.parentElement.getAttribute('aria-rowindex'), 10);
    };
    BatchEdit.prototype.editCell = function (index, field, isAdd) {
        var gObj = this.parent;
        var col = gObj.getColumnByField(field);
        var keys = gObj.getPrimaryKeyFieldNames();
        if (gObj.editSettings.allowEditing && col.allowEditing) {
            if (gObj.isEdit && !(this.cellDetails.column.field === field && this.cellDetails.rowIndex === index)) {
                this.saveCell();
            }
            if (gObj.isEdit) {
                return;
            }
            var row = gObj.getDataRows()[index];
            if ((keys[0] === col.field && !row.classList.contains('e-insertedrow')) || col.template || col.columns) {
                return;
            }
            var rowData = extend({}, this.getDataByIndex(index));
            var cells = [].slice.apply(row.cells);
            var args = {
                cell: cells[this.getColIndex(cells, this.getCellIdx(col.uid))], row: row,
                columnName: col.field, columnObject: col, isForeignKey: !isNullOrUndefined(col.foreignKeyValue),
                primaryKey: keys, rowData: rowData,
                validationRules: extend({}, col.validationRules ? col.validationRules : {}),
                value: rowData[col.field], type: !isAdd ? 'edit' : 'add', cancel: false
            };
            if (!args.cell) {
                return;
            }
            gObj.trigger(cellEdit, args);
            if (args.cancel) {
                return;
            }
            this.cellDetails = {
                rowData: rowData, column: col, value: args.value, isForeignKey: args.isForeignKey, rowIndex: index,
                cellIndex: parseInt(args.cell.getAttribute('aria-colindex'), 10)
            };
            if (args.cell.classList.contains('e-updatedtd')) {
                this.isColored = true;
                args.cell.classList.remove('e-updatedtd');
            }
            gObj.isEdit = true;
            gObj.clearSelection();
            if (!gObj.element.classList.contains('e-checkboxselection') || !gObj.element.classList.contains('e-persistselection')) {
                gObj.selectRow(this.cellDetails.rowIndex, true);
            }
            this.renderer.update(args);
            this.form = gObj.element.querySelector('#' + gObj.element.id + 'EditForm');
            gObj.editModule.applyFormValidation([col]);
            this.parent.element.querySelector('.e-gridpopup').style.display = 'none';
        }
    };
    BatchEdit.prototype.updateCell = function (rowIndex, field, value) {
        var col = this.parent.getColumnByField(field);
        if (col && !col.isPrimaryKey) {
            var td = this.parent.getDataRows()[rowIndex].cells[this.parent.getColumnIndexByField(field)];
            var rowObj = this.parent.getRowObjectFromUID(td.parentElement.getAttribute('data-uid'));
            this.refreshTD(td, col, rowObj, value);
            this.parent.trigger(queryCellInfo, {
                cell: td, column: col, data: rowObj.changes
            });
        }
    };
    BatchEdit.prototype.setChanges = function (rowObj, field, value) {
        if (!rowObj.changes) {
            rowObj.changes = extend({}, rowObj.data);
        }
        rowObj.changes[field] = value;
        if (rowObj.data[field] !== value) {
            rowObj.isDirty = true;
        }
    };
    BatchEdit.prototype.updateRow = function (index, data) {
        var keys = Object.keys(data);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var col = keys_1[_i];
            this.updateCell(index, col, data[col]);
        }
    };
    BatchEdit.prototype.getCellIdx = function (uid) {
        var cIdx = this.parent.getColumnIndexByUid(uid) + this.parent.groupSettings.columns.length;
        if (!isNullOrUndefined(this.parent.detailTemplate) || !isNullOrUndefined(this.parent.childGrid)) {
            cIdx++;
        }
        return cIdx;
    };
    BatchEdit.prototype.refreshTD = function (td, column, rowObj, value) {
        var cell = new CellRenderer(this.parent, this.serviceLocator);
        this.setChanges(rowObj, column.field, value);
        cell.refreshTD(td, rowObj.cells[this.getCellIdx(column.uid)], rowObj.changes);
        td.classList.add('e-updatedtd');
        this.parent.notify(toolbarRefresh, {});
    };
    BatchEdit.prototype.getColIndex = function (cells, index) {
        for (var m = 0; m < cells.length; m++) {
            var colIndex = parseInt(cells[m].getAttribute('aria-colindex'), 10);
            if (colIndex === index) {
                return m;
            }
        }
        return -1;
    };
    BatchEdit.prototype.saveCell = function (isForceSave) {
        var gObj = this.parent;
        if (!isForceSave && (!gObj.isEdit || this.validateFormObj())) {
            return;
        }
        var tr = parentsUntil(this.form, 'e-row');
        var column = this.cellDetails.column;
        var editedData = gObj.editModule.getCurrentEditedData(this.form, {});
        editedData = extend(this.cellDetails.rowData, editedData);
        var args = {
            columnName: column.field,
            value: editedData[column.field],
            rowData: this.cellDetails.rowData,
            previousValue: this.cellDetails.value,
            columnObject: column,
            cell: this.form.parentElement,
            isForeignKey: this.cellDetails.isForeignKey, cancel: false
        };
        if (!isForceSave) {
            gObj.trigger(cellSave, args);
        }
        if (args.cancel) {
            return;
        }
        gObj.editModule.destroyForm();
        gObj.editModule.destroyWidgets([column]);
        this.parent.notify(tooltipDestroy, {});
        this.refreshTD(args.cell, column, gObj.getRowObjectFromUID(tr.getAttribute('data-uid')), args.value);
        removeClass([tr], ['e-editedrow', 'e-batchrow']);
        removeClass([args.cell], ['e-editedbatchcell', 'e-boolcell']);
        gObj.isEdit = false;
        if (!isNullOrUndefined(args.value) && args.value.toString() ===
            (!isNullOrUndefined(this.cellDetails.value) ? this.cellDetails.value : '').toString() && !this.isColored) {
            args.cell.classList.remove('e-updatedtd');
        }
        gObj.notify(toolbarRefresh, {});
        this.isColored = false;
    };
    BatchEdit.prototype.getDataByIndex = function (index) {
        var row = this.parent.getRowObjectFromUID(this.parent.getDataRows()[index].getAttribute('data-uid'));
        return row.changes ? row.changes : row.data;
    };
    return BatchEdit;
}());

var __extends$21 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `DialogEdit` module is used to handle dialog editing actions.
 * @hidden
 */
var DialogEdit = /** @class */ (function (_super) {
    __extends$21(DialogEdit, _super);
    function DialogEdit(parent, serviceLocator, renderer) {
        var _this = 
        //constructor
        _super.call(this, parent, serviceLocator) || this;
        _this.parent = parent;
        _this.serviceLocator = serviceLocator;
        _this.renderer = renderer;
        return _this;
    }
    DialogEdit.prototype.closeEdit = function () {
        //closeEdit
        _super.prototype.closeEdit.call(this);
    };
    DialogEdit.prototype.addRecord = function (data) {
        //addRecord
        _super.prototype.addRecord.call(this, data);
    };
    DialogEdit.prototype.endEdit = function () {
        //endEdit
        _super.prototype.endEdit.call(this);
    };
    DialogEdit.prototype.deleteRecord = function (fieldname, data) {
        //deleteRecord
        _super.prototype.deleteRecord.call(this, fieldname, data);
    };
    DialogEdit.prototype.startEdit = function (tr) {
        _super.prototype.startEdit.call(this, tr);
    };
    return DialogEdit;
}(NormalEdit));

/**
 * `DatePickerEditCell` is used to handle datepicker cell type editing.
 * @hidden
 */
var DatePickerEditCell = /** @class */ (function () {
    function DatePickerEditCell(parent) {
        this.parent = parent;
    }
    DatePickerEditCell.prototype.create = function (args) {
        return createElement('input', {
            className: 'e-field', attrs: {
                id: this.parent.element.id + args.column.field, name: args.column.field, type: 'text', 'e-mappinguid': args.column.uid
            }
        });
    };
    DatePickerEditCell.prototype.read = function (element) {
        return element.ej2_instances[0].value;
    };
    DatePickerEditCell.prototype.write = function (args) {
        var isInline = this.parent.editSettings.mode !== 'dialog';
        this.obj = new DatePicker(extend({
            floatLabelType: isInline ? 'Never' : 'Always',
            value: new Date(args.rowData[args.column.field]), placeholder: isInline ?
                '' : args.column.headerText, enableRtl: this.parent.enableRtl,
            enabled: isEditable(args.column, args.type, args.element),
        }, args.column.edit.params));
        this.obj.appendTo(args.element);
    };
    DatePickerEditCell.prototype.destroy = function () {
        if (this.obj) {
            this.obj.destroy();
        }
    };
    return DatePickerEditCell;
}());

/**
 * `Edit` module is used to handle editing actions.
 */
var Edit = /** @class */ (function () {
    /**
     * Constructor for the Grid editing module
     * @hidden
     */
    function Edit(parent, serviceLocator) {
        this.editCellType = {
            'dropdownedit': DropDownEditCell, 'numericedit': NumericEditCell,
            'datepickeredit': DatePickerEditCell, 'booleanedit': BooleanEditCell, 'defaultedit': DefaultEditCell
        };
        this.editType = { 'inline': InlineEdit, 'normal': InlineEdit, 'batch': BatchEdit, 'dialog': DialogEdit };
        this.tapped = false;
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.l10n = this.serviceLocator.getService('localization');
        this.addEventListener();
        this.updateEditObj();
        this.createAlertDlg();
        this.createConfirmDlg();
    }
    Edit.prototype.updateColTypeObj = function () {
        for (var _i = 0, _a = this.parent.getColumns(); _i < _a.length; _i++) {
            var col = _a[_i];
            col.edit = extend(new this.editCellType[col.editType && this.editCellType[col.editType] ?
                col.editType : 'defaultedit'](this.parent, this.serviceLocator), col.edit || {});
        }
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Edit.prototype.getModuleName = function () {
        return 'edit';
    };
    /**
     * @hidden
     */
    Edit.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        var gObj = this.parent;
        var newProp = e.properties;
        for (var _i = 0, _a = Object.keys(e.properties); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'allowAdding':
                case 'allowDeleting':
                case 'allowEditing':
                    if (gObj.editSettings.allowAdding || gObj.editSettings.allowEditing || gObj.editSettings.allowDeleting) {
                        this.initialEnd();
                    }
                    break;
                case 'mode':
                    this.updateEditObj();
                    gObj.isEdit = false;
                    gObj.refresh();
                    break;
            }
        }
    };
    Edit.prototype.updateEditObj = function () {
        if (this.editModule) {
            this.editModule.destroy();
        }
        this.renderer = new EditRender(this.parent, this.serviceLocator);
        this.editModule = new this.editType[this.parent.editSettings.mode](this.parent, this.serviceLocator, this.renderer);
    };
    Edit.prototype.initialEnd = function () {
        this.updateColTypeObj();
    };
    Edit.prototype.wireEvents = function () {
        EventHandler.add(this.parent.getContent(), 'touchstart', this.tapEvent, this);
    };
    Edit.prototype.unwireEvents = function () {
        EventHandler.remove(this.parent.getContent(), 'touchstart', this.tapEvent);
    };
    Edit.prototype.tapEvent = function (e) {
        if (this.getUserAgent()) {
            if (!this.tapped) {
                this.tapped = setTimeout(this.timeoutHandler(), 300);
            }
            else {
                clearTimeout(this.tapped);
                this.parent.notify(doubleTap, e);
                this.tapped = null;
            }
        }
    };
    Edit.prototype.getUserAgent = function () {
        var userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipod|ipad/.test(userAgent);
    };
    Edit.prototype.timeoutHandler = function () {
        this.tapped = null;
    };
    /**
     * To edit any particular row by TR element.
     * @param {HTMLTableRowElement} tr - Defines the table row to be edited.
     */
    Edit.prototype.startEdit = function (tr) {
        var gObj = this.parent;
        if (!gObj.editSettings.allowEditing || gObj.isEdit || gObj.editSettings.mode === 'batch') {
            return;
        }
        if (!gObj.getSelectedRows().length) {
            if (!tr) {
                this.showDialog('EditOperationAlert', this.alertDObj);
                return;
            }
        }
        else if (!tr) {
            tr = gObj.getSelectedRows()[0];
        }
        if (tr.style.display === 'none') {
            return;
        }
        this.editModule.startEdit(tr);
        this.refreshToolbar();
        gObj.element.querySelector('.e-gridpopup').style.display = 'none';
        this.parent.notify('start-edit', {});
    };
    /**
     * Cancel edited state.
     */
    Edit.prototype.closeEdit = function () {
        if (this.parent.editSettings.mode === 'batch' && this.parent.editSettings.showConfirmDialog
            && this.parent.element.querySelectorAll('.e-updatedtd').length) {
            this.showDialog('CancelEdit', this.dialogObj);
            return;
        }
        this.editModule.closeEdit();
        this.refreshToolbar();
        this.parent.notify('close-edit', {});
    };
    Edit.prototype.refreshToolbar = function () {
        this.parent.notify(toolbarRefresh, {});
    };
    /**
     * To add a new row at top of rows with given data. If data is not passed then it will render empty row.
     * > `editSettings.allowEditing` should be true.
     * @param {Object} data - Defines the new add record data.
     */
    Edit.prototype.addRecord = function (data) {
        if (!this.parent.editSettings.allowAdding) {
            return;
        }
        this.editModule.addRecord(data);
        this.refreshToolbar();
        this.parent.notify('start-add', {});
    };
    /**
     * Delete a record with Given options. If fieldname and data is not given then grid will delete the selected record.
     * > `editSettings.allowDeleting` should be true.
     * @param {string} fieldname - Defines the primary key field Name of the column.
     * @param {Object} data - Defines the JSON data of record need to be delete.
     */
    Edit.prototype.deleteRecord = function (fieldname, data) {
        var gObj = this.parent;
        if (!gObj.editSettings.allowDeleting) {
            return;
        }
        if (!data) {
            if (isNullOrUndefined(gObj.selectedRowIndex) || gObj.selectedRowIndex === -1) {
                this.showDialog('DeleteOperationAlert', this.alertDObj);
                return;
            }
            if (gObj.editSettings.showDeleteConfirmDialog) {
                this.showDialog('ConfirmDelete', this.dialogObj);
                return;
            }
        }
        this.editModule.deleteRecord(fieldname, data);
    };
    /**
     * Delete any visible row by TR element.
     * @param {HTMLTableRowElement} tr - Defines the table row element.
     */
    Edit.prototype.deleteRow = function (tr) {
        this.deleteRecord(null, this.parent.getCurrentViewRecords()[parseInt(tr.getAttribute('aria-rowindex'), 10)]);
    };
    /**
     * If Grid is in editable state, then you can save a record by invoking endEdit.
     */
    Edit.prototype.endEdit = function () {
        if (this.parent.editSettings.mode === 'batch' && this.parent.editSettings.showConfirmDialog) {
            this.showDialog('BatchSaveConfirm', this.dialogObj);
            return;
        }
        this.endEditing();
    };
    /**
     * To update value of any cell without change into edit mode.
     * @param {number} rowIndex - Defines the row index.
     * @param {string} field - Defines the column field.
     * @param {string | number | boolean | Date} value - Defines the value to change.
     */
    Edit.prototype.updateCell = function (rowIndex, field, value) {
        this.editModule.updateCell(rowIndex, field, value);
    };
    /**
     * To update values of a row without changing into edit mode.
     * @param {number} index - Defines the row index.
     * @param {Object} data - Defines the data object to update.
     */
    Edit.prototype.updateRow = function (index, data) {
        this.editModule.updateRow(index, data);
    };
    /**
     * To reset added, edited and deleted records in batch mode.
     */
    Edit.prototype.batchCancel = function () {
        this.closeEdit();
    };
    /**
     * To bulk Save added, edited and deleted records in batch mode.
     */
    Edit.prototype.batchSave = function () {
        this.endEdit();
    };
    /**
     * To turn any particular cell into edited state by row index and field name in batch mode.
     * @param {number} index - Defines row index to edit particular cell.
     * @param {string} field - Defines the field name of the column to perform batch edit.
     */
    Edit.prototype.editCell = function (index, field) {
        this.editModule.editCell(index, field);
    };
    /**
     * To check current status of validation at the time of edited state. If validation passed then it will return true.
     * @return {boolean}
     */
    Edit.prototype.editFormValidate = function () {
        if (this.formObj) {
            return this.formObj.validate();
        }
        return false;
    };
    /**
     * To get added, edited and deleted data before bulk save to data source in batch mode.
     * @return {Object}
     */
    Edit.prototype.getBatchChanges = function () {
        return this.editModule.getBatchChanges ? this.editModule.getBatchChanges() : {};
    };
    /**
     * To get current value of edited component.
     */
    Edit.prototype.getCurrentEditCellData = function () {
        var obj = this.getCurrentEditedData(this.formObj.element, {});
        return obj[Object.keys(obj)[0]];
    };
    /**
     * To save current edited cell in batch. It does not save value to data source.
     */
    Edit.prototype.saveCell = function () {
        this.editModule.saveCell();
    };
    Edit.prototype.endEditing = function () {
        this.editModule.endEdit();
        this.refreshToolbar();
    };
    Edit.prototype.showDialog = function (content, obj) {
        obj.content = '<div>' + this.l10n.getConstant(content) + '</div>';
        obj.dataBind();
        obj.show();
    };
    Edit.prototype.getValueFromType = function (col, value) {
        var val = value;
        switch (col.type) {
            case 'number':
                val = !isNaN(parseFloat(value)) ? parseFloat(value) : null;
                break;
            case 'boolean':
                if (col.editType !== 'booleanedit') {
                    val = value === this.l10n.getConstant('True') ? true : false;
                }
                break;
            case 'date':
                if (col.editType !== 'datepicker' && value && value.length) {
                    val = new Date(value);
                }
                break;
        }
        return val;
    };
    Edit.prototype.destroyToolTip = function () {
        var elements = [].slice.call(this.parent.getContentTable().querySelectorAll('.e-griderror'));
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var elem = elements_1[_i];
            remove(elem);
        }
    };
    Edit.prototype.createConfirmDlg = function () {
        this.dialogObj = this.dlgWidget([
            {
                click: this.dlgOk.bind(this),
                buttonModel: { content: this.l10n.getConstant('OKButton'), cssClass: 'e-primary', isPrimary: true }
            },
            {
                click: this.dlgCancel.bind(this),
                buttonModel: { cssClass: 'e-flat', content: this.l10n.getConstant('CancelButton') }
            }
        ], 'EditConfirm');
    };
    Edit.prototype.createAlertDlg = function () {
        this.alertDObj = this.dlgWidget([
            {
                click: this.alertClick.bind(this), buttonModel: { content: this.l10n.getConstant('OKButton'), cssClass: 'e-flat', isPrimary: true }
            }
        ], 'EditAlert');
    };
    Edit.prototype.alertClick = function () {
        this.alertDObj.hide();
    };
    Edit.prototype.dlgWidget = function (btnOptions, name) {
        var div = createElement('div', { id: this.parent.element.id + name });
        this.parent.element.appendChild(div);
        var options = {
            showCloseIcon: false,
            isModal: true,
            visible: false,
            closeOnEscape: true,
            target: this.parent.element,
            width: '320px',
            animationSettings: { effect: 'None' }
        };
        options.buttons = btnOptions;
        var obj = new Dialog(options);
        obj.appendTo(div);
        changeButtonType(obj.element);
        return obj;
    };
    Edit.prototype.dlgCancel = function () {
        this.dialogObj.hide();
    };
    Edit.prototype.dlgOk = function (e) {
        switch (this.dialogObj.element.querySelector('.e-dlg-content').firstElementChild.innerText) {
            case this.l10n.getConstant('ConfirmDelete'):
                this.editModule.deleteRecord();
                break;
            case this.l10n.getConstant('CancelEdit'):
                this.editModule.closeEdit();
                break;
            case this.l10n.getConstant('BatchSaveConfirm'):
                this.endEditing();
                break;
            case this.l10n.getConstant('BatchSaveLostChanges'):
                this.executeAction();
                break;
        }
        this.dlgCancel();
    };
    /**
     * @hidden
     */
    Edit.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(inBoundModelChanged, this.onPropertyChanged, this);
        this.parent.on(initialEnd, this.initialEnd, this);
        this.parent.on(keyPressed, this.keyPressHandler, this);
        this.parent.on(autoCol, this.updateColTypeObj, this);
        this.parent.on(tooltipDestroy, this.destroyToolTip, this);
        this.parent.on(preventBatch, this.preventBatch, this);
        this.parent.on(destroyForm, this.destroyForm, this);
        this.actionBeginFunction = this.onActionBegin.bind(this);
        this.actionCompleteFunction = this.actionComplete.bind(this);
        this.parent.addEventListener(actionBegin, this.actionBeginFunction);
        this.parent.addEventListener(actionComplete, this.actionCompleteFunction);
        this.parent.on(initialEnd, this.wireEvents, this);
    };
    /**
     * @hidden
     */
    Edit.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(inBoundModelChanged, this.onPropertyChanged);
        this.parent.off(initialEnd, this.initialEnd);
        this.parent.off(keyPressed, this.keyPressHandler);
        this.parent.off(autoCol, this.updateColTypeObj);
        this.parent.off(tooltipDestroy, this.destroyToolTip);
        this.parent.off(preventBatch, this.preventBatch);
        this.parent.off(destroyForm, this.destroyForm);
        this.parent.removeEventListener(actionComplete, this.actionCompleteFunction);
        this.parent.removeEventListener(actionBegin, this.actionBeginFunction);
        this.parent.off(initialEnd, this.unwireEvents);
    };
    Edit.prototype.actionComplete = function (e) {
        var actions = ['add', 'beginEdit', 'save', 'delete', 'cancel'];
        if (actions.indexOf(e.requestType) < 0) {
            this.parent.isEdit = false;
        }
        this.refreshToolbar();
    };
    /**
     * @hidden
     */
    Edit.prototype.getCurrentEditedData = function (form, editedData) {
        var gObj = this.parent;
        var inputs = [].slice.call(form.querySelectorAll('.e-field'));
        for (var i = 0, len = inputs.length; i < len; i++) {
            var col = gObj.getColumnByUid(inputs[i].getAttribute('e-mappinguid'));
            var value = void 0;
            if (col && col.field) {
                var temp = col.edit.read;
                if (typeof temp === 'string') {
                    temp = getValue(temp, window);
                }
                if (col.type !== 'checkbox') {
                    value = gObj.editModule.getValueFromType(col, col.edit.read(inputs[i]));
                }
                else {
                    value = inputs[i].checked;
                }
                setValue(col.field, value, editedData);
            }
        }
        return editedData;
    };
    /**
     * @hidden
     */
    Edit.prototype.onActionBegin = function (e) {
        if (this.parent.editSettings.mode !== 'batch' && e.requestType !== 'save' && this.formObj && !this.formObj.isDestroyed) {
            this.destroyForm();
            this.destroyWidgets();
        }
    };
    /**
     * @hidden
     */
    Edit.prototype.destroyWidgets = function (cols) {
        cols = cols ? cols : this.parent.getColumns();
        for (var _i = 0, cols_1 = cols; _i < cols_1.length; _i++) {
            var col = cols_1[_i];
            if (col.edit.destroy) {
                col.edit.destroy();
            }
        }
    };
    /**
     * @hidden
     */
    Edit.prototype.destroyForm = function () {
        this.destroyToolTip();
        if (this.formObj && !this.formObj.isDestroyed) {
            this.formObj.destroy();
        }
        this.destroyToolTip();
    };
    /**
     * To destroy the editing.
     * @return {void}
     * @hidden
     */
    Edit.prototype.destroy = function () {
        this.destroyForm();
        this.removeEventListener();
        var elem = this.dialogObj.element;
        this.dialogObj.destroy();
        remove(elem);
        elem = this.alertDObj.element;
        this.alertDObj.destroy();
        remove(elem);
        this.unwireEvents();
    };
    Edit.prototype.keyPressHandler = function (e) {
        switch (e.action) {
            case 'insert':
                this.addRecord();
                break;
            case 'delete':
                this.deleteRecord();
                break;
            case 'f2':
                this.startEdit();
                break;
            case 'enter':
                if (!parentsUntil(e.target, '.e-unboundcelldiv') && this.parent.editSettings.mode !== 'batch' &&
                    parentsUntil(e.target, 'e-gridcontent') && !document.querySelectorAll('.e-popup-open').length) {
                    e.preventDefault();
                    this.endEdit();
                }
                break;
            case 'escape':
                this.closeEdit();
                break;
        }
    };
    Edit.prototype.preventBatch = function (args) {
        this.preventObj = args;
        this.showDialog('BatchSaveLostChanges', this.dialogObj);
    };
    Edit.prototype.executeAction = function () {
        this.preventObj.handler.call(this.preventObj.instance, this.preventObj.arg1, this.preventObj.arg2, this.preventObj.arg3, this.preventObj.arg4, this.preventObj.arg5, this.preventObj.arg6, this.preventObj.arg7);
    };
    /**
     * @hidden
     */
    Edit.prototype.applyFormValidation = function (cols) {
        var _this = this;
        var gObj = this.parent;
        var form = gObj.element.querySelector('.e-gridform');
        var rules = {};
        cols = cols ? cols : gObj.columns;
        for (var _i = 0, cols_2 = cols; _i < cols_2.length; _i++) {
            var col = cols_2[_i];
            if (col.validationRules && form.querySelectorAll('#' + gObj.element.id + col.field).length) {
                rules[col.field] = col.validationRules;
            }
        }
        this.parent.editModule.formObj = new FormValidator(form, {
            rules: rules,
            validationComplete: function (args) {
                _this.validationComplete(args);
            },
            customPlacement: function (inputElement, error) {
                _this.valErrorPlacement(inputElement, error);
            }
        });
    };
    Edit.prototype.valErrorPlacement = function (inputElement, error) {
        if (this.parent.isEdit) {
            var id = error.getAttribute('for');
            var parentElem = this.parent.editSettings.mode !== 'dialog' ? this.parent.getContentTable() :
                this.parent.element.querySelector('#' + this.parent.element.id + '_dialogEdit_wrapper');
            var elem = parentElem.querySelector('#' + id + '_Error');
            if (!elem) {
                this.createTooltip(inputElement, error, id, '');
            }
            else {
                elem.querySelector('.e-tip-content').innerHTML = error.innerHTML;
            }
        }
    };
    Edit.prototype.validationComplete = function (args) {
        if (this.parent.isEdit) {
            var parentElem = this.parent.editSettings.mode !== 'dialog' ? this.parent.getContentTable() :
                this.parent.element.querySelector('#' + this.parent.element.id + '_dialogEdit_wrapper');
            var elem = parentElem.querySelector('#' + args.inputName + '_Error');
            if (elem) {
                if (args.status === 'failure') {
                    elem.style.display = '';
                }
                else {
                    elem.style.display = 'none';
                }
            }
        }
    };
    Edit.prototype.createTooltip = function (element, error, name, display) {
        var table = this.parent.editSettings.mode !== 'dialog' ? this.parent.getContentTable() :
            this.parent.element.querySelector('#' + this.parent.element.id + '_dialogEdit_wrapper').querySelector('.e-dlg-content');
        var client = table.getBoundingClientRect();
        var inputClient = parentsUntil(element, 'e-rowcell').getBoundingClientRect();
        var div = createElement('div', {
            className: 'e-tooltip-wrap e-popup e-griderror',
            id: name + '_Error',
            styles: 'display:' + display + ';top:' +
                (inputClient.bottom - client.top + table.scrollTop + 9) + 'px;left:' +
                (inputClient.left - client.left + table.scrollLeft + inputClient.width / 2) + 'px;'
        });
        var content = createElement('div', { className: 'e-tip-content' });
        content.appendChild(error);
        var arrow = createElement('div', { className: 'e-arrow-tip e-tip-top' });
        arrow.appendChild(createElement('div', { className: 'e-arrow-tip-outer e-tip-top' }));
        arrow.appendChild(createElement('div', { className: 'e-arrow-tip-inner e-tip-top' }));
        div.appendChild(content);
        div.appendChild(arrow);
        table.appendChild(div);
        div.style.left = (parseInt(div.style.left, 10) - div.offsetWidth / 2) + 'px';
    };
    return Edit;
}());

/**
 *
 * `ColumnChooser` module is used to show or hide the columns dynamically.
 */
var ColumnChooser = /** @class */ (function () {
    /**
     * Constructor for the Grid ColumnChooser module
     * @hidden
     */
    function ColumnChooser(parent, serviceLocator) {
        this.showColumn = [];
        this.hideColumn = [];
        this.isDlgOpen = false;
        this.dlghide = false;
        this.initialOpenDlg = true;
        this.stateChangeColumns = [];
        this.isInitialOpen = false;
        this.isCustomizeOpenCC = false;
        this.cBoxTrue = createCheckBox(true, { checked: true, label: ' ' });
        this.cBoxFalse = createCheckBox(true, { checked: false, label: ' ' });
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.addEventListener();
        this.cBoxTrue.insertBefore(createElement('input', {
            className: 'e-chk-hidden e-cc e-cc-chbox', attrs: { type: 'checkbox' }
        }), this.cBoxTrue.firstChild);
        this.cBoxFalse.insertBefore(createElement('input', {
            className: 'e-chk-hidden e-cc e-cc-chbox', attrs: { 'type': 'checkbox' }
        }), this.cBoxFalse.firstChild);
        this.cBoxFalse.querySelector('.e-frame').classList.add('e-uncheck');
        if (this.parent.enableRtl) {
            addClass([this.cBoxTrue, this.cBoxFalse], ['e-rtl']);
        }
    }
    ColumnChooser.prototype.destroy = function () {
        this.removeEventListener();
        this.unWireEvents();
        if (!isNullOrUndefined(this.dlgObj) && this.dlgObj.element) {
            this.dlgObj.destroy();
        }
    };
    /**
     * @hidden
     */
    ColumnChooser.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(click, this.clickHandler, this);
        this.parent.on(initialEnd, this.render, this);
        this.parent.addEventListener(dataBound, this.hideDialog.bind(this));
        this.parent.on(destroy, this.destroy, this);
    };
    /**
     * @hidden
     */
    ColumnChooser.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(click, this.clickHandler);
        this.parent.off(initialEnd, this.render);
        this.parent.off(destroy, this.destroy);
    };
    ColumnChooser.prototype.render = function () {
        this.l10n = this.serviceLocator.getService('localization');
        this.renderDlgContent();
        this.getShowHideService = this.serviceLocator.getService('showHideService');
    };
    ColumnChooser.prototype.clickHandler = function (e) {
        var targetElement = e.target;
        if (!this.isCustomizeOpenCC) {
            if (!isNullOrUndefined(closest(targetElement, '.e-cc')) || !isNullOrUndefined(closest(targetElement, '.e-cc-toolbar'))) {
                if (targetElement.classList.contains('e-columnchooser-btn') || targetElement.classList.contains('e-cc-toolbar')) {
                    if ((this.initialOpenDlg && this.dlgObj.visible) || !this.isDlgOpen) {
                        this.isDlgOpen = true;
                        return;
                    }
                }
                else if (targetElement.classList.contains('e-cc-cancel')) {
                    targetElement.parentElement.querySelector('.e-ccsearch').value = '';
                    this.columnChooserSearch('');
                    this.removeCancelIcon();
                }
            }
            else {
                if (!isNullOrUndefined(this.dlgObj) && this.dlgObj.visible && !targetElement.classList.contains('e-toolbar-items')) {
                    this.dlgObj.hide();
                    this.refreshCheckboxState();
                    // this.unWireEvents();
                    this.isDlgOpen = false;
                }
            }
        }
    };
    ColumnChooser.prototype.hideDialog = function () {
        if (!isNullOrUndefined(this.dlgObj) && this.dlgObj.visible) {
            this.dlgObj.hide();
            // this.unWireEvents();
            this.isDlgOpen = false;
        }
    };
    /**
     * To render columnChooser when showColumnChooser enabled.
     * @return {void}
     * @hidden
     */
    ColumnChooser.prototype.renderColumnChooser = function (x, y, target) {
        if (!this.dlgObj.visible) {
            var args1 = {
                requestType: 'beforeOpenColumnChooser', element: this.parent.element,
                columns: this.parent.getColumns()
            };
            this.parent.trigger(beforeOpenColumnChooser, args1);
            this.refreshCheckboxState();
            this.dlgObj.dataBind();
            this.dlgObj.element.style.maxHeight = '430px';
            var elementVisible = this.dlgObj.element.style.display;
            this.dlgObj.element.style.display = 'block';
            var newpos = calculateRelativeBasedPosition(closest(target, '.e-toolbar-item'), this.dlgObj.element);
            this.dlgObj.element.style.display = elementVisible;
            this.dlgObj.element.style.top = newpos.top + closest(target, '.e-cc-toolbar').getBoundingClientRect().height + 'px';
            var dlgWidth = 250;
            if (!isNullOrUndefined(closest(target, '.e-bigger'))) {
                this.dlgObj.width = 253;
            }
            if (Browser.isDevice) {
                this.dlgObj.target = document.body;
                this.dlgObj.position = { X: 'center', Y: 'center' };
                this.dlgObj.refreshPosition();
                this.dlgObj.open = this.mOpenDlg.bind(this);
            }
            else {
                if (this.parent.enableRtl) {
                    this.dlgObj.element.style.left = target.offsetLeft + 'px';
                }
                else {
                    this.dlgObj.element.style.left = ((newpos.left - dlgWidth) + closest(target, '.e-cc-toolbar').clientWidth) + 2 + 'px';
                }
            }
            this.removeCancelIcon();
            this.dlgObj.show();
        }
        else {
            // this.unWireEvents();
            this.hideDialog();
            this.addcancelIcon();
        }
    };
    /**
     * Column chooser can be displayed on screen by given position(X and Y axis).
     * @param  {number} X - Defines the X axis.
     * @param  {number} Y - Defines the Y axis.
     * @return {void}
     */
    ColumnChooser.prototype.openColumnChooser = function (X, Y) {
        this.isCustomizeOpenCC = true;
        if (this.dlgObj.visible) {
            this.hideDialog();
            return;
        }
        if (!this.isInitialOpen) {
            this.dlgObj.content = this.renderChooserList();
        }
        else {
            this.refreshCheckboxState();
        }
        this.dlgObj.dataBind();
        this.dlgObj.position = { X: 'center', Y: 'center' };
        if (isNullOrUndefined(X)) {
            this.dlgObj.position = { X: 'center', Y: 'center' };
            this.dlgObj.refreshPosition();
        }
        else {
            this.dlgObj.element.style.top = '';
            this.dlgObj.element.style.left = '';
            this.dlgObj.element.style.top = Y + 'px';
            this.dlgObj.element.style.left = X + 'px';
        }
        this.dlgObj.beforeOpen = this.customDialogOpen.bind(this);
        this.dlgObj.show();
        this.isInitialOpen = true;
        this.dlgObj.beforeClose = this.customDialogClose.bind(this);
    };
    ColumnChooser.prototype.customDialogOpen = function () {
        var searchElement = this.dlgObj.content.querySelector('input.e-ccsearch');
        EventHandler.add(searchElement, 'keyup', this.columnChooserManualSearch, this);
    };
    ColumnChooser.prototype.customDialogClose = function () {
        var searchElement = this.dlgObj.content.querySelector('input.e-ccsearch');
        EventHandler.remove(searchElement, 'keyup', this.columnChooserManualSearch);
    };
    ColumnChooser.prototype.renderDlgContent = function () {
        var y;
        this.dlgDiv = createElement('div', { className: 'e-ccdlg e-cc', id: this.parent.element.id + '_ccdlg' });
        this.parent.element.appendChild(this.dlgDiv);
        var xpos = this.parent.element.getBoundingClientRect().width - 250;
        var dialoPos = this.parent.enableRtl ? 'left' : 'right';
        var tarElement = this.parent.element.querySelector('.e-ccdiv');
        if (!isNullOrUndefined(tarElement)) {
            y = tarElement.getBoundingClientRect().top;
        }
        this.dlgObj = new Dialog({
            header: this.l10n.getConstant('ChooseColumns'),
            showCloseIcon: false,
            closeOnEscape: false,
            locale: this.parent.locale,
            visible: false,
            enableRtl: this.parent.enableRtl,
            target: document.getElementById(this.parent.element.id),
            buttons: [{
                    click: this.confirmDlgBtnClick.bind(this),
                    buttonModel: {
                        content: this.l10n.getConstant('OKButton'), isPrimary: true,
                        cssClass: 'e-cc e-cc_okbtn',
                    }
                },
                {
                    click: this.clearActions.bind(this),
                    buttonModel: { cssClass: 'e-flat e-cc e-cc-cnbtn', content: this.l10n.getConstant('CancelButton') }
                }],
            content: this.renderChooserList(),
            width: 250,
            cssClass: 'e-cc',
            animationSettings: { effect: 'None' },
        });
        this.dlgObj.appendTo(this.dlgDiv);
        changeButtonType(this.dlgObj.element);
        this.wireEvents();
    };
    ColumnChooser.prototype.renderChooserList = function () {
        this.mainDiv = createElement('div', { className: 'e-main-div e-cc' });
        var searchDiv = createElement('div', { className: 'e-cc-searchdiv e-cc e-input-group' });
        var ccsearchele = createElement('input', {
            className: 'e-ccsearch e-cc e-input',
            attrs: { placeholder: this.l10n.getConstant('Search') }
        });
        var ccsearchicon = createElement('span', { className: 'e-ccsearch-icon e-icons e-cc e-input-group-icon' });
        var conDiv = createElement('div', { className: 'e-cc-contentdiv' });
        this.innerDiv = createElement('div', { className: 'e-innerdiv e-cc' });
        searchDiv.appendChild(ccsearchele);
        searchDiv.appendChild(ccsearchicon);
        ccsearchele.addEventListener('focus', this.searchFocus.bind(this, ccsearchele));
        ccsearchele.addEventListener('blur', this.searchBlur.bind(this, ccsearchele));
        var innerDivContent = this.refreshCheckboxList(this.parent.getColumns());
        this.innerDiv.appendChild(innerDivContent);
        conDiv.appendChild(this.innerDiv);
        this.mainDiv.appendChild(searchDiv);
        this.mainDiv.appendChild(conDiv);
        return this.mainDiv;
    };
    ColumnChooser.prototype.searchFocus = function (targt) {
        targt.parentElement.classList.add('e-input-focus');
    };
    ColumnChooser.prototype.searchBlur = function (targt) {
        targt.parentElement.classList.remove('e-input-focus');
    };
    ColumnChooser.prototype.confirmDlgBtnClick = function (args) {
        this.stateChangeColumns = [];
        if (!isNullOrUndefined(args)) {
            if (this.hideColumn.length) {
                this.columnStateChange(this.hideColumn, false);
            }
            if (this.showColumn.length) {
                this.columnStateChange(this.showColumn, true);
            }
            var params = {
                requestType: 'columnstate', element: this.parent.element,
                columns: this.stateChangeColumns, dialogInstance: this.dlgObj
            };
            this.parent.trigger(actionComplete, params);
            this.getShowHideService.setVisible(this.stateChangeColumns);
            this.clearActions();
        }
    };
    ColumnChooser.prototype.columnStateChange = function (stateColumns, state) {
        for (var index = 0; index < stateColumns.length; index++) {
            var colUid = stateColumns[index];
            var currentCol = this.parent.getColumnByUid(colUid);
            currentCol.visible = state;
            this.stateChangeColumns.push(currentCol);
        }
    };
    ColumnChooser.prototype.clearActions = function () {
        this.hideColumn = [];
        this.showColumn = [];
        // this.unWireEvents();
        this.hideDialog();
        this.addcancelIcon();
    };
    ColumnChooser.prototype.checkstatecolumn = function (isChecked, coluid) {
        if (isChecked) {
            if (this.hideColumn.indexOf(coluid) !== -1) {
                this.hideColumn.splice(this.hideColumn.indexOf(coluid), 1);
            }
            if (this.showColumn.indexOf(coluid) === -1) {
                this.showColumn.push(coluid);
            }
        }
        else {
            if (this.showColumn.indexOf(coluid) !== -1) {
                this.showColumn.splice(this.showColumn.indexOf(coluid), 1);
            }
            if (this.hideColumn.indexOf(coluid) === -1) {
                this.hideColumn.push(coluid);
            }
        }
    };
    ColumnChooser.prototype.columnChooserSearch = function (searchVal) {
        var clearSearch = false;
        var fltrCol;
        if (searchVal === '') {
            this.removeCancelIcon();
            fltrCol = this.parent.getColumns();
            clearSearch = true;
        }
        else {
            fltrCol = new DataManager(this.parent.getColumns()).executeLocal(new Query()
                .where('headerText', 'startswith', searchVal, true));
        }
        if (fltrCol.length) {
            this.innerDiv.innerHTML = ' ';
            this.innerDiv.classList.remove('e-ccnmdiv');
            this.innerDiv.appendChild(this.refreshCheckboxList(fltrCol, searchVal));
            if (!clearSearch) {
                this.addcancelIcon();
            }
        }
        else {
            var nMatchele = createElement('span', { className: 'e-cc e-nmatch' });
            nMatchele.innerHTML = this.l10n.getConstant('Matchs');
            this.innerDiv.innerHTML = ' ';
            this.innerDiv.appendChild(nMatchele);
            this.innerDiv.classList.add('e-ccnmdiv');
        }
        this.flag = true;
        this.stopTimer();
    };
    ColumnChooser.prototype.wireEvents = function () {
        EventHandler.add(this.dlgObj.element, 'click', this.checkBoxClickHandler, this);
        var searchElement = this.dlgObj.content.querySelector('input.e-ccsearch');
        EventHandler.add(searchElement, 'keyup', this.columnChooserManualSearch, this);
    };
    ColumnChooser.prototype.unWireEvents = function () {
        if (this.dlgObj.element) {
            EventHandler.remove(this.dlgObj.element, 'click', this.checkBoxClickHandler);
        }
        var searchElement = this.dlgObj.content.querySelector('input.e-ccsearch');
        EventHandler.remove(searchElement, 'keyup', this.columnChooserManualSearch);
    };
    ColumnChooser.prototype.checkBoxClickHandler = function (e) {
        var checkstate;
        var elem = parentsUntil(e.target, 'e-checkbox-wrapper');
        if (elem) {
            toogleCheckbox(elem.parentElement);
            elem.querySelector('.e-chk-hidden').focus();
            if (elem.querySelector('.e-check')) {
                checkstate = true;
            }
            else if (elem.querySelector('.e-uncheck')) {
                checkstate = false;
            }
            else {
                return;
            }
            var columnUid = parentsUntil(elem, 'e-ccheck').getAttribute('uid');
            this.checkstatecolumn(checkstate, columnUid);
        }
    };
    ColumnChooser.prototype.refreshCheckboxList = function (gdCol, searchVal) {
        this.ulElement = createElement('ul', { className: 'e-ccul-ele e-cc' });
        for (var i = 0; i < gdCol.length; i++) {
            var columns = gdCol[i];
            this.renderCheckbox(columns);
        }
        return this.ulElement;
    };
    ColumnChooser.prototype.refreshCheckboxState = function () {
        this.dlgObj.element.querySelector('.e-cc.e-input').value = '';
        this.columnChooserSearch('');
        for (var i = 0; i < this.parent.element.querySelectorAll('.e-cc-chbox').length; i++) {
            var element = this.parent.element.querySelectorAll('.e-cc-chbox')[i];
            var columnUID = parentsUntil(element, 'e-ccheck').getAttribute('uid');
            var column = this.parent.getColumnByUid(columnUID);
            if (column.visible) {
                element.checked = true;
                this.checkState(element.parentElement.querySelector('.e-icons'), true);
            }
            else {
                element.checked = false;
                this.checkState(element.parentElement.querySelector('.e-icons'), false);
            }
        }
    };
    ColumnChooser.prototype.checkState = function (element, state) {
        state ? classList(element, ['e-check'], ['e-uncheck']) : classList(element, ['e-uncheck'], ['e-check']);
    };
    ColumnChooser.prototype.createCheckBox = function (label, checked, uid) {
        var cbox = checked ? this.cBoxTrue.cloneNode(true) : this.cBoxFalse.cloneNode(true);
        cbox.querySelector('.e-label').innerHTML = label;
        return createCboxWithWrap(uid, cbox, 'e-ccheck');
    };
    ColumnChooser.prototype.renderCheckbox = function (column) {
        var cclist;
        var hideColState;
        var showColState;
        if (column.showInColumnChooser) {
            cclist = createElement('li', { className: 'e-cclist e-cc', styles: 'list-style:None', id: 'e-ccli_' + column.uid });
            hideColState = this.hideColumn.indexOf(column.uid) === -1 ? false : true;
            showColState = this.showColumn.indexOf(column.uid) === -1 ? false : true;
            var cccheckboxlist = this.createCheckBox(column.headerText, (column.visible && !hideColState) || showColState, column.uid);
            cclist.appendChild(cccheckboxlist);
            this.ulElement.appendChild(cclist);
        }
    };
    ColumnChooser.prototype.columnChooserManualSearch = function (e) {
        this.addcancelIcon();
        this.searchValue = e.target.value;
        this.stopTimer();
        this.startTimer(e);
    };
    ColumnChooser.prototype.startTimer = function (e) {
        var proxy = this;
        var interval = !proxy.flag && e.keyCode !== 13 ? 500 : 0;
        this.timer = window.setInterval(function () { proxy.columnChooserSearch(proxy.searchValue); }, interval);
    };
    ColumnChooser.prototype.stopTimer = function () {
        window.clearInterval(this.timer);
    };
    ColumnChooser.prototype.addcancelIcon = function () {
        this.dlgDiv.querySelector('.e-cc.e-ccsearch-icon').classList.add('e-cc-cancel');
    };
    ColumnChooser.prototype.removeCancelIcon = function () {
        this.dlgDiv.querySelector('.e-cc.e-ccsearch-icon').classList.remove('e-cc-cancel');
    };
    ColumnChooser.prototype.mOpenDlg = function () {
        if (Browser.isDevice) {
            this.dlgObj.element.querySelector('.e-cc-searchdiv').classList.remove('e-input-focus');
            this.dlgObj.element.querySelectorAll('.e-cc-chbox')[0].focus();
        }
    };
    // internally use
    ColumnChooser.prototype.getModuleName = function () {
        return 'columnChooser';
    };
    return ColumnChooser;
}());

/**
 * @hidden
 * `ExportHelper` for `PdfExport` & `ExcelExport`
 */
var ExportHelper = /** @class */ (function () {
    function ExportHelper(parent) {
        this.hideColumnInclude = false;
        this.parent = parent;
    }
    ExportHelper.getQuery = function (parent, data) {
        return data.isRemote() ?
            data.generateQuery(true).requiresCount().take(parent.pageSettings.totalRecordsCount) :
            data.generateQuery(true).requiresCount();
    };
    /* tslint:disable:no-any */
    ExportHelper.prototype.getHeaders = function (column, isHideColumnInclude) {
        if (isHideColumnInclude) {
            this.hideColumnInclude = true;
        }
        else {
            this.hideColumnInclude = false;
        }
        var cols = column;
        this.colDepth = this.measureColumnDepth(cols);
        var rows = [];
        var actualColumns = [];
        for (var i = 0; i < this.colDepth; i++) {
            rows[i] = new Row({});
            rows[i].cells = [];
        }
        rows = this.processColumns(rows);
        rows = this.processHeaderCells(rows);
        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
            var row = rows_1[_i];
            for (var i = 0; i < row.cells.length; i++) {
                var cell = row.cells[i];
                if (cell.visible === undefined && cell.cellType !== CellType.StackedHeader) {
                    row.cells = this.removeCellFromRow(row.cells, i);
                    i = i - 1;
                }
                if ((!isHideColumnInclude) && cell.visible !== undefined && (!cell.visible)) {
                    row.cells = this.removeCellFromRow(row.cells, i);
                    i = i - 1;
                }
            }
        }
        for (var i = 0; i < cols.length; i++) {
            this.generateActualColumns(cols[i], actualColumns);
        }
        return { rows: rows, columns: actualColumns };
    };
    ExportHelper.prototype.getConvertedWidth = function (input) {
        var value = parseFloat(input);
        /* tslint:disable-next-line:max-line-length */
        return (input.indexOf('%') !== -1) ? (this.parent.element.getBoundingClientRect().width * value / 100) : value;
    };
    ExportHelper.prototype.generateActualColumns = function (column, actualColumns) {
        if (!column.columns) {
            if (column.visible || this.hideColumnInclude) {
                actualColumns.push(column);
            }
        }
        else {
            if (column.visible || this.hideColumnInclude) {
                var colSpan = this.getCellCount(column, 0);
                if (colSpan !== 0) {
                    for (var i = 0; i < column.columns.length; i++) {
                        /* tslint:disable-next-line:max-line-length */
                        this.generateActualColumns(column.columns[i], actualColumns);
                    }
                }
            }
        }
    };
    ExportHelper.prototype.removeCellFromRow = function (cells, cellIndex) {
        var resultCells = [];
        for (var i = 0; i < cellIndex; i++) {
            resultCells.push(cells[i]);
        }
        for (var i = (cellIndex + 1); i < cells.length; i++) {
            resultCells.push(cells[i]);
        }
        return resultCells;
    };
    ExportHelper.prototype.processHeaderCells = function (rows) {
        var columns = this.parent.enableColumnVirtualization ? this.parent.getColumns() : this.parent.columns;
        for (var i = 0; i < columns.length; i++) {
            rows = this.appendGridCells(columns[i], rows, 0, i === 0, false, i === (columns.length - 1));
        }
        return rows;
    };
    /* tslint:disable */
    ExportHelper.prototype.appendGridCells = function (cols, gridRows, index, isFirstObj, isFirstColumn, isLastColumn) {
        /* tslint:enable */
        var lastCol = isLastColumn ? 'e-lastcell' : '';
        if (!cols.columns) {
            gridRows[index].cells.push(this.generateCell(cols, CellType.Header, this.colDepth - index, (isFirstObj ? '' : (isFirstColumn ? 'e-firstcell' : '')) + lastCol, index, this.parent.getColumnIndexByUid(cols.uid)));
        }
        else {
            var colSpan = this.getCellCount(cols, 0);
            if (colSpan) {
                gridRows[index].cells.push(new Cell({
                    cellType: CellType.StackedHeader, column: cols, colSpan: colSpan
                }));
            }
            var isIgnoreFirstCell = void 0;
            for (var i = 0, len = cols.columns.length; i < len; i++) {
                if (cols.columns[i].visible && !isIgnoreFirstCell) {
                    isIgnoreFirstCell = true;
                }
                /* tslint:disable-next-line:max-line-length */
                gridRows = this.appendGridCells(cols.columns[i], gridRows, index + 1, isFirstObj, i === 0, i === (len - 1) && isLastColumn);
            }
        }
        return gridRows;
    };
    ExportHelper.prototype.generateCell = function (gridColumn, cellType, rowSpan, className, rowIndex, columnIndex) {
        var option = {
            'visible': gridColumn.visible,
            'isDataCell': false,
            'isTemplate': !isNullOrUndefined(gridColumn.headerTemplate),
            'rowID': '',
            'column': gridColumn,
            'cellType': cellType,
            'rowSpan': rowSpan,
            'className': className,
            'index': rowIndex,
            'colIndex': columnIndex
        };
        if (!option.rowSpan || option.rowSpan < 2) {
            delete option.rowSpan;
        }
        return new Cell(option);
    };
    ExportHelper.prototype.processColumns = function (rows) {
        //TODO: generate dummy column for group, detail, stacked row here; ensureColumns here
        var gridObj = this.parent;
        var columnIndexes = this.parent.getColumnIndexesInView();
        for (var i = 0, len = rows.length; i < len; i++) {
            if (gridObj.allowGrouping) {
                for (var j = 0, len_1 = gridObj.groupSettings.columns.length; j < len_1; j++) {
                    if (this.parent.enableColumnVirtualization && columnIndexes.indexOf(j) === -1) {
                        continue;
                    }
                    rows[i].cells.push(this.generateCell({}, CellType.HeaderIndent));
                }
            }
            if (gridObj.detailTemplate || gridObj.childGrid) {
                rows[i].cells.push(this.generateCell({}, CellType.DetailHeader));
            }
        }
        return rows;
    };
    /* tslint:disable:no-any */
    ExportHelper.prototype.getCellCount = function (column, count) {
        if (column.columns) {
            for (var i = 0; i < column.columns.length; i++) {
                count = this.getCellCount(column.columns[i], count);
            }
        }
        else {
            if (column.visible || this.hideColumnInclude) {
                count++;
            }
        }
        return count;
    };
    /* tslint:disable:no-any */
    ExportHelper.prototype.measureColumnDepth = function (column) {
        var max = 0;
        for (var i = 0; i < column.length; i++) {
            var depth = this.checkDepth(column[i], 0);
            if (max < depth) {
                max = depth;
            }
        }
        return max + 1;
    };
    /* tslint:disable:no-any */
    ExportHelper.prototype.checkDepth = function (col, index) {
        if (col.columns) {
            index++;
            for (var i = 0; i < col.columns.length; i++) {
                index = this.checkDepth(col.columns[i], index);
            }
        }
        return index;
    };
    
    return ExportHelper;
}());
/**
 * @hidden
 * `ExportValueFormatter` for `PdfExport` & `ExcelExport`
 */
var ExportValueFormatter = /** @class */ (function () {
    function ExportValueFormatter() {
        this.valueFormatter = new ValueFormatter();
        this.internationalization = new Internationalization();
    }
    /* tslint:disable-next-line:no-any */
    ExportValueFormatter.prototype.returnFormattedValue = function (args, customFormat) {
        if (!isNullOrUndefined(args.value) && args.value) {
            return this.valueFormatter.getFormatFunction(customFormat)(args.value);
        }
        else {
            return '';
        }
    };
    /* tslint:disable-next-line:no-any */
    ExportValueFormatter.prototype.formatCellValue = function (args) {
        if (args.column.type === 'number' && args.column.format !== undefined && args.column.format !== '') {
            return args.value ? this.internationalization.getNumberFormat({ format: args.column.format })(args.value) : '';
        }
        else if (args.column.type === 'boolean') {
            return args.value ? 'true' : 'false';
            /* tslint:disable-next-line:max-line-length */
        }
        else if ((args.column.type === 'date' || args.column.type === 'datetime' || args.column.type === 'time') && args.column.format !== undefined) {
            if (typeof args.column.format === 'string') {
                var format = void 0;
                if (args.column.type === 'date') {
                    format = { type: 'date', skeleton: args.column.format };
                }
                else if (args.column.type === 'time') {
                    format = { type: 'time', skeleton: args.column.format };
                }
                else {
                    format = { type: 'dateTime', skeleton: args.column.format };
                }
                return this.returnFormattedValue(args, format);
            }
            else {
                if (args.column.format instanceof Object && args.column.format.type === undefined) {
                    return (args.value.toString());
                }
                else {
                    /* tslint:disable-next-line:max-line-length */
                    var customFormat = void 0;
                    if (args.column.type === 'date') {
                        /* tslint:disable-next-line:max-line-length */
                        customFormat = { type: args.column.format.type, format: args.column.format.format, skeleton: args.column.format.skeleton };
                    }
                    else if (args.column.type === 'time') {
                        customFormat = { type: 'time', format: args.column.format.format, skeleton: args.column.format.skeleton };
                    }
                    else {
                        customFormat = { type: 'dateTime', format: args.column.format.format, skeleton: args.column.format.skeleton };
                    }
                    return this.returnFormattedValue(args, customFormat);
                }
            }
        }
        else {
            if (args.column.type === undefined || args.column.type === null) {
                return '';
            }
            else {
                return (args.value).toString();
            }
        }
    };
    return ExportValueFormatter;
}());

/**
 * @hidden
 * `ExcelExport` module is used to handle the Excel export action.
 */
var ExcelExport = /** @class */ (function () {
    /**
     * Constructor for the Grid Excel Export module.
     * @hidden
     */
    function ExcelExport(parent) {
        /* tslint:disable-next-line:no-any */
        this.book = {};
        /* tslint:disable-next-line:no-any */
        this.workSheet = [];
        /* tslint:disable-next-line:no-any */
        this.rows = [];
        /* tslint:disable-next-line:no-any */
        this.columns = [];
        /* tslint:disable-next-line:no-any */
        this.styles = [];
        this.rowLength = 1;
        this.expType = 'appendtosheet';
        this.includeHiddenColumn = false;
        this.isCsvExport = false;
        this.isElementIdChanged = false;
        this.parent = parent;
    }
    /**
     * For internal use only - Get the module name.
     */
    ExcelExport.prototype.getModuleName = function () {
        return 'ExcelExport';
    };
    ExcelExport.prototype.init = function (gObj) {
        if (gObj.element !== null && gObj.element.id === '') {
            gObj.element.id = new Date().toISOString();
            this.isElementIdChanged = true;
        }
        this.parent = gObj;
        this.helper = new ExportHelper(gObj);
        if (this.parent.isDestroyed) {
            return;
        }
        this.isExporting = undefined;
        this.book = {};
        /* tslint:disable-next-line:no-any */
        this.workSheet = [];
        /* tslint:disable-next-line:no-any */
        this.rows = [];
        /* tslint:disable-next-line:no-any */
        this.columns = [];
        /* tslint:disable-next-line:no-any */
        this.styles = [];
        this.rowLength = 1;
        /* tslint:disable-next-line:no-any */
        this.footer = undefined;
        this.expType = 'appendtosheet';
        this.includeHiddenColumn = false;
        this.exportValueFormatter = new ExportValueFormatter();
    };
    /**
     * Export Grid to Excel file.
     * @param  {exportProperties} exportProperties - Defines the export properties of the Grid.
     * @param  {isMultipleExport} isMultipleExport - Defines is multiple Grid's are exported.
     * @param  {workbook} workbook - Defined the Workbook if multiple Grid is exported.
     * @param  {isCsv} isCsv - true if export to CSV.
     * @return {Promise<any>}
     */
    /* tslint:disable-next-line:max-line-length */
    /* tslint:disable-next-line:no-any */
    ExcelExport.prototype.Map = function (grid, exportProperties, isMultipleExport, workbook, isCsv) {
        var gObj = grid;
        gObj.trigger(beforeExcelExport);
        this.data = new Data(gObj);
        this.isExporting = true;
        if (isCsv) {
            this.isCsvExport = isCsv;
        }
        else {
            this.isCsvExport = false;
        }
        return this.processRecords(gObj, exportProperties, isMultipleExport, workbook);
    };
    /* tslint:disable-next-line:no-any */
    ExcelExport.prototype.processRecords = function (gObj, exportProperties, isMultipleExport, workbook) {
        var _this = this;
        if (exportProperties !== undefined && exportProperties.dataSource !== undefined &&
            exportProperties.dataSource instanceof DataManager) {
            /* tslint:disable-next-line:no-any */
            var promise = void 0;
            return promise = new Promise(function (resolve, reject) {
                /* tslint:disable-next-line:max-line-length */
                /* tslint:disable-next-line:no-any */
                var dataManager = exportProperties.dataSource.executeQuery(new Query());
                dataManager.then(function (r) {
                    _this.init(gObj);
                    _this.processInnerRecords(gObj, exportProperties, isMultipleExport, workbook, r);
                    resolve(_this.book);
                });
            });
        }
        else {
            /* tslint:disable-next-line:no-any */
            var promise = void 0;
            return promise = new Promise(function (resolve, reject) {
                var dataManager = _this.data.getData({}, ExportHelper.getQuery(gObj, _this.data));
                dataManager.then(function (r) {
                    _this.init(gObj);
                    _this.processInnerRecords(gObj, exportProperties, isMultipleExport, workbook, r);
                    resolve(_this.book);
                });
            });
        }
    };
    /* tslint:disable-next-line:max-line-length */
    /* tslint:disable-next-line:no-any */
    ExcelExport.prototype.processInnerRecords = function (gObj, exportProperties, isMultipleExport, workbook, r) {
        var blankRows = 5;
        if (exportProperties !== undefined && exportProperties.multipleExport !== undefined) {
            /* tslint:disable-next-line:max-line-length */
            this.expType = (exportProperties.multipleExport.type !== undefined ? exportProperties.multipleExport.type : 'appendtosheet');
            if (exportProperties.multipleExport.blankRows !== undefined) {
                blankRows = exportProperties.multipleExport.blankRows;
            }
        }
        if (workbook === undefined) {
            this.workSheet = [];
            this.rows = [];
            this.columns = [];
            this.styles = [];
        }
        else if (this.expType === 'newsheet') {
            this.workSheet = workbook.worksheets;
            this.rows = [];
            this.columns = [];
            this.styles = workbook.styles;
        }
        else {
            this.workSheet = [];
            this.rows = workbook.worksheets[0].rows;
            this.columns = workbook.worksheets[0].columns;
            this.styles = workbook.styles;
            this.rowLength = (this.rows[this.rows.length - 1].index + blankRows);
            this.rowLength++;
        }
        if (exportProperties !== undefined) {
            if (isMultipleExport !== undefined) {
                if (exportProperties.header !== undefined && (isMultipleExport || this.expType === 'newsheet')) {
                    this.processExcelHeader(JSON.parse(JSON.stringify(exportProperties.header)));
                }
                if (exportProperties.footer !== undefined) {
                    if (this.expType === 'appendtosheet') {
                        if (!isMultipleExport) {
                            this.footer = JSON.parse(JSON.stringify(exportProperties.footer));
                        }
                    }
                    else {
                        this.footer = JSON.parse(JSON.stringify(exportProperties.footer));
                    }
                }
            }
            else {
                if (exportProperties.header !== undefined) {
                    this.processExcelHeader(JSON.parse(JSON.stringify(exportProperties.header)));
                }
                if (exportProperties.footer !== undefined) {
                    this.footer = JSON.parse(JSON.stringify(exportProperties.footer));
                }
            }
        }
        this.includeHiddenColumn = (exportProperties !== undefined ? exportProperties.includeHiddenColumn : false);
        /* tslint:disable-next-line:max-line-length */
        /* tslint:disable-next-line:no-any */
        var headerRow = this.helper.getHeaders(gObj.columns, this.includeHiddenColumn);
        var groupIndent = 0;
        /* tslint:disable:no-any */
        if ((r.result).level !== undefined) {
            groupIndent += (r.result).level;
            groupIndent += (r.result).childLevels;
        }
        /* tslint:enable:no-any */
        this.processHeaderContent(gObj, headerRow, exportProperties, groupIndent);
        /* tslint:disable-next-line:max-line-length */
        if (exportProperties !== undefined && exportProperties.dataSource !== undefined && !(exportProperties.dataSource instanceof DataManager)) {
            this.processRecordContent(gObj, r, headerRow, isMultipleExport, exportProperties.dataSource);
        }
        else if (exportProperties !== undefined && exportProperties.exportType === 'currentpage') {
            this.processRecordContent(gObj, r, headerRow, isMultipleExport, gObj.getCurrentViewRecords());
        }
        else {
            this.processRecordContent(gObj, r, headerRow, isMultipleExport);
        }
        this.isExporting = false;
        gObj.trigger(excelExportComplete);
    };
    /* tslint:disable-next-line:max-line-length */
    /* tslint:disable-next-line:no-any */
    ExcelExport.prototype.processRecordContent = function (gObj, returnType, headerRow, isMultipleExport, currentViewRecords) {
        /* tslint:disable-next-line:no-any */
        var column = gObj.columns;
        /* tslint:disable-next-line:no-any */
        var record = undefined;
        if (currentViewRecords !== undefined) {
            record = currentViewRecords;
        }
        else {
            record = returnType.result;
        }
        if (record.level !== undefined) {
            this.processGroupedRows(gObj, record, headerRow, record.level);
        }
        else {
            this.processRecordRows(gObj, record, headerRow, 0);
            if (returnType.aggregates !== undefined) {
                if (currentViewRecords !== undefined) {
                    this.processAggregates(gObj, returnType.result, currentViewRecords);
                }
                else {
                    this.processAggregates(gObj, returnType.result);
                }
            }
        }
        //footer template add
        if (this.footer !== undefined) {
            if ((this.expType === 'appendtosheet' && !isMultipleExport) || (this.expType === 'newsheet')) {
                this.processExcelFooter(this.footer);
            }
        }
        /* tslint:disable-next-line:no-any */
        var sheet = {};
        if (this.columns.length > 0) {
            sheet.columns = this.columns;
        }
        sheet.rows = this.rows;
        this.workSheet.push(sheet);
        this.book.worksheets = this.workSheet;
        this.book.styles = this.styles;
        if (!isMultipleExport) {
            if (this.isCsvExport) {
                var book = new Workbook(this.book, 'csv');
                book.save('Export.csv');
            }
            else {
                var book = new Workbook(this.book, 'xlsx');
                book.save('Export.xlsx');
            }
            if (this.isElementIdChanged) {
                gObj.element.id = '';
            }
        }
    };
    /* tslint:disable-next-line:no-any */
    ExcelExport.prototype.processGroupedRows = function (gObj, dataSource, headerRow, level) {
        for (var _i = 0, dataSource_1 = dataSource; _i < dataSource_1.length; _i++) {
            var item = dataSource_1[_i];
            /* tslint:disable-next-line:no-any */
            var cells = [];
            var index = 1;
            /* tslint:disable-next-line:no-any */
            var cell = {};
            cell.index = index + level;
            /* tslint:disable-next-line:no-any */
            var args = {
                value: item.key,
                column: gObj.getColumnByField(item.field),
                style: undefined
            };
            cell.value = item.field + ': ' + this.exportValueFormatter.formatCellValue(args) + ' - ';
            if (item.count > 1) {
                cell.value += item.count + ' items';
            }
            else {
                cell.value += item.count + ' item';
            }
            cell.style = this.getCaptionThemeStyle(this.theme);
            var captionModelGen = new CaptionSummaryModelGenerator(gObj);
            var groupCaptionSummaryRows = captionModelGen.generateRows(item);
            this.fillAggregates(gObj, groupCaptionSummaryRows, dataSource.level + dataSource.childLevels, this.rowLength);
            cells.push(cell);
            if (this.rows[this.rows.length - 1].cells.length > 0) {
                var lIndex = dataSource.level + dataSource.childLevels + groupCaptionSummaryRows[0].cells.length;
                var hIndex = 0;
                for (var _a = 0, _b = this.rows[this.rows.length - 1].cells; _a < _b.length; _a++) {
                    var tCell = _b[_a];
                    if (tCell.index < lIndex) {
                        lIndex = tCell.index;
                    }
                    if (tCell.index > hIndex) {
                        hIndex = tCell.index;
                    }
                    tCell.style = this.getCaptionThemeStyle(this.theme);
                    cells.push(tCell);
                }
                if ((lIndex - cell.index) > 1) {
                    cell.colSpan = lIndex - cell.index;
                }
                while (hIndex < (headerRow.columns.length + index + level)) {
                    /* tslint:disable-next-line:no-any */
                    var sCell = {};
                    if (dataSource.childLevels === 0) {
                        sCell.index = (hIndex);
                    }
                    else {
                        sCell.index = (hIndex + 1);
                    }
                    sCell.style = this.getCaptionThemeStyle(this.theme);
                    cells.push(sCell);
                    hIndex++;
                }
            }
            else {
                var span = 0;
                //Calculation for column span when group caption dont have aggregates
                for (var _c = 0, _d = headerRow.columns; _c < _d.length; _c++) {
                    var col = _d[_c];
                    if (col.visible) {
                        span++;
                    }
                }
                cell.colSpan = (dataSource.childLevels + span);
            }
            this.rows[this.rows.length - 1].cells = cells;
            this.rowLength++;
            if (dataSource.childLevels !== undefined && dataSource.childLevels > 0) {
                this.processGroupedRows(gObj, item.items, headerRow, item.items.level);
            }
            else {
                this.processRecordRows(gObj, item.items, headerRow, (level));
                this.processAggregates(gObj, item, undefined, (level));
            }
        }
    };
    /* tslint:disable-next-line:no-any */
    ExcelExport.prototype.processRecordRows = function (gObj, record, headerRow, level) {
        var rLen = Object.keys(record).length;
        var index = 1;
        /* tslint:disable-next-line:no-any */
        var cells = [];
        for (var r = 0; r < rLen; r++) {
            cells = [];
            index = 1;
            for (var c = 0, len = headerRow.columns.length; c < len; c++) {
                /* tslint:disable-next-line:no-any */
                var value = record[r][headerRow.columns[c].field];
                if (!isNullOrUndefined(value)) {
                    /* tslint:disable-next-line:no-any */
                    var excelCellArgs = { data: record[r], column: headerRow.columns[c] };
                    gObj.trigger(excelQueryCellInfo, extend(excelCellArgs, {
                        column: headerRow.columns[c], data: record[r],
                        value: value, style: undefined, colSpan: 1
                    }));
                    /* tslint:disable-next-line:no-any */
                    var cell = {};
                    cell.index = index + level;
                    cell.value = excelCellArgs.value;
                    if (excelCellArgs.colSpan > 1) {
                        cell.colSpan = excelCellArgs.colSpan;
                    }
                    if (excelCellArgs.style !== undefined) {
                        var styleIndex = this.getColumnStyle(gObj, index + level);
                        cell.style = this.mergeOptions(this.styles[styleIndex], excelCellArgs.style);
                    }
                    else {
                        cell.style = { name: gObj.element.id + 'column' + (index + level) };
                    }
                    cells.push(cell);
                }
                index++;
            }
            this.rows.push({ index: this.rowLength++, cells: cells });
        }
    };
    /* tslint:disable-next-line:no-any */
    ExcelExport.prototype.processAggregates = function (gObj, rec, currentViewRecords, indent) {
        var summaryModel = new SummaryModelGenerator(gObj);
        /* tslint:disable-next-line:no-any */
        var data = undefined;
        if (currentViewRecords !== undefined) {
            data = currentViewRecords;
        }
        else {
            data = rec;
        }
        if (indent === undefined) {
            indent = 0;
        }
        if (gObj.groupSettings.columns.length > 0) {
            var groupSummaryModel = new GroupSummaryModelGenerator(gObj);
            var groupSummaryRows = groupSummaryModel.generateRows(data, { level: data.level });
            if (groupSummaryRows.length > 0) {
                this.fillAggregates(gObj, groupSummaryRows, indent);
            }
        }
        var sRows = summaryModel.generateRows(data, rec.aggregates);
        if (sRows.length > 0) {
            this.fillAggregates(gObj, sRows, indent);
        }
    };
    /* tslint:disable-next-line:no-any */
    ExcelExport.prototype.fillAggregates = function (gObj, cells, indent, customIndex) {
        for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
            var row = cells_1[_i];
            /* tslint:disable-next-line:no-any */
            var cells_2 = [];
            var index = 0;
            for (var _a = 0, _b = row.cells; _a < _b.length; _a++) {
                var cell = _b[_a];
                /* tslint:disable-next-line:no-any */
                var eCell = {};
                if ((cell.visible || this.includeHiddenColumn)) {
                    index++;
                    if (cell.isDataCell) {
                        eCell.index = index + indent;
                        if (cell.column.footerTemplate !== undefined) {
                            eCell.value = this.getAggreateValue(CellType.Summary, cell.column.footerTemplate, cell, row);
                        }
                        else if (cell.column.groupFooterTemplate !== undefined) {
                            eCell.value = this.getAggreateValue(CellType.GroupSummary, cell.column.groupFooterTemplate, cell, row);
                        }
                        else if (cell.column.groupCaptionTemplate !== undefined) {
                            eCell.value = this.getAggreateValue(CellType.CaptionSummary, cell.column.groupCaptionTemplate, cell, row);
                        }
                        else {
                            for (var _c = 0, _d = Object.keys(row.data[cell.column.field]); _c < _d.length; _c++) {
                                var key = _d[_c];
                                if (key === cell.column.type) {
                                    if (row.data[cell.column.field].sum !== undefined) {
                                        eCell.value = row.data[cell.column.field].sum;
                                    }
                                    else if (row.data[cell.column.field].average !== undefined) {
                                        eCell.value = row.data[cell.column.field].average;
                                    }
                                    else if (row.data[cell.column.field].max !== undefined) {
                                        eCell.value = row.data[cell.column.field].max;
                                    }
                                    else if (row.data[cell.column.field].min !== undefined) {
                                        eCell.value = row.data[cell.column.field].min;
                                    }
                                    else if (row.data[cell.column.field].count !== undefined) {
                                        eCell.value = row.data[cell.column.field].count;
                                    }
                                    else if (row.data[cell.column.field].truecount !== undefined) {
                                        eCell.value = row.data[cell.column.field].truecount;
                                    }
                                    else if (row.data[cell.column.field].falsecount !== undefined) {
                                        eCell.value = row.data[cell.column.field].falsecount;
                                    }
                                    else if (row.data[cell.column.field].custom !== undefined) {
                                        eCell.value = row.data[cell.column.field].custom;
                                    }
                                }
                            }
                        }
                        eCell.style = this.getCaptionThemeStyle(this.theme); //{ name: gObj.element.id + 'column' + index };
                        cells_2.push(eCell);
                    }
                    else {
                        if (customIndex === undefined) {
                            eCell.index = index + indent;
                            eCell.style = this.getCaptionThemeStyle(this.theme); //{ name: gObj.element.id + 'column' + index };
                            cells_2.push(eCell);
                        }
                    }
                }
            }
            if (customIndex !== undefined) {
                this.rows.push({ index: customIndex, cells: cells_2 });
            }
            else {
                this.rows.push({ index: this.rowLength++, cells: cells_2 });
            }
        }
    };
    /* tslint:disable-next-line:no-any */
    ExcelExport.prototype.getAggreateValue = function (cellType, template, cell, row) {
        var templateFn = {};
        templateFn[getEnumValue(CellType, cell.cellType)] = compile(template);
        /* tslint:disable-next-line:max-line-length */
        var txt = (templateFn[getEnumValue(CellType, cell.cellType)](row.data[cell.column.field ? cell.column.field : cell.column.columnName]));
        return txt[0].wholeText;
    };
    /* tslint:disable-next-line:no-any */
    ExcelExport.prototype.mergeOptions = function (JSON1, JSON2) {
        /* tslint:disable-next-line:no-any */
        var result = {};
        /* tslint:disable-next-line:no-any */
        var attrname = Object.keys(JSON1);
        for (var index = 0; index < attrname.length; index++) {
            if (attrname[index] !== 'name') {
                result[attrname[index]] = JSON1[attrname[index]];
            }
        }
        attrname = Object.keys(JSON2);
        for (var index = 0; index < attrname.length; index++) {
            if (attrname[index] !== 'name') {
                result[attrname[index]] = JSON2[attrname[index]];
            }
        }
        return result;
    };
    ExcelExport.prototype.getColumnStyle = function (gObj, columnIndex) {
        var index = 0;
        for (var _i = 0, _a = this.styles; _i < _a.length; _i++) {
            var style = _a[_i];
            if (style.name === gObj.element.id + 'column' + columnIndex) {
                return index;
            }
            index++;
        }
        return undefined;
    };
    /* tslint:disable-next-line:no-any */
    ExcelExport.prototype.processHeaderContent = function (gObj, headerRow, exportProperties, indent) {
        /* tslint:disable-next-line:no-any */
        var column = gObj.columns;
        var rowIndex = 1;
        /* tslint:disable-next-line:no-any */
        var returnValue = headerRow;
        /* tslint:enable:no-any */
        var gridRows = returnValue.rows;
        // Column collection with respect to the records in the grid
        var gridColumns = returnValue.columns;
        /* tslint:disable-next-line:no-any */
        var spannedCells = [];
        if (indent > 0) {
            var index = 0;
            while (index !== indent) {
                this.columns.push({ index: index + 1, width: 30 });
                index++;
            }
        }
        for (var row = 0; row < gridRows.length; row++) {
            var currentCellIndex = 1 + indent;
            /* tslint:disable-next-line:no-any */
            var cells = [];
            for (var column_1 = 0; column_1 < gridRows[row].cells.length; column_1++) {
                /* tslint:disable-next-line:no-any */
                var style = {};
                /* tslint:disable-next-line:no-any */
                var cell = {};
                /* tslint:disable-next-line:no-any */
                var gridCell = gridRows[row].cells[column_1];
                /* tslint:disable-next-line:no-any */
                var result = { contains: true, index: 1 };
                while (result.contains) {
                    result = this.getIndex(spannedCells, rowIndex, currentCellIndex);
                    currentCellIndex = result.index;
                    if (!result.contains) {
                        cell.index = result.index;
                        break;
                    }
                }
                if (gridCell.rowSpan !== undefined && gridCell.rowSpan !== 1) {
                    cell.rowSpan = gridCell.rowSpan;
                    for (var i = rowIndex; i < gridCell.rowSpan + rowIndex; i++) {
                        /* tslint:disable-next-line:no-any */
                        var spannedCell = { rowIndex: 0, columnIndex: 0 };
                        spannedCell.rowIndex = i;
                        spannedCell.columnIndex = currentCellIndex;
                        spannedCells.push(spannedCell);
                    }
                }
                if (gridCell.colSpan !== undefined && gridCell.colSpan !== 1) {
                    cell.colSpan = gridCell.colSpan;
                    currentCellIndex = currentCellIndex + cell.colSpan - 1;
                }
                cell.value = gridCell.column.headerText;
                if (exportProperties !== undefined && exportProperties.theme !== undefined) {
                    this.theme = exportProperties.theme;
                }
                style = this.getHeaderThemeStyle(this.theme);
                if (gridCell.column.textAlign !== undefined) {
                    style.hAlign = gridCell.column.textAlign;
                }
                if (gridCell.column.headerTextAlign !== undefined) {
                    style.hAlign = gridCell.column.headerTextAlign;
                }
                cell.style = style;
                cells.push(cell);
                currentCellIndex++;
            }
            this.rows.push({ index: this.rowLength++, cells: cells });
        }
        for (var col = 0; col < gridColumns.length; col++) {
            this.parseStyles(gObj, gridColumns[col], this.getRecordThemeStyle(this.theme), indent + col + 1);
        }
    };
    /* tslint:disable-next-line:no-any */
    ExcelExport.prototype.getHeaderThemeStyle = function (theme) {
        /* tslint:disable-next-line:no-any */
        var style = {};
        style.fontSize = 12;
        style.borders = { color: '#E0E0E0' };
        if (theme !== undefined && theme.header !== undefined) {
            style = this.updateThemeStyle(theme.header, style);
        }
        return style;
    };
    /* tslint:disable-next-line:no-any */
    ExcelExport.prototype.updateThemeStyle = function (themestyle, style) {
        if (themestyle.fontColor !== undefined) {
            style.fontColor = themestyle.fontColor;
        }
        if (themestyle.fontName !== undefined) {
            style.fontName = themestyle.fontName;
        }
        if (themestyle.fontSize !== undefined) {
            style.fontSize = themestyle.fontSize;
        }
        if (themestyle.borders !== undefined) {
            if (themestyle.borders.color !== undefined) {
                style.borders.color = themestyle.borders.color;
            }
            if (themestyle.borders.lineStyle !== undefined) {
                style.borders.lineStyle = themestyle.borders.lineStyle;
            }
        }
        if (themestyle.bold !== false) {
            style.bold = themestyle.bold;
        }
        return style;
    };
    /* tslint:disable-next-line:no-any */
    ExcelExport.prototype.getCaptionThemeStyle = function (theme) {
        /* tslint:disable-next-line:no-any */
        var style = {};
        style.fontSize = 13;
        style.backColor = '#F6F6F6';
        if (theme !== undefined && theme.caption !== undefined) {
            style = this.updateThemeStyle(theme.caption, style);
        }
        return style;
    };
    /* tslint:disable-next-line:no-any */
    ExcelExport.prototype.getRecordThemeStyle = function (theme) {
        /* tslint:disable-next-line:no-any */
        var style = {};
        style.fontSize = 13;
        style.borders = { color: '#E0E0E0' };
        if (theme !== undefined && theme.record !== undefined) {
            style = this.updateThemeStyle(theme.record, style);
        }
        return style;
    };
    /* tslint:disable-next-line:no-any */
    ExcelExport.prototype.processExcelHeader = function (header) {
        if (header.rows !== undefined && (this.expType === 'newsheet' || this.rowLength === 1)) {
            var noRows = void 0;
            if (header.headerRows === undefined) {
                this.rowLength = header.rows.length;
            }
            else {
                this.rowLength = header.headerRows;
            }
            if (this.rowLength < header.rows.length) {
                noRows = this.rowLength;
            }
            else {
                noRows = header.rows.length;
            }
            this.rowLength++;
            for (var row = 0; row < noRows; row++) {
                /* tslint:disable-next-line:no-any */
                var json = header.rows[row];
                //Row index
                if (!(json.index !== null && json.index !== undefined)) {
                    json.index = (row + 1);
                }
                this.updatedCellIndex(json);
            }
        }
    };
    /* tslint:disable-next-line:no-any */
    ExcelExport.prototype.updatedCellIndex = function (json) {
        var cellsLength = json.cells.length;
        for (var cellId = 0; cellId < cellsLength; cellId++) {
            /* tslint:disable-next-line:no-any */
            var jsonCell = json.cells[cellId];
            //cell index
            if (!(jsonCell.index !== null && jsonCell.index !== undefined)) {
                jsonCell.index = (cellId + 1);
            }
        }
        this.rows.push(json);
    };
    /* tslint:disable-next-line:no-any */
    ExcelExport.prototype.processExcelFooter = function (footer) {
        if (footer.rows !== undefined) {
            var noRows = void 0;
            if (footer.footerRows === undefined) {
                this.rowLength += footer.rows.length;
            }
            else {
                if (footer.footerRows > footer.rows.length) {
                    this.rowLength += (footer.footerRows - footer.rows.length);
                    noRows = footer.rows.length;
                }
                else {
                    noRows = footer.footerRows;
                }
            }
            for (var row = 0; row < noRows; row++) {
                /* tslint:disable-next-line:no-any */
                var json = footer.rows[row];
                //Row index
                if (json.index === null || json.index === undefined) {
                    json.index = this.rowLength++;
                }
                else {
                    json.index += this.rowLength;
                }
                this.updatedCellIndex(json);
            }
        }
    };
    /* tslint:disable-next-line:no-any */
    ExcelExport.prototype.getIndex = function (spannedCells, rowIndex, columnIndex) {
        for (var _i = 0, spannedCells_1 = spannedCells; _i < spannedCells_1.length; _i++) {
            var spannedCell = spannedCells_1[_i];
            if ((spannedCell.rowIndex === rowIndex) && (spannedCell.columnIndex === columnIndex)) {
                columnIndex = columnIndex + 1;
                return { contains: true, index: columnIndex };
            }
        }
        return { contains: false, index: columnIndex };
    };
    /* tslint:disable-next-line:no-any */
    ExcelExport.prototype.parseStyles = function (gObj, col, style, index) {
        if (col.format !== undefined) {
            if (col.format.skeleton !== undefined) {
                style.numberFormat = col.format.skeleton;
                if (col.format.type !== undefined) {
                    style.type = col.format.type;
                }
            }
            else {
                style.numberFormat = col.format;
                style.type = col.type;
            }
        }
        if (col.textAlign !== undefined) {
            style.hAlign = col.textAlign;
        }
        if (Object.keys(style).length > 0) {
            style.name = gObj.element.id + 'column' + index;
            this.styles.push(style);
        }
        if (col.width !== undefined) {
            /* tslint:disable-next-line:max-line-length */
            this.columns.push({ index: index, width: typeof col.width === 'number' ? col.width : this.helper.getConvertedWidth(col.width) });
        }
    };
    /**
     * To destroy the excel export
     * @return {void}
     * @hidden
     */
    ExcelExport.prototype.destroy = function () {
        //destroy for exporting
    };
    return ExcelExport;
}());

/**
 * `PDF Export` module is used to handle the exportToPDF action.
 * @hidden
 */
var PdfExport = /** @class */ (function () {
    /**
     * Constructor for the Grid PDF Export module
     * @hidden
     */
    function PdfExport(parent) {
        this.hideColumnInclude = false;
        this.currentViewData = false;
        this.customDataSource = false;
        this.isGrouping = false;
        this.parent = parent;
        if (this.parent.isDestroyed) {
            return;
        }
    }
    /**
     * For internal use only - Get the module name.
     */
    PdfExport.prototype.getModuleName = function () {
        return 'PdfExport';
    };
    PdfExport.prototype.init = function (parent) {
        this.exportValueFormatter = new ExportValueFormatter();
        this.pdfDocument = undefined;
        this.hideColumnInclude = false;
        this.currentViewData = false;
        this.parent = parent;
        var gObj = parent;
        this.helper = new ExportHelper(gObj);
        this.isGrouping = false;
        this.isExporting = true;
        gObj.trigger(beforePdfExport);
    };
    /**
     * Used to map the input data
     * @return {void}
     */
    /* tslint:disable-next-line:no-any */
    PdfExport.prototype.Map = function (parent, pdfExportProperties, isMultipleExport, pdfDoc) {
        var _this = this;
        this.data = new Data(this.parent);
        /* tslint:disable-next-line:max-line-length */
        if (pdfExportProperties !== undefined && pdfExportProperties.dataSource !== undefined && pdfExportProperties.dataSource instanceof DataManager) {
            var promise = void 0;
            return promise = new Promise(function (resolve, reject) {
                /* tslint:disable-next-line:no-any */ /* tslint:disable-next-line:max-line-length */
                new DataManager({ url: pdfExportProperties.dataSource.dataSource.url, adaptor: pdfExportProperties.dataSource.adaptor }).executeQuery(new Query()).then(function (returnType) {
                    _this.init(parent);
                    if (pdfDoc !== undefined) {
                        _this.pdfDocument = pdfDoc;
                    }
                    else {
                        _this.pdfDocument = new PdfDocument();
                    }
                    _this.processExport(parent, returnType, pdfExportProperties, isMultipleExport);
                    _this.isExporting = false;
                    parent.trigger(pdfExportComplete);
                    resolve(_this.pdfDocument);
                });
            });
        }
        else {
            var promise = void 0;
            return promise = new Promise(function (resolve, reject) {
                var dataManager = _this.data.getData({}, ExportHelper.getQuery(parent, _this.data));
                dataManager.then(function (returnType) {
                    _this.init(parent);
                    if (pdfDoc !== undefined) {
                        _this.pdfDocument = pdfDoc;
                    }
                    else {
                        _this.pdfDocument = new PdfDocument();
                    }
                    _this.processExport(parent, returnType, pdfExportProperties, isMultipleExport);
                    _this.isExporting = false;
                    parent.trigger(pdfExportComplete);
                    resolve(_this.pdfDocument);
                });
            });
        }
    };
    /* tslint:disable:no-any */
    PdfExport.prototype.processExport = function (gObj, returnType, pdfExportProperties, isMultipleExport) {
        if (pdfExportProperties !== undefined) {
            this.gridTheme = pdfExportProperties.theme;
        }
        var columns = gObj.columns;
        var dataSource = returnType.result;
        /* tslint:enable:no-any */
        var section = this.pdfDocument.sections.add();
        /* tslint:disable-next-line:no-any */
        var result = this.processExportProperties(pdfExportProperties, dataSource, section);
        dataSource = result.dataSource;
        /* tslint:disable-next-line:no-any */
        if (dataSource.GroupGuid !== undefined) {
            this.isGrouping = true;
        }
        section = result.section;
        var pdfPage = section.pages.add();
        // create a grid
        var pdfGrid = new PdfGrid();
        // get header theme style
        /* tslint:disable-next-line:no-any */
        var headerThemeStyle = this.getHeaderThemeStyle();
        var border = headerThemeStyle.border;
        var headerFont = headerThemeStyle.font;
        var headerBrush = headerThemeStyle.brush;
        /* tslint:disable-next-line:no-any */
        var returnValue = this.helper.getHeaders(columns, this.hideColumnInclude);
        var rows = returnValue.rows;
        // Column collection with respect to the records in the grid
        var gridColumns = returnValue.columns;
        // process grid header content
        pdfGrid = this.processGridHeaders(dataSource.childLevels, pdfGrid, rows, gridColumns, border, headerFont, headerBrush);
        // set alignment, width and type of the values of the column
        this.setColumnProperties(gridColumns, pdfGrid);
        /* tslint:disable-next-line:no-any */
        var captionThemeStyle = this.getSummaryCaptionThemeStyle();
        if (dataSource !== undefined && dataSource !== null && dataSource.length > 0) {
            if (this.isGrouping) {
                /* tslint:disable-next-line:max-line-length */
                this.processGroupedRecords(pdfGrid, dataSource, gridColumns, gObj, border, 0, captionThemeStyle.font, captionThemeStyle.brush, captionThemeStyle.backgroundBrush, returnType);
            }
            else {
                this.processRecord(border, gridColumns, gObj, dataSource, pdfGrid);
            }
            if (returnType.aggregates !== undefined) {
                var summaryModel = new SummaryModelGenerator(gObj);
                var sRows = void 0;
                if (this.customDataSource) {
                    sRows = summaryModel.generateRows(dataSource, returnType.aggregates);
                }
                else if (this.currentViewData) {
                    sRows = summaryModel.generateRows(this.parent.getCurrentViewRecords(), returnType.aggregates);
                }
                else if (this.isGrouping) {
                    sRows = summaryModel.generateRows(dataSource.records, returnType.aggregates);
                }
                else {
                    sRows = summaryModel.generateRows(returnType.result, returnType.aggregates);
                }
                /* tslint:disable-next-line:max-line-length */
                this.processAggregates(sRows, pdfGrid, border, captionThemeStyle.font, captionThemeStyle.brush, captionThemeStyle.backgroundBrush, false);
            }
        }
        else {
            var row = pdfGrid.rows.addRow();
            row.style.setBorder(border);
        }
        // draw the grid
        pdfGrid.draw(pdfPage, 20, 20);
        if (!isMultipleExport) {
            // save the PDF
            this.pdfDocument.save('Export.pdf');
        }
    };
    /* tslint:disable-next-line:no-any */
    PdfExport.prototype.getSummaryCaptionThemeStyle = function () {
        if (this.gridTheme !== undefined && this.gridTheme.caption !== undefined && this.gridTheme.caption !== null) {
            var fontSize = this.gridTheme.caption.fontSize !== undefined ? this.gridTheme.caption.fontSize : 9.75;
            var pdfColor = new PdfColor();
            if (this.gridTheme.caption.fontColor !== undefined) {
                var penBrushColor = this.hexToRgb(this.gridTheme.caption.fontColor);
                pdfColor = new PdfColor(penBrushColor.r, penBrushColor.g, penBrushColor.b);
            }
            /* tslint:disable-next-line:max-line-length */
            return { font: new PdfStandardFont(PdfFontFamily.Helvetica, 10.5), brush: new PdfSolidBrush(new PdfColor(pdfColor)), backgroundBrush: new PdfSolidBrush(new PdfColor(246, 246, 246)) };
        }
        else {
            //Material theme
            /* tslint:disable-next-line:max-line-length */
            return { font: new PdfStandardFont(PdfFontFamily.Helvetica, 9.75), brush: new PdfSolidBrush(new PdfColor(0, 0, 0)), backgroundBrush: new PdfSolidBrush(new PdfColor(246, 246, 246)) };
        }
    };
    /* tslint:disable-next-line:no-any */
    PdfExport.prototype.getHeaderThemeStyle = function () {
        var border = new PdfBorders();
        if (this.gridTheme !== undefined && this.gridTheme.header !== undefined && this.gridTheme.header !== null) {
            if (this.gridTheme.header.borders !== undefined && this.gridTheme.header.borders.color !== undefined) {
                var borderColor = this.hexToRgb(this.gridTheme.header.borders.color);
                border.all = new PdfPen(new PdfColor(borderColor.r, borderColor.g, borderColor.b));
            }
            var fontSize = this.gridTheme.header.fontSize !== undefined ? this.gridTheme.header.fontSize : 10.5;
            var pdfColor = new PdfColor();
            if (this.gridTheme.header.fontColor !== undefined) {
                var penBrushColor = this.hexToRgb(this.gridTheme.header.fontColor);
                pdfColor = new PdfColor(penBrushColor.r, penBrushColor.g, penBrushColor.b);
            }
            /* tslint:disable-next-line:max-line-length */
            return { border: border, font: new PdfStandardFont(PdfFontFamily.Helvetica, fontSize), brush: new PdfSolidBrush(pdfColor) };
        }
        else {
            //Material theme
            border.all = new PdfPen(new PdfColor(234, 234, 234));
            /* tslint:disable-next-line:max-line-length */
            return { border: border, font: new PdfStandardFont(PdfFontFamily.Helvetica, 10.5), brush: new PdfSolidBrush(new PdfColor(102, 102, 102)) };
        }
    };
    /* tslint:disable-next-line:max-line-length */ /* tslint:disable-next-line:no-any */
    PdfExport.prototype.processGroupedRecords = function (pdfGrid, dataSource, gridColumns, gObj, border, level, font, brush, backgroundBrush, returnType) {
        var groupIndex = level;
        for (var _i = 0, dataSource_1 = dataSource; _i < dataSource_1.length; _i++) {
            var dataSourceItems = dataSource_1[_i];
            var row = pdfGrid.rows.addRow();
            /* tslint:disable-next-line:no-any */
            var args = {
                value: dataSourceItems.key,
                column: gObj.getColumnByField(dataSourceItems.field),
                style: undefined
            };
            /* tslint:disable-next-line:max-line-length */
            var value = dataSourceItems.field + ': ' + this.exportValueFormatter.formatCellValue(args) + ' - ' + dataSourceItems.count + (dataSource.count > 1 ? ' items' : ' item');
            row.cells.getCell(groupIndex).value = value;
            row.cells.getCell(groupIndex + 1).style.stringFormat = new PdfStringFormat(PdfTextAlignment.Left);
            row.style.setBorder(border);
            row.style.setFont(font);
            row.style.setTextBrush(brush);
            row.style.setBackgroundBrush(backgroundBrush);
            var sRows = void 0;
            var captionSummaryModel = new CaptionSummaryModelGenerator(gObj);
            if (dataSourceItems.items.records !== undefined) {
                sRows = captionSummaryModel.generateRows(dataSourceItems.items.records, returnType.aggregates);
            }
            else {
                sRows = captionSummaryModel.generateRows(dataSourceItems.items, returnType.aggregates);
            }
            if (sRows !== undefined && sRows.length === 0) {
                row.cells.getCell(groupIndex + 1).columnSpan = pdfGrid.columns.count - (groupIndex + 1);
            }
            if (dataSource.childLevels !== undefined && dataSource.childLevels > 0) {
                this.processAggregates(sRows, pdfGrid, border, font, brush, backgroundBrush, true, row, groupIndex);
                /* tslint:disable-next-line:max-line-length */
                this.processGroupedRecords(pdfGrid, dataSourceItems.items, gridColumns, gObj, border, (groupIndex + 1), font, brush, backgroundBrush, returnType);
                var groupSummaryModel = new GroupSummaryModelGenerator(gObj);
                sRows = groupSummaryModel.generateRows(dataSourceItems.items.records, returnType.aggregates);
                this.processAggregates(sRows, pdfGrid, border, font, brush, backgroundBrush, false);
            }
            else {
                this.processAggregates(sRows, pdfGrid, border, font, brush, backgroundBrush, true, row, groupIndex);
                this.processRecord(border, gridColumns, gObj, dataSourceItems.items, pdfGrid, (groupIndex + 1));
                var groupSummaryModel = new GroupSummaryModelGenerator(gObj);
                sRows = groupSummaryModel.generateRows(dataSourceItems.items, returnType.aggregates);
                this.processAggregates(sRows, pdfGrid, border, font, brush, backgroundBrush, false);
            }
        }
    };
    /* tslint:disable-next-line:max-line-length */
    PdfExport.prototype.processGridHeaders = function (childLevels, pdfGrid, rows, gridColumns, border, headerFont, headerBrush) {
        var columnCount = gridColumns.length;
        if (this.isGrouping) {
            columnCount += (childLevels + 1);
        }
        // add columns
        pdfGrid.columns.add(columnCount);
        if (this.isGrouping) {
            for (var i = 0; i < (childLevels + 1); i++) {
                pdfGrid.columns.getColumn(i).width = 20;
            }
        }
        // add header
        pdfGrid.headers.add(rows.length);
        // set cell values of each rows in the header
        for (var i = 0; i < rows.length; i++) {
            var gridHeader = pdfGrid.headers.getHeader(i);
            gridHeader.style.setBorder(border);
            gridHeader.style.setFont(headerFont);
            gridHeader.style.setTextBrush(headerBrush);
            var cellIndex = this.isGrouping ? (childLevels + 1) : 0;
            if (rows[i].cells.length === 0) {
                for (var j = 0; j < gridHeader.cells.count; j++) {
                    var cell = gridHeader.cells.getCell(j);
                    cell.value = '';
                }
            }
            else {
                for (var j = 0; j < cellIndex; j++) {
                    var cell = gridHeader.cells.getCell(j);
                    cell.value = '';
                }
                for (var j = 0; j < rows[i].cells.length; j++) {
                    var cell = gridHeader.cells.getCell(cellIndex);
                    if (cell.value !== null) {
                        cell.value = rows[i].cells[j].column.headerText;
                        if (rows[i].cells[j].column.headerTextAlign !== undefined) {
                            cell.style.stringFormat = this.getHorizontalAlignment(rows[i].cells[j].column.headerTextAlign);
                        }
                        if (rows[i].cells[j].rowSpan !== undefined) {
                            cell.rowSpan = rows[i].cells[j].rowSpan;
                            /* tslint:disable-next-line:max-line-length */
                            cell.style.stringFormat = this.getVerticalAlignment('bottom', cell.style.stringFormat, rows[i].cells[j].column.textAlign);
                            for (var k = 1; k < rows[i].cells[j].rowSpan; k++) {
                                pdfGrid.headers.getHeader(i + k).cells.getCell(cellIndex).value = null;
                            }
                        }
                        if (rows[i].cells[j].colSpan !== undefined) {
                            cell.columnSpan = rows[i].cells[j].colSpan;
                        }
                        cellIndex += cell.columnSpan;
                    }
                    else {
                        cell.value = '';
                        cellIndex += cell.columnSpan;
                        j = j - 1;
                    }
                }
            }
        }
        if (pdfGrid.columns.count >= 6) {
            pdfGrid.style.allowHorizontalOverflow = true;
        }
        return pdfGrid;
    };
    /* tslint:disable-next-line:no-any */ /* tslint:disable-next-line:max-line-length */
    PdfExport.prototype.processExportProperties = function (pdfExportProperties, dataSource, section) {
        if (pdfExportProperties !== undefined) {
            if (pdfExportProperties.theme !== undefined) {
                this.gridTheme = pdfExportProperties.theme;
            }
            if (pdfExportProperties.pageOrientation !== undefined || pdfExportProperties.pageSize !== undefined) {
                var pdfPageSettings = new PdfPageSettings();
                /* tslint:disable-next-line:max-line-length */
                pdfPageSettings.orientation = (pdfExportProperties.pageOrientation === 'landscape') ? PdfPageOrientation.Landscape : PdfPageOrientation.Portrait;
                pdfPageSettings.size = this.getPageSize(pdfExportProperties.pageSize);
                section.setPageSettings(pdfPageSettings);
            }
            var clientSize = this.pdfDocument.pageSettings.size;
            if (pdfExportProperties.header !== undefined) {
                /* tslint:disable-next-line:no-any */
                var header = pdfExportProperties.header;
                var position = new PointF(0, header.fromTop);
                var size = new SizeF((clientSize.width - 80), (header.height * 0.75));
                var bounds = new RectangleF(position, size);
                this.pdfDocument.template.top = this.drawPageTemplate(new PdfPageTemplateElement(bounds), header);
            }
            if (pdfExportProperties.footer !== undefined) {
                /* tslint:disable-next-line:no-any */
                var footer = pdfExportProperties.footer;
                var position = new PointF(0, ((clientSize.width - 80) - (footer.fromBottom * 0.75)));
                var size = new SizeF((clientSize.width - 80), (footer.height * 0.75));
                var bounds = new RectangleF(position, size);
                this.pdfDocument.template.bottom = this.drawPageTemplate(new PdfPageTemplateElement(bounds), footer);
            }
            if (pdfExportProperties.includeHiddenColumn !== undefined && !this.isGrouping) {
                this.hideColumnInclude = pdfExportProperties.includeHiddenColumn;
            }
            if (pdfExportProperties.dataSource !== undefined) {
                if (!(pdfExportProperties.dataSource instanceof DataManager)) {
                    dataSource = pdfExportProperties.dataSource;
                }
                this.customDataSource = true;
                this.currentViewData = false;
            }
            else if (pdfExportProperties.exportType !== undefined) {
                if (pdfExportProperties.exportType === 'currentpage') {
                    dataSource = this.parent.getCurrentViewRecords();
                    this.currentViewData = true;
                    this.customDataSource = false;
                }
                else {
                    this.currentViewData = false;
                    this.customDataSource = false;
                }
            }
            else {
                this.currentViewData = false;
                this.customDataSource = false;
            }
        }
        else {
            this.currentViewData = false;
            this.customDataSource = false;
        }
        return { dataSource: dataSource, section: section };
    };
    /* tslint:disable-next-line:no-any */
    PdfExport.prototype.drawPageTemplate = function (template, element) {
        for (var _i = 0, _a = element.contents; _i < _a.length; _i++) {
            var content = _a[_i];
            this.processContentValidation(content);
            switch (content.type) {
                case 'text':
                    /* tslint:disable-next-line:max-line-length */
                    if (content.value === '' || content.value === undefined || content.value === null || typeof content.value !== 'string') {
                        throw new Error('please enter the valid input value in text content...');
                    }
                    this.drawText(template, content);
                    break;
                case 'pagenumber':
                    this.drawPageNumber(template, content);
                    break;
                case 'image':
                    if (content.src === undefined || content.src === null || content.src === '') {
                        throw new Error('please enter the valid base64 string in image content...');
                    }
                    this.drawImage(template, content);
                    break;
                case 'line':
                    this.drawLine(template, content);
                    break;
                default:
                    throw new Error('Please set valid content type...');
            }
        }
        return template;
    };
    /* tslint:disable-next-line:no-any */
    PdfExport.prototype.processContentValidation = function (content) {
        if (content.type === undefined || content.type === null) {
            throw new Error('please set valid content type...');
        }
        else {
            if (content.type === 'line') {
                if (content.points === undefined || content.points === null) {
                    throw new Error('please enter valid points in ' + content.type + ' content...');
                }
                else {
                    if (content.points.x1 === undefined || content.points.x1 === null || typeof content.points.x1 !== 'number') {
                        throw new Error('please enter valid x1 co-ordinate in ' + content.type + ' points...');
                    }
                    if (content.points.y1 === undefined || content.points.y1 === null || typeof content.points.y1 !== 'number') {
                        throw new Error('please enter valid y1 co-ordinate in ' + content.type + ' points...');
                    }
                    if (content.points.x2 === undefined || content.points.x2 === null || typeof content.points.x2 !== 'number') {
                        throw new Error('please enter valid x2 co-ordinate in ' + content.type + ' points...');
                    }
                    if (content.points.y2 === undefined || content.points.y2 === null || typeof content.points.y2 !== 'number') {
                        throw new Error('please enter valid y2 co-ordinate in ' + content.type + ' points...');
                    }
                }
            }
            else {
                if (content.position === undefined || content.position === null) {
                    throw new Error('please enter valid position in ' + content.type + ' content...');
                }
                else {
                    if (content.position.x === undefined || content.position.x === null || typeof content.position.x !== 'number') {
                        throw new Error('please enter valid x co-ordinate in ' + content.type + ' position...');
                    }
                    if (content.position.y === undefined || content.position.y === null || typeof content.position.y !== 'number') {
                        throw new Error('please enter valid y co-ordinate in ' + content.type + ' position...');
                    }
                }
            }
        }
    };
    /* tslint:disable-next-line:no-any */
    PdfExport.prototype.drawText = function (pageTemplate, content) {
        var font = this.getFont(content);
        var brush = this.getBrushFromContent(content);
        var pen = null;
        if (content.style.textPenColor !== undefined) {
            var penColor = this.hexToRgb(content.style.textPenColor);
            pen = new PdfPen(new PdfColor(penColor.r, penColor.g, penColor.b));
        }
        if (brush == null && pen == null) {
            brush = new PdfSolidBrush(new PdfColor(0, 0, 0));
        }
        var value = content.value.toString();
        var x = content.position.x * 0.75;
        var y = content.position.y * 0.75;
        var format;
        var result = this.setContentFormat(content, format);
        if (result !== null && result.format !== undefined && result.size !== undefined) {
            pageTemplate.graphics.drawString(value, font, pen, brush, x, y, result.size.width, result.size.height, result.format);
        }
        else {
            pageTemplate.graphics.drawString(value, font, pen, brush, x, y, format);
        }
    };
    /* tslint:disable-next-line:no-any */
    PdfExport.prototype.drawPageNumber = function (documentHeader, content) {
        var font = this.getFont(content);
        var brush = null;
        if (content.style.textBrushColor !== undefined) {
            /* tslint:disable-next-line:max-line-length */
            var brushColor = this.hexToRgb(content.style.textBrushColor);
            brush = new PdfSolidBrush(new PdfColor(brushColor.r, brushColor.g, brushColor.b));
        }
        else {
            brush = new PdfSolidBrush(new PdfColor(0, 0, 0));
        }
        var pageNumber = new PdfPageNumberField(font, brush);
        pageNumber.numberStyle = this.getPageNumberStyle(content.pageNumberType);
        var compositeField;
        var format;
        if (content.format !== undefined) {
            if (content.format.indexOf('$total') !== -1 && content.format.indexOf('$current') !== -1) {
                var pageCount = new PdfPageCountField(font);
                if (content.format.indexOf('$total') > content.format.indexOf('$current')) {
                    format = content.format.replace('$current', '0');
                    format = format.replace('$total', '1');
                }
                else {
                    format = content.format.replace('$current', '1');
                    format = format.replace('$total', '0');
                }
                compositeField = new PdfCompositeField(font, brush, format, pageNumber, pageCount);
            }
            else if (content.format.indexOf('$current') !== -1 && content.format.indexOf('$total') === -1) {
                format = content.format.replace('$current', '0');
                compositeField = new PdfCompositeField(font, brush, format, pageNumber);
            }
            else {
                var pageCount = new PdfPageCountField(font);
                format = content.format.replace('$total', '0');
                compositeField = new PdfCompositeField(font, brush, format, pageCount);
            }
        }
        else {
            format = '{0}';
            compositeField = new PdfCompositeField(font, brush, format, pageNumber);
        }
        var x = content.position.x * 0.75;
        var y = content.position.y * 0.75;
        var result = this.setContentFormat(content, compositeField.stringFormat);
        if (result !== null && result.format !== undefined && result.size !== undefined) {
            compositeField.stringFormat = result.format;
            compositeField.bounds = new RectangleF(x, y, result.size.width, result.size.height);
        }
        compositeField.draw(documentHeader.graphics, x, y);
    };
    /* tslint:disable-next-line:no-any */
    PdfExport.prototype.drawImage = function (documentHeader, content) {
        var x = content.position.x * 0.75;
        var y = content.position.y * 0.75;
        var width = (content.size !== undefined) ? (content.size.width * 0.75) : undefined;
        var height = (content.size !== undefined) ? (content.size.height * 0.75) : undefined;
        var image = new PdfBitmap(content.src);
        if (width !== undefined) {
            documentHeader.graphics.drawImage(image, x, y, width, height);
        }
        else {
            documentHeader.graphics.drawImage(image, x, y);
        }
    };
    /* tslint:disable-next-line:no-any */
    PdfExport.prototype.drawLine = function (documentHeader, content) {
        var x1 = content.points.x1 * 0.75;
        var y1 = content.points.y1 * 0.75;
        var x2 = content.points.x2 * 0.75;
        var y2 = content.points.y2 * 0.75;
        var pen = this.getPenFromContent(content);
        if (content.style !== undefined && content.style !== null) {
            if (content.style.penSize !== undefined && content.style.penSize !== null && typeof content.style.penSize === 'number') {
                pen.width = content.style.penSize * 0.75;
            }
            pen.dashStyle = this.getDashStyle(content.style.dashStyle);
        }
        documentHeader.graphics.drawLine(pen, x1, y1, x2, y2);
    };
    /* tslint:disable-next-line:no-any */ /* tslint:disable-next-line:max-line-length */
    PdfExport.prototype.processAggregates = function (sRows, pdfGrid, border, font, brush, backgroundBrush, isCaption, captionRow, groupIndex) {
        for (var _i = 0, sRows_1 = sRows; _i < sRows_1.length; _i++) {
            var row = sRows_1[_i];
            var leastCaptionSummaryIndex = -1;
            var index = 0;
            var isEmpty = true;
            /* tslint:disable-next-line:no-any */
            var value = [];
            for (var i = 0; i < pdfGrid.columns.count; i++) {
                /* tslint:disable-next-line:no-any */
                var cell = row.cells[index];
                if (!this.hideColumnInclude) {
                    while (cell.visible === undefined) {
                        if (captionRow !== undefined) {
                            if (captionRow.cells.getCell(i).value !== undefined) {
                                value.push('');
                                value.push(captionRow.cells.getCell(i).value);
                                isEmpty = false;
                                i += 1;
                            }
                            else {
                                value.push('');
                            }
                        }
                        else {
                            value.push('');
                        }
                        i += 1;
                        index = index + 1;
                        cell = row.cells[index];
                    }
                    while (cell.visible !== undefined && !cell.visible) {
                        index = index + 1;
                        cell = row.cells[index];
                    }
                }
                if (cell.isDataCell) {
                    var templateFn = {};
                    /* tslint:disable-next-line:max-line-length */
                    if (cell.column.footerTemplate !== undefined || cell.column.groupCaptionTemplate !== undefined || cell.column.groupFooterTemplate !== undefined) {
                        /* tslint:disable-next-line:no-any */
                        var result = this.getTemplateFunction(templateFn, i, leastCaptionSummaryIndex, cell.column);
                        templateFn = result.templateFunction;
                        leastCaptionSummaryIndex = result.leastCaptionSummaryIndex;
                        /* tslint:disable-next-line:max-line-length */
                        var txt = (templateFn[getEnumValue(CellType, cell.cellType)](row.data[cell.column.field ? cell.column.field : cell.column.columnName]));
                        value.push(txt[0].wholeText);
                        isEmpty = false;
                    }
                    else {
                        /* tslint:disable-next-line:no-any */
                        var result = this.getSummaryWithoutTemplate(row.data[cell.column.field]);
                        if (result !== undefined) {
                            value.push(result);
                        }
                    }
                }
                else {
                    value.push('');
                }
                if (isEmpty && value[i] !== '' && value[i] !== undefined && value[i] !== null) {
                    isEmpty = false;
                }
                index += 1;
            }
            if (!isEmpty) {
                if (!isCaption) {
                    var gridRow = pdfGrid.rows.addRow();
                    gridRow.style.setBorder(border);
                    gridRow.style.setFont(font);
                    gridRow.style.setTextBrush(brush);
                    gridRow.style.setBackgroundBrush(backgroundBrush);
                    for (var i = 0; i < pdfGrid.columns.count; i++) {
                        gridRow.cells.getCell(i).value = value[i].toString();
                    }
                }
                else {
                    for (var i = 0; i < pdfGrid.columns.count; i++) {
                        captionRow.cells.getCell(i).value = value[i].toString();
                        if (i === (groupIndex + 1) && leastCaptionSummaryIndex !== -1) {
                            captionRow.cells.getCell(i).columnSpan = leastCaptionSummaryIndex - (groupIndex + 1);
                        }
                        else if (i === (groupIndex + 1) && leastCaptionSummaryIndex === -1) {
                            captionRow.cells.getCell(i).columnSpan = pdfGrid.columns.count - (groupIndex + 1);
                        }
                    }
                }
            }
        }
    };
    /* tslint:disable-next-line:no-any */
    PdfExport.prototype.getTemplateFunction = function (templateFn, index, leastCaptionSummaryIndex, column) {
        if (column.footerTemplate !== undefined) {
            templateFn[getEnumValue(CellType, CellType.Summary)] = compile(column.footerTemplate);
        }
        else if (column.groupCaptionTemplate !== undefined) {
            if (leastCaptionSummaryIndex === -1) {
                leastCaptionSummaryIndex = index;
            }
            templateFn[getEnumValue(CellType, CellType.CaptionSummary)] = compile(column.groupCaptionTemplate);
        }
        else {
            templateFn[getEnumValue(CellType, CellType.GroupSummary)] = compile(column.groupFooterTemplate);
        }
        return { templateFunction: templateFn, leastCaptionSummaryIndex: leastCaptionSummaryIndex };
    };
    /* tslint:disable-next-line:no-any */
    PdfExport.prototype.getSummaryWithoutTemplate = function (data) {
        if (data.sum !== undefined) {
            return data.sum;
        }
        else if (data.average !== undefined) {
            return data.average;
        }
        else if (data.max !== undefined) {
            return data.max;
        }
        else if (data.min !== undefined) {
            return data.min;
        }
        else if (data.count !== undefined) {
            return data.count;
        }
        else if (data.truecount !== undefined) {
            return data.truecount;
        }
        else if (data.falsecount !== undefined) {
            return data.falsecount;
        }
        else if (data.custom !== undefined) {
            return data.custom;
        }
    };
    // Set alignment, width and type of the values of the column
    /* tslint:disable:no-any */
    /* tslint:disable-next-line:max-line-length */
    PdfExport.prototype.setColumnProperties = function (gridColumns, pdfGrid) {
        var startIndex = this.isGrouping ? (pdfGrid.columns.count - gridColumns.length) : 0;
        for (var i = 0; i < gridColumns.length; i++) {
            if (gridColumns[i].textAlign !== undefined) {
                pdfGrid.columns.getColumn(i + startIndex).format = this.getHorizontalAlignment(gridColumns[i].textAlign);
            }
            // Need to add width consideration with % value
            if (pdfGrid.style.allowHorizontalOverflow && gridColumns[i].width !== undefined) {
                /* tslint:disable-next-line:max-line-length */
                pdfGrid.columns.getColumn(i + startIndex).width = typeof gridColumns[i].width === 'number' ? gridColumns[i].width * 0.75 : this.helper.getConvertedWidth(gridColumns[i].width) * 0.75;
            }
        }
    };
    /**
     * set default style properties of each rows in exporting grid
     * @private
     */
    PdfExport.prototype.setRecordThemeStyle = function (row, border) {
        if (this.gridTheme !== undefined && this.gridTheme.record !== undefined && this.gridTheme.record !== null) {
            var pdfColor = new PdfColor();
            if (this.gridTheme.record.fontColor !== undefined) {
                var penBrushColor = this.hexToRgb(this.gridTheme.record.fontColor);
                pdfColor = new PdfColor(penBrushColor.r, penBrushColor.g, penBrushColor.b);
            }
            row.style.setTextBrush(new PdfSolidBrush(pdfColor));
        }
        else {
            row.style.setTextBrush(new PdfSolidBrush(new PdfColor(0, 0, 0)));
        }
        row.style.setBorder(border);
        return row;
    };
    /**
     * generate the formatted cell values
     * @private
     */
    /* tslint:disable-next-line:max-line-length */ /* tslint:disable-next-line:no-any */
    PdfExport.prototype.processRecord = function (border, columns, gObj, dataSource, pdfGrid, groupIndex) {
        var startIndex = this.isGrouping ? groupIndex : 0;
        for (var _i = 0, _a = dataSource; _i < _a.length; _i++) {
            var items = _a[_i];
            // create a new row and set default style properties
            var gridRow = this.setRecordThemeStyle(pdfGrid.rows.addRow(), border);
            for (var j = 0; j < columns.length; j++) {
                /* tslint:disable:no-any */
                var value = items[columns[j].field];
                var data = items;
                var args = {
                    data: data,
                    value: value,
                    column: columns[j],
                    style: undefined,
                    colSpan: 1
                };
                /* tslint:enable:no-any */
                gObj.trigger(pdfQueryCellInfo, args);
                var cell = gridRow.cells.getCell(j + startIndex);
                cell.value = this.exportValueFormatter.formatCellValue(args);
                if (args.style !== undefined) {
                    this.processCellStyle(cell, args);
                }
                if (args.colSpan > 1) {
                    if ((j + startIndex + 1 + args.colSpan) > gridRow.cells.count) {
                        args.colSpan = gridRow.cells.count - (j + startIndex + 1);
                    }
                    cell.columnSpan = args.colSpan;
                    for (var i = 1; i < cell.columnSpan; i++) {
                        var spanCell = gridRow.cells.getCell(j + startIndex + i);
                        spanCell.value = '';
                    }
                    j += (args.colSpan - 1);
                }
            }
        }
    };
    /* tslint:disable-next-line:no-any */
    PdfExport.prototype.processCellStyle = function (cell, args) {
        if (args.style.backgroundColor !== undefined) {
            /* tslint:disable-next-line:max-line-length */
            var backColor = this.hexToRgb(args.style.backgroundColor);
            cell.style.backgroundBrush = new PdfSolidBrush(new PdfColor(backColor.r, backColor.g, backColor.b));
        }
        if (args.style.textAlignment !== undefined) {
            cell.style.stringFormat = this.getHorizontalAlignment(args.style.textAlignment);
        }
        if (args.style.verticalAlignment !== undefined) {
            cell.style.stringFormat = this.getVerticalAlignment(args.style.verticalAlignment, cell.style.stringFormat);
        }
        if (args.style.textBrushColor !== undefined) {
            var textBrushColor = this.hexToRgb(args.style.textBrushColor);
            cell.style.textBrush = new PdfSolidBrush(new PdfColor(textBrushColor.r, textBrushColor.g, textBrushColor.b));
        }
        if (args.style.textPenColor !== undefined) {
            var textPenColor = this.hexToRgb(args.style.textPenColor);
            cell.style.textPen = new PdfPen(new PdfColor(textPenColor.r, textPenColor.g, textPenColor.b));
        }
        /* tslint:disable-next-line:max-line-length */
        if (args.style.fontFamily !== undefined || args.style.fontSize !== undefined || args.style.bold !== undefined || args.style.italic !== undefined || args.style.underline !== undefined || args.style.strikeout !== undefined) {
            cell.style.font = this.getFont(args);
        }
        if (args.style.border !== undefined) {
            var border = new PdfBorders();
            var borderWidth = args.style.border.width;
            // set border width
            var width = (borderWidth !== undefined && typeof borderWidth === 'number') ? (borderWidth * 0.75) : (undefined);
            // set border color
            var color = new PdfColor(196, 196, 196);
            if (args.style.border.color !== undefined) {
                var borderColor = this.hexToRgb(args.style.border.color);
                color = new PdfColor(borderColor.r, borderColor.g, borderColor.b);
            }
            var pen = new PdfPen(color, width);
            // set border dashStyle 'Solid <default>, Dash, Dot, DashDot, DashDotDot'
            if (args.style.border.dashStyle !== undefined) {
                pen.dashStyle = this.getDashStyle(args.style.border.dashStyle);
            }
            border.all = pen;
            cell.style.borders = border;
        }
    };
    /**
     * set text alignment of each columns in exporting grid
     * @private
     */
    PdfExport.prototype.getHorizontalAlignment = function (textAlign, format) {
        if (format === undefined) {
            format = new PdfStringFormat();
        }
        switch (textAlign) {
            case 'right':
                format.alignment = PdfTextAlignment.Right;
                break;
            case 'center':
                format.alignment = PdfTextAlignment.Center;
                break;
            case 'justify':
                format.alignment = PdfTextAlignment.Justify;
                break;
            case 'left':
                format.alignment = PdfTextAlignment.Left;
                break;
        }
        return format;
    };
    /**
     * set vertical alignment of each columns in exporting grid
     * @private
     */
    PdfExport.prototype.getVerticalAlignment = function (verticalAlign, format, textAlign) {
        if (format === undefined) {
            format = new PdfStringFormat();
            format = this.getHorizontalAlignment(textAlign, format);
        }
        switch (verticalAlign) {
            case 'bottom':
                format.lineAlignment = PdfVerticalAlignment.Bottom;
                break;
            case 'middle':
                format.lineAlignment = PdfVerticalAlignment.Middle;
                break;
            case 'top':
                format.lineAlignment = PdfVerticalAlignment.Top;
                break;
        }
        return format;
    };
    PdfExport.prototype.getFontFamily = function (fontFamily) {
        switch (fontFamily) {
            case 'TimesRoman':
                return 2;
            case 'Courier':
                return 1;
            case 'Symbol':
                return 3;
            case 'ZapfDingbats':
                return 4;
            default:
                return 0;
        }
    };
    /* tslint:disable-next-line:no-any */
    PdfExport.prototype.getFont = function (content) {
        var fontSize = (content.style.fontSize !== undefined) ? (content.style.fontSize * 0.75) : 9.75;
        /* tslint:disable-next-line:max-line-length */
        var fontFamily = (content.style.fontFamily !== undefined) ? (this.getFontFamily(content.style.fontFamily)) : PdfFontFamily.Helvetica;
        var fontStyle = PdfFontStyle.Regular;
        if (content.style.bold !== undefined && content.style.bold) {
            fontStyle |= PdfFontStyle.Bold;
        }
        if (content.style.italic !== undefined && content.style.italic) {
            fontStyle |= PdfFontStyle.Italic;
        }
        if (content.style.underline !== undefined && content.style.underline) {
            fontStyle |= PdfFontStyle.Underline;
        }
        if (content.style.strikeout !== undefined && content.style.strikeout) {
            fontStyle |= PdfFontStyle.Strikeout;
        }
        return new PdfStandardFont(fontFamily, fontSize, fontStyle);
    };
    PdfExport.prototype.getPageNumberStyle = function (pageNumberType) {
        switch (pageNumberType) {
            case 'lowerlatin':
                return 2;
            case 'lowerroman':
                return 3;
            case 'upperlatin':
                return 4;
            case 'upperroman':
                return 5;
            default:
                return 1;
        }
    };
    /* tslint:disable-next-line:max-line-length */ /* tslint:disable-next-line:no-any */
    PdfExport.prototype.setContentFormat = function (content, format) {
        if (content.size !== undefined) {
            var width = content.size.width * 0.75;
            var height = content.size.height * 0.75;
            format = new PdfStringFormat(PdfTextAlignment.Left, PdfVerticalAlignment.Middle);
            if (content.style.hAlign !== undefined) {
                switch (content.style.hAlign) {
                    case 'right':
                        format.alignment = PdfTextAlignment.Right;
                        break;
                    case 'center':
                        format.alignment = PdfTextAlignment.Center;
                        break;
                    case 'justify':
                        format.alignment = PdfTextAlignment.Justify;
                        break;
                    default:
                        format.alignment = PdfTextAlignment.Left;
                }
            }
            if (content.style.vAlign !== undefined) {
                format = this.getVerticalAlignment(content.style.vAlign, format);
            }
            return { format: format, size: new SizeF(width, height) };
        }
        return null;
    };
    PdfExport.prototype.getPageSize = function (pageSize) {
        switch (pageSize) {
            case 'letter':
                return new SizeF(612, 792);
            case 'note':
                return new SizeF(540, 720);
            case 'legal':
                return new SizeF(612, 1008);
            case 'a0':
                return new SizeF(2380, 3368);
            case 'a1':
                return new SizeF(1684, 2380);
            case 'a2':
                return new SizeF(1190, 1684);
            case 'a3':
                return new SizeF(842, 1190);
            case 'a5':
                return new SizeF(421, 595);
            case 'a6':
                return new SizeF(297, 421);
            case 'a7':
                return new SizeF(210, 297);
            case 'a8':
                return new SizeF(148, 210);
            case 'a9':
                return new SizeF(105, 148);
            // case 'A10':
            //     return new SizeF(74, 105);
            case 'b0':
                return new SizeF(2836, 4008);
            case 'b1':
                return new SizeF(2004, 2836);
            case 'b2':
                return new SizeF(1418, 2004);
            case 'b3':
                return new SizeF(1002, 1418);
            case 'b4':
                return new SizeF(709, 1002);
            case 'b5':
                return new SizeF(501, 709);
            case 'archa':
                return new SizeF(648, 864);
            case 'archb':
                return new SizeF(864, 1296);
            case 'archc':
                return new SizeF(1296, 1728);
            case 'archd':
                return new SizeF(1728, 2592);
            case 'arche':
                return new SizeF(2592, 3456);
            case 'flsa':
                return new SizeF(612, 936);
            case 'halfletter':
                return new SizeF(396, 612);
            case 'letter11x17':
                return new SizeF(792, 1224);
            case 'ledger':
                return new SizeF(1224, 792);
            default:
                return new SizeF(595, 842);
        }
    };
    PdfExport.prototype.getDashStyle = function (dashStyle) {
        switch (dashStyle) {
            case 'dash':
                return 1;
            case 'dot':
                return 2;
            case 'dashdot':
                return 3;
            case 'dashdotdot':
                return 4;
            default:
                return 0;
        }
    };
    /* tslint:disable-next-line:no-any */
    PdfExport.prototype.getPenFromContent = function (content) {
        var pen = new PdfPen(new PdfColor(0, 0, 0));
        if (content.style !== undefined && content.style !== null && content.style.penColor !== undefined) {
            var penColor = this.hexToRgb(content.style.penColor);
            pen = new PdfPen(new PdfColor(penColor.r, penColor.g, penColor.b));
        }
        return pen;
    };
    /* tslint:disable-next-line:no-any */
    PdfExport.prototype.getBrushFromContent = function (content) {
        var brush = null;
        if (content.style.textBrushColor !== undefined) {
            /* tslint:disable-next-line:max-line-length */
            var brushColor = this.hexToRgb(content.style.textBrushColor);
            brush = new PdfSolidBrush(new PdfColor(brushColor.r, brushColor.g, brushColor.b));
        }
        return brush;
    };
    PdfExport.prototype.hexToRgb = function (hex) {
        if (hex === null || hex === '' || hex.length !== 7) {
            throw new Error('please set valid hex value for color...');
        }
        hex = hex.substring(1);
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        return { r: r, g: g, b: b };
    };
    /**
     * To destroy the pdf export
     * @return {void}
     * @hidden
     */
    PdfExport.prototype.destroy = function () {
        //destroy for exporting
    };
    return PdfExport;
}());

var __extends$22 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `CommandColumn` used to render command column in grid
 * @hidden
 */
var CommandColumnRenderer = /** @class */ (function (_super) {
    __extends$22(CommandColumnRenderer, _super);
    function CommandColumnRenderer(parent, locator) {
        var _this = _super.call(this, parent, locator) || this;
        _this.buttonElement = createElement('button', {});
        _this.unbounDiv = createElement('div', { className: 'e-unboundcelldiv', styles: 'display: inline-block' });
        _this.element = createElement('TD', {
            className: 'e-rowcell e-unboundcell', attrs: {
                role: 'gridcell', tabindex: '-1'
            }
        });
        return _this;
    }
    /**
     * Function to render the cell content based on Column object.
     * @param  {Column} column
     * @param  {Object} data
     * @param  {{[x:string]:Object}} attributes?
     * @param  {Element}
     */
    CommandColumnRenderer.prototype.render = function (cell, data, attributes$$1) {
        var node = this.element.cloneNode();
        node.appendChild(this.unbounDiv.cloneNode());
        node.setAttribute('aria-label', 'is Command column column header ' + cell.column.headerText);
        if (cell.column.commandsTemplate) {
            appendChildren(node.firstElementChild, cell.column.getColumnTemplate()(data));
        }
        else {
            for (var _i = 0, _a = cell.commands; _i < _a.length; _i++) {
                var command = _a[_i];
                node = this.renderButton(node, command, attributes$$1.index);
            }
        }
        this.setAttributes(node, cell, attributes$$1);
        if (this.parent.isEdit) {
            addClass(node.querySelectorAll('.e-edit-delete'), 'e-hide');
            removeClass(node.querySelectorAll('.e-save-cancel'), 'e-hide');
        }
        else {
            addClass(node.querySelectorAll('.e-save-cancel'), 'e-hide');
            removeClass(node.querySelectorAll('.e-edit-delete'), 'e-hide');
        }
        return node;
    };
    CommandColumnRenderer.prototype.renderButton = function (node, buttonOption, index) {
        var button = this.buttonElement.cloneNode();
        attributes(button, { 'id': this.parent.element.id + (buttonOption.type || '') + '_' + index, 'type': 'button' });
        button.onclick = buttonOption.buttonOption.click;
        node.firstElementChild.appendChild(new Button(buttonOption.buttonOption, button).element);
        switch (buttonOption.type) {
            case 'edit':
            case 'delete':
                addClass([button], ['e-edit-delete', 'e-' + buttonOption.type + 'button']);
                break;
            case 'cancel':
            case 'save':
                addClass([button], ['e-save-cancel', 'e-' + buttonOption.type + 'button']);
                break;
        }
        return node;
    };
    return CommandColumnRenderer;
}(CellRenderer));

/**
 * `CommandColumn` used to handle the command column actions.
 * @hidden
 */
var CommandColumn = /** @class */ (function () {
    function CommandColumn(parent, locator) {
        this.parent = parent;
        this.locator = locator;
        this.addEventListener();
    }
    CommandColumn.prototype.initiateRender = function () {
        var cellFac = this.locator.getService('cellRendererFactory');
        cellFac.addCellRenderer(CellType.CommandColumn, new CommandColumnRenderer(this.parent, this.locator));
    };
    CommandColumn.prototype.commandClickHandler = function (e) {
        var gObj = this.parent;
        var gID = this.parent.element.id;
        var target = closest(e.target, 'button');
        if (!target || !gObj.editModule) {
            return;
        }
        switch (target.id.split('_')[0]) {
            case gID + 'edit':
                this.parent.editModule.endEdit();
                gObj.editModule.startEdit(closest(target, 'tr'));
                break;
            case gID + 'cancel':
                gObj.editModule.closeEdit();
                break;
            case gID + 'save':
                this.parent.editModule.endEdit();
                break;
            case gID + 'delete':
                this.parent.editModule.endEdit();
                gObj.editModule.deleteRow(closest(target, 'tr'));
                break;
        }
    };
    /**
     * For internal use only - Get the module name.
     */
    CommandColumn.prototype.getModuleName = function () {
        return 'commandColumn';
    };
    /**
     * To destroy CommandColumn.
     * @method destroy
     * @return {void}
     */
    CommandColumn.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
    };
    CommandColumn.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(click, this.commandClickHandler);
        this.parent.off(initialEnd, this.initiateRender);
        this.parent.off(keyPressed, this.keyPressHandler);
    };
    CommandColumn.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(click, this.commandClickHandler, this);
        this.parent.on(initialEnd, this.initiateRender, this);
        this.parent.on(keyPressed, this.keyPressHandler, this);
    };
    CommandColumn.prototype.keyPressHandler = function (e) {
        if (e.action === 'enter' && closest(e.target, 'button')) {
            this.commandClickHandler(e);
            e.preventDefault();
        }
    };
    return CommandColumn;
}());

var menuClass = {
    header: '.e-gridheader',
    content: '.e-gridcontent',
    edit: '.e-inline-edit',
    editIcon: 'e-edit',
    pager: '.e-gridpager',
    delete: 'e-delete',
    save: 'e-save',
    cancel: 'e-cancel',
    copy: 'e-copy',
    pdf: 'e-pdfexport',
    group: 'e-icon-group',
    ungroup: 'e-icon-ungroup',
    csv: 'e-csvexport',
    excel: 'e-excelexport',
    fPage: 'e-icon-first',
    nPage: 'e-icon-next',
    lPage: 'e-icon-last',
    pPage: 'e-icon-prev',
    ascending: 'e-icon-ascending',
    descending: 'e-icon-descending',
    groupHeader: 'e-groupdroparea',
    touchPop: 'e-gridpopup'
};
/**
 * 'ContextMenu module used to handle context menu actions.'
 */
var ContextMenu$1 = /** @class */ (function () {
    function ContextMenu$$1(parent, serviceLocator) {
        this.defaultItems = {};
        this.disableItems = [];
        this.hiddenItems = [];
        this.localeText = this.setLocaleKey();
        this.parent = parent;
        this.gridID = parent.element.id;
        this.serviceLocator = serviceLocator;
        this.addEventListener();
    }
    /**
     * @hidden
     */
    ContextMenu$$1.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(initialLoad, this.render, this);
    };
    /**
     * @hidden
     */
    ContextMenu$$1.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(initialLoad, this.render);
    };
    ContextMenu$$1.prototype.render = function () {
        this.l10n = this.serviceLocator.getService('localization');
        this.element = createElement('ul', { id: this.gridID + '_cmenu' });
        this.parent.element.appendChild(this.element);
        var target = '#' + this.gridID;
        this.contextMenu = new ContextMenu({
            items: this.getMenuItems(),
            enableRtl: this.parent.enableRtl,
            enablePersistence: this.parent.enablePersistence,
            locale: this.parent.locale,
            target: target,
            select: this.contextMenuItemClick.bind(this),
            beforeOpen: this.contextMenuBeforeOpen.bind(this),
            onOpen: this.contextMenuOpen.bind(this),
            onClose: this.contextMenuOnClose.bind(this),
            cssClass: 'e-grid-menu'
        });
        this.contextMenu.appendTo(this.element);
    };
    ContextMenu$$1.prototype.getMenuItems = function () {
        var menuItems = [];
        var exportItems = [];
        for (var _i = 0, _a = this.parent.contextMenuItems; _i < _a.length; _i++) {
            var item = _a[_i];
            if (typeof item === 'string' && this.getDefaultItems().indexOf(item) !== -1) {
                if (item.toLocaleLowerCase().indexOf('export') !== -1) {
                    exportItems.push(this.buildDefaultItems(item));
                }
                else {
                    menuItems.push(this.buildDefaultItems(item));
                }
            }
            else if (typeof item !== 'string') {
                menuItems.push(item);
            }
        }
        if (exportItems.length > 0) {
            var exportGroup = this.buildDefaultItems('export');
            exportGroup.items = exportItems;
            menuItems.push(exportGroup);
        }
        return menuItems;
    };
    ContextMenu$$1.prototype.getLastPage = function () {
        var totalpage = Math.floor(this.parent.pageSettings.totalRecordsCount / this.parent.pageSettings.pageSize);
        if (this.parent.pageSettings.totalRecordsCount % this.parent.pageSettings.pageSize) {
            totalpage += 1;
        }
        return totalpage;
    };
    ContextMenu$$1.prototype.contextMenuOpen = function () {
        this.isOpen = true;
    };
    ContextMenu$$1.prototype.contextMenuItemClick = function (args) {
        var item = this.getKeyFromId(args.item.id);
        switch (item) {
            case 'autoFitAll':
                this.parent.autoFitColumns([]);
                break;
            case 'autoFit':
                this.parent.autoFitColumns(this.targetColumn.field);
                break;
            case 'group':
                this.parent.groupColumn(this.targetColumn.field);
                break;
            case 'ungroup':
                this.parent.ungroupColumn(this.targetColumn.field);
                break;
            case 'edit':
                if (this.parent.editSettings.mode === 'batch') {
                    if (this.row && this.cell && !isNaN(parseInt(this.cell.getAttribute('aria-colindex'), 10))) {
                        this.parent.editModule.editCell(parseInt(this.row.getAttribute('aria-rowindex'), 10), this.parent.getColumns()[parseInt(this.cell.getAttribute('aria-colindex'), 10)].field);
                    }
                }
                else {
                    this.parent.editModule.endEdit();
                    this.parent.editModule.startEdit();
                }
                break;
            case 'delete':
                if (this.parent.editSettings.mode !== 'batch') {
                    this.parent.editModule.endEdit();
                }
                this.parent.editModule.deleteRow(this.parent.getRowByIndex(this.parent.selectedRowIndex));
                break;
            case 'save':
                this.parent.editModule.endEdit();
                break;
            case 'cancel':
                this.parent.editModule.closeEdit();
                break;
            case 'copy':
                this.parent.copy();
                break;
            case 'pdfExport':
                this.parent.pdfExport();
                break;
            case 'excelExport':
                this.parent.excelExport();
                break;
            case 'csvExport':
                this.parent.csvExport();
                break;
            case 'sortAscending':
                this.isOpen = false;
                this.parent.sortColumn(this.targetColumn.field, 'ascending');
                break;
            case 'sortDescending':
                this.isOpen = false;
                this.parent.sortColumn(this.targetColumn.field, 'descending');
                break;
            case 'firstPage':
                this.parent.goToPage(1);
                break;
            case 'prevPage':
                this.parent.goToPage(this.parent.pageSettings.currentPage - 1);
                break;
            case 'lastPage':
                this.parent.goToPage(this.getLastPage());
                break;
            case 'nextPage':
                this.parent.goToPage(this.parent.pageSettings.currentPage + 1);
                break;
        }
        this.parent.trigger(contextMenuClick, args);
    };
    ContextMenu$$1.prototype.contextMenuOnClose = function (args) {
        var parent = 'parentObj';
        if (args.items.length > 0 && args.items[0][parent] instanceof ContextMenu) {
            this.updateItemStatus();
        }
    };
    ContextMenu$$1.prototype.getLocaleText = function (item) {
        return this.l10n.getConstant(this.localeText[item]);
    };
    ContextMenu$$1.prototype.updateItemStatus = function () {
        this.contextMenu.showItems(this.hiddenItems);
        this.contextMenu.enableItems(this.disableItems);
        this.hiddenItems = [];
        this.disableItems = [];
        this.isOpen = false;
    };
    ContextMenu$$1.prototype.contextMenuBeforeOpen = function (args) {
        var changedRecords = 'changedRecords';
        var addedRecords = 'addedRecords';
        var deletedRecords = 'deletedRecords';
        var closestGrid = closest(args.event.target, '.e-grid');
        if (args.event && closestGrid && closestGrid !== this.parent.element) {
            args.cancel = true;
        }
        else if (args.event && (closest(args.event.target, '.' + menuClass.groupHeader)
            || closest(args.event.target, '.' + menuClass.touchPop))) {
            args.cancel = true;
        }
        else {
            this.targetColumn = this.getColumn(args.event);
            this.selectRow(args.event);
            for (var _i = 0, _a = args.items; _i < _a.length; _i++) {
                var item = _a[_i];
                var key = this.getKeyFromId(item.id);
                var dItem = this.defaultItems[key];
                if (this.getDefaultItems().indexOf(key) !== -1) {
                    if (this.ensureDisabledStatus(key)) {
                        this.disableItems.push(item.text);
                    }
                    if (args.event && this.ensureTarget(args.event.target, menuClass.edit)) {
                        if (key !== 'save' && key !== 'cancel') {
                            this.hiddenItems.push(item.text);
                        }
                    }
                    else if (this.parent.editSettings.mode === 'batch' && ((closest(args.event.target, '.e-gridform')) ||
                        this.parent.editModule.getBatchChanges()[changedRecords].length ||
                        this.parent.editModule.getBatchChanges()[addedRecords].length ||
                        this.parent.editModule.getBatchChanges()[deletedRecords].length) && (key === 'save' || key === 'cancel')) {
                        continue;
                    }
                    else if (isNullOrUndefined(args.parentItem) && args.event
                        && !this.ensureTarget(args.event.target, dItem.target)) {
                        this.hiddenItems.push(item.text);
                    }
                }
                else if (item.target && args.event &&
                    !this.ensureTarget(args.event.target, item.target)) {
                    this.hiddenItems.push(item.text);
                }
            }
            this.contextMenu.enableItems(this.disableItems, false);
            this.contextMenu.hideItems(this.hiddenItems);
            this.eventArgs = args.event;
            this.parent.trigger(contextMenuOpen, args);
            if (this.hiddenItems.length === args.items.length) {
                this.updateItemStatus();
                args.cancel = true;
            }
        }
    };
    ContextMenu$$1.prototype.ensureTarget = function (targetElement, selector) {
        var target = targetElement;
        if (selector === menuClass.header || selector === menuClass.content) {
            target = parentsUntil(closest(targetElement, '.e-table'), selector.substr(1, selector.length));
        }
        else {
            target = closest(targetElement, selector);
        }
        return target && parentsUntil(target, 'e-grid') === this.parent.element ? true : false;
    };
    ContextMenu$$1.prototype.ensureDisabledStatus = function (item) {
        var _this = this;
        var status = false;
        switch (item) {
            case 'autoFitAll':
            case 'autoFit':
                status = !this.parent.ensureModuleInjected(Resize);
                break;
            case 'group':
                if (!this.parent.allowGrouping || (this.parent.ensureModuleInjected(Group) && this.targetColumn
                    && this.parent.groupSettings.columns.indexOf(this.targetColumn.field) >= 0)) {
                    status = true;
                }
                break;
            case 'ungroup':
                if (!this.parent.allowGrouping || !this.parent.ensureModuleInjected(Group)
                    || (this.parent.ensureModuleInjected(Group) && this.targetColumn
                        && this.parent.groupSettings.columns.indexOf(this.targetColumn.field) < 0)) {
                    status = true;
                }
                break;
            case 'edit':
            case 'delete':
            case 'save':
            case 'cancel':
                if (!this.parent.editModule) {
                    status = true;
                }
                break;
            case 'copy':
                if (this.parent.getSelectedRowIndexes().length === 0) {
                    status = true;
                }
                break;
            case 'export':
                if ((!this.parent.allowExcelExport || !this.parent.excelExport) ||
                    !this.parent.ensureModuleInjected(PdfExport) && !this.parent.ensureModuleInjected(ExcelExport)) {
                    status = true;
                }
                break;
            case 'pdfExport':
                if (!(this.parent.allowPdfExport) || !this.parent.ensureModuleInjected(PdfExport)) {
                    status = true;
                }
                break;
            case 'excelExport':
            case 'csvExport':
                if (!(this.parent.allowExcelExport) || !this.parent.ensureModuleInjected(ExcelExport)) {
                    status = true;
                }
                break;
            case 'sortAscending':
            case 'sortDescending':
                if ((!this.parent.allowSorting) || !this.parent.ensureModuleInjected(Sort)) {
                    status = true;
                }
                else if (this.parent.ensureModuleInjected(Sort) && this.parent.sortSettings.columns.length > 0 && this.targetColumn) {
                    this.parent.sortSettings.columns.forEach(function (element) {
                        if (element.field === _this.targetColumn.field
                            && element.direction === item.replace('sort', '').toLocaleLowerCase()) {
                            status = true;
                        }
                    });
                }
                break;
            case 'firstPage':
            case 'prevPage':
                if (!this.parent.allowPaging || !this.parent.ensureModuleInjected(Page) ||
                    (this.parent.ensureModuleInjected(Page) && this.parent.pageSettings.currentPage === 1)) {
                    status = true;
                }
                break;
            case 'lastPage':
            case 'nextPage':
                if (!this.parent.allowPaging || !this.parent.ensureModuleInjected(Page) ||
                    (this.parent.ensureModuleInjected(Page) && this.parent.pageSettings.currentPage === this.getLastPage())) {
                    status = true;
                }
                break;
        }
        return status;
    };
    /**
     * Gets the context menu of grid.
     * @return {Element}
     */
    ContextMenu$$1.prototype.getContextMenu = function () {
        return this.element;
    };
    /**
     * To destroy the Context menu.
     * @method destroy
     * @return {void}
     */
    ContextMenu$$1.prototype.destroy = function () {
        this.contextMenu.destroy();
        remove(this.element);
        this.removeEventListener();
    };
    ContextMenu$$1.prototype.getModuleName = function () {
        return 'contextMenu';
    };
    ContextMenu$$1.prototype.generateID = function (item) {
        return this.gridID + '_cmenu_' + item;
    };
    ContextMenu$$1.prototype.getKeyFromId = function (id) {
        return id.replace(this.gridID + '_cmenu_', '');
    };
    ContextMenu$$1.prototype.buildDefaultItems = function (item) {
        var menuItem;
        switch (item) {
            case 'autoFitAll':
            case 'autoFit':
                menuItem = { target: menuClass.header };
                break;
            case 'group':
                menuItem = { target: menuClass.header, iconCss: menuClass.group };
                break;
            case 'ungroup':
                menuItem = { target: menuClass.header, iconCss: menuClass.ungroup };
                break;
            case 'edit':
                menuItem = { target: menuClass.content, iconCss: menuClass.editIcon };
                break;
            case 'delete':
                menuItem = { target: menuClass.content, iconCss: menuClass.delete };
                break;
            case 'save':
                menuItem = { target: menuClass.edit, iconCss: menuClass.save };
                break;
            case 'cancel':
                menuItem = { target: menuClass.edit, iconCss: menuClass.cancel };
                break;
            case 'copy':
                menuItem = { target: menuClass.content, iconCss: menuClass.copy };
                break;
            case 'export':
                menuItem = { target: menuClass.content };
                break;
            case 'pdfExport':
                menuItem = { target: menuClass.content, iconCss: menuClass.pdf };
                break;
            case 'excelExport':
                menuItem = { target: menuClass.content, iconCss: menuClass.excel };
                break;
            case 'csvExport':
                menuItem = { target: menuClass.content, iconCss: menuClass.csv };
                break;
            case 'sortAscending':
                menuItem = { target: menuClass.header, iconCss: menuClass.ascending };
                break;
            case 'sortDescending':
                menuItem = { target: menuClass.header, iconCss: menuClass.descending };
                break;
            case 'firstPage':
                menuItem = { target: menuClass.pager, iconCss: menuClass.fPage };
                break;
            case 'prevPage':
                menuItem = { target: menuClass.pager, iconCss: menuClass.pPage };
                break;
            case 'lastPage':
                menuItem = { target: menuClass.pager, iconCss: menuClass.lPage };
                break;
            case 'nextPage':
                menuItem = { target: menuClass.pager, iconCss: menuClass.nPage };
                break;
        }
        this.defaultItems[item] = {
            text: this.getLocaleText(item), id: this.generateID(item),
            target: menuItem.target, iconCss: menuItem.iconCss ? 'e-icons ' + menuItem.iconCss : ''
        };
        return this.defaultItems[item];
    };
    ContextMenu$$1.prototype.getDefaultItems = function () {
        return ['autoFitAll', 'autoFit',
            'group', 'ungroup', 'edit', 'delete', 'save', 'cancel', 'copy', 'export',
            'pdfExport', 'excelExport', 'csvExport', 'sortAscending', 'sortDescending',
            'firstPage', 'prevPage', 'lastPage', 'nextPage'];
    };
    ContextMenu$$1.prototype.setLocaleKey = function () {
        return {
            'autoFitAll': 'autoFitAll',
            'autoFit': 'autoFit',
            'copy': 'Copy',
            'group': 'Group',
            'ungroup': 'Ungroup',
            'edit': 'EditRecord',
            'delete': 'DeleteRecord',
            'save': 'Save',
            'cancel': 'CancelButton',
            'pdfExport': 'Pdfexport',
            'excelExport': 'Excelexport',
            'csvExport': 'Csvexport',
            'export': 'Export',
            'sortAscending': 'SortAscending',
            'sortDescending': 'SortDescending',
            'firstPage': 'FirstPage',
            'lastPage': 'LastPage',
            'prevPage': 'PreviousPage',
            'nextPage': 'NextPage'
        };
    };
    ContextMenu$$1.prototype.getColumn = function (e) {
        var cell = closest(e.target, 'th.e-headercell');
        if (cell) {
            var uid = cell.querySelector('.e-headercelldiv').getAttribute('e-mappinguid');
            return this.parent.getColumnByUid(uid);
        }
        return null;
    };
    ContextMenu$$1.prototype.selectRow = function (e) {
        this.cell = e.target;
        this.row = closest(e.target, 'tr.e-row');
        if (this.row) {
            this.parent.selectRow(this.parent.getDataRows().indexOf(this.row));
        }
    };
    return ContextMenu$$1;
}());

/**
 * FreezeRowModelGenerator is used to generate grid data rows with freeze row and column.
 * @hidden
 */
var FreezeRowModelGenerator = /** @class */ (function () {
    function FreezeRowModelGenerator(parent) {
        this.isFrzLoad = 1;
        this.parent = parent;
        this.rowModelGenerator = new RowModelGenerator(this.parent);
    }
    FreezeRowModelGenerator.prototype.generateRows = function (data, notifyArgs) {
        var row = this.rowModelGenerator.generateRows(data, notifyArgs);
        if (this.parent.frozenColumns) {
            for (var i = 0, len = row.length; i < len; i++) {
                if (this.isFrzLoad % 2 === 0) {
                    row[i].cells = row[i].cells.slice(this.parent.frozenColumns, row[i].cells.length);
                }
                else {
                    row[i].cells = row[i].cells.slice(0, this.parent.frozenColumns);
                }
            }
        }
        this.isFrzLoad++;
        return row;
    };
    return FreezeRowModelGenerator;
}());

var __extends$23 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Freeze module is used to render grid content with frozen rows and columns
 * @hidden
 */
var FreezeContentRender = /** @class */ (function (_super) {
    __extends$23(FreezeContentRender, _super);
    function FreezeContentRender(parent, locator) {
        return _super.call(this, parent, locator) || this;
    }
    FreezeContentRender.prototype.renderPanel = function () {
        _super.prototype.renderPanel.call(this);
        if (this.parent.frozenColumns) {
            var fDiv = createElement('div', { className: 'e-frozencontent' });
            var mDiv = createElement('div', { className: 'e-movablecontent' });
            this.getPanel().firstChild.appendChild(fDiv);
            this.getPanel().firstChild.appendChild(mDiv);
            this.setFrozenContent(fDiv);
            this.setMovableContent(mDiv);
        }
    };
    FreezeContentRender.prototype.renderEmpty = function (tbody) {
        _super.prototype.renderEmpty.call(this, tbody);
        if (this.parent.frozenColumns) {
            this.getMovableContent().querySelector('tbody').innerHTML = '<tr><td></td></tr>';
            if (this.parent.frozenRows) {
                this.parent.getHeaderContent().querySelector('.e-frozenheader').querySelector('tbody').innerHTML = '';
                this.parent.getHeaderContent().querySelector('.e-movableheader').querySelector('tbody').innerHTML = '';
            }
        }
        else if (this.parent.frozenRows) {
            this.parent.getHeaderContent().querySelector('tbody').innerHTML = '';
        }
    };
    FreezeContentRender.prototype.setFrozenContent = function (ele) {
        this.frozenContent = ele;
    };
    FreezeContentRender.prototype.setMovableContent = function (ele) {
        this.movableContent = ele;
    };
    FreezeContentRender.prototype.getFrozenContent = function () {
        return this.frozenContent;
    };
    FreezeContentRender.prototype.getMovableContent = function () {
        return this.movableContent;
    };
    FreezeContentRender.prototype.getModelGenerator = function () {
        return new FreezeRowModelGenerator(this.parent);
    };
    FreezeContentRender.prototype.renderTable = function () {
        _super.prototype.renderTable.call(this);
        if (this.parent.frozenColumns) {
            this.getFrozenContent().appendChild(this.getTable());
            var mTbl = this.getTable().cloneNode(true);
            this.getMovableContent().appendChild(mTbl);
        }
        if (this.parent.frozenRows) {
            this.parent.getHeaderContent().firstChild.classList.add('e-frozenhdrcont');
        }
    };
    return FreezeContentRender;
}(ContentRender));
var FreezeRender = /** @class */ (function (_super) {
    __extends$23(FreezeRender, _super);
    function FreezeRender(parent, locator) {
        var _this = _super.call(this, parent, locator) || this;
        _this.addEventListener();
        return _this;
    }
    FreezeRender.prototype.addEventListener = function () {
        this.parent.on(freezeRender, this.refreshFreeze, this);
    };
    FreezeRender.prototype.renderTable = function () {
        _super.prototype.renderTable.call(this);
        this.rfshMovable();
    };
    FreezeRender.prototype.renderPanel = function () {
        _super.prototype.renderPanel.call(this);
        var fDiv = createElement('div', { className: 'e-frozenheader' });
        var mDiv = createElement('div', { className: 'e-movableheader' });
        this.getPanel().firstChild.appendChild(fDiv);
        this.getPanel().firstChild.appendChild(mDiv);
        this.setFrozenHeader(fDiv);
        this.setMovableHeader(mDiv);
    };
    FreezeRender.prototype.refreshUI = function () {
        this.getMovableHeader().innerHTML = '';
        _super.prototype.refreshUI.call(this);
        this.rfshMovable();
        var mTable = this.getMovableHeader().querySelector('table');
        remove(this.getMovableHeader().querySelector('colgroup'));
        mTable.insertBefore(this.renderMovable(this.getFrozenHeader().querySelector('colgroup')), mTable.querySelector('thead'));
    };
    FreezeRender.prototype.rfshMovable = function () {
        this.getFrozenHeader().appendChild(this.getTable());
        this.getMovableHeader().appendChild(this.createTable());
        this.refreshFreeze({ case: 'filter' });
        this.parent.notify(freezeRefresh, {});
    };
    FreezeRender.prototype.refreshFreeze = function (obj) {
        if (obj.case === 'filter') {
            var filterRow = this.getTable().querySelector('.e-filterbar');
            if (this.parent.allowFiltering && filterRow && this.getMovableHeader().querySelector('thead')) {
                this.getMovableHeader().querySelector('thead')
                    .appendChild(this.renderMovable(filterRow));
            }
        }
        else if (obj.case === 'textwrap') {
            var fRows = void 0;
            var mRows = void 0;
            var wrapMode = this.parent.textWrapSettings.wrapMode;
            if (wrapMode !== 'header' || obj.isModeChg) {
                fRows = this.parent.getContent()
                    .querySelector('.e-frozencontent').querySelectorAll('tr');
                mRows = this.parent.getContent()
                    .querySelector('.e-movablecontent').querySelectorAll('tr');
                this.setWrapHeight(fRows, mRows, obj.isModeChg, true);
            }
            if (this.parent.frozenRows) {
                if (wrapMode === 'content' && this.parent.allowTextWrap) {
                    this.parent.getHeaderContent().firstChild.classList.add('e-wrap');
                }
                else {
                    this.parent.getHeaderContent().firstChild.classList.remove('e-wrap');
                }
                if (wrapMode === 'both' || obj.isModeChg) {
                    fRows = this.getFrozenHeader().querySelectorAll('tr');
                    mRows = this.getMovableHeader().querySelectorAll('tr');
                }
                else {
                    fRows = this.getFrozenHeader().querySelector(wrapMode === 'content' ? 'tbody' : 'thead')
                        .querySelectorAll('tr');
                    mRows = this.getMovableHeader().querySelector(wrapMode === 'content' ? 'tbody' : 'thead')
                        .querySelectorAll('tr');
                }
                this.setWrapHeight(fRows, mRows, obj.isModeChg);
            }
        }
    };
    FreezeRender.prototype.setWrapHeight = function (fRows, mRows, isModeChg, isContReset) {
        var fRowHgt;
        var mRowHgt;
        var isWrap = this.parent.allowTextWrap;
        var wrapMode = this.parent.textWrapSettings.wrapMode;
        var tHead = this.parent.getHeaderContent().querySelector('thead');
        var tBody = this.parent.getHeaderContent().querySelector('tbody');
        for (var i = 0, len = fRows.length; i < len; i++) {
            if (isModeChg && ((wrapMode === 'header' && isContReset) || ((wrapMode === 'content' && tHead.contains(fRows[i]))
                || (wrapMode === 'header' && tBody.contains(fRows[i]))))) {
                fRows[i].style.height = null;
                mRows[i].style.height = null;
            }
            fRowHgt = fRows[i].offsetHeight;
            mRowHgt = mRows[i].offsetHeight;
            if ((isWrap && fRowHgt < mRowHgt) || (!isWrap && fRowHgt > mRowHgt)) {
                fRows[i].style.height = mRowHgt + 'px';
            }
            else if ((isWrap && fRowHgt > mRowHgt) || (!isWrap && fRowHgt < mRowHgt)) {
                mRows[i].style.height = fRowHgt + 'px';
            }
        }
    };
    FreezeRender.prototype.setFrozenHeader = function (ele) {
        this.frozenHeader = ele;
    };
    FreezeRender.prototype.setMovableHeader = function (ele) {
        this.movableHeader = ele;
    };
    FreezeRender.prototype.getFrozenHeader = function () {
        return this.frozenHeader;
    };
    FreezeRender.prototype.getMovableHeader = function () {
        return this.movableHeader;
    };
    FreezeRender.prototype.renderMovable = function (ele) {
        var mEle = ele.cloneNode(true);
        for (var i = 0; i < this.parent.frozenColumns; i++) {
            mEle.removeChild(mEle.children[0]);
        }
        for (var i = this.parent.frozenColumns, len = ele.childElementCount; i < len; i++) {
            ele.removeChild(ele.children[ele.childElementCount - 1]);
        }
        return mEle;
    };
    return FreezeRender;
}(HeaderRender));

/**
 * `Freeze` module is used to handle Frozen rows and columns.
 * @hidden
 */
var Freeze = /** @class */ (function () {
    function Freeze(parent, locator) {
        this.parent = parent;
        this.locator = locator;
        this.addEventListener();
    }
    Freeze.prototype.getModuleName = function () {
        return 'freeze';
    };
    Freeze.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(initialLoad, this.instantiateRenderer, this);
    };
    Freeze.prototype.instantiateRenderer = function () {
        var renderer = this.locator.getService('rendererFactory');
        if (this.parent.frozenColumns) {
            renderer.addRenderer(RenderType.Header, new FreezeRender(this.parent, this.locator));
            renderer.addRenderer(RenderType.Content, new FreezeContentRender(this.parent, this.locator));
        }
        if (this.parent.frozenRows && !this.parent.frozenColumns) {
            renderer.addRenderer(RenderType.Content, new FreezeContentRender(this.parent, this.locator));
        }
    };
    Freeze.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(initialLoad, this.instantiateRenderer);
    };
    Freeze.prototype.destroy = function () {
        this.removeEventListener();
    };
    return Freeze;
}());

/**
 * 'column menu module used to handle column menu actions'
 */
var ColumnMenu = /** @class */ (function () {
    function ColumnMenu(parent, serviceLocator) {
        this.defaultItems = {};
        this.localeText = this.setLocaleKey();
        this.disableItems = [];
        this.hiddenItems = [];
        this.isOpen = false;
        // default class names
        this.GROUP = 'e-icon-group';
        this.UNGROUP = 'e-icon-ungroup';
        this.ASCENDING = 'e-icon-ascending';
        this.DESCENDING = 'e-icon-descending';
        this.ROOT = 'e-columnmenu';
        this.FILTER = 'e-icon-filter';
        this.POP = 'e-filter-popup';
        this.WRAP = 'e-col-menu';
        this.CHOOSER = '_chooser_';
        this.parent = parent;
        this.gridID = parent.element.id;
        this.serviceLocator = serviceLocator;
        this.addEventListener();
    }
    ColumnMenu.prototype.wireEvents = function () {
        var _this = this;
        this.getColumnMenuHandlers().forEach(function (ele) {
            EventHandler.add(ele, 'mousedown', _this.columnMenuHandlerDown, _this);
        });
    };
    ColumnMenu.prototype.unwireEvents = function () {
        var _this = this;
        this.getColumnMenuHandlers().forEach(function (ele) {
            EventHandler.remove(ele, 'mousedown', _this.columnMenuHandlerDown);
        });
    };
    /**
     * To destroy the resize
     * @return {void}
     * @hidden
     */
    ColumnMenu.prototype.destroy = function () {
        this.columnMenu.destroy();
        this.removeEventListener();
        this.unwireFilterEvents();
        this.unwireEvents();
        remove(this.element);
    };
    ColumnMenu.prototype.columnMenuHandlerClick = function (e) {
        if (e.target.classList.contains('e-columnmenu')) {
            if (!this.isOpen) {
                this.openColumnMenu(e);
            }
            else if (this.isOpen && this.headerCell !== this.getHeaderCell(e)) {
                this.columnMenu.close();
                this.openColumnMenu(e);
            }
            else {
                this.columnMenu.close();
            }
        }
    };
    ColumnMenu.prototype.openColumnMenu = function (e) {
        var pos = { top: 0, left: 0 };
        this.element.style.cssText = 'display:block;visibility:hidden';
        var elePos = this.element.getBoundingClientRect();
        this.element.style.cssText = 'display:none;visibility:visible';
        this.headerCell = this.getHeaderCell(e);
        if (Browser.isDevice) {
            pos.top = ((window.innerHeight / 2) - (elePos.height / 2));
            pos.left = ((window.innerWidth / 2) - (elePos.width / 2));
        }
        else {
            if (this.parent.enableRtl) {
                pos = calculatePosition(this.headerCell, 'left', 'bottom');
            }
            else {
                pos = calculatePosition(this.headerCell, 'right', 'bottom');
                pos.left -= elePos.width;
            }
        }
        this.columnMenu.open(pos.top, pos.left);
        e.preventDefault();
    };
    ColumnMenu.prototype.columnMenuHandlerDown = function (e) {
        this.isOpen = !(this.element.style.display === 'none' || this.element.style.display === '');
    };
    ColumnMenu.prototype.getColumnMenuHandlers = function () {
        return [].slice.call(this.parent.getHeaderTable().querySelectorAll('.' + this.ROOT));
    };
    /**
     * @hidden
     */
    ColumnMenu.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(headerRefreshed, this.wireEvents, this);
        this.parent.on(initialEnd, this.render, this);
        if (this.isFilterItemAdded()) {
            this.parent.on(filterDialogCreated, this.filterPosition, this);
        }
        this.parent.on(click, this.columnMenuHandlerClick, this);
    };
    /**
     * @hidden
     */
    ColumnMenu.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(headerRefreshed, this.unwireEvents);
        this.parent.off(initialEnd, this.render);
        if (this.isFilterItemAdded()) {
            this.parent.off(filterDialogCreated, this.filterPosition);
        }
        this.parent.off(click, this.columnMenuHandlerClick);
    };
    ColumnMenu.prototype.render = function () {
        this.l10n = this.serviceLocator.getService('localization');
        this.element = createElement('ul', { id: this.gridID + '_columnmenu', className: 'e-colmenu' });
        this.parent.element.appendChild(this.element);
        this.columnMenu = new ContextMenu({
            cssClass: 'e-grid-menu',
            enableRtl: this.parent.enableRtl,
            enablePersistence: this.parent.enablePersistence,
            locale: this.parent.locale,
            items: this.getItems(),
            select: this.columnMenuItemClick.bind(this),
            beforeOpen: this.columnMenuBeforeOpen.bind(this),
            onClose: this.columnMenuOnClose.bind(this),
            beforeItemRender: this.beforeMenuItemRender.bind(this),
            beforeClose: this.columnMenuBeforeClose.bind(this)
        });
        this.columnMenu.appendTo(this.element);
        this.wireFilterEvents();
    };
    ColumnMenu.prototype.wireFilterEvents = function () {
        if (!Browser.isDevice && this.isFilterItemAdded()) {
            EventHandler.add(this.element, 'mouseover', this.appendFilter, this);
        }
    };
    ColumnMenu.prototype.unwireFilterEvents = function () {
        if (!Browser.isDevice && this.isFilterItemAdded()) {
            EventHandler.remove(this.element, 'mouseover', this.appendFilter);
        }
    };
    ColumnMenu.prototype.beforeMenuItemRender = function (args) {
        if (this.isChooserItem(args.item)) {
            var field = this.getKeyFromId(args.item.id, this.CHOOSER);
            var column = this.parent.getColumnByField(field);
            var check = createCheckBox(false, {
                label: args.item.text,
                checked: column.visible
            });
            if (this.parent.enableRtl) {
                check.classList.add('e-rtl');
            }
            args.element.innerHTML = '';
            args.element.appendChild(check);
        }
        else if (args.item.id && this.getKeyFromId(args.item.id) === 'filter') {
            args.element.appendChild(createElement('span', { className: 'e-icons e-caret' }));
            args.element.className += 'e-filter-item e-menu-caret-icon';
        }
    };
    ColumnMenu.prototype.columnMenuBeforeClose = function (args) {
        if (!isNullOrUndefined(args.parentItem) &&
            this.getKeyFromId(args.parentItem.id) === 'columnChooser' &&
            closest(args.event.target, '.e-menu-parent')) {
            args.cancel = true;
        }
        else if (args.event && (closest(args.event.target, '.' + this.POP)
            || (parentsUntil(args.event.target, 'e-popup')))) {
            args.cancel = true;
        }
    };
    ColumnMenu.prototype.isChooserItem = function (item) {
        return item.id && item.id.indexOf('_colmenu_') >= 0 &&
            this.getKeyFromId(item.id, this.CHOOSER).indexOf('_colmenu_') === -1;
    };
    ColumnMenu.prototype.columnMenuBeforeOpen = function (args) {
        args.column = this.targetColumn = this.getColumn();
        this.parent.trigger(columnMenuOpen, args);
        for (var _i = 0, _a = args.items; _i < _a.length; _i++) {
            var item = _a[_i];
            var key = this.getKeyFromId(item.id);
            var dItem = this.defaultItems[key];
            if (this.getDefaultItems().indexOf(key) !== -1) {
                if (this.ensureDisabledStatus(key) && !dItem.hide) {
                    this.disableItems.push(item.text);
                }
                else if (item.hide) {
                    this.hiddenItems.push(item.text);
                }
            }
        }
        this.columnMenu.enableItems(this.disableItems, false);
        this.columnMenu.hideItems(this.hiddenItems);
    };
    ColumnMenu.prototype.ensureDisabledStatus = function (item) {
        var _this = this;
        var status = false;
        switch (item) {
            case 'group':
                if (!this.parent.allowGrouping || (this.parent.ensureModuleInjected(Group) && this.targetColumn
                    && this.parent.groupSettings.columns.indexOf(this.targetColumn.field) >= 0)) {
                    status = true;
                }
                break;
            case 'autoFitAll':
            case 'autoFit':
                status = !this.parent.ensureModuleInjected(Resize);
                break;
            case 'ungroup':
                if (!this.parent.ensureModuleInjected(Group) || (this.parent.ensureModuleInjected(Group) && this.targetColumn
                    && this.parent.groupSettings.columns.indexOf(this.targetColumn.field) < 0)) {
                    status = true;
                }
                break;
            case 'sortDescending':
            case 'sortAscending':
                if (this.parent.allowSorting && this.parent.ensureModuleInjected(Sort)
                    && this.parent.sortSettings.columns.length > 0 && this.targetColumn) {
                    this.parent.sortSettings.columns.forEach(function (ele) {
                        if (ele.field === _this.targetColumn.field
                            && ele.direction === item.replace('sort', '').toLocaleLowerCase()) {
                            status = true;
                        }
                    });
                }
                else if (!this.parent.allowSorting || !this.parent.ensureModuleInjected(Sort)) {
                    status = true;
                }
                break;
            case 'filter':
                status = !(this.parent.allowFiltering && (this.parent.filterSettings.type !== 'filterbar')
                    && this.parent.ensureModuleInjected(Filter));
        }
        return status;
    };
    ColumnMenu.prototype.columnMenuItemClick = function (args) {
        var item = this.isChooserItem(args.item) ? 'columnChooser' : this.getKeyFromId(args.item.id);
        switch (item) {
            case 'autoFit':
                this.parent.autoFitColumns(this.targetColumn.field);
                break;
            case 'autoFitAll':
                this.parent.autoFitColumns([]);
                break;
            case 'ungroup':
                this.parent.ungroupColumn(this.targetColumn.field);
                break;
            case 'group':
                this.parent.groupColumn(this.targetColumn.field);
                break;
            case 'sortAscending':
                this.parent.sortColumn(this.targetColumn.field, 'ascending');
                break;
            case 'sortDescending':
                this.parent.sortColumn(this.targetColumn.field, 'descending');
                break;
            case 'columnChooser':
                var key = this.getKeyFromId(args.item.id, this.CHOOSER);
                var checkbox = args.element.querySelector('.e-checkbox-wrapper .e-frame');
                if (checkbox && checkbox.classList.contains('e-check')) {
                    checkbox.classList.remove('e-check');
                    this.parent.hideColumn(key, 'field');
                }
                else if (checkbox) {
                    this.parent.showColumn(key, 'field');
                    checkbox.classList.add('e-check');
                }
                break;
            case 'filter':
                this.getFilter(args.element, args.item.id);
                break;
        }
        this.parent.trigger(columnMenuClick, args);
    };
    ColumnMenu.prototype.columnMenuOnClose = function (args) {
        var parent = 'parentObj';
        if (args.items.length > 0 && args.items[0][parent] instanceof ContextMenu) {
            this.columnMenu.enableItems(this.disableItems);
            this.disableItems = [];
            this.columnMenu.showItems(this.hiddenItems);
            this.hiddenItems = [];
            if (this.isFilterPopupOpen()) {
                this.getFilter(args.element, args.element.id, true);
            }
        }
    };
    ColumnMenu.prototype.getDefaultItems = function () {
        return ['autoFitAll', 'autoFit', 'sortAscending', 'sortDescending', 'group', 'ungroup', 'columnChooser', 'filter'];
    };
    ColumnMenu.prototype.getItems = function () {
        var items = [];
        var defultItems = this.parent.columnMenuItems ? this.parent.columnMenuItems : this.getDefault();
        for (var _i = 0, defultItems_1 = defultItems; _i < defultItems_1.length; _i++) {
            var item = defultItems_1[_i];
            if (typeof item === 'string') {
                if (item === 'columnChooser') {
                    var col = this.getDefaultItem(item);
                    col.items = this.createChooserItems();
                    items.push(col);
                }
                else {
                    items.push(this.getDefaultItem(item));
                }
            }
            else {
                items.push(item);
            }
        }
        return items;
    };
    ColumnMenu.prototype.getDefaultItem = function (item) {
        var menuItem = {};
        switch (item) {
            case 'sortAscending':
                menuItem = { iconCss: this.ASCENDING };
                break;
            case 'sortDescending':
                menuItem = { iconCss: this.DESCENDING };
                break;
            case 'group':
                menuItem = { iconCss: this.GROUP };
                break;
            case 'ungroup':
                menuItem = { iconCss: this.UNGROUP };
                break;
            case 'filter':
                menuItem = { iconCss: this.FILTER };
                break;
        }
        this.defaultItems[item] = {
            text: this.getLocaleText(item), id: this.generateID(item),
            iconCss: menuItem.iconCss ? 'e-icons ' + menuItem.iconCss : ''
        };
        return this.defaultItems[item];
    };
    ColumnMenu.prototype.getLocaleText = function (item) {
        return this.l10n.getConstant(this.localeText[item]);
    };
    ColumnMenu.prototype.generateID = function (item, append$$1) {
        return this.gridID + '_colmenu_' + (append$$1 ? append$$1 + item : item);
    };
    ColumnMenu.prototype.getKeyFromId = function (id, append$$1) {
        return id.replace(this.gridID + '_colmenu_' + (append$$1 ? append$$1 : ''), '');
    };
    ColumnMenu.prototype.getColumnMenu = function () {
        return this.element;
    };
    ColumnMenu.prototype.getModuleName = function () {
        return 'columnMenu';
    };
    ColumnMenu.prototype.setLocaleKey = function () {
        return {
            'autoFitAll': 'autoFitAll',
            'autoFit': 'autoFit',
            'group': 'Group',
            'ungroup': 'Ungroup',
            'sortAscending': 'SortAscending',
            'sortDescending': 'SortDescending',
            'columnChooser': 'Columnchooser',
            'filter': 'FilterMenu'
        };
    };
    ColumnMenu.prototype.getHeaderCell = function (e) {
        return closest(e.target, 'th.e-headercell');
    };
    ColumnMenu.prototype.getColumn = function () {
        if (this.headerCell) {
            var uid = this.headerCell.querySelector('.e-headercelldiv').getAttribute('e-mappinguid');
            return this.parent.getColumnByUid(uid);
        }
        return null;
    };
    ColumnMenu.prototype.createChooserItems = function () {
        var items = [];
        for (var _i = 0, _a = this.parent.getColumns(); _i < _a.length; _i++) {
            var col = _a[_i];
            if (col.showInColumnChooser) {
                items.push({ id: this.generateID(col.field, this.CHOOSER), text: col.headerText ? col.headerText : col.field });
            }
        }
        return items;
    };
    ColumnMenu.prototype.appendFilter = function (e) {
        var filter = 'filter';
        if (!this.defaultItems[filter]) {
            return;
        }
        else {
            var key = this.defaultItems[filter].id;
            if (closest(e.target, '#' + key) && !this.isFilterPopupOpen()) {
                this.getFilter(e.target, key);
            }
            else if (!closest(e.target, '#' + key) && this.isFilterPopupOpen()) {
                this.getFilter(e.target, key, true);
            }
        }
    };
    ColumnMenu.prototype.getFilter = function (target, id, isClose) {
        var filterPopup = this.getFilterPop();
        if (filterPopup) {
            filterPopup.style.display = isClose ? 'none' : 'block';
        }
        else {
            this.parent.notify(filterOpen, {
                col: this.targetColumn, target: target, isClose: isClose, id: id
            });
        }
    };
    ColumnMenu.prototype.setPosition = function (li, ul) {
        var gridPos = this.parent.element.getBoundingClientRect();
        var liPos = li.getBoundingClientRect();
        var left = liPos.left - gridPos.left;
        var top = liPos.top - gridPos.top;
        if (gridPos.height < top) {
            top = top - ul.offsetHeight + liPos.height;
        }
        else if (gridPos.height < top + ul.offsetHeight) {
            top = gridPos.height - ul.offsetHeight;
        }
        if (window.innerHeight < ul.offsetHeight + top + gridPos.top) {
            top = window.innerHeight - ul.offsetHeight - gridPos.top;
        }
        left += (this.parent.enableRtl ? -ul.offsetWidth : liPos.width);
        if (gridPos.width <= left + ul.offsetWidth) {
            left -= liPos.width + ul.offsetWidth;
        }
        else if (left < 0) {
            left += ul.offsetWidth + liPos.width;
        }
        ul.style.top = top + 'px';
        ul.style.left = left + 'px';
    };
    ColumnMenu.prototype.filterPosition = function (e) {
        var filterPopup = this.getFilterPop();
        filterPopup.classList.add(this.WRAP);
        if (!Browser.isDevice) {
            var disp = filterPopup.style.display;
            filterPopup.style.cssText += 'display:block;visibility:hidden';
            var li = this.element.querySelector('.' + this.FILTER);
            if (li) {
                this.setPosition(li.parentElement, filterPopup);
                filterPopup.style.cssText += 'display:' + disp + ';visibility:visible';
            }
        }
    };
    ColumnMenu.prototype.getDefault = function () {
        var items = [];
        if (this.parent.ensureModuleInjected(Resize)) {
            items.push('autoFitAll');
            items.push('autoFit');
        }
        if (this.parent.allowGrouping && this.parent.ensureModuleInjected(Group)) {
            items.push('group');
            items.push('ungroup');
        }
        if (this.parent.allowSorting && this.parent.ensureModuleInjected(Sort)) {
            items.push('sortAscending');
            items.push('sortDescending');
        }
        items.push('columnChooser');
        if (this.parent.allowFiltering && (this.parent.filterSettings.type !== 'filterbar') &&
            this.parent.ensureModuleInjected(Filter)) {
            items.push('filter');
        }
        return items;
    };
    ColumnMenu.prototype.isFilterPopupOpen = function () {
        var filterPopup = this.getFilterPop();
        return filterPopup && filterPopup.style.display !== 'none';
    };
    ColumnMenu.prototype.getFilterPop = function () {
        return this.parent.element.querySelector('.' + this.POP);
    };
    ColumnMenu.prototype.isFilterItemAdded = function () {
        return (this.parent.columnMenuItems &&
            this.parent.columnMenuItems.indexOf('filter') >= 0) || !this.parent.columnMenuItems;
    };
    return ColumnMenu;
}());

/**
 * Action export
 */

/**
 * Models
 */

/**
 * Models
 */

/**
 * Services
 */

/**
 * Grid component exported items
 */

/**
 * Pager component exported items
 */

/**
 * Export Grid components
 */

export { SortDescriptor, SortSettings, Predicate$1 as Predicate, FilterSettings, SelectionSettings, SearchSettings, RowDropSettings, TextWrapSettings, GroupSettings, EditSettings, Grid, CellType, RenderType, ToolbarItem, doesImplementInterface, valueAccessor, getUpdateUsingRaf, iterateArrayOrObject, templateCompiler, setStyleAndAttributes, extend$1 as extend, prepareColumns, setCssInGridPopUp, getActualProperties, parentsUntil, getElementIndex, inArray, getActualPropFromColl, removeElement, getPosition, getUid, appendChildren, parents, calculateAggregate, getScrollBarWidth, getRowHeight, isEditable, isActionPrevent, wrap, changeButtonType, setFormatter, addRemoveActiveClasses, distinctStringValues, getFilterMenuPostion, getZIndexCalcualtion, toogleCheckbox, createCboxWithWrap, removeAddCboxClasses, created, destroyed, load, rowDataBound, queryCellInfo, actionBegin, actionComplete, actionFailure, dataBound, rowSelecting, rowSelected, rowDeselecting, rowDeselected, cellSelecting, cellSelected, cellDeselecting, cellDeselected, columnDragStart, columnDrag, columnDrop, rowDragStart, rowDrag, rowDrop, beforePrint, printComplete, detailDataBound, toolbarClick, batchAdd, batchDelete, beforeBatchAdd, beforeBatchDelete, beforeBatchSave, beginEdit, cellEdit, cellSave, endAdd, endDelete, endEdit, recordDoubleClick, recordClick, beforeDataBound, beforeOpenColumnChooser, resizeStart, onResize, resizeStop, checkBoxChange, beforeCopy, filterChoiceRequest, filterAfterOpen, filterBeforeOpen, initialLoad, initialEnd, dataReady, contentReady, uiUpdate, onEmpty, inBoundModelChanged, modelChanged, colGroupRefresh, headerRefreshed, pageBegin, pageComplete, sortBegin, sortComplete, filterBegin, filterComplete, searchBegin, searchComplete, reorderBegin, reorderComplete, rowDragAndDropBegin, rowDragAndDropComplete, groupBegin, groupComplete, ungroupBegin, ungroupComplete, rowSelectionBegin, rowSelectionComplete, columnSelectionBegin, columnSelectionComplete, cellSelectionBegin, cellSelectionComplete, beforeCellFocused, cellFocused, keyPressed, click, destroy, columnVisibilityChanged, scroll, columnWidthChanged, columnPositionChanged, rowDragAndDrop, rowsAdded, rowsRemoved, columnDragStop, headerDrop, dataSourceModified, refreshComplete, refreshVirtualBlock, dblclick, toolbarRefresh, bulkSave, autoCol, tooltipDestroy, updateData, editBegin, editComplete, addBegin, addComplete, saveComplete, deleteBegin, deleteComplete, preventBatch, dialogDestroy, crudAction, addDeleteAction, destroyForm, doubleTap, beforeExcelExport, excelExportComplete, excelQueryCellInfo, beforePdfExport, pdfExportComplete, pdfQueryCellInfo, accessPredicate, contextMenuClick, freezeRefresh, freezeRender, contextMenuOpen, columnMenuClick, columnMenuOpen, filterOpen, filterDialogCreated, filterMenuClose, Data, Sort, Page, Selection, Filter, Search, Scroll, resizeClassList, Resize, Reorder, RowDD, Group, Print, DetailRow, Toolbar$1 as Toolbar, Aggregate, summaryIterator, VirtualScroll, Edit, BatchEdit, InlineEdit, NormalEdit, DialogEdit, ColumnChooser, ExcelExport, PdfExport, ExportHelper, ExportValueFormatter, Clipboard, CommandColumn, CheckBoxFilter, menuClass, ContextMenu$1 as ContextMenu, Freeze, ColumnMenu, ExcelFilter, Column, HeaderRender, ContentRender, RowRenderer, CellRenderer, HeaderCellRenderer, FilterCellRenderer, StackedHeaderCellRenderer, Render, IndentCellRenderer, GroupCaptionCellRenderer, GroupCaptionEmptyCellRenderer, BatchEditRender, DialogEditRender, InlineEditRender, EditRender, BooleanEditCell, DefaultEditCell, DropDownEditCell, NumericEditCell, DatePickerEditCell, CommandColumnRenderer, FreezeContentRender, FreezeRender, StringFilterUI, NumberFilterUI, DateFilterUI, BooleanFilterUI, FlMenuOptrUI, CellRendererFactory, ServiceLocator, RowModelGenerator, GroupModelGenerator, FreezeRowModelGenerator, Pager, ExternalMessage, NumericContainer, PagerMessage };
//# sourceMappingURL=ej2-grids.es5.js.map
