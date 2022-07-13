export const devdock = {
  citizen: {id: '1@1:1:1', name: 'Nara User'},
  pavilion: {id: '1:1:1', name: 'Nara Way'},
  cinerooms: [{
    audience: {id: '1@1:1:1:1', name: 'Nara User'},
    cineroom: {id: '1:1:1:1', name: 'Sales Group'},
    current: false,
    stages: [{
      actor: {id: '1@1:1:1:1-1', name: 'Nara User'},
      stage: {id: '1:1:1:1-1', name: 'Marketing'},
      current: false,
      kollections: [{
        kollection: {id: 'commerce_1.0.0', name: 'Commerce'},
        path: 'commerce',
        current: false,
        kollecties: [
          {path: 'product', name: 'Product', requiredRoles: []},
          {path: 'order', name: 'Order', requiredRoles: []}],
        stageRoles: [{
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
      actor: {id: '1@1:1:1:1-2', name: 'Nara User'},
      stage: {id: '1:1:1:1-2', name: 'Stock'},
      current: false,
      kollections: [{
        kollection: {id: 'stock_1.0.0', name: 'Stock Management'},
        path: 'stock',
        current: false,
        kollecties: [
          {path: 'product', name: 'Product', requiredRoles: []},
          {path: 'order', name: 'Order', requiredRoles: []}],
        stageRoles: [{
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
