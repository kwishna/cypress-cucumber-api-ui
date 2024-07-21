import { DataTable, After, AfterAll, AfterStep, Before, BeforeAll, BeforeStep } from '@badeball/cypress-cucumber-preprocessor';

class World {
    p: Record<string, any>;
    constructor() {
        this.p = {};
    }
}

Before(function () {
    Object.assign(this, new World()); // World Assigned With `this`.
});

BeforeAll({ order: 10 }, function () { });
Before({ order: 10 }, function () { });
Before({ name: "foo" }, function () { });
// BeforeStep({ order: 10 }, function () { });
// BeforeStep({ name: "bar" }, function () { });
// BeforeStep(function (options) {
//     // This hook will be executed before all steps.
// });


Before({ tags: "@foo" }, function () {
    // This hook will be executed before scenarios tagged with @foo.
    this.params
});

Before({ tags: "@foo and @bar" }, function () {
    // This hook will be executed before scenarios tagged with @foo and @bar.
});

Before({ tags: "@foo or @bar" }, function () {
    // This hook will be executed before scenarios tagged with @foo or @bar.
});

BeforeStep(function ({ pickle, pickleStep, gherkinDocument, testCaseStartedId, testStepId }) {
    // Step hooks are invoked with an object containing a bunch of relevant data.
});

After({ tags: "@foo" }, function () {
    // This hook will be executed before scenarios tagged with @foo.
});
After({ name: "baz" }, function () { });
// AfterStep({ name: "qux" }, function () { });
