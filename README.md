# WEBCRUNCH - DRIBBBLE CLONE
- https://web-crunch.com/posts/lets-build-dribbble-clone-with-ruby-on-rails

- GEMS
```
group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"
  # Make errors prettier
  gem 'better_errors'
  gem 'binding_of_caller', '~> 1.0'
  # Add speed badges [https://github.com/MiniProfiler/rack-mini-profiler]
  # gem "rack-mini-profiler"

  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  # gem "spring"
end

# gem 'carrierwave', '~> 1.2', '>= 1.2.1'
# gem "mini_magick"
# gem 'jquery-rails'
gem "bulma-rails"
gem 'devise'
gem 'simple_form'
gem 'impressionist'
gem 'gravatar_image_tag'
gem 'acts_as_votable'
```

- rails g simple_form:install
- rails g devise:install
- rails g devise:views
- rails g devise User
- rails g migration add_fields_to_users name
- rails db:migrate
- rails g scaffold shot title description:text user_id:integer
- rails g migration AddUserShotToShots user_shot
- rails db:migrate
- rails g scaffold comment name response:text
- rails g migration AddShotIdToComments shot_id:integer
- rails g migration AddUserIdToComments user_id:integer
- rails db:migrate
- update routes

```
Rails.application.routes.draw do
  resources :shots do 
    resources :comments 
    member do 
      put 'like', to: "shots#like"
      put 'unlike', to: "shots#unlike"
    end
  end
   
  root 'shots#index'

  devise_for :users
end

```

- update app controller

```
class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name])
  end
end

```

- rails g impressionist
- rails db:migrate
- update shot.rb

```
	is_impressionable
```

- update shots controller

```
impressionist actions: [:show], unique: [:impressionable_type, :impressionable_id, :session_hash]
```

- rails generate acts_as_votable:migration
- rails db:migrate
- update shot.rb

```
	acts_as_votable
```

- update app.scss

```

$pink: #ea4c89;
$pink-invert: #fff;

$primary: $pink;
$primary-invert: $pink-invert;
$link: $primary;
$link-hover: darken($primary, 20%);


@import "bulma";
@import "shots";

html, body {
	min-height: 100vh;
	background-color: #f4f4f4;
}

#drop_zone {
	position: relative;
	padding: 3rem 0;
	border: 2px dashed #ccc;
	text-align: center;
	border-radius: 6px;
	background-color: #f8f8f8;
	&.dragging::before {
		content: "";
	  position: absolute;
	  left: 0; width: 100%;
	  top: 0; height: 100%;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  font-size: 1.5em;
	  background-color: rgba($primary, .3);
	  pointer-events: none;
	  z-index: 99;
	}
	&.fire::before {
		content: "";
	  position: absolute;
	  left: 0; width: 100%;
	  top: 0; height: 100%;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  font-size: 1.5em;
	  background-color: rgba($green, .3);
	  pointer-events: none;
	  z-index: 99;
	}
}

.notification {
	border-radius: none;
}
.notification:not(:last-child) {
	margin-bottom: 0;
}

.visible {
	display: block !important;
}
```

- create shots.scss

```
.hero.is-dark {
	background-color: #282828 !important;
}

.shot-wrapper {
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07);
	border-radius: 2px;
	padding: 10px;
	background: white;
}
.shots {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-gap: 1rem;
	@media only screen and (min-width: 1600px) {
		grid-template-columns: repeat(6, 1fr);
	}
	@media only screen and (max-width: 1300px) {
		grid-template-columns: repeat(4, 1fr);
	}
	@media only screen and (max-width: 1100px) { 
		grid-template-columns: repeat(3, 1fr);
	}
	@media only screen and (max-width: 800px) {
		grid-template-columns: 1fr 1fr;
	}
	@media only screen and (max-width: 400px) {
		grid-template-columns: 1fr;
	}

}
.shot {
	position: relative;
	display: block;
	color: #333 !important;

	.shot-data {
		display: none;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		padding: 10px;
		background: rgba(white, .9);
		cursor: pointer;
		.shot-title {
			font-weight: bold;
		}
		.shot-description {
			font-size: .9rem;
		}
		.shot-time {
			font-size: .8rem;
			padding-top: .5rem;
		}
	}
}

.user-data {
	padding: 1rem 0 0 0;
}

.user-name {
	display: inline-block;
	position: relative;
	top: -4px;
	padding-left: 5px;
}

.user-thumb {
	display: inline-block;
	img {
		border-radius: 50%;
	}
}

.by,
.shot-time {
	display: inline-block;
	position: relative;
	top: -4px;
}

.shot-analytics {
	text-align: right;
	@media only screen and (max-width: 800px) {
		text-align: right;
		.level-item {
			display: inline-block;
			padding: 0 4px;
		}
		.level-left+.level-right {
			margin: 0;
			padding: 0;
		}
		.level-item:not(:last-child) {
			margin: 0;
		}
	}
}

.shot-analytics,
.panel.show-shot-analytics {
	font-size: .9rem;
	a,
	.icon {
		color: #aaa;
	}
	.icon:hover,
	a:hover {
		color: darken(#aaa, 25%);
	}
}

.panel.show-shot-analytics {
	a { color: #333; }
	.icon {
		padding-right: .5rem;
	}
	.likes .vote_count {
		margin-left: -4px;
	}
}


.shot-container {
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07);
	border-radius: 2px;
	padding: 40px;
	background: white;
	@media only screen and (max-width: 800px) {
		padding: 10px;
	}
	.content,
	.comments {
		margin-top: 1rem;
		padding: 20px;
		@media only screen and (max-width: 800px) {
			padding: 0;
		}
	}
}

.shot-full {
	text-align: center;
}
```

