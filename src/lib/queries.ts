import { gql } from './__generated__/gql';

export const GET_ALL_USERS = gql(/* GraphQL */ `
	query GetAllUsers {
		getAllUsers {
			firstName
			lastName
			username
		}
	}
`);

export const QUERY_CUSTOMERS = gql(/* GraphQL */ `
	query QueryCustomers {
		queryCustomers {
			_id
			createdAt
			firstName
			lastName
			email
			phone
			businessName
			workOrders {
				_id
				# date
				# type
				# charged
				# paid
			}
			invoices {
				_id
			}
			properties {
				_id
				propertyName
			}
		}
	}
`);

export const QUERY_CUSTOMER_BY_ID = gql(/* GraphQL */ `
	query QueryCustomerById($customerId: ID!) {
		queryCustomerById(customerId: $customerId) {
			_id
			createdAt
			firstName
			lastName
			email
			phone
			businessName
			workOrders {
				_id
				date
				propertyId {
					_id
					propertyName
					propertyAddress {
						street
						city
						state
						zip
					}
				}
				type
				charged
				paid
			}
		}
	}
`);

export const QUERY_PROPERTIES = gql(/* GraphQL */ `
	query QueryProperties {
		queryProperties {
			_id
			propertyName
			propertyAddress {
				street
				city
				state
				zip
			}
			propertyDescription
			agent {
				_id
				firstName
				lastName
				phone
			}
			# s3FolderKey
		}
	}
`);

export const QUERY_PROPERTY_BY_ID = gql(/* GraphQL */ `
	query QueryPropertyById($propertyId: ID!) {
		queryPropertyById(propertyId: $propertyId) {
			_id
			propertyName
			propertyAddress {
				street
				city
				state
				zip
			}
			propertyDescription
			agent {
				_id
				firstName
				lastName
				phone
			}
			s3FolderKey
		}
	}
`);

export const QUERY_WORK_ORDERS = gql(/* GraphQL */ `
	query QueryWorkOrders {
		queryWorkOrders {
			_id
			invoices {
				_id
			}
			customerId {
				_id
				firstName
				lastName
				email
				phone
			}
			charged
			comments
			completedBy
			date
			description
			lastUpdated
			paid
			quote
			propertyId {
				_id
				propertyName
				propertyAddress {
					street
					city
					state
					zip
				}

			}
			total
			type
		}
	}
`);

export const QUERY_WORK_ORDER_BY_ID = gql(/* GraphQL */ `
	query QueryWorkOrderById($workOrderId: ID!) {
		queryWorkOrderById(workOrderId: $workOrderId) {
			_id
			date
			lastUpdated
			customerId {
				_id
				firstName
				lastName
				email
				phone
				businessName
			}
			propertyId {
				_id
				propertyName
				propertyAddress {
					street
					city
					state
					zip
				}
				propertyDescription
				agent {
					_id
					firstName
					lastName
					phone
				}
				s3FolderKey
			}
			type
			description
			quote
			total
			charged
			paid
			comments
		}
	}
`);

export const QUERY_WORK_ORDER_BY_CUSTOMER_ID = gql(/* GraphQL */ `
	query QueryWorkOrdersByCustomer($customerId: ID!) {
		queryWorkOrdersByCustomer(customerId: $customerId) {
			_id
			date
			lastUpdated
			customerId {
				_id
				firstName
				lastName
				email
				phone
				businessName
			}
			propertyId {
				_id
				propertyName
				propertyAddress {
					street
					city
					state
					zip
				}
				propertyDescription
				agent {
					_id
					firstName
					lastName
					phone
				}
				s3FolderKey
			}
			type
			description
			quote
			total
			charged
			paid
			comments
		}
	}
`);

export const QUERY_WORK_ORDER_BY_PROPERTY_ID = gql(/* GraphQL */ `
	query QueryWorkOrdersByProperty($propertyId: ID!) {
		queryWorkOrdersByProperty(propertyId: $propertyId) {
			_id
			date
			lastUpdated
			customerId {
				_id
				firstName
				lastName
				email
				phone
				businessName
			}
			propertyId {
				_id
				propertyName
				propertyAddress {
					street
					city
					state
					zip
				}
				propertyDescription
				agent {
					_id
					firstName
					lastName
					phone
				}
				s3FolderKey
			}
			type
			description
			quote
			total
			charged
			paid
			comments
		}
	}
`);

export const QUERY_INVOICES = gql(/* GraphQL */ `
	query QueryInvoices {
		queryInvoices {
			_id
			invoiceNumber
			date
			customerId {
				_id
				# firstName
				# lastName
				# email
				# phone
				# businessName
			}
			workOrders {
				_id
				# date
				# type
			}
			quote
			total
			charged
			paid
		}
	}
`);

export const QUERY_INVOICE_BY_ID = gql(/* GraphQL */ `
	query QueryInvoiceById($invoiceId: ID!) {
		queryInvoiceById(invoiceId: $invoiceId) {
			_id
			invoiceNumber
			date
			customerId {
				_id
				firstName
				lastName
				email
				phone
				businessName
			}
			workOrders {
				_id
				date
				type
			}
			quote
			total
			charged
			paid
		}
	}
`);

export const QUERY_INVOICE_BY_CUSTOMER_ID = gql(/* GraphQL */ `
	query QueryInvoicesByCustomer($customerId: ID!) {
		queryInvoicesByCustomer(customerId: $customerId) {
			_id
			invoiceNumber
			date
			customerId {
				_id
				firstName
				lastName
				email
				phone
				businessName
			}
			workOrders {
				_id
				date
				type
			}
			quote
			total
			charged
			paid
		}
	}
`);

export const QUERY_INVOICE_BY_WORK_ORDER_ID = gql(/* GraphQL */ `
	query QueryInvoicesByWorkOrder($workOrderId: ID!) {
		queryInvoicesByWorkOrder(workOrderId: $workOrderId) {
			_id
			invoiceNumber
			date
			customerId {
				_id
				firstName
				lastName
				email
				phone
				businessName
			}
			workOrders {
				_id
				date
				type
			}
			quote
			total
			charged
			paid
		}
	}
`);

export const GET_PRESEIGNED_URL = gql(/* GraphQL */ `
	query GetPresignedS3Url($imgKey: String!, $commandType: String!, $altTag: String!) {
		getPresignedS3Url(imgKey: $imgKey, commandType: $commandType, altTag: $altTag)
	}
`);
