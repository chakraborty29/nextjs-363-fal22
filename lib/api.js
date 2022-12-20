const API_URL = process.env.WORDPRESS_API_URL
// const API_URL = "http://ist-363-restaurants.local/graphql"

async function fetchAPI(query, { variables } = {}) {
	const headers = { 'Content-Type': 'application/json' }

	const res = await fetch(API_URL, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			query,
			variables,
		}),
	})

	const json = await res.json()
	if (json.errors) {
		console.error(json.errors)
		throw new Error('Failed to fetch API')
	}
	return json.data
}

export async function getAllRestaurants() {
	const data = await fetchAPI(`
	query NewQuery {
		restaurants {
		  edges {
			node {
			  id
			  title
			  excerpt
			  slug
			  featuredImage {
				node {
					sourceUrl
					altText
					mediaDetails {
						width
						height
					}
				}
			  }	
			  restaurantTypes {
				edges {
				  node {
					id
					name
				  }
				}
			  }
			}
		  }
		}
	  }
	`)
	return data?.restaurants.edges
}

export async function getAllRestaurantSlugs() {
	const data = await fetchAPI(`
	  query NewQuery {
		restaurants {
			edges {
			  node {
				id
				title
				excerpt
				slug
				featuredImage {
				  node {
					  sourceUrl
					  altText
					  mediaDetails {
						  width
						  height
					  }
				  }
				}	
				restaurantTypes {
				  edges {
					node {
					  id
					  name
					}
				  }
				}
			  }
			}
		  }
		}
	`)
	  return data?.restaurants.edges
}

export async function getSingleRestaurantBySlug(id) {
	const data = await fetchAPI(`
	query MyQuery($id: ID!) {
		restaurant(idType: URI, id: $id) {
		  id
		  title
		  slug
		  excerpt
		  featuredImage {
			node {
			  sourceUrl
			  altText
			  mediaDetails {
				width
				height
			  }
			}
		  }
		  restaurantTypes {
			edges {
			  node {
				id
				name
			  }
			}
		  }
		  restaurantInformation {
			contact {
			  phoneNumber
			  email
			}
			hours {
			  monday {
				close
				open
				status
			  }
			  tuesday {
				close
				open
				status
			  }
			  wednesday {
				close
				open
				status
			  }
			  thursday {
				close
				open
				status
			  }
			  friday {
				close
				open
				status
			  }
			  saturday {
				close
				open
				status
			  }
			  sunday {
				close
				open
				status
			  }
			}
			location {
			  city
			  state
			  streetAddress
			  zipCode
			}
			menu {
			  menuItems {
				menuItem {
				  description
				  price
				  title
				  image {
					altText
					mediaDetails {
					  height
					  width
					}
					sourceUrl
				  }
				}
			  }
			}
		  }
		}
	  }
	`, {
		variables: {
		  "id": id
		}
	  })
	  return data?.restaurant
}

export async function getAllRestaurantTypes() {
	const data = await fetchAPI(`
	query MyQuery {
		restaurantTypes {
		  edges {
			node {
			  name
			}
		  }
		}
	  }
	`)
	return data?.restaurantTypes.edges
}