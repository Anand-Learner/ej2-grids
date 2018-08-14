import { isNullOrUndefined, remove } from '@syncfusion/ej2-base';
import { formatUnit } from '@syncfusion/ej2-base';
import { IRenderer, IGrid } from '../base/interface';
import { Browser } from '@syncfusion/ej2-base';
import { colGroupRefresh, columnWidthChanged, scroll, columnVisibilityChanged } from '../base/constant';
import { Column } from '../models/column';
import { AggregateRowModel, AggregateColumnModel } from '../models/models';
import { Row } from '../models/row';
import { ContentRender } from './content-renderer';
import { RowRenderer } from './row-renderer';
import { ServiceLocator } from '../services/service-locator';
import { SummaryModelGenerator } from '../services/summary-model-generator';
import { renderMovable } from '../base/util';

/**
 * Footer module is used to render grid content
 * @hidden
 */
export class FooterRenderer extends ContentRender implements IRenderer {
    //private parent: Grid;
    private locator: ServiceLocator;
    protected modelGenerator: SummaryModelGenerator;
    private aggregates: Object = {};
    private freezeTable: HTMLTableElement;
    private frozenContent: Element;
    private movableContent: Element;
    constructor(gridModule?: IGrid, serviceLocator?: ServiceLocator) {
        super(gridModule, serviceLocator);
        this.parent = gridModule;
        this.locator = serviceLocator;
        this.modelGenerator = new SummaryModelGenerator(this.parent);
        this.addEventListener();
    }

    /**
     * The function is used to render grid footer div    
     */
    public renderPanel(): void {
        let div: Element = this.parent.createElement('div', { className: 'e-gridfooter' });
        let innerDiv: Element = this.parent.createElement('div', { className: 'e-summarycontent' });
        let movableContent: Element = innerDiv;
        if (this.parent.getFrozenColumns()) {
            let fDiv: Element = this.parent.createElement('div', { className: 'e-frozenfootercontent' });
            let mDiv: Element = this.parent.createElement('div', { className: 'e-movablefootercontent' });
            innerDiv.appendChild(fDiv);
            innerDiv.appendChild(mDiv);
            this.frozenContent = fDiv;
            this.movableContent = mDiv;
            movableContent = mDiv;
        }
        if (Browser.isDevice) { (<HTMLElement>movableContent).style.overflowX = 'scroll'; }
        div.appendChild(innerDiv);
        this.setPanel(div);
        if (this.parent.getPager() != null) {
            this.parent.element.insertBefore(div, this.parent.getPager());
        } else {
            this.parent.element.appendChild(div);
        }
    }
    /**
     * The function is used to render grid footer table    
     */
    public renderTable(): void {
        let contentDiv: Element = this.getPanel();
        let innerDiv: Element = this.createContentTable('_footer_table');
        let table: HTMLTableElement = <HTMLTableElement>innerDiv.querySelector('.e-table');
        let tFoot: HTMLTableSectionElement = <HTMLTableSectionElement>this.parent.createElement('tfoot');
        table.appendChild(tFoot);
        if (this.parent.getFrozenColumns()) {
            let freezeTable: HTMLTableElement = table.cloneNode(true) as HTMLTableElement;
            this.frozenContent.appendChild(freezeTable);
            this.freezeTable = freezeTable;
            this.movableContent.appendChild(table);
            remove(table.querySelector('colgroup'));
            let colGroup: Element
                = ((this.parent.getHeaderContent().querySelector('.e-movableheader').querySelector('colgroup')).cloneNode(true)) as Element;
            table.insertBefore(colGroup, table.querySelector('tbody'));
            this.setColGroup(colGroup);
        }
        this.setTable(table);
    }

