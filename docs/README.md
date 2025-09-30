# Abandoned Cart Service

##  ⚠️ Maintenance ⚠️

*Starting June 1st 2023, this application will no longer be maintained by VTEX.*

---

The Abandoned Cart Service app can be used to trigger abandoned cart emails.

## Installation

Open the terminal and run the following command:

```
vtex install vtex.abandoned-cart-service
```
## Step 1 > Configure the email template in Message Center

1. In the VTEX Admin, go to **Store Settings > Email Templates > Templates**,    or type **Templates** in the search bar at the top of the page.
2. Search for **vtexcommerce-abandoned-cart** .
3. Select **Enable Email Sending?** and **Use Default Sender**.
4. Fill in the **Email Title** field as desired.
5. Fill in the **Recipient (To)** with {{email}}.
6. In **Html**, enter the created or Use the following default email template information.
```
<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:v="urn:schemas-microsoft-com:vml"
    style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;
-webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; box-sizing:border-box; width:100%; height:100%; margin:0; padding:0; background:#f1f1f1 !important;">

<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,
initial-scale=1.0" />
    <title>{{_accountInfo.TradingName}}</title>

    <style>
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        @media(max-width:600px) {
            img {
                max-width: 100% !important;
                height: auto !important;
            }
        }

        @media screen and (min-width:30em) {
            .w-50-ns {
                width: 50% !important;
            }

            .pr4-ns {
                padding-right: 2rem !important;
            }

            .ph4-ns {

                padding-left: 2rem !important;
                padding-right: 2rem !important;
            }

            .mv1-ns {
                margin-top: .25rem !important;
                margin-bottom: .25rem !important;
            }

            .mv4-ns {
                margin-top: 2rem !important;
                margin-bottom: 2rem !important;
            }
        }
    </style>
</head>

<body
    style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;
-webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; box-sizing:border-box; width:100%; height:100%; margin:0; padding:0; background:#f1f1f1 !important; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table width="100%" border="0" cellpadding="0" cellspacing="0"
        style="box-sizing:border-box; margin:0; padding:0; background:#f1f1f1; border-collapse:collapse; width:100%; height:100%;">
        <tr>
            <td align="left" valign="top" style="font-size:14px; line-height:20px; text-align:left;">
                <table class="mv4-ns" width="100%" align="center" border="0" cellpadding="0" cellspacing="0"
                    style="max-width:40rem; width:100%; background-color:#fff; border-collapse:collapse;"
                    bgcolor="#fff">

                    <!-- Header -->
                    <tr>
                        <td class="ph4-ns" align="center" style="font-size:14px; line-height:20px; border-bottom:1px solid #eee; width:100%;
padding-bottom:2rem; text-align:center;">
                            <div style="width:8rem; margin:2rem auto 1rem;">
                                <a href="http://{{_accountInfo.HostName}}.com.br">
                                    <img alt="" border="0" src="http://licensemanager.vtex.com.br/api/site/pub/accounts/{{_accountInfo

.Id}}/logos/show" style="max-width:100%; border:none;
max-height:80px !important;" />
                                </a>
                            </div>
                            <h1 style="margin:0; font-size:50px; line-height:58px;">Abandoned Cart</h1>
                        </td>
                    </tr>

                    <!-- Items -->
                    <tr>
                        <td class="ph4-ns" align="left" style="font-size:14px;
line-height:20px; border-top:1px solid #eee; width:100%; padding:2rem 0;">
                            <div style="padding-top:1rem;">
                                <table width="100%" border="0" cellpadding="0" cellspacing="0"
                                    style="border-collapse:collapse; width:100%;">
                                    <tbody>
                                        {{#each items}}
                                        <tr>
                                            <td align="left" valign="top"
                                                style="width:4rem; padding:.5rem .5rem .5rem 0; vertical-align:top;">
                                                <img alt="" src="{{image}}" style="max-width:100% !important;" />
                                            </td>
                                            <td align="left" valign="top" style="padding:.5rem 0; vertical-align:top;">
                                                <div class="mv1-ns"
                                                    style="line-height:1.25; font-size:1rem !important;">{{productName}}
                                                </div>
                                                <div style="color:#777;">
                                                    {{quantity}} un.
                                                    {{#if sellingPrice}}
                                                    ${{formatCurrency sellingPrice}}
                                                    {{else}} Grátis
                                                    {{/if}}
                                                </div>
                                            </td>
                                        </tr>
                                        {{/each}}
                                    </tbody>
                                </table>
                            </div>
                        </td>

                    </tr>

                    <!-- Link -->
                    <tr>
                        <td class="ph4-ns" align="left" style="font-size:14px;
line-height:20px; border-top:1px solid #eee; width:100%; padding:2rem 0;">
                            <a href="https://{{_accountInfo.AccountName}}.myvtex.com/checkout/cart/{{addToCartURL}}"
                                style="color:black; text-decoration:none;">
                                Link to the cart
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
```
The `addToCartURL` variable is formatted to work with the [cart URL](https://help.vtex.com/tutorial/how-to-assemble-the-cart-url--u3Tj5wagnukYwG84IQU06). Its purpose is to send the user back to the checkout with the items in the abandoned cart.

7. In **JSON Data** , enter following JSON as an example of JSON Data:
```
{
  "email": "teste@vtex.com.br",
  "items": [
    {
      "id": "880010",
      "productName": "adidas Men's Performance Polo - Blast Blue S",
      "image": "https://bibi.vteximg.com.br/arquivos/ids/155405/adidas-mens-performance-p olo-blast-blue.jpg?v=637947886549170000",
      "sellingPrice": "455.00",
      "quantity": "1",
      "link": "adidas-mens-performance-polo-blast-blue",
      "availabilityQuantity": 1000000
    }
  ],
  "addToCartURL": "add?sku=880010&qty=1&seller=1&sc=1",
  "additionalFields": {
    "firstName": "Teste VTEX"
  },
  "_accountInfo": {
    "MainAccountName": "teste",
    "AccountName": "teste",
    "Cnpj": null,
    "Id": "278fe15c-f0eb-4c30-81a2-f42b29113f1a",
    "AppId": null,
    "IsActive": true,
    "IsOperating": false,
    "CreationDate": "2022-06-21T19:58:01.3387095Z",
    "OperationDate": null,
    "CompanyName": "Companhia Brasileira de Tecnologia para ecommerce",
    "TradingName": "VTEX",
    "City": null,
    "Complement": null,
    "Country": null,
    "State": null,
    "Address": null,
    "District": null,
    "Number": null,
    "PostalCode": null,
    "Licenses": [
      7
    ],
    "ParentAccountId": null,
    "ParentAccountName": null,
    "InactivationDate": null,
    "Platform": "vtex",
    "Privacy": null,
    "HasPiiRestriction": false,
    "Infra": null
  }
}
```
8. Click on **Save**.

## Step 2 > Perform the [SPF release](https://help.vtex.com/tutorial/setting-up-abandoned-carts--tutorials_740)

## Step 3 > Follow below steps to [Configure the trigger](https://help.vtex.com/tutorial/setting-up-abandoned-carts--tutorials_740)

1. In the VTEX Admin, go to **Store Settings > Storefront > Master Data**.
2. In Master Data, click **Applications > Advanced Settings > Data structure**.
3. Click the **Trigger** tab.
4. Click the Add ``New button``.
5. Complete the following fields:
   1. **Name**: Enter the trigger name.
   2. **Data Entity**: Select the Customer entity.
   3. **Status**: Check the **Enabled** option.
6. On the **Rules** tab, select An attribute value is changed.
7. Under **Field**, select Last session.
8. Click ``Add Filter`` five times to display the filter fields. Select them and complete the information as shown below:
      1. **Checkout - Different from - Completed - and**
      2. **Checkout – Is not null – and**
      3. **Cart - Is not null - and**
      4. **Last cart - Is not null - and**
      5. **Receives newsletter? - Equal to - true**
9. Click the **Schedule** tab and select whether the email should be sent as soon as possible, on a specific date or on a dynamic date.
10. Click the **If Positive** tab.

    In the **Action** tab, select **Send an HTTP Request** with the following configuration:

   - **URL:** `https://{accountName}.myvtex.com/_v/abandoned-cart`.
   - **Method:** POST.
   - **Header:**
      ```
      content-type: application/json
      accept: application/json
      ```
      - Content as JSON field:
      ```
      {
         "email": "{!email}",
         "skuURL": "{!rclastcart}",
         "template": "vtexcommerce-abandoned-cart",
         "additionalFields": {
            // In object you can add any additional field to send in the mail
            "firstName": "{!firstName}"
         }
      }
      ```
      ![](https://user-images.githubusercontent.com/67066494/184005464-d06e1cda-3b21-42ec-b020-d85d684e6b7c.png)
11. Click **Save**.
12. Create a cart and close the page to test the trigger.

### Note:
A page session expires in 30 minutes. Only after this time does Master Data start counting the time scheduled for the Abandoned Cart trigger. Therefore, the time until the email arrives corresponds to the session time (30 minutes) plus the time scheduled in the trigger.




