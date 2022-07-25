export const dock = {
  citizen: {id: '1@1:1:1', name: 'Kim Nara'},
  pavilion: {id: '1:1:1', name: 'Nara Way'},
  cinerooms: [{
    audience: {id: '1@1:1:1:1', name: 'Kim Nara'},
    cineroom: {id: '1:1:1:1', name: 'Sales'},
    current: false,
    stages: [{
      actor: {id: '1@1:1:1:1-1', name: 'Kim Nara'},
      stage: {id: '1:1:1:1-1', name: 'Marketing'},
      active: false,
      kollections: [{
        kollection: {id: 'commerce_1.0.0', name: 'Commerce'},
        path: 'commerce',
        active: false,
        kollecties: [
          {path: 'product', name: 'Product', requiredRoles: []},
          {path: 'order', name: 'Order', requiredRoles: []}],
        kollectionRoles: [{
          stageId: '1:1:1:1-1',
          kollectionVersionId: 'commerce_1.0.0',
          code: 'manager',
          defaultRole: true,
          dramaRoles: [
            {code: 'product:manager', defaultRole: false, dramaId: 'product'},
            {code: 'order:manager', defaultRole: true, dramaId: 'order'}],
        }]
      }]
    }, {
      actor: {id: '1@1:1:1:1-2', name: 'Kim Nara'},
      stage: {id: '1:1:1:1-2', name: 'Stock'},
      active: false,
      kollections: [{
        kollection: {id: 'stock_1.0.0', name: 'Stock'},
        path: 'stock',
        active: false,
        kollecties: [
          {path: 'product', name: 'Product', requiredRoles: []},
          {path: 'order', name: 'Order', requiredRoles: []}],
        kollectionRoles: [{
          stageId: '1:1:1:1-2',
          kollectionVersionId: 'stock_1.0.0',
          code: 'manager',
          defaultRole: true,
          dramaRoles: [
            {code: 'product:manager', defaultRole: false, dramaId: 'product'},
            {code: 'order:manager', defaultRole: true, dramaId: 'order'}],
        }]
      }]
    }]
  }]
};
