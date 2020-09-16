/* *
 *
 *  Data module
 *
 *  (c) 2012-2020 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import Ajax from '../../Extensions/Ajax.js';
import CSVParser from '../Parsers/CSVParser.js';
import DataJSON from '../DataJSON.js';
var ajax = Ajax.ajax;
import DataStore from './DataStore.js';
import DataTable from '../DataTable.js';
import U from '../../Core/Utilities.js';
var merge = U.merge, pick = U.pick, objectEach = U.objectEach;
/* eslint-disable no-invalid-this, require-jsdoc, valid-jsdoc */
/**
 * Class that handles creating a datastore from CSV
 */
var CSVStore = /** @class */ (function (_super) {
    __extends(CSVStore, _super);
    /* *
    *
    *  Constructors
    *
    * */
    /**
     * Constructs an instance of CSVDataStore
     *
     * @param {DataTable} table
     * Optional DataTable to create the store from
     *
     * @param {CSVStore.OptionsType} options
     * Options for the store and parser
     *
     * @param {DataParser} parser
     * Optional parser to replace the default parser
     */
    function CSVStore(table, options, parser) {
        if (table === void 0) { table = new DataTable(); }
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, table) || this;
        var csv = options.csv, csvURL = options.csvURL, enablePolling = options.enablePolling, dataRefreshRate = options.dataRefreshRate, parserOptions = __rest(options, ["csv", "csvURL", "enablePolling", "dataRefreshRate"]);
        _this.parserOptions = parserOptions;
        _this.options = merge(CSVStore.defaultOptions, { csv: csv, csvURL: csvURL, enablePolling: enablePolling, dataRefreshRate: dataRefreshRate });
        _this.parser = parser || new CSVParser(parserOptions);
        return _this;
    }
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * Creates a CSVDatastore from a ClassJSON object.
     *
     * @param {CSVStore.ClassJSON} json
     * Class JSON (usually with a $class property) to convert.
     *
     * @return {CSVStore}
     * CSVDataStore from the ClassJSON.
     */
    CSVStore.fromJSON = function (json) {
        var options = json.options, parser = CSVParser.fromJSON(json.parser), table = DataTable.fromJSON(json.table), store = new CSVStore(table, options, parser);
        store.describe(DataStore.getMetadataFromJSON(json.metadata));
        return store;
    };
    /**
     * Handles polling of live data
     */
    CSVStore.prototype.poll = function () {
        var _this = this;
        var _a = this.options, dataRefreshRate = _a.dataRefreshRate, pollingEnabled = _a.enablePolling, csvURL = _a.csvURL;
        var updateIntervalMs = (dataRefreshRate > 1 ? dataRefreshRate : 1) * 1000;
        if (pollingEnabled && csvURL === this.liveDataURL) {
            // We need to stop doing this if the URL has changed
            this.liveDataTimeout = setTimeout(function () {
                _this.fetchCSV();
            }, updateIntervalMs);
        }
    };
    /**
     * Fetches CSV from external source
     *
     * @param {boolean} initialFetch
     * Indicates whether this is a single fetch or a repeated fetch
     *
     * @param {DataEventEmitter.EventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @emits CSVDataStore#load
     * @emits CSVDataStore#afterLoad
     * @emits CSVDataStore#loadError
     */
    CSVStore.prototype.fetchCSV = function (initialFetch, eventDetail) {
        var store = this, maxRetries = 3, csvURL = store.options.csvURL;
        var currentRetries;
        if (initialFetch) {
            clearTimeout(store.liveDataTimeout);
            store.liveDataURL = csvURL;
        }
        store.emit({ type: 'load', detail: eventDetail, table: store.table });
        ajax({
            url: store.liveDataURL,
            dataType: 'text',
            success: function (csv) {
                store.parser.parse({ csv: csv });
                if (store.liveDataURL) {
                    store.poll();
                }
                store.table = store.parser.getTable();
                store.emit({
                    type: 'afterLoad',
                    csv: csv,
                    detail: eventDetail,
                    table: store.table
                });
            },
            error: function (xhr, error) {
                if (++currentRetries < maxRetries) {
                    store.poll();
                }
                store.emit({
                    type: 'loadError',
                    detail: eventDetail,
                    error: error,
                    table: store.table,
                    xhr: xhr
                });
            }
        });
    };
    /**
     * Initiates the loading of the CSV source to the store
     *
     * @param {DataEventEmitter.EventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @emits CSVParser#load
     * @emits CSVParser#afterLoad
     */
    CSVStore.prototype.load = function (eventDetail) {
        var store = this, _a = store.options, csv = _a.csv, csvURL = _a.csvURL;
        if (csv) {
            store.emit({
                type: 'load',
                csv: csv,
                detail: eventDetail,
                table: store.table
            });
            store.parser.parse({ csv: csv });
            store.table = store.parser.getTable();
            store.emit({
                type: 'afterLoad',
                csv: csv,
                detail: eventDetail,
                table: store.table
            });
        }
        else if (csvURL) {
            store.fetchCSV(true, eventDetail);
        }
        else {
            store.emit({
                type: 'loadError',
                table: store.table,
                error: 'Unable to load: no CSV string or URL was provided',
                detail: eventDetail
            });
        }
    };
    /**
     * Export a table to a CSV string.
     * @param {DataTable} table
     * The table to export.
     *
     * @param {CSVStore.CSVExportOptions} exportOptions
     * The options used for the export.
     *
     * @return {string}
     * A CSV string from the DataTable.
     */
    CSVStore.prototype.getCSVForExport = function (exportOptions) {
        var _a;
        var columnsRecord = this.table.toColumns(), csvOptions = exportOptions, columnNames = (csvOptions.exportIDColumn ?
            Object.keys(columnsRecord) :
            Object.keys(columnsRecord).slice(1)), decimalPoint = pick(csvOptions.decimalPoint, csvOptions.itemDelimiter !== ',' && csvOptions.useLocalDecimalPoint ?
            (1.1).toLocaleString()[1] :
            '.'), 
        // use ';' for direct to Excel
        itemDelimiter = pick(csvOptions.itemDelimiter, decimalPoint === ',' ? ';' : ','), 
        // '\n' isn't working with the js csv data extraction
        lineDelimiter = csvOptions.lineDelimiter, exportNames = (this.parserOptions.firstRowAsNames !== false);
        var csvRows = [], columnsCount = columnNames.length;
        var rowArray = [];
        // Add the names as the first row if they should be exported
        if (exportNames) {
            csvRows.push(columnNames.join(itemDelimiter));
        }
        for (var columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
            var columnName = columnNames[columnIndex], column = columnsRecord[columnName], columnLength = column.length;
            var columnMeta = this.whatIs(columnName);
            var columnDataType = void 0;
            if (columnMeta) {
                columnDataType = (_a = columnMeta.metadata) === null || _a === void 0 ? void 0 : _a.dataType;
            }
            for (var rowIndex = 0; rowIndex < columnLength; rowIndex++) {
                var cellValue = column[rowIndex];
                if (!rowArray[rowIndex]) {
                    rowArray[rowIndex] = [];
                }
                // Handle datatype
                if (columnDataType === 'string') {
                    cellValue = "\"" + cellValue + "\"";
                }
                if (columnDataType === 'number') {
                    cellValue = String(cellValue).replace('.', decimalPoint);
                }
                rowArray[rowIndex][columnIndex] = cellValue;
                // On the final column, push the row to the CSV
                if (columnIndex === columnsCount - 1) {
                    csvRows.push((rowArray[rowIndex]).join(itemDelimiter));
                }
            }
        }
        return csvRows.join(lineDelimiter);
    };
    /**
     * Exports the datastore as a CSV string, using the options
     * provided on import unless other options are provided.
     *
     * @param {CSVStore.CSVExportOptions} [csvExportOptions]
     * Options to use instead of those used on import.
     *
     * @return {string}
     * CSV from the store's current DataTable.
     *
     */
    CSVStore.prototype.save = function (csvExportOptions) {
        var exportOptions = CSVStore.defaultExportOptions;
        // Merge in the provided parser options
        objectEach(this.parserOptions, function (value, key) {
            if (key in exportOptions) {
                exportOptions[key] = value;
            }
        });
        // Merge in provided options
        merge(true, exportOptions, csvExportOptions);
        return this.getCSVForExport(exportOptions);
    };
    /**
     * Converts the store to a class JSON.
     *
     * @return {DataJSON.ClassJSON}
     * Class JSON of this store.
     */
    CSVStore.prototype.toJSON = function () {
        var json = {
            $class: 'CSVStore',
            metadata: this.getMetadataJSON(),
            options: merge(this.options),
            parser: this.parser.toJSON(),
            table: this.table.toJSON()
        };
        return json;
    };
    /* *
     *
     *  Static Properties
     *
     * */
    CSVStore.defaultOptions = {
        csv: '',
        csvURL: '',
        enablePolling: false,
        dataRefreshRate: 1
    };
    CSVStore.defaultExportOptions = {
        decimalPoint: null,
        itemDelimiter: null,
        lineDelimiter: '\n',
        exportIDColumn: false
    };
    return CSVStore;
}(DataStore));
/* *
 *
 *  Registry
 *
 * */
DataJSON.addClass(CSVStore);
DataStore.addStore(CSVStore);
/* *
 *
 *  Export
 *
 * */
export default CSVStore;