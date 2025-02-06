import { CharacterForm } from "@/components/character-screen/character-form";
import { CharacterList } from "@/components/character-screen/character-list";

function HomePage() {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text">
      <div className="flex flex-col min-h-screen mt-20 text-light-text bg-light-bg dark:bg-dark-bg dark:text-dark-text">
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="flex gap-12 h-full">
            <div className="w-2/5 rounded left-col">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-4xl font-bold text-foreground">
                    Create your Character
                  </h3>
                  <p className="text-foreground mt-3">
                    Fill in the details on the right to create your character
                    for this showcase.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex justify-between mb-4">
                  <h3 className="text-xl font-bold">Your Character:</h3>
                </div>

                <CharacterList />
              </div>
            </div>
            <CharacterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
