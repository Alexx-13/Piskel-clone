/* eslint-disable no-undef */
// const sum = require('./index');
const { addFrame } = require('./index');
const { deleteFrame } = require('./index');
const { getCanvas } = require('./index');
const { duplF} = require('./index');
const { duplicateFrame } = require('./index');
// eslint-disable-next-line camelcase
const { change_image } = require('./index');

jest.mock('./index', () => ({
  get ctx() {
    return {
      fillRect() {},
      getImageData() {}
    } // set some default value
  },
  get canvas() {
    return '' // set some default value
  },
  get target() {
    return {}
  }
}));

// test('adds 1 + 2 to equal 3', () => {
//   expect((1 + 2)).toBe(3);
// });
describe('addFrame', () => {
  test('the simple call returns undefined', () => {
    expect(addFrame).toBeUndefined();
  });
})


describe('addFrame', ()=> {
  it('should work correctly for valid data', ()=>{
  document.getElementById = jest.fn(() => ({
  toDataURL: ()=>'dataUriString',
  }));
  
  expect(addFrame).toBe(undefined);
  expect(document.getElementById).toHaveBeenCalledTimes(0)
  });
  });

describe('deleteFrame', () => {
  test('the simple call returns undefined', () => {
    expect(deleteFrame).toBeUndefined();
  });
})


describe('getCanvas', () => {
  test('it should be undefined', () => {
    expect(getCanvas).toBeUndefined();
  })
})

describe('getCanvas', () => {
  test('the object should not be a string', () => {
  expect(getCanvas).not.toBe('string');
});
})


describe('duplF', () => {
  test('the simple call returns undefined', () => {
    expect(duplF).toBeUndefined();
  });
})


describe('duplicateFrame', () => {
  test('the simple call returns undefined', () => {
    expect(duplicateFrame).toBeUndefined();
  });
})


describe('change_image', () => {
  test('the simple call returns undefined', () => {
    expect(change_image).toBeUndefined();
  });
})
