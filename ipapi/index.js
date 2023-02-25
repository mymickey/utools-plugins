import { createApp, reactive } from './petite-vue.es.js'


utools.onPluginEnter(({ code, type, payload }) => {
  document.getElementById('err').innerHTML = ""
  const results = payload.match(window.services.extraIP());
  console.log('enter', code, type, payload, results)
  if (results && results.length) {
    setTimeout(() => {
      onUserSearch(JSON.stringify(results))
    }, 100);
  } else {
    document.getElementById('err').innerHTML = "error:not found input the IPs"
  }
})
function onUserSearch(v) {
  var el = document.getElementById('searchStr')
  el.value = v
  var event = new Event('input', {
    bubbles: true,
    cancelable: true,
  });

  el.dispatchEvent(event);
}
window.addEventListener('DOMContentLoaded', (event) => {
  var mockData = [{
    "ip": "8.8.8.8",
    "network": "8.8.8.0/24",
    "version": "IPv4",
    "city": "Mountain View",
    "region": "California",
    "region_code": "CA",
    "country": "US",
    "country_name": "United States",
    "country_code": "US",
    "country_code_iso3": "USA",
    "country_capital": "Washington",
    "country_tld": ".us",
    "continent_code": "NA",
    "in_eu": false,
    "postal": "94043",
    "latitude": 37.42301,
    "longitude": -122.083352,
    "timezone": "America/Los_Angeles",
    "utc_offset": "-0800",
    "country_calling_code": "+1",
    "currency": "USD",
    "currency_name": "Dollar",
    "languages": "en-US,es-US,haw,fr",
    "country_area": 9629091.0,
    "country_population": 327167434,
    "asn": "AS15169",
    "org": "GOOGLE"
  }]
  ipTable([])
  onUserSearch('["8.8.8.8"]')
});
function ipTable() {
  function IpTableCmp() {
    return {
      $template: '#ip-table',
      list: [],
      searchStr: "",
      openHelp() {
        utools.shellOpenExternal('https://weibo.com/u/1781700003')
      },
      searchStrChange(e, v) {
        var v = e.currentTarget.value
        this.query(JSON.parse(v))
      },
      query(ips) {
        window.services.doQuery(ips).then((results) => {
          while (this.list.length) {
            this.list.splice(0, 1)
          }
          results.forEach(item => {
            this.list.push(item)
          });
        }).catch(err => {
          console.error(err)
          document.getElementById('err').innerHTML = err.message()
        })
      }
    }
  }
  var app = createApp({
    IpTableCmp,
  })
  app.mount()
}
