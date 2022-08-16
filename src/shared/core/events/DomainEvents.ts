
import { IDomainEvent } from "./IDomainEvent";
import { AggregateRoot } from "../../domain/AggregateRoot";
import { UniqueEntityID } from "../../domain/UniqueEntityID";

export type RegisterCallback = (event: IDomainEvent) => Promise<void>;
export class DomainEvents {
  private static handlersMap = {} as {[handler:string]:any};
  private static markedAggregates: AggregateRoot<any>[] = [];

  /**
   * @method markAggregateForDispatch
   * @static
   * @desc Called by aggregate root objects that have created domain
   * events to eventually be dispatched when the infrastructure commits
   * the unit of work. 
   */

  public static markAggregateForDispatch (aggregate: AggregateRoot<any>): void {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);
    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }

  private static dispatchAggregateEvents (aggregate: AggregateRoot<any>): void {
    aggregate.domainEvents.forEach((event: IDomainEvent) => this.dispatch(event));
  }

  private static removeAggregateFromMarkedDispatchList (aggregate: AggregateRoot<any>): void {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));
    this.markedAggregates.splice(index, 1);
  }

  private static findMarkedAggregateByID (id: UniqueEntityID): AggregateRoot<any>|null {
    let found: AggregateRoot<any> |null =null;
    for (let aggregate of this.markedAggregates) {
      if (aggregate.id.equals(id)) {
        found = aggregate;
      }
    }

    return found;
  }

  public static dispatchEventsForAggregate (id: UniqueEntityID): void {
    const aggregate = this.findMarkedAggregateByID(id);
    console.log("Aggregate found",aggregate);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  public static register(callback: (event: IDomainEvent) => void, eventClassName: string): void {


    console.log(eventClassName,"EventClassName")
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      console.log("Does not hasOwnProperties");
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(callback);
    console.log(this.handlersMap,"This is the handler map")
  }

  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  public static clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }

  private static dispatch (event: IDomainEvent): void {
    const eventClassName: string = event.constructor.name;

    if (this.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers: any[] = this.handlersMap[eventClassName];
      for (let handler of handlers) {
        handler(event);
      }
    }
  }
  public static dispatchEventsHook(id: any) {
    console.log("Entity Id",id)
    const aggregateId = new UniqueEntityID(id);
    DomainEvents.dispatchEventsForAggregate(aggregateId);
}
}