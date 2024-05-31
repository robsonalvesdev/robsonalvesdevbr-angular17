import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { IBook } from '@path-interfaces/IBook'
import { PaginationInstance } from 'ngx-pagination'
import { BasePageComponent } from '@path-components/base-page/base-page.component'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent extends BasePageComponent implements OnInit {
  @Input({ required: true }) books: IBook[] = []

  institutions: Set<string> = new Set<string>()
  tags: Set<string> = new Set<string>()

  institutionsFilter: Set<string> = new Set<string>()
  selectInstitutionsFilter: string = ''

  tagsFilter: Set<string> = new Set<string>()
  selectTagFilter: string = ''

  config: PaginationInstance = {
    id: 'booksPag',
    itemsPerPage: 5,
    currentPage: 1,
  }

  override ngOnInit(): void {
    this.books.forEach((book) => this.institutions.add(book.publishName.trim()))
    this.books.forEach((book) => book.tags.forEach((tag) => this.tags.add(tag.trim())))
    super.ngOnInit()
  }

  getInstitutions = () => Array.from(this.institutions.values()).sort((a, b) => (a > b ? 1 : -1))

  getTags = () => Array.from(this.tags.values()).sort((a, b) => (a > b ? 1 : -1))

  absoluteIndex(indexOnPage: number): number {
    return this.config.itemsPerPage * (this.config.currentPage - 1) + indexOnPage + 1
  }

  onPageChange(number: number) {
    this.config.currentPage = number
  }

  clearFilters() {
    this.institutionsFilter.forEach((x) => {
      document.getElementById(`label_book_institution_${x}`)?.click()
    })

    this.tagsFilter.forEach((x) => {
      document.getElementById(`label_book_tag_${x}`)?.click()
    })

    this.institutionsFilter.clear()
    this.selectInstitutionsFilter = ''
    this.tagsFilter.clear()
    this.selectTagFilter = ''
  }

  onClickIntitutionEvent(e: MouseEvent) {
    var link = e.target as HTMLInputElement
    let id = link.id.replace('input_book_institution_', '')

    this.institutionsFilter.has(id) ? this.institutionsFilter.delete(id) : this.institutionsFilter.add(id)
    this.selectInstitutionsFilter = Array.from(this.institutionsFilter.values()).join(',')

    this.config.currentPage = 1
  }

  onClickTagEvent(e: MouseEvent) {
    var link = e.target as HTMLInputElement
    let id = link.id.replace('input_book_tag_', '')

    this.tagsFilter.has(id) ? this.tagsFilter.delete(id) : this.tagsFilter.add(id)
    this.selectTagFilter = Array.from(this.tagsFilter.values()).join(',')
  }
}
