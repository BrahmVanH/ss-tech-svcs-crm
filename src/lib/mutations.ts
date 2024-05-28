import { gql } from './__generated__/gql';

export const CREATE_USER = gql(/* GraphQL */ `
	mutation CreateUser($input: CreateUserInput!) {
		createUser(input: $input) {
			token
			user {
				_id
				firstName
				lastName
				username
			}
		}
	}
`);

export const UPDATE_USER_FIRST_NAME = gql(/* GraphQL */ `
	mutation UpdateUserFirstName($input: UpdateUserFirstNameInput!) {
		updateUserFirstName(input: $input) {
			token
			user {
				_id
				firstName
				lastName
				username
			}
		}
	}
`);

export const UPDATE_USER_LAST_NAME = gql(/* GraphQL */ `
	mutation UpdateUserLastName($input: UpdateUserLastNameInput!) {
		updateUserLastName(input: $input) {
			token
			user {
				_id
				firstName
				lastName
				username
			}
		}
	}
`);

export const UPDATE_USER_USERNAME = gql(/* GraphQL */ `
	mutation UpdateUserUsername($input: UpdateUserUsernameInput!) {
		updateUserUsername(input: $input) {
			token
			user {
				_id
				firstName
				lastName
				username
			}
		}
	}
`);

export const UPDATE_USER_PASSWORD = gql(/* GraphQL */ `
	mutation UpdateUserPassword($input: UpdateUserPasswordInput!) {
		updateUserPassword(input: $input) {
			token
			user {
				_id
				firstName
				lastName
				username
			}
		}
	}
`);

export const UPDATE_USER_PIN = gql(/* GraphQL */ `
	mutation UpdateUserPin($input: UpdateUserPinInput!) {
		updateUserPin(input: $input) {
			token
			user {
				_id
				firstName
				lastName
				username
			}
		}
	}
`);

export const LOGIN_USER = gql(/* GraphQL */ `
	mutation LoginUser($input: LoginUserInput!) {
		loginUser(input: $input) {
			token
			user {
				_id
				firstName
				lastName
				username
			}
		}
	}
`);

export const DELETE_USER = gql(/* GraphQL */ `
	mutation removeUser($input: RemoveUserInput!) {
		removeUser(input: $input) {
			token
			user {
				_id
				firstName
				lastName
				username
			}
		}
	}
`);

export const CREATE_CUSTOMER = gql(/* GraphQL */ `
	mutation CreateCustomer($input: CreateCustomerInput!) {
		createCustomer(input: $input) {
			_id
			createdAt
			firstName
			lastName
			email
			phone
			businessName
			# workOrders {
			# 	_id
			# 	date
			# 	propertyId
			# 	type
			# 	description
			# 	total
			# 	quote
			# 	charged
			# 	paid
			# }
		}
	}
`);

export const UPDATE_CUSTOMER_FIRST_NAME = gql(/* GraphQL */ `
	mutation UpdateCustomerFirstName($input: UpdateCustomerFirstNameInput!) {
		updateCustomerFirstName(input: $input) {
			_id
			# createdAt
			firstName
			# lastName
			# email
			# phone
			# businessName
			# workOrders {
			# 	_id
			# 	date
			# 	propertyId
			# 	type
			# 	description
			# 	total
			# 	quote
			# 	charged
			# 	paid
			# }
		}
	}
`);

export const UPDATE_CUSTOMER_LAST_NAME = gql(/* GraphQL */ `
	mutation UpdateCustomerLastName($input: UpdateCustomerLastNameInput!) {
		updateCustomerLastName(input: $input) {
			_id
			# createdAt
			# firstName
			lastName
			# email
			# phone
			# businessName
			# workOrders {
			# 	_id
			# 	date
			# 	propertyId {
			# 		_id
			# 	}
			# 	type
			# 	description
			# 	total
			# 	quote
			# 	charged
			# 	paid
			# }
		}
	}
`);

export const UPDATE_CUSTOMER_EMAIL = gql(/* GraphQL */ `
	mutation UpdateCustomerEmail($input: UpdateCustomerEmailInput!) {
		updateCustomerEmail(input: $input) {
			_id
			# createdAt
			# firstName
			# lastName
			email
			# phone
			# businessName
			# workOrders {
			# 	_id
			# 	date
			# 	customerId {
			# 		_id
			# 	}
			# 	propertyId {
			# 		_id
			# 	}
			# 	type
			# 	description
			# 	total
			# 	quote
			# 	charged
			# 	paid
			# }
		}
	}
`);

export const UPDATE_CUSTOMER_PHONE = gql(/* GraphQL */ `
	mutation UpdateCustomerPhone($input: UpdateCustomerPhoneInput!) {
		updateCustomerPhone(input: $input) {
			_id
			# createdAt
			# firstName
			# lastName
			# email
			phone
			# businessName
			# workOrders {
			# 	_id
			# 	date
			# 	customerId {
			# 		_id
			# 	}
			# 	propertyId {
			# 		_id
			# 	}
			# 	type
			# 	description
			# 	total
			# 	quote
			# 	charged
			# 	paid
			# }
		}
	}
`);

