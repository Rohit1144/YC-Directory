import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY } from "@/sanity/lib/queries";

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {

  const query = (await searchParams).query;

  const posts = await client.fetch(STARTUP_QUERY)

  return (
    <>
    <section className="pink_container">
      <h1 className="heading">Pitch your startup, <br /> Connect with Entrepreneurs</h1>
      <p className="sub-heading">Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions</p>
      <SearchForm query={query}/>
    </section>

    <section className="section_container">
      <p className="text-30-semibold">
        {query? `Search results for ${query}` : "All Startups"} 
      </p>

      <ul className="card-grid">
        {posts.length > 0 ? posts.map((post : StartupTypeCard) => 
        (<StartupCard key={post?._id} post={post}/>)) : <p className="no-results">No startups found</p>} 
      </ul>

    </section>
      
    </>
  );
}
