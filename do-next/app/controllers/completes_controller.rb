class CompletesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    activity = Activity.find(params[:activity_id])
    complete = activity.completes.build(rating: params[:rating], note: params[:note])
    complete.save
    render json: activity, serializer: ActivityCompleteSerializer
  end

  def destroy
    complete = Complete.find(params[:id])
    complete.destroy
    render json: complete
  end

end