export const UPDATE_CUSTOMER_BUSINESS_NAME = gql(/* GraphQL */ `
	mutation UpdateCustomerBusinessName($input: UpdateCustomerBusinessNameInput!) {
		updateCustomerBusinessName(input: $input) {
			_id
			# createdAt
			# firstName
			# lastName
			# email
			# phone
			businessName
			# workOrders {
			# 	_id
			# 	date
			# 	customerId {
			# 		_id
			# 	}
			# 	propertyId {
			# 		_id
			# 	}
			# 	type
			# 	description
			# 	total
			# 	quote
			# 	charged
			# 	paid
			# }
		}
	}
`);

export const DELETE_CUSTOMER = gql(/* GraphQL */ `
	mutation deleteCustomer($input: RemoveCustomerInput!) {
		deleteCustomer(input: $input) {
			_id
			# createdAt
			firstName
			lastName
			email
			phone
			businessName
			# workOrders {
			# 	_id
			# 	date
			# 	customerId {
			# 		_id
			# 	}
			# 	propertyId {
			# 		_id
			# 	}
			# 	type
			# 	description
			# 	total
			# 	quote
			# 	charged
			# 	paid
			# }
		}
	}
`);

export const CREATE_PROPERTY = gql(/* GraphQL */ `
	mutation CreateProperty($input: CreatePropertyInput!) {
		createProperty(input: $input) {
			_id
			propertyName
			# propertyAddress {
			# 	street
			# 	unit
			# 	city
			# 	state
			# 	zip
			# 	country
			# }
			# propertyDescription
			# agent
			# s3FolderKey
		}
	}
`);

export const UPDATE_PROPERTY_NAME = gql(/* GraphQL */ `
	mutation UpdatePropertyName($input: UpdatePropertyNameInput!) {
		updatePropertyName(input: $input) {
			_id
			propertyName
			# propertyAddress {
			# 	street
			# 	unit
			# 	city
			# 	state
			# 	zip
			# 	country
			# }
			# propertyDescription
			# agent
			# s3FolderKey
		}
	}
`);

export const UPDATE_PROPERTY_ADDRESS = gql(/* GraphQL */ `
	mutation UpdatePropertyAddress($input: UpdatePropertyAddressInput!) {
		updatePropertyAddress(input: $input) {
			_id
			# propertyName
			propertyAddress {
				street
				unit
				city
				state
				zip
				country
			}
			# propertyDescription
			# agent
			# s3FolderKey
		}
	}
`);

export const UPDATE_PROPERTY_DESCRIPTION = gql(/* GraphQL */ `
	mutation UpdatePropertyDescription($input: UpdatePropertyDescriptionInput!) {
		updatePropertyDescription(input: $input) {
			_id
			# propertyName
			# propertyAddress {
			# 	street
			# 	unit
			# 	city
			# 	state
			# 	zip
			# 	country
			# }
			propertyDescription
			# agent
			# s3FolderKey
		}
	}
`);

export const UPDATE_PROPERTY_AGENT = gql(/* GraphQL */ `
	mutation UpdatePropertyAgent($input: UpdatePropertyAgentInput!) {
		updatePropertyAgent(input: $input) {
			_id
			# propertyName
			# propertyAddress {
			# 	street
			# 	unit
			# 	city
			# 	state
			# 	zip
			# 	country
			# }
			# propertyDescription
			agent {
				_id
				
			}
			# s3FolderKey
		}
	}
`);

export const UPDATE_PROPERTY_S3_FOLDER_KEY = gql(/* GraphQL */ `
	mutation UpdatePropertyS3FolderKey($input: UpdatePropertyS3FolderKeyInput!) {
		updatePropertyS3FolderKey(input: $input) {
			_id
			# propertyName
			# propertyAddress {
			# 	street
			# 	unit
			# 	city
			# 	state
			# 	zip
			# 	country
			# }
			# propertyDescription
			# agent
			s3FolderKey
		}
	}
`);

export const DELETE_PROPERTY = gql(/* GraphQL */ `
	mutation deleteProperty($input: RemovePropertyInput!) {
		deleteProperty(input: $input) {
			_id
			# propertyName
			# propertyAddress {
			# 	street
			# 	unit
			# 	city
			# 	state
			# 	zip
			# 	country
			# }
			# propertyDescription
			# agent
			# s3FolderKey
		}
	}
`);

export const CREATE_WORK_ORDER = gql(/* GraphQL */ `
	mutation CreateWorkOrder($input: CreateWorkOrderInput!) {
		createWorkOrder(input: $input) {
			_id
			date
			# customerId
			# propertyId
			# type
			# description
			# completedBy
			# quote
			# total
			# charged
			# paid
			# comments
		}
	}
`);

export const UPDATE_WORK_ORDER_DATE = gql(/* GraphQL */ `
	mutation UpdateWorkOrderDate($input: UpdateWorkOrderDateInput!) {
		updateWorkOrderDate(input: $input) {
			_id
			date
			# customerId
			# propertyId
			# type
			# description
			# completedBy
			# quote
			# total
			# charged
			# paid
			# comments
		}
	}
`);

