import React from "react"
import { Link } from "gatsby"
import { graphql } from 'gatsby'
import styled from "styled-components"

import Layout from "../components/layout"
import Hero from "../components/hero"
import SEO from "../components/seo"
import SubTitle from "../components/subTitle"
import { useCategories } from "../components/query/categories"

const IndexPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  const categories = useCategories()

  return (
    <Layout>
      <SEO title="Home" />
      <Hero />
      <SubTitle title="最新記事" />
      {edges.map(({ node }) => (
        <Item key={node.id}>
          <h3>
            [<Link to={`/${node.frontmatter.category}`}>{categories[node.frontmatter.category]}</Link>]&nbsp;
            <Link to={`/${node.frontmatter.category}/${node.frontmatter.slug}`}>
              {node.frontmatter.title}
            </Link>
          </h3>
          <p>{node.excerpt}</p>
          <div className="info">
            <div>
              {node.frontmatter.tags.map(tag =>
                <Link className="tag" key={tag} to={`/tags/${tag}`}>
                  #{tag}
                </Link>
              )}
            </div>
            <div>{node.frontmatter.date}</div>
          </div>
        </Item>
      ))}
    </Layout>
  )
}


const Item = styled.div`
  margin: 4rem 0;
  .info {
    display: flex;
    justify-content: space-between;
  }
  .tag {
    padding: 0 0.5rem 0 0;
  }
`

export const query = graphql`
  query {
    allMarkdownRemark (
      filter: { frontmatter: { status: { eq: "published" }}},
      sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 240)
          frontmatter {
            title
            date(formatString: "YYYY/MM/DD")
            slug
            category
            tags
          }
        }
      }
    }
  }
`

export default IndexPage
