import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        <li>
          <h2>サンプルText（試験）αβΓδθABCXYZ123</h2>
          <ol>
            <li><a href="https://ja.wikipedia.org/wiki/%CE%91%E3%83%98%E3%83%AA%E3%83%83%E3%82%AF%E3%82%B9">αヘリックス - Wikipedia</a>: 
            αヘリックス中のアミノ酸は5.4 ÅÅ (not Å)単位の右巻きらせん構造をしている。それぞれのアミノ酸はらせん中で100°向きを変え（つまりらせんは3.6残基で1回転し）、らせんの軸の方向に1.5 Å進む。アミノ酸のアミノ基は4残基離れたアミノ酸のカルボキシル基と水素結合を作っている。これに対して、水素結合が3残基ごとのものは310ヘリックス、5残基ごとのものはΠヘリックスと呼ばれる。</li>
            <li>
              <a href="https://ja.wikipedia.org/wiki/%E3%83%96%E3%83%AA%E3%83%A5%E3%82%A2%E3%83%B3%E3%82%BE%E3%83%BC%E3%83%B3">ブリュアンゾーン - Wikipedia</a> ブリュアンゾーン内においてメッシュによって区分された各点(Sampling points)のことをk点（k-point）と呼ぶ。ブリュアンゾーン上のk点のうち、対称性の良い点に特に名称が付いており、X、L、Δ、Λ、Σなどの記号を付ける。ブリルアンゾーン内部はギリシャ文字で、表面はアルファベットで記す。 Several points of high symmetry are of special interest – these are called critical points.<sup>[3]</sup>
            </li>
            <li>A <i>quick brown fox</i> jumps over the lazy dog. X<sub>123</sub>Y<sup>456</sup>&minus;+</li>
          </ol>
        </li>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