    private renderSummaryContent(e?: Object, table?: HTMLTableElement, cStart?: number, cEnd?: number): void {
        let input: Object[] = this.parent.dataSource instanceof Array ? this.parent.dataSource : this.parent.currentViewData;
        let summaries: AggregateRowModel[] = <AggregateRowModel[]>this.modelGenerator.getData();
        let dummies: Column[] = isNullOrUndefined(cStart) ? this.modelGenerator.getColumns() :
        this.modelGenerator.getColumns(cStart, cEnd);
        let rows: Row<AggregateColumnModel>[] = isNullOrUndefined(cStart) ? this.modelGenerator.generateRows(input, e || this.aggregates) :
        this.modelGenerator.generateRows(input, e || this.aggregates, cStart, cEnd);
        let fragment: DocumentFragment = <DocumentFragment>document.createDocumentFragment();

        let rowrenderer: RowRenderer<AggregateColumnModel> = new RowRenderer<AggregateColumnModel>(this.locator, null, this.parent);
        rowrenderer.element = this.parent.createElement('TR', { className: 'e-summaryrow' });

        for (let srow: number = 0, len: number = summaries.length; srow < len; srow ++) {
            let row: Row<AggregateColumnModel> = rows[srow];
            if (!row) { continue; }
            let tr: Element = rowrenderer.render(row, dummies);
            fragment.appendChild(tr);
        }

        table.tFoot.appendChild(fragment);
        this.aggregates = e;
    }

    public refresh(e?: { aggregates?: Object }): void {
        if (this.parent.getFrozenColumns()) {
            remove(this.getPanel());
            this.renderPanel();
            this.renderTable();
            this.freezeTable.tFoot.innerHTML = '';
            this.renderSummaryContent(e, this.freezeTable, 0, this.parent.getFrozenColumns());
        }
        (<HTMLTableElement>this.getTable()).tFoot.innerHTML = '';
        this.renderSummaryContent(e, <HTMLTableElement>this.getTable(), this.parent.getFrozenColumns());
        // check freeze content have no row case
        if (this.parent.getFrozenColumns()) {
            let frozenDiv: HTMLElement = <HTMLElement>this.frozenContent;
            if (!frozenDiv.offsetHeight) {
                frozenDiv.style.height = (<HTMLElement>this.getTable()).offsetHeight + 'px';
            }
        }
        this.onScroll();
    }

    public refreshCol(): void {
        // frozen table 
        let mheaderCol: Node;
        let fheaderCol: Node = mheaderCol = this.parent.element.querySelector('.e-gridheader').querySelector('colgroup').cloneNode(true);
        if (this.parent.getFrozenColumns()) {
            mheaderCol = renderMovable(<Element>fheaderCol, this.parent.getFrozenColumns());
            this.freezeTable.replaceChild(fheaderCol, this.freezeTable.querySelector('colGroup'));
        }
        this.getTable().replaceChild(mheaderCol, this.getColGroup());
        this.setColGroup(<Element>mheaderCol);
    }

    private onWidthChange(args: { index: number, width: number, module: string }): void {
        this.getColFromIndex(args.index).style.width = formatUnit(args.width);
        if (this.parent.allowResizing && args.module === 'resize') { this.updateFooterTableWidth(this.getTable() as HTMLElement); }
    }

    private onScroll(e: { left: number } = { left: (<HTMLElement>this.parent.getContent().firstChild).scrollLeft }): void {
        (<HTMLElement>this.getTable().parentElement).scrollLeft = e.left;
    }

    public getColFromIndex(index?: number): HTMLElement {
        let fCol: number = this.parent.getFrozenColumns();
        if (fCol && fCol > index) {
            return this.freezeTable.querySelector('colGroup').children[index] as HTMLElement;
        }
        return this.getColGroup().children[index - fCol] as HTMLElement;
    }

    private columnVisibilityChanged(): void {
        this.refresh();
    }

    public addEventListener(): void {
        this.parent.on(colGroupRefresh, this.refreshCol, this);
        this.parent.on(columnWidthChanged, this.onWidthChange, this);
        this.parent.on(scroll, this.onScroll, this);
        this.parent.on(columnVisibilityChanged, this.columnVisibilityChanged, this);
    }

    public removeEventListener(): void {
        this.parent.off(colGroupRefresh, this.refreshCol);
        this.parent.off(columnWidthChanged, this.onWidthChange);
        this.parent.off(scroll, this.onScroll);
        this.parent.off(columnVisibilityChanged, this.columnVisibilityChanged);
    }
    private updateFooterTableWidth(tFoot: HTMLElement): void {
        let tHead: HTMLTableElement = this.parent.getHeaderTable() as HTMLTableElement;
        if (tHead && tFoot) {
            tFoot.style.width = tHead.style.width;
        }
    }
}