- update comments controller

```
	before_action :authenticate_user!, only: [:create, :destroy]

  def create
  	@shot = Shot.find(params[:shot_id]) # finds the shot with the associated shot_id
  	@comment = @shot.comments.create(comment_params) # creates the comment on the shot passing in params 
  	@comment.user_id = current_user.id if current_user # assigns logged in user's ID to comment
  	@comment.save!

  	redirect_to shot_path(@shot)

  end

  def destroy
  	@shot = Shot.find(params[:shot_id])
  	@comment = @shot.comments.find(params[:id])
  	@comment.destroy
  	redirect_to shot_path(@shot)
  end

  private

  def comment_params 
  	params.require(:comment).permit(:name, :response)
  end
end
```

- added devise rails 7 from : https://dev.to/efocoder/how-to-use-devise-with-turbo-in-rails-7-9n9
- update shots controller

```
  before_action :set_shot, only: [:show, :edit, :update, :destroy, :like, :unlike]
  before_action :authenticate_user!, only: [:edit, :update, :destroy, :like, :unlike]
  impressionist actions: [:show], unique: [:impressionable_type, :impressionable_id, :session_hash]

  # GET /shots
  # GET /shots.json
  def index
    @shots = Shot.all.order('created_at DESC')
  end

  # GET /shots/1
  # GET /shots/1.json
  def show
  end

  # GET /shots/new
  def new
    @shot = current_user.shots.build
  end

  # GET /shots/1/edit
  def edit
  end

  # POST /shots
  # POST /shots.json
  def create
    @shot = current_user.shots.build(shot_params)

    respond_to do |format|
      if @shot.save
        format.html { redirect_to @shot, notice: 'Shot was successfully created.' }
        format.json { render :show, status: :created, location: @shot }
      else
        format.html { render :new }
        format.json { render json: @shot.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /shots/1
  # PATCH/PUT /shots/1.json
  def update
    respond_to do |format|
      if @shot.update(shot_params)
        format.html { redirect_to @shot, notice: 'Shot was successfully updated.' }
        format.json { render :show, status: :ok, location: @shot }
      else
        format.html { render :edit }
        format.json { render json: @shot.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /shots/1
  # DELETE /shots/1.json
  def destroy
    @shot.destroy
    respond_to do |format|
      format.html { redirect_to shots_url, notice: 'Shot was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def like
    @shot.liked_by current_user
    respond_to do |format|
      format.html { redirect_back fallback_location: root_path }
      format.json { render layout:false }
    end
  end

  def unlike
    @shot.unliked_by current_user
    respond_to do |format|
      format.html { redirect_back fallback_location: root_path }
      format.json { render layout:false }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_shot
      @shot = Shot.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def shot_params
      params.require(:shot).permit(:title, :description, :user_shot)
    end
end
```

- update comment.rb

```
	belongs_to :shot
	belongs_to :user
end
```

- rails active_storage:install
- rails db:migrate
- update shot.rb

```
class Shot < ApplicationRecord
	belongs_to :user
	has_many :comments, dependent: :destroy
	
	# mount_uploader :user_shot, UserShotUploader
	has_one_attached :user_shot
	is_impressionable
	acts_as_votable
end
```

- update user.rb

```
  has_many :shots, dependent: :destroy
  has_many :comments, dependent: :destroy
  acts_as_voter
```

- update app helper

```
	def verbose_date(date)
		date.strftime('%B %d %Y')
	end
```

- update layou app

```
    <%= stylesheet_link_tag "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" %>

  <body>
  	<% if flash[:notice] %>
    	<div class="notification is-primary global-notification">
  	  	<p class="notice"><%= notice %></p>
    	</div>
   	<% end %>
    <% if flash[:alert] %>
    <div class="notification is-danger global-notification">
      <p class="alert"><%= alert %></p>
    </div>
    <% end %>
     <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <%= link_to root_path, class:"navbar-item" do %>
          <h1 class="title is-5 has-text-white">Dribbble Clone</h1>
        <% end  %>
      <div class="navbar-burger burger" data-target="navbar">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

      <div id="navbar" class="navbar-menu">

        <div class="navbar-start">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <%= link_to 'Shots', root_path , class:"button is-dark" %>
              </p>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <% if user_signed_in? %>
              <p class="control">
                <%= link_to new_shot_path, class:"button is-primary"  do %>
                  <span class="icon is-small"><i class="fa fa-upload"></i></span>
                  <span>New Shot</span>
                <% end %>
              </p>
              <p class="control">
                <%= link_to current_user.name, edit_user_registration_path, class:"button is-dark" %>
              </p>
              <p class="control">
                <%= link_to "Log Out", destroy_user_session_path, method: :delete, class:"button is-dark" %>
              </p>
              <% else %>
              <p class="control">
                 <%= link_to "Sign In", new_user_session_path, class:"button is-dark" %>
              </p>
              <p class="control">
                <%= link_to "Sign up", new_user_registration_path, class:"button is-dark"%>
              </p>
              <% end %>
            </div>
          </div>
        </div>
      </div>
    </nav> 

    <%= yield %>
  </body>
</html>    
```

- update comments partial
- update comments/form partial
- update devise reg/new and edit, sess/new
- create shot/hero partial
- update all the shot views
- the like votes are button_to's

## THE END