import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Search, Dice6, CheckCircle } from "lucide-react";

export function GamesSection() {
  const sectionRef = useScrollAnimation();
  const scavengerRef = useScrollAnimation();
  const pokerRef = useScrollAnimation();

  return (
    <section id="games" className="py-20 florida-gradient">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="text-center mb-16 scroll-fade">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            data-testid="text-games-title"
          >
            Play While You <span className="text-primary">Navigate</span>
          </h2>
          <p
            className="text-xl max-w-3xl mx-auto"
            data-testid="text-games-description"
          >
            Transform your golf cart experience with engaging games designed to
            make every ride an adventure.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Scavenger Hunt */}
          <div
            ref={scavengerRef}
            className="scroll-fade"
            data-testid="card-scavenger-hunt"
          >
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Search className="text-primary text-3xl mr-4 w-8 h-8" />
                <h3
                  className="text-3xl font-bold text-card-foreground"
                  data-testid="text-scavenger-title"
                >
                  Scavenger Hunt
                </h3>
              </div>
              <p
                className="text-muted-foreground text-lg mb-6 leading-relaxed"
                data-testid="text-scavenger-description"
              >
                Discover landmarks around the city with our interactive
                scavenger hunt feature. Find checkpoints, solve clues, and
                compete with friends.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li
                  className="flex items-center"
                  data-testid="feature-scavenger-checkpoints"
                >
                  <CheckCircle className="text-accent mr-3 w-5 h-5" />
                  Interactive checkpoint system
                </li>
                <li
                  className="flex items-center"
                  data-testid="feature-scavenger-leaderboards"
                >
                  <CheckCircle className="text-accent mr-3 w-5 h-5" />
                  Leaderboards and scoring
                </li>
                <li
                  className="flex items-center"
                  data-testid="feature-scavenger-challenges"
                >
                  <CheckCircle className="text-accent mr-3 w-5 h-5" />
                  Play alone or with friends
                </li>
              </ul>
            </div>
          </div>

          {/* Poker Run */}
          <div
            ref={pokerRef}
            className="scroll-fade"
            style={{ animationDelay: "0.3s" }}
            data-testid="card-poker-run"
          >
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Dice6 className="text-primary text-3xl mr-4 w-8 h-8" />
                <h3
                  className="text-3xl font-bold text-card-foreground"
                  data-testid="text-poker-title"
                >
                  Poker Run
                </h3>
              </div>
              <p
                className="text-muted-foreground text-lg mb-6 leading-relaxed"
                data-testid="text-poker-description"
              >
                Collect playing cards at designated stops throughout your route.
                Build the best poker hand and win exciting prizes.
                {/* Disclaimer */}
                <p
                  className="text-sm text-muted-foreground italic mb-4"
                  data-testid="text-poker-disclaimer"
                >
                  * Coming soon
                </p>
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li
                  className="flex items-center"
                  data-testid="feature-poker-planning"
                >
                  <CheckCircle className="text-accent mr-3 w-5 h-5" />
                  Strategic route planning
                </li>
                <li
                  className="flex items-center"
                  data-testid="feature-poker-collection"
                >
                  <CheckCircle className="text-accent mr-3 w-5 h-5" />
                  Real-time card collection
                </li>
                <li
                  className="flex items-center"
                  data-testid="feature-poker-leaderboard"
                >
                  <CheckCircle className="text-accent mr-3 w-5 h-5" />
                  Leaderboard available
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
