# Requirements
1. Admin Dashboard
1. User Profiles 
1. Address Validation
1. Subscriber List
1. Export Orders Excel
1. Paper Order Breakout
1. Bad Order Entry


##Data Models
1. User
    * FirstName
    * LastName
    * Phone
    * Email
    * Address1
    * Address2
    * City
    * State
    * Zipcode

1. PayTier
    * Id
    * Name
    * Total
    * Percentage

1. Company
    * Name
    * Address1
    * Address2
    * City
    * State
    * Zipcode
    * Phone
    * ContactName
    * ContactPhone

1. Paper
    * Name
    * Address1
    * Address2
    * City
    * State
    * Zipcode
    * Phone
    * AccountNumber
    * ContactName
    * ContactPhone

1. Promotion
    * Id
    * Name
    * PaperId
1. Offer
    * Id
    * PromotionId
    * Name
    * Cost