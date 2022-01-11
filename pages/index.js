import { createClient } from 'contentful'
import RecipeCard from '../components/RecipeCard'

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENFUL_SPACE_ID,
    accessToken: process.env.CONTENFUL_ACCESS_KEY,
  })
  const response = await client.getEntries({ content_type: 'recipe' })
  return {
    props: {
      recipes: response.items
    }
  }
}

export default function Recipes({ recipes }) {
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      ))}
      <style jsx>{`
        .recipe-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}
      </style>
    </div>
  )
}

