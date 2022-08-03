## ⚠️ Maintenance ⚠️

_After August 03 of 2022, this application will no longer be maintained by the FPA team or the RPT LATAM team. Maintenance will be the responsibility of the ecosystem, everyone will be able to make a branch with the changes or improvements they want to make, make a pull request and we will approve it._

---

# Abandoned Cart Service

This app can be used to trigger abandoned cart emails.

### Usage

To use it in your account, run the `vtex install vtex.abandoned-cart-service` command.

You should follow the documentation to [Setting up Cart Abandonment (Trigger)](https://help.vtex.com/tutorial/setting-up-abandoned-carts--tutorials_740) but in the Action tab you should select Send an HTTP Request with the follow configuration:

- The URL field is https://{{account}}.myvtex.com/_v/abandoned-cart.
- Method field is POST.
- Header fields:
  _ content-type: application/json
  _ accept: application/json
- Content as JSON field:

```json
{
  "email": "{!email}",
  "skuURL": "{!rclastcart}",
  "template": "abandoned-cart",
  "additionalFields": {
    // In object you can add any additional field to send in the mail
    "firstName": "{!firstName}"
  }
}
```

_The template field in the JSON above depends on the template id configured in the message center_

Aditionally to the trigger configuration, you must create the message center template in https://{{account}}.myvtex.com/admin/message-center/#/templates, and you can use the next JSON to you to build the new template.

```json
{
  "email": "test@test.com",
  "items": [
    {
      "id": "1",
      "productName": "product1",
      "image": "https://{{account}}.vteximg.com.br/arquivos/ids/155411/image1.jpg",
      "sellingPrice": 4100,
      "quantity": "1",
      "link": "product-one"
    },
    {
      "id": "2",
      "productName": "product2",
      "image": "https://{{account}}.vteximg.com.br/arquivos/ids/155403/image2.jpg",
      "sellingPrice": 3199,
      "quantity": "1",
      "link": "product-two"
    }
  ],
  "addToCartURL": "add?sku=1&qty=1&seller=1&sku=2&qty=1&seller=1"
}
```

The `addToCartURL` variable is formatted to work with the [cart URL](https://help.vtex.com/tutorial/how-to-assemble-the-cart-url--u3Tj5wagnukYwG84IQU06). Its purpose is to send the user back to the checkout with the items in the abandoned cart.
