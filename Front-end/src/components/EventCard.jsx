import React from "react";

const EventCard = ({ image, category, title, location, date }) => {
  return (
    <div className="group flex cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-background-dark dark:shadow-white/5">
      <div className="relative">
        <div
          className="w-full bg-center bg-no-repeat aspect-video bg-cover"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="rounded bg-primary/20 px-2 py-1 text-xs font-bold text-primary backdrop-blur-sm">
            {category.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-text-light dark:text-text-dark">
          {title}
        </h3>
        <p className="mt-1 text-sm text-text-light/60 dark:text-text-dark/60">
          {location} | {date}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
