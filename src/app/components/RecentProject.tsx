"use client";

import { useState } from "react";

// Add type definitions at the top
type Project = {
  id: number;
  year: string;
  title: string;
  category: string;
  image: string;
};

type FilterType = "All" | "Urban Planning" | "Interior Design" | "Renovation" | "Redesign";

export default function RecentProject() {
  const filters: FilterType[] = ["All", "Urban Planning", "Interior Design", "Renovation", "Redesign"];
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  

  // All projects data
const allProjects: Project[] = [
    // Urban Planning (5 projects)
    { id: 1, year: "2025", title: "Lakeside Residence", category: "Urban Planning", image: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?q=80&w=2070&auto=format&fit=crop" },
    { id: 2, year: "2024", title: "Skyline Penthouse", category: "Urban Planning", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop" },
    { id: 3, year: "2025", title: "Coastal Retreat", category: "Urban Planning", image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2065&auto=format&fit=crop" },
    { id: 4, year: "2024", title: "City View Apartment", category: "Urban Planning", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop" },
    { id: 5, year: "2025", title: "Luxury Penthouse", category: "Urban Planning", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" },
    
    // Interior Design (5 projects)
    { id: 6, year: "2025", title: "The Meridian Workspace", category: "Interior Design", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop" },
    { id: 7, year: "2024", title: "Minimalist Oasis", category: "Interior Design", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" },
    { id: 8, year: "2025", title: "Urban Loft", category: "Interior Design", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop" },
    { id: 9, year: "2024", title: "Art Deco Revival", category: "Interior Design", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop" },
    { id: 10, year: "2024", title: "Contemporary Studio", category: "Interior Design", image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2070&auto=format&fit=crop" },
    
    // Renovation (5 projects)
    { id: 11, year: "2025", title: "Heritage Renovation", category: "Renovation", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop" },
    { id: 12, year: "2025", title: "Mountain Villa", category: "Renovation", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" },
    { id: 13, year: "2024", title: "Historic Restoration", category: "Renovation", image: "https://images.unsplash.com/photo-1600573472550-8090f8d18f2d?q=80&w=2070&auto=format&fit=crop" },
    { id: 14, year: "2024", title: "Brownstone Makeover", category: "Renovation", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop" },
    { id: 15, year: "2025", title: "Townhouse Revival", category: "Renovation", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" },
    
    // Redesign (5 projects)
    { id: 16, year: "2024", title: "Modern Redesign", category: "Redesign", image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2070&auto=format&fit=crop" },
    { id: 17, year: "2025", title: "Garden Estate", category: "Redesign", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=2070&auto=format&fit=crop" },
    { id: 18, year: "2025", title: "Modern Farmhouse", category: "Redesign", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop" },
    { id: 19, year: "2024", title: "Industrial Loft", category: "Redesign", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop" },
    { id: 20, year: "2025", title: "Minimalist Transformation", category: "Redesign", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" },
  ];

  const projectsPerPage = 4; // Changed from 3 to 4
  
  // Filter projects
  const filteredProjects = activeFilter === "All" 
    ? allProjects 
    : allProjects.filter(project => project.category === activeFilter);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage);

  // Navigation handlers with type annotations
  const handleNext = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterClick = (filter: FilterType): void => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleProjectClick = (projectId: number): void => {
    // Add your project click logic here
    console.log(`Project ${projectId} clicked`);
    // Could navigate to project detail page or open modal
  };

  return (
    <section className="relative py-2 md:py-2 bg-[rgb(var(--background-rgb))]">
      <div className="relative container-custom">
        
        {/* HEADING SECTION */}
        <div className="max-w-6xl mx-auto text-left mb-14 md:mb-10">
          <div className="mb-6">
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--deep-charcoal)] mb-4 leading-tight">
            RECENT PROJECTS
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[var(--deep-charcoal)] leading-tight">
            A Curated Collection
          </h2>
        </div>



        {/* DESCRIPTION & FILTERS */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-12">
           <div className="flex flex-col md:flex-row gap-8 md:gap-24">
            {/* Description Text - Left side, full width on mobile */}
            <div className="md:w-2/2">
              <p className="text-lg md:text-xl text-[var(--warm-gray)] font-light leading-relaxed">
                Step inside our latest acquisitions and discover the hallmarks of an Aura listing:
              </p>
            </div>

          {/* Filter Tabs - Professional Style */}
          <div className="md:w-3/4">
          <div className="flex flex-wrap gap-2 md:gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterClick(filter)}
                className={`px-4 py-1 text-sm md:text-sm font-medium transition-all duration-300  rounded-full ${
                  activeFilter === filter
                    ? "bg-[var(--deep-charcoal)] text-white shadow-sm"
                    : "text-gray-400 bg-transparent border border-gray-400 hover:bg-[var(--deep-charcoal)]/5 hover:border-[var(--deep-charcoal)]/40"
                }`}
              >
                {filter}
              </button>
            ))}
            </div>
            </div>
          </div>
        </div>




        {/* PROJECTS GRID - Changed to show 4 pictures */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {currentProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project.id)}
                className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image Container with Professional Frame */}
                <div className="relative h-[220px] md:h-[260px] overflow-hidden mb-4 rounded-xl">
                  {/* Main Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${project.image}')` }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* View Button - Appears on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="px-5 py-2.5 bg-white/95 backdrop-blur-sm text-[var(--deep-charcoal)] rounded-full text-sm md:text-base font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      View Project →
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-[var(--deep-charcoal)] rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm md:text-base font-medium text-[var(--deep-charcoal)]">
                      {project.year}
                    </span>
                    <div className="w-3 h-px bg-[var(--deep-charcoal)]/30"></div>
                  </div>
                  <h3 className="text-lg md:text-xl font-normal text-[var(--deep-charcoal)] leading-tight">
                    {project.title}
                  </h3>
                  <div className="mt-3">
                    <button className="text-[var(--deep-charcoal)] text-sm md:text-base font-medium opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1.5">
                      Take a Look
                      <svg className="w-3.5 h-3.5 md:w-4 md:h-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}