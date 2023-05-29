# frozen_string_literal: true
require_relative "../../../models/pet"

module Api
  module V1
    class PetsController < ApplicationController

      def index
        pets = Pet.all.order(:featured, :name)

        #If filtered_species is not nil, select pets from filtered_species.
        filtered_species = params[:species]
        if !filtered_species.nil?
          pets = pets.where(species: filtered_species)
        end

        render json: pets, status: :ok
      end

    end
  end
end
