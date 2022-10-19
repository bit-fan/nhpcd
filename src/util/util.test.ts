import { returnFileSize } from './util';
test('test returnFileSize', () => {
    expect(returnFileSize(1)).toEqual('1 bytes');
    expect(returnFileSize(1024)).toEqual('1.0 KB');
    expect(returnFileSize(1024 * 1024)).toEqual('1.0 MB');

    expect(returnFileSize(1 * 1.5)).toEqual('1.5 bytes');
    expect(returnFileSize(1024 * 1.5)).toEqual('1.5 KB');
    expect(returnFileSize(1024 * 1024 * 1.5)).toEqual('1.5 MB');

    expect(returnFileSize(1 * 2)).toEqual('2 bytes');
    expect(returnFileSize(1024 * 2)).toEqual('2.0 KB');
    expect(returnFileSize(1024 * 1024 * 2)).toEqual('2.0 MB');
})