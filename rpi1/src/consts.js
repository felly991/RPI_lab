export const Status = {
  BACKLOG: 'backlog',
  INPROGRESS: 'inprogress',
  READY: 'ready',
  BASKET: 'basket',
};

export const StatusLabel = {
  [Status.BACKLOG]: 'Бэклог',
  [Status.INPROGRESS]: 'В процессе',
  [Status.READY]: 'Готово',
  [Status.BASKET]: 'Корзина',
};

export const StatusArray = [
  Status.BACKLOG,
  Status.INPROGRESS,
  Status.READY,
  Status.BASKET,
];
