import { Action, Dispatch } from 'redux';

export = TabsLater;
export as namespace TabsLater;

declare namespace TabsLater {

  type Id = string | number

  type EventHandler = (...args: any[]) => void
  type Renderer<T = any> = (...args: T[]) => React.ReactChild

  interface CustomAction extends Action{
    payload: any;
  } 

  type NormalActionCreator = (...args: any[]) => CustomAction;
  type DispatchedActionCreator<T> = (...args: any[]) => (dispatch: Dispatch<any>) => T

  type ActionCreator = NormalActionCreator | DispatchedActionCreator<any>;

  // Dispatch is done within promise, omitted here for simplicity;
  type ThenableActionCreator = (...args: any[]) => Promise<any>;

  type AddOrMoveAction = 'add' | 'move';

  type AddOrEditAction = 'add' | 'edit';

  // Domain Specific Types
  interface Link {
    // There won't be id when saved in the list. Id only present on displaying link since urls are
    // not guaranteed to be unique.
    // Or for tab which has id from browser
    id?: string;
    favIconUrl?: string;
    title?: string;
    url: string;
    checked?: boolean;

    // Added by search functionality
    urlHighlighted?: string;

    // Added by search functionality
    titleHighlighted?: string;
  }

  type LinkAttrs = Partial<Link>

  interface Tab extends Link {
    // Tab position, Assigned from browser
    index: number;
  }

  interface TabChangeInfo {
    title?: string;
    url?: string;
    favIconUrl?: string;
  }

  interface NormalizedTabs {
    entities: {
      tab: {
        [id: string]: Tab
      }
    }
    result: (string | number)[]
  }

  interface LinksObj {
    [url: string]: Link
  }

  interface List {
    id: string;
    _id?: string;
    _rev?: string;
    name: string;
    links: LinksObj;
  }

  type ListAttrs = Partial<List>

  interface ListFromServer extends List {
    id: string;
    rev: string;
  }

  interface NormalizedListFromServer {
    result: (string | number)[]
    entities: {
      list: {
        [id: string]: ListFromServer
      }
    }
  }

  // Row in PunchDb
  interface DataRow<T> {
    doc: T
  }

  type Url = string;
}