export const UPDATE_WORK_ORDER_CUSTOMER_ID = gql(/* GraphQL */ `
	mutation UpdateWorkOrderCustomerId($input: UpdateWorkOrderCustomerIdInput!) {
		updateWorkOrderCustomerId(input: $input) {
			_id
			# date
			customerId {
				_id
			}
			# propertyId
			# type
			# description
			# completedBy
			# quote
			# total
			# charged
			# paid
			# comments
		}
	}
`);

export const UPDATE_WORK_ORDER_PROPERTY_ID = gql(/* GraphQL */ `
	mutation UpdateWorkOrderPropertyId($input: UpdateWorkOrderPropertyIdInput!) {
		updateWorkOrderPropertyId(input: $input) {
			_id
			# date
			# customerId
			propertyId {
				_id
			}
			# type
			# description
			# completedBy
			# quote
			# total
			# charged
			# paid
			# comments
		}
	}
`);

export const UPDATE_WORK_ORDER_TYPE = gql(/* GraphQL */ `
	mutation UpdateWorkOrderType($input: UpdateWorkOrderTypeInput!) {
		updateWorkOrderType(input: $input) {
			_id
			# date
			# customerId
			# propertyId
			type
			# description
			# completedBy
			# quote
			# total
			# charged
			# paid
			# comments
		}
	}
`);

export const UPDATE_WORK_ORDER_DESCRIPTION = gql(/* GraphQL */ `
	mutation UpdateWorkOrderDescription($input: UpdateWorkOrderDescriptionInput!) {
		updateWorkOrderDescription(input: $input) {
			_id
			# date
			# customerId
			# propertyId
			# type
			description
			# completedBy
			# quote
			# total
			# charged
			# paid
			# comments
		}
	}
`);

export const UPDATE_WORK_ORDER_QUOTE = gql(/* GraphQL */ `
	mutation UpdateWorkOrderQuote($input: UpdateWorkOrderQuoteInput!) {
		updateWorkOrderQuote(input: $input) {
			_id
			# date
			# customerId
			# propertyId
			# type
			# description
			# completedBy
			quote
			# total
			# charged
			# paid
			# comments
		}
	}
`);

export const UPDATE_WORK_ORDER_COMPLETED_BY = gql(/* GraphQL */ `
	mutation UpdateWorkOrderCompletedBy($input: UpdateWorkOrderCompletedByInput!) {
		updateWorkOrderCompletedBy(input: $input) {
			_id
			# date
			# customerId
			# propertyId
			# type
			# description
			completedBy
			# quote
			# total
			# charged
			# paid
			# comments
		}
	}
`);

export const UPDATE_WORK_ORDER_TOTAL = gql(/* GraphQL */ `
	mutation UpdateWorkOrderTotal($input: UpdateWorkOrderTotalInput!) {
		updateWorkOrderTotal(input: $input) {
			_id
			# date
			# customerId
			# propertyId
			# type
			# description
			# completedBy
			# quote
			total
			# charged
			# paid
			# comments
		}
	}
`);

export const UPDATE_WORK_ORDER_CHARGED = gql(/* GraphQL */ `
	mutation UpdateWorkOrderCharged($input: UpdateWorkOrderChargedInput!) {
		updateWorkOrderCharged(input: $input) {
			_id
			# date
			# customerId
			# propertyId
			# type
			# description
			# completedBy
			# quote
			# total
			charged
			# paid
			# comments
		}
	}
`);

export const UPDATE_WORK_ORDER_PAID = gql(/* GraphQL */ `
	mutation UpdateWorkOrderPaid($input: UpdateWorkOrderPaidInput!) {
		updateWorkOrderPaid(input: $input) {
			_id
			# date
			# customerId
			# propertyId
			# type
			# description
			# completedBy
			# quote
			# total
			# charged
			paid
			# comments
		}
	}
`);

export const UPDATE_WORK_ORDER_COMMENTS = gql(/* GraphQL */ `
	mutation UpdateWorkOrderComments($input: UpdateWorkOrderCommentsInput!) {
		updateWorkOrderComments(input: $input) {
			_id
			# date
			# customerId
			# propertyId
			# type
			# description
			# completedBy
			# quote
			# total
			# charged
			# paid
			comments
		}
	}
`);

export const DELETE_WORK_ORDER = gql(/* GraphQL */ `
	mutation deleteWorkOrder($input: RemoveWorkOrderInput!) {
		deleteWorkOrder(input: $input) {
			_id
			# date
			# customerId
			# propertyId
			# type
			# description
			# completedBy
			# quote
			# total
			# charged
			# paid
			# comments
		}
	}
`);





export const DELETE_S3_IMGS = gql(/* GraphQL */ `
	mutation DeleteS3Objects($input: DeleteS3ObjectInput!) {
		deleteS3Objects(input: $input) {
			status
			message
		}
	}
`);
