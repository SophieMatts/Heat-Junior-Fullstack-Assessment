# frozen_string_literal: true
require_relative "../../../models/pet"

module Api
  module V1
    class PetsController < ApplicationController

      def index
        pets = Pet.all

        # If sort_option is nil, set featured and name as default sort_option.
        # Else use the chosen sort_option
        sort_option = params[:sort_option]
        if sort_option.nil?
          pets = pets.order(:featured, :name)
        else
          pets = pets.order(:featured, sort_option)
        end

        #If filtered_species is not nil, select pets from filtered_species.
        filtered_species = params[:species]
        if !filtered_species.nil?
          pets = pets.where(species: filtered_species)
        end

        #If search is not nil AND not empty, select pets by name, breed or species.
        search = params[:search]
        if !search.nil? && !search.empty?
          pets = pets
                  .where(name: search)
                  .or(pets.where(breed: search))
                  .or(pets.where(species: search))
        end

        render json: pets, status: :ok
      end

    end
  end
end
