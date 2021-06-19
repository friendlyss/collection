import { TypedEmitter } from 'tiny-typed-emitter'
import { Collection as Collect } from 'collect.js'

export class Collection<T = any> extends TypedEmitter<{
  forceUpdate: () => void
}> {
  private collection: T[] = []
  private primaryKey: string = 'id'

  public get length() {
    return this.collection.length
  }

  public addMany(items: T[]) {
    for (const item of items) {
      this.set(item)
    }
  }

  public set(item: Partial<T>) {
    if (this.exists(this.getPrimaryKey(item))) {
      this.update(item)
    } else {
      this.add(item)
    }

    this.forceUpdate()
  }

  public all() {
    return this.collection
  }

  public add(item: Partial<T>) {
    // @ts-ignore
    this.collection.push(item)

    return item
  }

  public update(item: Partial<T>) {
    const findedItem = this.findByPrimaryKey(this.getPrimaryKey(item))

    for (const keyItem in item) {
      // @ts-ignore
      findedItem[keyItem] = item[keyItem]
    }

    return findedItem
  }

  public delete(primaryKey: any) {
    this.collection = this.collection.filter(item => {
      return this.getPrimaryKey(item) !== primaryKey
    })

    this.forceUpdate()
  }

  public forceUpdate() {
    this.emit('forceUpdate')
  }

  public exists(primaryKey: any) {
    return !!this.findByPrimaryKey(primaryKey)
  }

  public findBy(field: string, value: any) {
    return this.collection.find(item => {
      // @ts-ignore
      return item[field] === value
    })
  }

  public findByPrimaryKey(primaryKey: any) {
    return this.collection.find(item => {
      return this.getPrimaryKey(item) === primaryKey
    })
  }

  public filter(fn: (collection: Collect<T>) => T[]) {
    const collect = new Collect(this.collection)

    return fn(collect)
  }

  private getPrimaryKey(item: Partial<T>) {
    // @ts-ignore
    return item[this.primaryKey]
  }

  public setPrimaryKeyField(field: string) {
    this.primaryKey = field
  }
}
