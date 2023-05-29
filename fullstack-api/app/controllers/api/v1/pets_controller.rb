# frozen_string_literal: true
require_relative "../../../models/pet"

module Api
  module V1
    class PetsController < ApplicationController

      def index
        pets = Pet.all.order(:featured, :name)
        render json: pets, status: :ok
      end

    end
  end
end
