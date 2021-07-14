import { Selector } from 'testcafe';

fixture("Single")
    .page("http://127.0.0.1:8080/hugo-split-gallery/posts/lake-lauvitel/index.html");

test("Title should come from Front Matter", async t => {
    await t.expect(Selector("h1").innerText).eql("Lauvitel lake");
});
test("Main content should display 1 paragraph and 1 map", async t => {
    await t
        .expect(Selector(".split-bio p").count).eql(1)
        .expect(Selector(".split-bio #mapid").count).eql(1);
});
test("Metadata should have 4 items", async t => {
    const items = Selector("#list-metadata li");
    await t
        .expect(items.count).eql(4)
        .expect(items.nth(0).innerText).contains("Article published on 2021-03-01")
        .expect(items.nth(1).innerText).contains("Photos taken on 2016-05-21, 2017-10-31, 2018-04-22, 2019-04-22, 2019-08-05, 2021-03-01")
        .expect(items.nth(2).innerText).contains("Locations : Oisans, Écrins")
        .expect(items.nth(3).innerText).contains("Seasons : Fall, Spring, Summer, Winter");
});
test("GPXs should have 2 items", async t => {
    const items = Selector("#list-gpxs li");
    await t
        .expect(items.count).eql(2)
        .expect(items.nth(0).innerText).contains("Download GPX file")
        .expect(items.nth(1).innerText).contains("Open the track in map2gpx");
});
test("Download all should be disabled by default", async t => {
    const items = Selector("#list-downloads li");
    await t
        .expect(Selector("#list-downloads").exists).notOk();
});
test.page("http://127.0.0.1:8080/hugo-split-gallery/fr/posts/lake-lauvitel/index.html")
    ("Download all should be available", async t => {
        const items = Selector("#list-downloads li");
        await t
            .expect(items.count).eql(1)
            .expect(items.nth(0).innerText).contains("Télécharger toutes les photos");
    });
test("See also list should have 1 item", async t => {
    const items = Selector("#list-seealso li");
    await t
        .expect(items.count).eql(1)
        .expect(items.nth(0).innerText).contains("Muzelle lake and Lauvitel lake");
});
test("Grid should display 11 photos + 1 padding element", async t => {
    await t.expect(Selector(".split-grid").childElementCount).eql(12);
});
test("Background image should be from featured image, with filters", async t => {
    await t.expect(Selector("#gallery-panel").getAttribute("style")).contains("http://localhost:8080/hugo-split-gallery/posts/lake-lauvitel/images/IMGP5799_");
});
test("Map should display 1 track marker + 9 photo markers", async t => {
    await t
        .expect(Selector("#mapid .leaflet-marker-pane .awesome-marker.awesome-marker-icon-green").count).eql(1)
        .expect(Selector("#mapid .leaflet-marker-pane .awesome-marker.awesome-marker-icon-gray").count).eql(9);
});

test.page("http://127.0.0.1:8080/hugo-split-gallery/posts/grand-veymont/index.html")
    ("Link to map2gpx.eu should be displayed by default", async t => {
        await t.expect(Selector("#list-gpxs li").nth(1).find("a").getAttribute("href")).eql("https://map2gpx.eu?url=http%3A%2F%2Flocalhost%3A8080%2Fhugo-split-gallery%2Fposts%2Fgrand-veymont%2F2020-06-14%2520Grand%2520Veymont.gpx");
    });
test.page("http://127.0.0.1:8080/hugo-split-gallery/fr/posts/grand-veymont/index.html")
    ("Link to map2gpx.fr should be displayed", async t => {
        await t.expect(Selector("#list-gpxs li").nth(1).find("a").getAttribute("href")).eql("https://map2gpx.fr?url=http%3A%2F%2Flocalhost%3A8080%2Fhugo-split-gallery%2Ffr%2Fposts%2Fgrand-veymont%2F2020-06-14%2520Grand%2520Veymont.gpx");
    });
