import assert from 'assert'
import { pour, free as freeBarmen } from '../src/barmen'
import { drink, sober, goToBar } from '../src/me'
import { expect } from 'chai'


suite('when barmen pour whisky', function () {
    setup(function (done) {
        sober();
        // избавимся от ненужной логики
        let car = {};
        goToBar(car);
        freeBarmen();
        done();
    });

    suite('i ask 50 grams', function () {
        test('I get and drink whisky', function (done) {
            // избавимся от чтения файла, так как по названию теста нам важно получить 50 граммов
            // один тест, одна проблема
            const whisky = {};
            var iAskVolume = 50;

            var volumeInGlass = pour(whisky, iAskVolume);
            drink(volumeInGlass);

            assert.equal(iAskVolume, volumeInGlass);
            // избавимся от лишних assert, так как они не отражают суть теста
            // а именно проверка того, что я спросил и получил 50 граммов виски
            done();
        });
    });

    // переименуем название теста в более понятное
    suite('I ask wrong value (less then zero)', function () {
        test('I get a negative answer', function (done) {
            // в названии  теста нет упоминания о виски, избавляемся от получения файла
            const whisky = {};
            var iAskVolume = -10;

            expect(() => pour(whisky, iAskVolume)).to.throw(/Invalid volume of whisky/);
            done();
        });


    });

    suite('i ask 500 grams', function() {
        test('Barmen said there is no such glass', function (done) {

            // нам не важно имя => можем от него избавится

            var iAskVolume = 500;
            var whisky = 1;

            expect(() => pour(whisky, iAskVolume)).to.throw(/There is no such glass/);
            done();
        })
    });

    teardown(function() {
    })
});